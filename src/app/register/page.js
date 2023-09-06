"use client";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Image from "next/image";
import { getUsers, setUsers } from "../Helpers";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
//style
import "../formstyles.css";

//redux
import { useSelector, useDispatch } from "react-redux";

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

// actions

import logo from "../../assets/MagnumAi.jpg";
import regimg from "../../assets/register-page-img.jpg";

import { PiIdentificationCardFill } from "react-icons/pi";
import { MdEmail } from "react-icons/md";
import { FaKey } from "react-icons/fa";
import { BiSolidLockAlt } from "react-icons/bi";

export default function Page() {
  const router = useRouter();
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmpassword: "",
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required("Firstname is required"),
      lastname: Yup.string().required("Lastname is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
      confirmpassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: (values) => {
      const currentUsers = getUsers();
      const isAlreadyRegistered = currentUsers.some(
        (user) => user.email === values.email
      );

      if (isAlreadyRegistered) {
        toast("User already registered");
      } else {
        setUsers(values);
        toast("Registration successful");
        router.push("/login");
      }
    },
  });
  return (
    <Container fluid id="registerContainer">
      <ToastContainer />
      <Row>
        <Col className="col-lg-6 col-md-6 col-sm-12 col-12 d-none d-md-block">
          <Image
            src={regimg.src}
            className="w-100 reg-img"
            width={0}
            height={0}
            alt=" "
            unoptimized
          />
        </Col>

        <Col
          className="col-lg-6 col-md-6 col-sm-12 col-12 d-flex flex-column"
          id="registerSection"
        >
          <Image
            src={logo.src}
            className="register-logo"
            alt="logomark"
            width={0}
            height={0}
          />
          <div className="registerHeaderText">
            <h2 className="text-center text-2xl">Sign Up</h2>
            <p className="text-center">
              Get Started on your Canadian immigration Journey by entering
            </p>
          </div>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              validation.handleSubmit();
              return false;
            }}
            id="registerForm"
          >
            <Form.Label htmlFor="firstname">First Name</Form.Label>
            <InputGroup className="mb-3 register-input" controlid="firstname">
              <Form.Control
                name="firstname"
                placeholder="Jane"
                value={validation.values.firstname}
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                isInvalid={!!validation.errors.firstname}
              />
              <InputGroup.Text className="register-addons">
                {" "}
                <PiIdentificationCardFill />
              </InputGroup.Text>
              {validation.errors.firstname && (
                <Form.Control.Feedback>
                  {validation.errors.firstname}
                </Form.Control.Feedback>
              )}
            </InputGroup>
            <Form.Label htmlFor="lastname">Last Name</Form.Label>
            <InputGroup className="mb-3 register-input" controlid="lastname">
              <Form.Control
                name="lastname"
                placeholder="Doe"
                value={validation.values.lastname}
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                isInvalid={!!validation.errors.lastname}
              />
              <InputGroup.Text className="register-addons">
                {" "}
                <PiIdentificationCardFill />
              </InputGroup.Text>
              {validation.errors.lastname && (
                <Form.Control.Feedback>
                  {validation.errors.lastname}
                </Form.Control.Feedback>
              )}
            </InputGroup>
            <Form.Label htmFor="email">Email</Form.Label>
            <InputGroup className="mb-3 register-input" controlid="email">
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter your email address"
                value={validation.values.email}
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                isInvalid={!!validation.errors.email}
              />
              <InputGroup.Text className="register-addons">
                {" "}
                <MdEmail />
              </InputGroup.Text>
              {validation.errors.email && (
                <Form.Control.Feedback>
                  {validation.errors.email}
                </Form.Control.Feedback>
              )}
            </InputGroup>
            <Form.Label htmlfor="password">Password</Form.Label>
            <InputGroup className="mb-3 register-input" controlid="password">
              <Form.Control
                type="password"
                name="password"
                placeholder="**************"
                value={validation.values.password}
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                isInvalid={!!validation.errors.password}
              />
              <InputGroup.Text className="register-addons">
                {" "}
                <FaKey />
              </InputGroup.Text>
              {validation.errors.password && (
                <Form.Control.Feedback>
                  {validation.errors.password}
                </Form.Control.Feedback>
              )}
            </InputGroup>
            <Form.Label htmlFor="confirmpassword">Confirm Password</Form.Label>
            <InputGroup
              className="mb-3 register-input"
              controlid="confirmPassword"
            >
              <Form.Control
                type="password"
                placeholder="**************"
                name="confirmpassword"
                value={validation.values.confirmpassword}
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                isInvalid={!!validation.errors.confirmpassword}
              />
              <InputGroup.Text className="register-addons">
                {" "}
                <BiSolidLockAlt />
              </InputGroup.Text>
              {validation.errors.confirmpassword && (
                <Form.Control.Feedback>
                  {validation.errors.confirmpassword}
                </Form.Control.Feedback>
              )}
            </InputGroup>
            <button className="custom-button w-100" type="submit">
              Register
            </button>
            <p className="mt-3 text-center">
              Already have an account ?{" "}
              <a href="/login">
                {" "}
                <span className="blue-text bold">Log in</span>
              </a>
            </p>{" "}
          </Form>{" "}
        </Col>
      </Row>
    </Container>
  );
}
