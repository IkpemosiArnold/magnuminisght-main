"use client";
import React, { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Image from "next/image";
//style
import "../formstyles.css";

//redux
import { useSelector, useDispatch } from "react-redux";

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

// actions

import logo from "../../assets/MagnumAi.jpg";
import logimg from "../../assets/login-page-img.jpg";
import { MdEmail } from "react-icons/md";
import { BiSolidLockAlt } from "react-icons/bi";

export default function Page() {
  const [userLogin, setUserLogin] = useState([]);
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: userLogin.email || "newuser@gmail.com" || "",
      password: userLogin.password || "123456" || "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: (values) => {
      dispatch(loginUser(values, props.router.navigate));
    },
  });
  return (
    <Container fluid id="loginContainer">
      <Row>
        <Col className="col-lg-6 col-md-6 col-sm-12 col-12 d-none d-md-block">
          <Image
            src={logimg.src}
            className="w-100 reg-img"
            alt=""
            width={0}
            height={0}
            unoptimized
          />
        </Col>
        <Col
          className="col-lg-6 col-md-6 col-sm-12 col-12 d-flex flex-column"
          id="loginSection"
        >
          <Image
            src={logo.src}
            className="register-logo"
            alt="logo"
            width={0}
            height={0}
            unoptimized
          />
          <div className="loginHeaderText">
            <h2>Log in</h2>
            <p>Continue your Canadian Immigration Journey</p>
          </div>

          <Form
            onSubmit={validation.handleSubmit}
            id="loginForm"
            className="mt-40"
          >
            <Form.Label htmlFor="email">Email</Form.Label>
            <InputGroup className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="email"
                id="email"
                placeholder="Enter your email address"
                value={validation.values.email}
                onChange={validation.handleChange}
                isValid={validation.touched.email && !validation.errors.email}
                isInvalid={!!validation.errors.email}
              />
              <InputGroup.Text className="register-addons">
                {" "}
                <MdEmail />
              </InputGroup.Text>
              {validation.touched.email && validation.errors.email ? (
                <Form.Control.Feedback type="invalid">
                  {validation.errors.email}
                </Form.Control.Feedback>
              ) : null}
            </InputGroup>
            <Form.Label htmlFor="password">Password</Form.Label>
            <InputGroup className="mb-3" controlId="formBasicPassword">
              <Form.Control
                type="password"
                id="password"
                placeholder="**************"
                value={validation.values.password}
                onChange={validation.handleChange}
                isValid={
                  validation.touched.password && !validation.errors.password
                }
                isInvalid={!!validation.errors.password}
              />
              <InputGroup.Text className="register-addons">
                {" "}
                <BiSolidLockAlt />
              </InputGroup.Text>
              {validation.touched.password && validation.errors.password ? (
                <Form.Control.Feedback type="invalid">
                  {validation.errors.password}
                </Form.Control.Feedback>
              ) : null}
            </InputGroup>
            <Button
              variant="primary"
              type="submit"
              className="custom-button w-100"
            >
              Login
            </Button>

            <p className="mt-3 text-center">
              Don't have an account ?
              <a href="/register">
                <span className="blue-text bold"> Sign up</span>
              </a>
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
