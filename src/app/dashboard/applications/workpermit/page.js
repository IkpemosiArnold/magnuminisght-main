"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import FormInputGroup from "../FormInputGroup";
import RadioButtonGroup from "../RadioInputGroup";
import DateInput from "../DateInput";

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
      email: yup
        .string()
        .email("Must be a valid email address")
        .required("Email is required"),
      confirmEmail: yup
        .string()
        .oneOf([yup.ref("email"), null], "Emails must match")
        .required("Confirm Email is required"),
      dateOfBirth: yup.date().required("Date of birth is required").nullable(),
      placeOfBirth: yup.string().required("Place of birth is required"),
      gender: yup
        .string()
        .oneOf(["Male", "Female"], "Gender is required")
        .required(),
    })
    .required();

  const [currentStep, setCurrentStep] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });
  const onError = (errors, e) => console.log(errors, e);

  const workPermitApply = (data) => {
    console.log(data);
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
        labelText="Firstname"
        controlName="Firstname"
        placeholder="Enter your firstname"
        errors={errors}
        control={control}
      />
      <FormInputGroup
        labelText="Lastname"
        controlName="Lastname"
        placeholder="Enter your lastname"
        errors={errors}
        control={control}
      />
      <FormInputGroup
        labelText="Email Address"
        controlName="email"
        placeholder="Enter your email address"
        errors={errors}
        control={control}
        type="email"
        className="col-md-6"
      />
      <FormInputGroup
        labelText="Confirm your Email Address"
        controlName="confirmEmail"
        placeholder="Confirm your email address"
        errors={errors}
        control={control}
        type="email"
        className="col-md-6"
      />
      <DateInput
        labelText="Please Enter your Date of Birth"
        controlName="dateOfBirth"
        control={control}
        errors={errors}
      />
      <FormInputGroup
        labelText="Place of Birth"
        controlName="placeOfBirth"
        control={control}
        errors={errors}
      />
      <RadioButtonGroup
        labelText="Gender"
        options={[
          { label: "Male", value: "Male" },
          { label: "Female", value: "Female" },
        ]}
        controlName="gender"
        control={control}
        errors={errors}
      />
    </Row>
  );
  const Step2 = () => (
    <Row>
      {/* Test of English or French Proficiency Form Fields */}
      <p>Test of English or French Proficiency Form Fields</p>
    </Row>
  );
  const Step3 = () => (
    <Row>
      {/* Education and Employment Profile Form Fields */}
      <p>Education and Employment Profile Form Fields</p>
    </Row>
  );
  const Step4 = () => (
    <Row>
      {/* Spouse and Dependents Children Information Form Fields */}
      <p>Spouse and Dependents Children Information Form Fields </p>
    </Row>
  );
  const Step5 = () => (
    <Row>
      {/* Others Form Fields */}
      <p>Others</p>
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
          <form onSubmit={handleSubmit(workPermitApply, onError)}>
            {steps[currentStep]}
            <Button
              variant="primary"
              className="custom-button mt-2"
              type="submit"
            >
              Submit
            </Button>
          </form>
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
