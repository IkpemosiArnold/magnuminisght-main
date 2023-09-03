"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Container, Form, Row, Col, Button } from "react-bootstrap";

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

const Step1 = ({ formik }) => (
  <Row>
    <h3 className=" text-center text-2xl blue-text font-medium">
      Personal Information
    </h3>
    {/* Personal Information Form Fields */}
    <Form.Group as={Col} md={6} controlId="firstName">
      <Form.Label>First Name:</Form.Label>
      <Form.Control type="text" name="firstName" />
    </Form.Group>
    <Form.Group as={Col} md={6} controlId="lastName">
      <Form.Label>Last Name:</Form.Label>
      <Form.Control type="text" name="lastName" />
    </Form.Group>
  </Row>
);
const Step2 = ({ formik }) => (
  <Row>
    {/* Test of English or French Proficiency Form Fields */}
    // ...
  </Row>
);
const Step3 = ({ formik }) => (
  <Row>
    {/* Education and Employment Profile Form Fields */}
    // ...
  </Row>
);
const Step4 = ({ formik }) => (
  <Row>
    {/* Spouse and Dependents Children Information Form Fields */}
    // ...
  </Row>
);
const Step5 = ({ formik }) => (
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
const variants = {
  exit: { opacity: 0, x: "-100vw" },
  enter: { opacity: 1, x: "0" },
};
const validationSchema = Yup.object({
  lastName: Yup.string().required("Last Name is required"),
  firstName: Yup.string().required("First Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  confirmEmail: Yup.string()
    .oneOf([Yup.ref("email"), null], "Emails must match")
    .required("Confirm Email is required"),
  dob: Yup.date().required("Date of Birth is required"),
  placeOfBirth: Yup.string().required("Place of Birth is required"),
  gender: Yup.string().required("Gender is required"),
  countryOfCitizenship: Yup.string().required(
    "Country of Citizenship is required"
  ),
  countryOfResidence: Yup.string().required("Country of Residence is required"),
  hasValidPassport: Yup.boolean().required(),
  passportExpirationDate: Yup.date().when("hasValidPassport", {
    is: true,
    then: Yup.date().required("Passport Expiration Date is required"),
    otherwise: Yup.date(),
  }),
  hasTakenIELTS: Yup.boolean().required(),
  ieltsTestDate: Yup.date().when("hasTakenIELTS", {
    is: true,
    then: Yup.date().required("IELTS Test Date is required"),
    otherwise: Yup.date(),
  }),
  ieltsWritingScore: Yup.string().when("hasTakenIELTS", {
    is: true,
    then: Yup.string().required("Writing Score is required"),
    otherwise: Yup.string(),
  }),
  ieltsSpeakingScore: Yup.string().when("hasTakenIELTS", {
    is: true,
    then: Yup.string().required("Speaking Score is required"),
    otherwise: Yup.string(),
  }),
  ieltsListeningScore: Yup.string().when("hasTakenIELTS", {
    is: true,
    then: Yup.string().required("Listening Score is required"),
    otherwise: Yup.string(),
  }),
  ieltsReadingScore: Yup.string().when("hasTakenIELTS", {
    is: true,
    then: Yup.string().required("Reading Score is required"),
    otherwise: Yup.string(),
  }),
  hasOtherLanguageResults: Yup.boolean().required(),
  otherLanguageResults: Yup.string().when("hasOtherLanguageResults", {
    is: true,
    then: Yup.string().required("Other Language Results is required"),
    otherwise: Yup.string(),
  }),
  highestEducationLevel: Yup.string().required(
    "Highest Level of Education is required"
  ),
  countryOfDegree: Yup.string().required("Country of Degree is required"),
  currentProfession: Yup.string().required("Current Profession is required"),
  currentJobTitle: Yup.string().required("Current Job Title is required"),
  yearsOfWorkExperience: Yup.number()
    .typeError("Years of Work Experience must be a number")
    .required("Years of Work Experience is required"),
  hasEvaluatedTranscript: Yup.boolean().required(),
  transcriptEvaluationDate: Yup.date().when("hasEvaluatedTranscript", {
    is: true,
    then: Yup.date().required("Transcript Evaluation Date is required"),
    otherwise: Yup.date(),
  }),
  maritalStatus: Yup.string().required("Marital Status is required"),
  spouseDob: Yup.date().when("maritalStatus", {
    is: "Married",
    then: Yup.date().required("Spouse Date of Birth is required"),
    otherwise: Yup.date(),
  }),
  spouseCountryOfResidence: Yup.string().when("maritalStatus", {
    is: "Married",
    then: Yup.string().required("Spouse Country of Residence is required"),
    otherwise: Yup.string(),
  }),
  spouseCountryOfCitizenship: Yup.string().when("maritalStatus", {
    is: "Married",
    then: Yup.string().required("Spouse Country of Citizenship is required"),
    otherwise: Yup.string(),
  }),
  spouseHighestEducationLevel: Yup.string().when("maritalStatus", {
    is: "Married",
    then: Yup.string().required(
      "Spouse Highest Level of Education is required"
    ),
    otherwise: Yup.string(),
  }),
  spouseHasTakenLanguageTest: Yup.boolean().when("maritalStatus", {
    is: "Married",
    then: Yup.boolean().required(),
    otherwise: Yup.boolean(),
  }),
  spouseLanguageTestType: Yup.string().when("spouseHasTakenLanguageTest", {
    is: true,
    then: Yup.string().required("Spouse Language Test Type is required"),
    otherwise: Yup.string(),
  }),
  spouseWritingScore: Yup.string().when("spouseHasTakenLanguageTest", {
    is: true,
    then: Yup.string().required("Spouse Writing Score is required"),
    otherwise: Yup.string(),
  }),
  spouseSpeakingScore: Yup.string().when("spouseHasTakenLanguageTest", {
    is: true,
    then: Yup.string().required("Spouse Speaking Score is required"),
    otherwise: Yup.string(),
  }),
  spouseListeningScore: Yup.string().when("spouseHasTakenLanguageTest", {
    is: true,
    then: Yup.string().required("Spouse Listening Score is required"),
    otherwise: Yup.string(),
  }),
  spouseReadingScore: Yup.string().when("spouseHasTakenLanguageTest", {
    is: true,
    then: Yup.string().required("Spouse Reading Score is required"),
    otherwise: Yup.string(),
  }),
  hasDependentChildren: Yup.boolean().required(),
  numberOfDependentChildren: Yup.number()
    .typeError("Number of Dependent Children must be a number")
    .when("hasDependentChildren", {
      is: true,
      then: Yup.number().required("Number of Dependent Children is required"),
      otherwise: Yup.number(),
    }),
  hasCitizenOrPRRelative: Yup.boolean().required(),
  relativeNatureOfRelationship: Yup.string().when("hasCitizenOrPRRelative", {
    is: true,
    then: Yup.string().required("Nature of Relationship is required"),
    otherwise: Yup.string(),
  }),
  relativeProvinceOfResidence: Yup.string().when("hasCitizenOrPRRelative", {
    is: true,
    then: Yup.string().required("Relative Province of Residence is required"),
    otherwise: Yup.string(),
  }),
  hasNominationCertificate: Yup.boolean().required(),
  nominationReceivedDate: Yup.date().when("hasNominationCertificate", {
    is: true,
    then: Yup.date().required("Nomination Received Date is required"),
    otherwise: Yup.date(),
  }),
  preferredProvinceForSettlement: Yup.string().required(
    "Preferred Province for Settlement is required"
  ),
  sourceOfFunds: Yup.string().required("Source of Funds is required"),
  referralSource: Yup.string().required("Referral Source is required"),
  referredBy: Yup.string().when("referralSource", {
    is: "Referral",
    then: Yup.string().required("Referred By is required"),
    otherwise: Yup.string(),
  }),
  socialMediaSource: Yup.string().when("referralSource", {
    is: "Social Media",
    then: Yup.string().required("Social Media Source is required"),
    otherwise: Yup.string(),
  }),
});

const initialValues = {
  lastName: "",
  firstName: "",
  email: "",
  confirmEmail: "",
  dob: "",
  placeOfBirth: "",
  gender: "",
  countryOfCitizenship: "",
  countryOfResidence: "",
  hasValidPassport: false,
  passportExpirationDate: "",
  hasTakenIELTS: false,
  ieltsTestDate: "",
  ieltsWritingScore: "",
  ieltsSpeakingScore: "",
  ieltsListeningScore: "",
  ieltsReadingScore: "",
  hasOtherLanguageResults: false,
  otherLanguageResults: "",
  highestEducationLevel: "",
  countryOfDegree: "",
  currentProfession: "",
  currentJobTitle: "",
  yearsOfWorkExperience: "",
  hasEvaluatedTranscript: false,
  transcriptEvaluationDate: "",
  maritalStatus: "",
  spouseDob: "",
  spouseCountryOfResidence: "",
  spouseCountryOfCitizenship: "",
  spouseHighestEducationLevel: "",
  spouseHasTakenLanguageTest: false,
  spouseLanguageTestType: "",
  spouseWritingScore: "",
  spouseSpeakingScore: "",
  spouseListeningScore: "",
  spouseReadingScore: "",
  hasDependentChildren: false,
  numberOfDependentChildren: "",
  hasCitizenOrPRRelative: false,
  relativeNatureOfRelationship: "",
  relativeProvinceOfResidence: "",
  hasNominationCertificate: false,
  nominationReceivedDate: "",
  preferredProvinceForSettlement: "",
  sourceOfFunds: "",
  referralSource: "",
  referredBy: "",
  socialMediaSource: "",
};
export default function Workpermit() {
  const [currentStep, setCurrentStep] = useState(0);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const goToNextStep = () => setCurrentStep((step) => step + 1);
  const goToPreviousStep = () => setCurrentStep((step) => step - 1);
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
          {React.cloneElement(steps[currentStep], { formik })}
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
