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
  ////YUP SCHEMA------------------------
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
      countryOfCitizenship: yup
        .string()
        .required("Country of Citizenship is required"),
      countryOfResidence: yup
        .string()
        .required("Country of Residence is required"),
      hasValidPassport: yup
        .string()
        .oneOf(["Yes", "No"], "Answer is required")
        .required(),
      expirationDate: yup.date().when("hasValidPassport", {
        is: "Yes",
        then: () => yup.date().nullable(),
      }),
      isIELTSTaken: yup
        .string()
        .oneOf(["Yes", "No"], "Answer is required")
        .required(),
      testDate: yup.date().when("isIELTSTaken", {
        is: "Yes",
        then: () => yup.date().nullable().required("Test date is required"),
      }),
      writingScore: yup.string().when("isIELTSTaken", {
        is: "Yes",
        then: () => yup.string().required("Writing score is required"),
      }),
      speakingScore: yup.string().when("isIELTSTaken", {
        is: "Yes",
        then: () => yup.string().required("Speaking score is required"),
      }),
      listeningScore: yup.string().when("isIELTSTaken", {
        is: "Yes",
        then: () => yup.string().required("Listening score is required"),
      }),
      readingScore: yup.string().when("isIELTSTaken", {
        is: "Yes",
        then: () => yup.string().required("Reading score is required"),
      }),
      testType: yup.string().when("isIELTSTaken", {
        is: "Yes",
        then: () =>
          yup
            .string()
            .oneOf(["General", "Academic"], "Selection is required")
            .required("Test type is required"),
      }),
      isOtherLanguageResults: yup
        .string()
        .oneOf(["Yes", "No"], "Answer is required")
        .required(),
      languageResults: yup.string().when("isOtherLanguageResults", {
        is: "Yes",
        then: () => yup.string().required("Please indicate"),
      }),
      highestLevelOfEducation: yup.string().required("This field is required"),
      earnedHighestDegreeCountry: yup
        .string()
        .required("This field is required"),
      currentProfession: yup.string().required("This field is required"),
      currentJobTitle: yup.string().required("This field is required"),
      yearsOfWorkExperience: yup
        .number()
        .required("This field is required")
        .positive()
        .integer(),
      hasCredentialEvaluation: yup
        .string()
        .oneOf(["Yes", "No"], "Answer is required")
        .required(),
      credentialEvaluationDate: yup.date().when("hasCredentialEvaluation", {
        is: "Yes",
        then: () => yup.date().nullable().required("Date is required"),
      }),
      maritalStatus: yup
        .string()
        .oneOf(["Single", "Married", "Divorced", "Widowed", "Separated"])
        .required(),

      spouseDateOfBirth: yup.date().when("maritalStatus", {
        is: (value) => value !== "Single",
        then: (schema) => schema.required("Spouse date of birth is required"),
      }),

      spouseCountryOfResidence: yup.string().when("maritalStatus", {
        is: (value) => value !== "Single",
        then: (schema) =>
          schema.required("Spouse country of residence is required"),
      }),

      spouseCountryOfCitizenship: yup.string().when("maritalStatus", {
        is: (value) => value !== "Single",
        then: (schema) =>
          schema.required("Spouse country of citizenship is required"),
      }),

      spouseEducationLevel: yup.string().when("maritalStatus", {
        is: (value) => value !== "Single",
        then: (schema) => schema.required("Spouse education level is required"),
      }),

      spouseLanguageTestTaken: yup
        .string()
        .oneOf(["Yes", "No"])
        .when("maritalStatus", {
          is: (value) => value !== "Single",
          then: (schema) =>
            schema.required("Indicate if spouse took a language test"),
        }),

      spouseLanguageTestType: yup
        .string()
        .when("spouseLanguageTestTaken", {
          is: "Yes",
          then: (schema) => schema.required("Spouse test type is required"),
        })
        .oneOf(["General", "Academic"]),

      spouseLanguageTestScores: yup.object().shape({
        writing: yup.number().when("spouseLanguageTestTaken", {
          is: "Yes",
          then: (schema) => schema.required("Writing score is required"),
        }),
        speaking: yup.number().when("spouseLanguageTestTaken", {
          is: "Yes",
          then: (schema) => schema.required("Speaking score is required"),
        }),
        listening: yup.number().when("spouseLanguageTestTaken", {
          is: "Yes",
          then: (schema) => schema.required("Listening score is required"),
        }),
        reading: yup.number().when("spouseLanguageTestTaken", {
          is: "Yes",
          then: (schema) => schema.required("Reading score is required"),
        }),
      }),
      dependentKids: yup.string().oneOf(["Yes", "No"]).required(),

      numberOfKids: yup.number().when("dependentKids", {
        is: "Yes",
        then: (schema) => schema.required("Required"),
      }),
      hasCanadianRelativeOrFriend: yup
        .string()
        .oneOf(["Yes", "No"])
        .required("Please specify if you have a relative or friend in Canada"),
      relationshipWithCanadianRelativeOrFriend: yup
        .string()
        .when("hasCanadianRelativeOrFriend", {
          is: "Yes",
          then: () =>
            yup.string().required("Nature of the relationship is required"),
        }),
      provinceOfResidenceOfRelativeOrFriend: yup
        .string()
        .when("hasCanadianRelativeOrFriend", {
          is: true,
          then: () =>
            yup.string().required("Province of residence is required"),
        }),
      hasNominationCertificate: yup
        .string()
        .oneOf(["Yes", "No"])
        .required("Please specify if you have a nomination certificate"),
      nominationReceivedDate: yup.date().when("hasNominationCertificate", {
        is: "Yes",
        then: () => yup.date().required("Nomination received date is required"),
      }),
    })
    .required();

  const [currentStep, setCurrentStep] = useState(0);

  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
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
      <FormInputGroup
        labelText="Country of Citizenship"
        controlName="CountryofCitizenship"
        placeholder="Enter your Country of Citizenship"
        errors={errors}
        control={control}
      />
      <FormInputGroup
        labelText="Country of Residence"
        controlName="CountryofResidence"
        placeholder="Enter your Country of Residence"
        errors={errors}
        control={control}
      />
      <RadioButtonGroup
        labelText="Do you have a valid passport?"
        options={[
          { label: "Yes", value: "Yes" },
          { label: "No", value: "No" },
        ]}
        controlName="hasValidPassport"
        control={control}
        errors={errors}
      />
      {watch("hasValidPassport") === "Yes" && (
        <DateInput
          labelText="Expiration date"
          controlName="expirationDate"
          control={control}
          errors={errors}
        />
      )}
    </Row>
  );
  const Step2 = () => (
    <Row>
      {/* Test of English or French Proficiency Form Fields */}
      <h3 className=" text-center text-2xl blue-text font-medium mb-4">
        Test of English or French Proficiency Form Fields
      </h3>

      <RadioButtonGroup
        labelText="Have you taken the International English Language Testing System (IELTS)?"
        options={[
          { label: "Yes", value: "Yes" },
          { label: "No", value: "No" },
        ]}
        controlName="isIELTSTaken"
        control={control}
        errors={errors}
      />
      {watch("isIELTSTaken") === "Yes" && (
        <>
          <DateInput
            labelText="Kindly provide your test date"
            controlName="testDate"
            control={control}
            errors={errors}
          />
          <FormInputGroup
            labelText="Writing Score"
            controlName="writingScore"
            control={control}
            errors={errors}
          />
          <FormInputGroup
            labelText="Speaking Score"
            controlName="speakingScore"
            control={control}
            errors={errors}
          />
          <FormInputGroup
            labelText="Listening Score"
            controlName="listeningScore"
            control={control}
            errors={errors}
          />
          <FormInputGroup
            labelText="Reading Score"
            controlName="readingScore"
            control={control}
            errors={errors}
          />
          <RadioButtonGroup
            labelText="Which test type did you take?"
            options={[
              { label: "General", value: "General" },
              { label: "Academic", value: "Academic" },
            ]}
            controlName="testType"
            control={control}
            errors={errors}
          />
          <RadioButtonGroup
            labelText="Do you have other language results?"
            options={[
              { label: "Yes", value: "Yes" },
              { label: "No", value: "No" },
            ]}
            controlName="isOtherLanguageResults"
            control={control}
            errors={errors}
          />
          {watch("isOtherLanguageResults") === "Yes" && (
            <FormInputGroup
              labelText="Kindly Indicate"
              controlName="languageResults"
              control={control}
              errors={errors}
            />
          )}
        </>
      )}
    </Row>
  );
  const Step3 = () => (
    <Row>
      {/* Education and Employment Profile Form Fields */}
      <h3 className=" text-center text-2xl blue-text font-medium mb-4">
        Education and Employment Profile Form Fields
      </h3>
      <FormInputGroup
        labelText="Highest Level of Education"
        controlName="highestLevelOfEducation"
        placeholder="Enter your highest level of education"
        errors={errors}
        control={control}
      />
      <FormInputGroup
        labelText="Country of attained Highest Degree"
        controlName="earnedHighestDegreeCountry"
        placeholder="Enter country you earned your highest degree"
        errors={errors}
        control={control}
      />
      <FormInputGroup
        labelText="Current Profession"
        controlName="currentProfession"
        placeholder="Enter your current profession"
        errors={errors}
        control={control}
      />
      <FormInputGroup
        labelText="Current Job Title"
        controlName="currentJobTitle"
        placeholder="Enter your current job title"
        errors={errors}
        control={control}
      />
      <FormInputGroup
        labelText="Number of years of work experience"
        controlName="yearsOfWorkExperience"
        placeholder="Enter number of years of your work experience"
        type="number"
        errors={errors}
        control={control}
      />
      <RadioButtonGroup
        labelText="Have you evaluated your transcript with World Education Services (WES) or any other similar credential evaluation services?"
        options={[
          { label: "Yes", value: "Yes" },
          { label: "No", value: "No" },
        ]}
        controlName="hasCredentialEvaluation"
        control={control}
        errors={errors}
      />
      {watch("hasCredentialEvaluation") === "Yes" && (
        <DateInput
          labelText="Evaluation Date"
          controlName="credentialEvaluationDate"
          control={control}
          errors={errors}
        />
      )}
    </Row>
  );
  const Step4 = () => (
    <Row>
      <h3 className=" text-center text-2xl blue-text font-medium mb-4">
        {`  Spouse and Dependent Children’s Information`}
      </h3>

      <RadioButtonGroup
        labelText="Marital Status"
        controlName="maritalStatus"
        options={[
          { value: "Single", label: "Single" },
          { value: "Married", label: "Married" },
          { value: "Divorced", label: "Divorced" },
          { value: "Widowed", label: "Widowed" },
          { value: "Separated", label: "Separated" },
        ]}
        placeholder="Select Marital Status"
        control={control}
        errors={errors}
      />

      {watch("maritalStatus") !== "Single" &&
        watch("maritalStatus") != undefined && (
          <>
            <DateInput
              labelText="Spouse Date of Birth"
              controlName="spouseDateOfBirth"
              control={control}
              errors={errors}
            />

            <FormInputGroup
              labelText="Spouse Country of Residence"
              controlName="spouseCountryOfResidence"
              control={control}
              errors={errors}
            />

            <FormInputGroup
              labelText="Spouse Country of Citizenship"
              controlName="spouseCountryOfCitizenship"
              control={control}
              errors={errors}
            />

            <RadioButtonGroup
              labelText="Spouse Education Level"
              controlName="spouseEducationLevel"
              options={[
                { value: "High School", label: "High School" },
                { value: "College", label: "College" },
                { value: "Bachelors", label: "Bachelors" },
                { value: "Masters", label: "Masters" },
                { value: "PhD", label: "PhD" },
              ]}
              placeholder="Select Education Level"
              control={control}
              errors={errors}
            />

            <RadioButtonGroup
              labelText="Has your spouse taken a language test?"
              options={[
                { label: "Yes", value: "Yes" },
                { label: "No", value: "No" },
              ]}
              controlName="spouseLanguageTestTaken"
              control={control}
              errors={errors}
            />

            {watch("spouseLanguageTestTaken") === "Yes" && (
              <>
                <RadioButtonGroup
                  labelText="Spouse Language Test Type"
                  controlName="spouseLanguageTestType"
                  options={[
                    { value: "General", label: "General" },
                    { value: "Academic", label: "Academic" },
                  ]}
                  placeholder="Select Test Type"
                  control={control}
                  errors={errors}
                />

                <FormInputGroup
                  labelText="Spouse Writing Score"
                  controlName="spouseLanguageTestScores.writing"
                  type="number"
                  control={control}
                  errors={errors}
                />

                <FormInputGroup
                  labelText="Spouse Speaking Score"
                  controlName="spouseLanguageTestScores.speaking"
                  type="number"
                  control={control}
                  errors={errors}
                />

                <FormInputGroup
                  labelText="Spouse Listening Score"
                  controlName="spouseLanguageTestScores.listening"
                  type="number"
                  control={control}
                  errors={errors}
                />

                <FormInputGroup
                  labelText="Spouse Reading Score"
                  controlName="spouseLanguageTestScores.reading"
                  type="number"
                  control={control}
                  errors={errors}
                />
              </>
            )}
          </>
        )}
      <RadioButtonGroup
        labelText="Do you have dependent children?"
        options={[
          { label: "Yes", value: "Yes" },
          { label: "No", value: "No" },
        ]}
        controlName="dependentKids"
        control={control}
        errors={errors}
      />

      {watch("dependentKids") === "Yes" &&
        watch("dependentKids") != undefined && (
          <FormInputGroup
            labelText="Number of dependent children"
            controlName="numberOfKids"
            type="number"
            control={control}
            errors={errors}
          />
        )}

      <RadioButtonGroup
        labelText="Do you have a relative or friend in Canada?"
        options={[
          { label: "Yes", value: "Yes" },
          { label: "No", value: "No" },
        ]}
        controlName="hasCanadianRelativeOrFriend"
        control={control}
        errors={errors}
      />

      {watch("hasCanadianRelativeOrFriend") === "Yes" &&
        watch("hasCanadianRelativeOrFriend") != undefined && (
          <>
            <FormInputGroup
              labelText="Relationship to Canadian resident"
              controlName="relationshipWithCanadianRelativeOrFriend"
              control={control}
              errors={errors}
            />

            <FormInputGroup
              labelText="Province of residence of relative/friend"
              controlName="provinceOfResidenceOfRelativeOrFriend"
              control={control}
              errors={errors}
            />
          </>
        )}

      <RadioButtonGroup
        labelText="Do you have a nomination certificate?"
        options={[
          { label: "Yes", value: "Yes" },
          { label: "No", value: "No" },
        ]}
        controlName="hasNominationCertificate"
        control={control}
        errors={errors}
      />

      {watch("hasNominationCertificate") === "Yes" &&
        watch("hasNominationCertificate") != undefined && (
          <DateInput
            labelText="Nomination Certificate Received Date"
            controlName="nominationReceivedDate"
            control={control}
            errors={errors}
          />
        )}
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
