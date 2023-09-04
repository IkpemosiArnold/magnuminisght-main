// FormInputGroup.js
import React from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Col from "react-bootstrap/Col";

export default function FormInputGroup({
  labelText,
  controlName,
  placeholder,
  errors,
}) {
  return (
    <>
      <Form.Label htmlFor={controlName}>{labelText}</Form.Label>
      <InputGroup className="mb-3" controlid={`formBasic${controlName}`}>
        <Form.Control
          name={controlName}
          id={controlName}
          placeholder={placeholder}
        />
      </InputGroup>
      <p>{errors.controlName?.message}</p>
    </>
  );
}
