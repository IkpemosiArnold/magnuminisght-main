"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import FormInputGroup from "../FormInputGroup";

// Form validation
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export default function Workpermit() {
  const variants = {
    exit: { opacity: 0, x: "-100vw" },
    enter: { opacity: 1, x: "0" },
  };

  const schema = yup
    .object({
      Firstname: yup.string().required(),
      Lastname: yup.string().required(),
    })
    .required();

  const [currentStep, setCurrentStep] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    console.log(data);
    console.log(errors);
  };

  const goToNextStep = () => setCurrentStep((step) => step + 1);
  const goToPreviousStep = () => setCurrentStep((step) => step - 1);

  const Step1 = () => (
    <Row>
      <h3 className=" text-center text-2xl blue-text font-medium">
        Personal Information
      </h3>
      {/* Personal Information Form Fields */}
      <FormInputGroup
        as={Col}
        md={6}
        labelText="Firstname"
        controlName="Firstname"
        placeholder="Enter your firstname"
        errors={errors}
        {...register(`Firstname`)}
      />
      <FormInputGroup
        labelText="Lastname"
        controlName="Lastname"
        placeholder="Enter your lastname"
        errors={errors}
        {...register(`Lastname`)}
      />
      <Button variant="primary" className="custom-button" type="submit">
        Submit
      </Button>
    </Row>
  );
  const Step2 = () => (
    <Row>
      {/* Test of English or French Proficiency Form Fields */}
      // ...
    </Row>
  );
  const Step3 = () => (
    <Row>
      {/* Education and Employment Profile Form Fields */}
      // ...
    </Row>
  );
  const Step4 = () => (
    <Row>
      {/* Spouse and Dependents Children Information Form Fields */}
      // ...
    </Row>
  );
  const Step5 = () => (
    <Row>
      {/* Others Form Fields */}
      // ...
    </Row>
  );
  const steps = [
    <Step1 key="step1" />,
    <Step2 key="step2" />,
    <Step3 key="step3" />,
    <Step4 key="step4" />,
    <Step5 key="step5" />,
  ];

  return (
    <main className="flex min-h-screen flex-col p-12 libre-franklin min-w-[90vw] sm:min-w-[60vw]">
      <h1 className="font-bold text-xl blue-text">Fill this form carefully</h1>
      <Container fluid className="mt-4 formContainer">
        <motion.div
          key={currentStep}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          variants={variants}
          initial="exit"
          animate="enter"
          exit="exit"
        >
          <form onSubmit={handleSubmit(onSubmit)}>{steps[currentStep]}</form>
        </motion.div>
        <div className="mt-4 flex flex-row justify-center">
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
