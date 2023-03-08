import React, { useState } from 'react';

export default function Form(props) {
  const { form, onSubmit, onChange } = props;
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    form.inputValue >= 0
      ? onSubmit()
      : alert('Количество пройденных километров не может быть отрицательным!');
  };

  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <div className="form">
          <div className="formDate">
            <label htmlFor="inputDate">Дата (ДД.ММ.ГГ)</label>
            <input
              name="inputDate"
              type="date"
              value={form.inputDate}
              onChange={handleChange}
            />
          </div>
          <div className="formValue">
            <label htmlFor="inputValue">Пройдено (км)</label>
            <input
              name="inputValue"
              type="number"
              value={form.inputValue}
              onChange={handleChange}
              step="0.1"
            />
          </div>
          <div>
            <button type="submit">OK</button>
          </div>
        </div>
      </form>
    </>
  );
}
