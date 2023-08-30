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
// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";
const Step1 = () => (
  <Row>
    <Col className="col-lg-3 col-md-13 col-sm-10 col-12">
      <h3 className="font-bold">Professional History</h3>
    </Col>
    <Col
      className="col-lg-9 col-md-12 col-sm-10 col-12 d-flex flex-column"
      id="loginSection"
    >
      <div id="loginForm" className="mt-40">
        <Form.Label>Occupation</Form.Label>
        <InputGroup className="mb-3" controlId="formBasicOccupation">
          <Form.Control
            name="occupation"
            id="occupation"
            placeholder="Enter your occupation"
          />
        </InputGroup>

        <Form.Label>Employer Details</Form.Label>
        <InputGroup className="mb-3" controlId="formBasicOccupation">
          <Form.Control name="occupation" id="occupation" />
        </InputGroup>
        <Form.Label>Occupation</Form.Label>
        <InputGroup className="mb-3" controlId="formBasicOccupation">
          <Form.Control
            name="occupation"
            id="occupation"
            placeholder="Enter your occupation"
          />
        </InputGroup>

        <Form.Label>Employer Details</Form.Label>
        <InputGroup className="mb-3" controlId="formBasicOccupation">
          <Form.Control name="occupation" id="occupation" />
        </InputGroup>
      </div>
    </Col>
  </Row>
);

const Step2 = () => (
  <Row>
    <Col className="col-lg-3 col-md-13 col-sm-10 col-12">
      <h3 className="font-bold">Travel History</h3>
    </Col>
    <Col
      className="col-lg-9 col-md-12 col-sm-10 col-12 d-flex flex-column"
      id="loginSection"
    >
      <div id="loginForm" className="mt-40">
        <Form.Label>Do you have any travel history ?</Form.Label>
        <InputGroup className="mb-3" controlId="formBasicOccupation">
          <Form.Control
            name="occupation"
            id="occupation"
            placeholder="Enter your occupation"
          />
        </InputGroup>

        <Form.Label>Which Countries ?</Form.Label>
        <InputGroup className="mb-3" controlId="formBasicOccupation">
          <Form.Control name="occupation" id="occupation" />
        </InputGroup>
        <Form.Label>Do you have any travel history ?</Form.Label>
        <InputGroup className="mb-3" controlId="formBasicOccupation">
          <Form.Control
            name="occupation"
            id="occupation"
            placeholder="Enter your occupation"
          />
        </InputGroup>

        <Form.Label>Which Countries ?</Form.Label>
        <InputGroup className="mb-3" controlId="formBasicOccupation">
          <Form.Control name="occupation" id="occupation" />
        </InputGroup>
        <Form.Label>Do you have any travel history ?</Form.Label>
        <InputGroup className="mb-3" controlId="formBasicOccupation">
          <Form.Control
            name="occupation"
            id="occupation"
            placeholder="Enter your occupation"
          />
        </InputGroup>

        <Form.Label>Which Countries ?</Form.Label>
        <InputGroup className="mb-3" controlId="formBasicOccupation">
          <Form.Control name="occupation" id="occupation" />
        </InputGroup>
      </div>
    </Col>
  </Row>
);

const Step3 = () => (
  <Row>
    <Col className="col-lg-3 col-md-13 col-sm-10 col-12 ">
      <h3 className="font-bold">Family Information</h3>
    </Col>
    <Col
      className="col-lg-9 col-md-12 col-sm-10 col-12 d-flex flex-column"
      id="loginSection"
    >
      <div id="loginForm" className="mt-40">
        <Form.Label>Legal Guardian/parents</Form.Label>
        <InputGroup className="mb-3" controlId="formBasicOccupation">
          <Form.Control
            name="occupation"
            id="occupation"
            placeholder="Enter your occupation"
          />
        </InputGroup>

        <Form.Label>Children</Form.Label>
        <InputGroup className="mb-3" controlId="formBasicOccupation">
          <Form.Control name="occupation" id="occupation" />
        </InputGroup>
        <button className="custom-button w-100" type="submit">
          Submit
        </button>
      </div>
    </Col>
  </Row>
);
const steps = [
  <Step1 key="step1" />,
  <Step2 key="step2" />,
  <Step3 key="step3" />,
];

export default function Express() {
  const [currentStep, setCurrentStep] = useState(0);

  const goToNextStep = () => setCurrentStep((step) => step + 1);
  const goToPreviousStep = () => setCurrentStep((step) => step - 1);
  return (
    <main className="flex min-h-screen flex-col p-12 libre-franklin min-w-[90vw] sm:min-w-[60vw]">
      <h1 className="font-bold text-xl blue-text">Fill this form carefully</h1>
      <Container fluid id="loginContainer" className="mt-4">
        {steps[currentStep]}
        <div className="mt-4">
          {" "}
          <Button
            variant="primary"
            disabled={currentStep === 0}
            onClick={goToPreviousStep}
            className="custom-button mr-4"
          >
            Previous
          </Button>
          <Button
            variant="primary"
            disabled={currentStep === steps.length - 1}
            onClick={goToNextStep}
            className="custom-button"
          >
            Next
          </Button>
        </div>
      </Container>
    </main>
  );
}
