import React from 'react';
import { Form } from 'react-bootstrap';

export const InputField = ({
  label,
  name, // Например: "initialData.g1"
  formik,
  unit,
  type = "number",
  placeholder = "",
}) => {
  // Разбиваем путь на части (например "initialData.g1" → ["initialData", "g1"])
  const path = name.split('.');
  
  // Получаем значение с проверкой вложенности
  const value = path.reduce((obj, key) => obj?.[key], formik.values) ?? '';
  
  // Аналогично для ошибок и touched
  const error = path.reduce((obj, key) => obj?.[key], formik.errors);
  const touched = path.reduce((obj, key) => obj?.[key], formik.touched);

  return (
    <Form.Group as="div" className="mb-2 row g-3 align-items-center">
      <div className="col-6">
        <Form.Label>{label}</Form.Label>
      </div>
      <div className="col-4">
        <Form.Control
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={touched && !!error}
          className="form-control-sm"
        />
        <Form.Control.Feedback type="invalid">
          {error}
        </Form.Control.Feedback>
      </div>
      {unit && (
        <div className="col-2">
          <Form.Text className="text-muted">{unit}</Form.Text>
        </div>
      )}
    </Form.Group>
  );
};