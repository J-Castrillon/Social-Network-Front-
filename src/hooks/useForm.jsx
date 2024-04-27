import React, { useState } from "react";

export const useForm = (defaultObject = {}) => {
  const [form, setForm] = useState(defaultObject);

  const changes = ({ target }) => {
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  return {
    form,
    setForm,
    changes,
  };
};
