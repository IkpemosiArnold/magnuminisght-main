// FormInputGroup.js
import React from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Controller } from "react-hook-form";

export default function FormInputGroup({
  labelText,
  controlName,
  placeholder,
  errors,
  control,
  type,
}) {
  return (
    <>
      <Form.Label className="mt-4" htmlFor={controlName}>
        {labelText}
      </Form.Label>
      <InputGroup controlid={`formBasic${controlName}`}>
        <Controller
          name={controlName}
          render={({ field }) => (
            <Form.Control
              {...field}
              placeholder={placeholder}
              type={type ? type : "text"}
              className="textInputs"
            />
          )}
          control={control}
          defaultValue=""
        />
      </InputGroup>
      {errors && errors[controlName] && (
        <div style={{ display: "block", color: "red" }}>
          <p>{errors[controlName].message}</p>
        </div>
      )}
    </>
  );
}
