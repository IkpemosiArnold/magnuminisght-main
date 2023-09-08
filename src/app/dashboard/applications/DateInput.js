// DateInput.js
import React from "react";
import { Controller } from "react-hook-form";
import Form from "react-bootstrap/Form";

export default function DateInput({
  labelText,
  controlName,
  control,
  errors,
  cssClasses,
}) {
  return (
    <Form.Group className={cssClasses ? cssClasses : ""}>
      <Form.Label className="mt-4">{labelText}</Form.Label>
      <Controller
        name={controlName}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Form.Control
            {...field}
            type="date"
            isInvalid={!!errors[controlName]}
            className="textInputs"
          />
        )}
      />
      {errors && errors[controlName] && (
        <Form.Control.Feedback type="invalid">
          {errors[controlName].message}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
}
