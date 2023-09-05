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
}) {
  return (
    <>
      <Form.Label htmlFor={controlName}>{labelText}</Form.Label>
      <InputGroup className="mb-3" controlId={`formBasic${controlName}`}>
        <Controller
          name={controlName}
          render={({ field }) => (
            <div className="w-100">
              <Form.Control {...field} placeholder={placeholder} />
              {errors && errors[controlName] && (
                <p>{errors[controlName].message}</p>
              )}
            </div>
          )}
          control={control}
        />
      </InputGroup>
    </>
  );
}
