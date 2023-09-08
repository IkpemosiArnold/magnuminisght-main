// RadioButtonGroup.js
import React from "react";
import { Controller } from "react-hook-form";
import Form from "react-bootstrap/Form";

export default function RadioButtonGroup({
  labelText,
  controlName,
  options,
  control,
  errors,
  cssClasses,
}) {
  return (
    <Form.Group className={cssClasses ? cssClasses : ""}>
      <Form.Label className="mt-4">{labelText}</Form.Label>
      {options.map((option) => (
        <Controller
          control={control}
          name={controlName}
          key={option.value}
          render={({ field }) => (
            <Form.Check
              id={`${controlName}${option.value}`}
              className="radiuButtons"
              type="radio"
              label={option.label}
              {...field}
              checked={field.value === option.value.toString()}
              value={option.value.toString()}
              isInvalid={!!errors[controlName]}
            />
          )}
        />
      ))}
      {errors && errors[controlName] && (
        <Form.Control.Feedback type="invalid">
          {errors[controlName].message}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
}
