"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import FormInputGroup from "../FormInputGroup";
import RadioButtonGroup from "../RadioInputGroup";
import DateInput from "../DateInput";
// Form validation
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useStore } from "../../../store/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { expressentrySubmit } from "../../../apiCalls/apiCalls";

export default function Express() {
  const { formResponse } = useStore();
  const variants = {
    exit: { opacity: 0, x: "-100vw" },
    enter: { opacity: 1, x: "0" },
  };

  useEffect(() => {
    if (
      JSON.stringify(formResponse) !== "{}" ||
      Object.keys(formResponse).length !== 0
    ) {
      toast(`${formResponse}`); // Toast the data
      if (formResponse == "Successful") {
        useStore.getState().setFormResponse({});
        router.push("/dashboard");
      }
    }
  }, [formResponse]);
  ////YUP SCHEMA------------------------
  const schema = yup
    .object({
      first_name: yup.string().required(),
      last_name: yup.string().required(),
      email: yup
        .string()
        .email("Must be a valid email address")
        .required("Email is required"),
      confirmEmail: yup
        .string()
        .oneOf([yup.ref("email"), null], "Emails must match")
        .required("Confirm Email is required"),
      birth_date: yup.date().required("Date of birth is required").nullable(),
      place_of_birth: yup.string().required("Place of birth is required"),
      gender: yup
        .string()
        .oneOf(["Male", "Female"], "Gender is required")
        .required(),
      country_of_citizenship: yup
        .string()
        .required("Country of Citizenship is required"),
      country_of_citizenship: yup
        .string()
        .required("Country of Residence is required"),
      valid_passport: yup
        .string()
        .oneOf(["Yes", "No"], "Answer is required")
        .required(),
      passport_exp_date: yup.date().when("valid_passport", {
        is: "Yes",
        then: () => yup.date().nullable(),
      }),
      ielts: yup.string().oneOf(["Yes", "No"], "Answer is required").required(),
      ielts_test_date: yup.date().when("ielts", {
        is: "Yes",
        then: () => yup.date().nullable().required("Test date is required"),
      }),
      ielts_score_writing: yup.string().when("ielts", {
        is: "Yes",
        then: () => yup.string().required("Writing score is required"),
      }),
      ielts_score_speaking: yup.string().when("ielts", {
        is: "Yes",
        then: () => yup.string().required("Speaking score is required"),
      }),
      ielts_score_listening: yup.string().when("ielts", {
        is: "Yes",
        then: () => yup.string().required("Listening score is required"),
      }),
      ielts_score_reading: yup.string().when("ielts", {
        is: "Yes",
        then: () => yup.string().required("Reading score is required"),
      }),
      ielts_test_type: yup.string().when("ielts", {
        is: "Yes",
        then: () =>
          yup
            .string()
            .oneOf(["General", "Academic"], "Selection is required")
            .required("Test type is required"),
      }),
      other_language: yup
        .string()
        .oneOf(["Yes", "No"], "Answer is required")
        .required(),
      other_language_results: yup.string().when("other_language", {
        is: "Yes",
        then: () => yup.string().required("Please indicate"),
      }),
      education_level: yup.string().required("This field is required"),
      country_of_study: yup.string().required("This field is required"),
      current_profession: yup.string().required("This field is required"),
      current_job: yup.string().required("This field is required"),
      years_work_experience: yup
        .number()
        .required("This field is required")
        .positive()
        .integer(),
      wes_evaluation_credential: yup
        .string()
        .oneOf(["Yes", "No"], "Answer is required")
        .required(),
      wes_date: yup.date().when("wes_evaluation_credential", {
        is: "Yes",
        then: () => yup.date().nullable().required("Date is required"),
      }),
      marital_status: yup
        .string()
        .oneOf(["Single", "Married", "Divorced", "Widowed", "Separated"])
        .required(),

      spouse_dob: yup.date().when("marital_status", {
        is: (value) => value !== "Single",
        then: (schema) => schema.required("Spouse date of birth is required"),
      }),

      spouse_country_of_res: yup.string().when("marital_status", {
        is: (value) => value !== "Single",
        then: (schema) =>
          schema.required("Spouse country of residence is required"),
      }),

      spouse_country_of_citizenship: yup.string().when("marital_status", {
        is: (value) => value !== "Single",
        then: (schema) =>
          schema.required("Spouse country of citizenship is required"),
      }),

      spouse_education_level: yup.string().when("marital_status", {
        is: (value) => value !== "Single",
        then: (schema) => schema.required("Spouse education level is required"),
      }),

      spouseLanguageTestTaken: yup
        .string()
        .oneOf(["Yes", "No"])
        .when("marital_status", {
          is: (value) => value !== "Single",
          then: (schema) =>
            schema.required("Indicate if spouse took a language test"),
        }),

      spouse_ielts_test_type: yup
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
      dependent_kids: yup.string().oneOf(["Yes", "No"]).required(),

      no_of_kids: yup.number().when("dependent_kids", {
        is: "Yes",
        then: (schema) => schema.required("Required"),
      }),
      relative_in_canada: yup
        .string()
        .oneOf(["Yes", "No"])
        .required("Please specify if you have a relative or friend in Canada"),
      nature_of_relationship: yup.string().when("relative_in_canada", {
        is: "Yes",
        then: () =>
          yup.string().required("Nature of the relationship is required"),
      }),
      province_in_canada: yup.string().when("relative_in_canada", {
        is: true,
        then: () => yup.string().required("Province of residence is required"),
      }),
      spouse_nomination_cert: yup
        .string()
        .oneOf(["Yes", "No"])
        .required("Please specify if you have a nomination certificate"),
      normination_recieved_date: yup.date().when("spouse_nomination_cert", {
        is: "Yes",
        then: () => yup.date().required("Nomination received date is required"),
      }),

      createdAt: yup.date().default(() => new Date()),
      source_of_income: yup.string().required("This field is required"),
      about_us_referral: yup.string().required("This field is required"),
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
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 10); // convert to format `YYYY-MM-DD`
  };
  const workPermitApply = (data) => {
    const fieldsToConvert = [
      "birth_date",
      "passport_exp_date",
      "wes_date",
      "spouse_dob",
      "normination_recieved_date",
      "ielts_test_date",
      "createdAt",
    ]; // add here all dates fields you need to convert

    const formattedData = { ...data };

    fieldsToConvert.forEach((field) => {
      if (formattedData[field]) {
        formattedData[field] = formatDate(formattedData[field]);
      }
    });

    console.log(formattedData);
    expressentrySubmit(formattedData);
  };
  const goToNextStep = () => setCurrentStep((step) => step + 1);
  const goToPreviousStep = () => setCurrentStep((step) => step - 1);

  const Step1 = () => (
    <>
      <h3 className=" text-center text-2xl blue-text font-medium">
        Personal Information
      </h3>
      <Row className="flex flex-wrap">
        {/* Personal Information Form Fields */}
        <FormInputGroup
          labelText="Firstname"
          controlName="first_name"
          placeholder="Enter your firstname"
          errors={errors}
          control={control}
          cssClasses="w-full sm:w-1/2"
        />
        <FormInputGroup
          labelText="Lastname"
          controlName="last_name"
          placeholder="Enter your lastname"
          errors={errors}
          control={control}
          cssClasses="w-full sm:w-1/2"
        />
        <FormInputGroup
          labelText="Email Address"
          controlName="email"
          placeholder="Enter your email address"
          errors={errors}
          control={control}
          type="email"
          cssClasses="w-full sm:w-1/2"
        />
        <FormInputGroup
          labelText="Confirm your Email Address"
          controlName="confirmEmail"
          placeholder="Confirm your email address"
          errors={errors}
          control={control}
          type="email"
          cssClasses="w-full sm:w-1/2"
        />
        <DateInput
          labelText="Please Enter your Date of Birth"
          controlName="birth_date"
          control={control}
          errors={errors}
          cssClasses="w-full sm:w-1/2"
        />
        <FormInputGroup
          labelText="Place of Birth"
          controlName="place_of_birth"
          control={control}
          errors={errors}
          cssClasses="w-full sm:w-1/2"
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
          controlName="country_of_citizenship"
          placeholder="Enter your Country of Citizenship"
          errors={errors}
          control={control}
          cssClasses="w-full sm:w-1/2"
        />
        <FormInputGroup
          labelText="Country of Residence"
          controlName="country_of_res"
          placeholder="Enter your Country of Residence"
          errors={errors}
          control={control}
          cssClasses="w-full sm:w-1/2"
        />
        <RadioButtonGroup
          labelText="Do you have a valid passport?"
          options={[
            { label: "Yes", value: "Yes" },
            { label: "No", value: "No" },
          ]}
          controlName="valid_passport"
          control={control}
          errors={errors}
        />
        {watch("valid_passport") === "Yes" && (
          <DateInput
            labelText="Expiration date"
            controlName="passport_exp_date"
            control={control}
            errors={errors}
          />
        )}
      </Row>
    </>
  );
  const Step2 = () => (
    <>
      <h3 className=" text-center text-2xl blue-text font-medium mb-4">
        Test of English or French Proficiency Form Fields
      </h3>
      <Row className="flex flex-wrap">
        {/* Test of English or French Proficiency Form Fields */}

        <RadioButtonGroup
          labelText="Have you taken the International English Language Testing System (IELTS)?"
          options={[
            { label: "Yes", value: "Yes" },
            { label: "No", value: "No" },
          ]}
          controlName="ielts"
          control={control}
          errors={errors}
        />
        {watch("ielts") === "Yes" && (
          <>
            <DateInput
              labelText="Kindly provide your test date"
              controlName="ielts_test_date"
              control={control}
              errors={errors}
              cssClasses="w-full sm:w-1/2"
            />
            <FormInputGroup
              labelText="Writing Score"
              controlName="ielts_score_writing"
              control={control}
              errors={errors}
              type="number"
              cssClasses="w-full sm:w-1/2"
            />
            <FormInputGroup
              labelText="Speaking Score"
              controlName="ielts_score_speaking"
              control={control}
              errors={errors}
              type="number"
              cssClasses="w-full sm:w-1/2"
            />
            <FormInputGroup
              labelText="Listening Score"
              controlName="ielts_score_listening"
              control={control}
              errors={errors}
              type="number"
              cssClasses="w-full sm:w-1/2"
            />
            <FormInputGroup
              labelText="Reading Score"
              controlName="ielts_score_reading"
              control={control}
              errors={errors}
              type="number"
              cssClasses="w-full sm:w-1/2"
            />
            <RadioButtonGroup
              labelText="Which test type did you take?"
              options={[
                { label: "General", value: "General" },
                { label: "Academic", value: "Academic" },
              ]}
              controlName="ielts_test_type"
              control={control}
              errors={errors}
              cssClasses="w-full sm:w-1/2"
            />
          </>
        )}
        <RadioButtonGroup
          labelText="Do you have other language results?"
          options={[
            { label: "Yes", value: "Yes" },
            { label: "No", value: "No" },
          ]}
          controlName="other_language"
          control={control}
          errors={errors}
          cssClasses="w-full sm:w-1/2"
        />
        {watch("other_language_results") === "Yes" && (
          <FormInputGroup
            labelText="Kindly Indicate"
            controlName="other_language_results"
            control={control}
            errors={errors}
            cssClasses="w-full sm:w-1/2"
          />
        )}
      </Row>
    </>
  );
  const Step3 = () => (
    <>
      <h3 className=" text-center text-2xl blue-text font-medium mb-4">
        Education and Employment Profile Form Fields
      </h3>
      <Row className="flex flex-wrap">
        {/* Education and Employment Profile Form Fields */}

        <FormInputGroup
          labelText="Highest Level of Education"
          controlName="education_level"
          placeholder="Enter your highest level of education"
          errors={errors}
          control={control}
          cssClasses="w-full sm:w-1/2"
        />
        <FormInputGroup
          labelText="Country of attained Highest Degree"
          controlName="country_of_study"
          placeholder="Enter country you earned your highest degree"
          errors={errors}
          control={control}
          cssClasses="w-full sm:w-1/2"
        />
        <FormInputGroup
          labelText="Current Profession"
          controlName="current_profession"
          placeholder="Enter your current profession"
          errors={errors}
          control={control}
          cssClasses="w-full sm:w-1/2"
        />
        <FormInputGroup
          labelText="Current Job Title"
          controlName="current_job"
          placeholder="Enter your current job title"
          errors={errors}
          control={control}
          cssClasses="w-full sm:w-1/2"
        />
        <FormInputGroup
          labelText="Number of years of work experience"
          controlName="years_work_experience"
          placeholder="Enter number of years of your work experience"
          type="number"
          errors={errors}
          control={control}
          cssClasses="w-full sm:w-1/2"
        />
        <RadioButtonGroup
          labelText="Have you evaluated your transcript with World Education Services (WES) or any other similar credential evaluation services?"
          options={[
            { label: "Yes", value: "Yes" },
            { label: "No", value: "No" },
          ]}
          controlName="wes_evaluation_credential"
          control={control}
          errors={errors}
          cssClasses="w-full sm:w-1/2"
        />
        {watch("wes_evaluation_credential") === "Yes" && (
          <DateInput
            labelText="Evaluation Date"
            controlName="wes_date"
            control={control}
            errors={errors}
            cssClasses="w-full sm:w-1/2"
          />
        )}
      </Row>
    </>
  );
  const Step4 = () => (
    <>
      <h3 className=" text-center text-2xl blue-text font-medium mb-4">
        {`  Spouse and Dependent Children’s Information`}
      </h3>
      <Row className="flex flex-wrap">
        <RadioButtonGroup
          labelText="Marital Status"
          controlName="marital_status"
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
          cssClasses="w-full sm:w-1/2"
        />

        {watch("marital_status") !== "Single" &&
          watch("marital_status") != undefined && (
            <>
              <DateInput
                labelText="Spouse Date of Birth"
                controlName="spouse_dob"
                control={control}
                errors={errors}
                cssClasses="w-full sm:w-1/2"
              />

              <FormInputGroup
                labelText="Spouse Country of Residence"
                controlName="spouse_country_of_res"
                control={control}
                errors={errors}
                cssClasses="w-full sm:w-1/2"
              />

              <FormInputGroup
                labelText="Spouse Country of Citizenship"
                controlName="spouse_country_of_citizenship"
                control={control}
                errors={errors}
                cssClasses="w-full sm:w-1/2"
              />

              <RadioButtonGroup
                labelText="Spouse Education Level"
                controlName="spouse_education_level"
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
                cssClasses="w-full sm:w-1/2"
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
                cssClasses="w-full sm:w-1/2"
              />

              {watch("spouseLanguageTestTaken") === "Yes" && (
                <>
                  <RadioButtonGroup
                    labelText="Spouse Language Test Type"
                    controlName="spouse_ielts_test_type"
                    options={[
                      { value: "General", label: "General" },
                      { value: "Academic", label: "Academic" },
                    ]}
                    placeholder="Select Test Type"
                    control={control}
                    errors={errors}
                    cssClasses="w-full sm:w-1/2"
                  />

                  <FormInputGroup
                    labelText="Spouse Writing Score"
                    controlName="ielts_spouse_writing"
                    type="number"
                    control={control}
                    errors={errors}
                    cssClasses="w-full sm:w-1/2"
                  />

                  <FormInputGroup
                    labelText="Spouse Speaking Score"
                    controlName="ielts_spouse_speaking"
                    type="number"
                    control={control}
                    errors={errors}
                    cssClasses="w-full sm:w-1/2"
                  />

                  <FormInputGroup
                    labelText="Spouse Listening Score"
                    controlName="ielts_spouse_listening"
                    type="number"
                    control={control}
                    errors={errors}
                    cssClasses="w-full sm:w-1/2"
                  />

                  <FormInputGroup
                    labelText="Spouse Reading Score"
                    controlName="ielts_spouse_reading"
                    type="number"
                    control={control}
                    errors={errors}
                    cssClasses="w-full sm:w-1/2"
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
          controlName="dependent_kids"
          control={control}
          errors={errors}
          cssClasses="w-full sm:w-1/2"
        />

        {watch("dependent_kids") === "Yes" &&
          watch("dependent_kids") != undefined && (
            <FormInputGroup
              labelText="Number of dependent children"
              controlName="no_of_kids"
              type="number"
              control={control}
              errors={errors}
              cssClasses="w-full sm:w-1/2"
            />
          )}

        <RadioButtonGroup
          labelText="Do you have a relative or friend in Canada?"
          options={[
            { label: "Yes", value: "Yes" },
            { label: "No", value: "No" },
          ]}
          controlName="relative_in_canada"
          control={control}
          errors={errors}
          cssClasses="w-full sm:w-1/2"
        />

        {watch("relative_in_canada") === "Yes" &&
          watch("relative_in_canada") != undefined && (
            <>
              <FormInputGroup
                labelText="Relationship to Canadian resident"
                controlName="nature_of_relationship"
                control={control}
                errors={errors}
                cssClasses="w-full sm:w-1/2"
              />

              <FormInputGroup
                labelText="Province of residence of relative/friend"
                controlName="province_in_canada"
                control={control}
                errors={errors}
                cssClasses="w-full sm:w-1/2"
              />
            </>
          )}

        <RadioButtonGroup
          labelText="Do you have a nomination certificate?"
          options={[
            { label: "Yes", value: "Yes" },
            { label: "No", value: "No" },
          ]}
          controlName="spouse_nomination_cert"
          control={control}
          errors={errors}
          cssClasses="w-full sm:w-1/2"
        />

        {watch("spouse_nomination_cert") === "Yes" &&
          watch("spouse_nomination_cert") != undefined && (
            <DateInput
              labelText="Nomination Certificate Received Date"
              controlName="normination_recieved_date"
              control={control}
              errors={errors}
              cssClasses="w-full sm:w-1/2"
            />
          )}
      </Row>
    </>
  );
  const Step5 = () => (
    <Row>
      {/* Others Form Fields */}

      <FormInputGroup
        labelText="Where did you hear about us ?"
        controlName="about_us_referral"
        control={control}
        errors={errors}
        cssClasses="w-full sm:w-1/2"
      />
      <FormInputGroup
        labelText="What is your current source of Income?"
        controlName="source_of_income"
        control={control}
        errors={errors}
        cssClasses="w-full sm:w-1/2"
      />
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
        <ToastContainer />
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
