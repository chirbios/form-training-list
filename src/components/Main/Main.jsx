import React, { useState } from 'react';
import moment from 'moment';

import Form from '../Form/Form';
import ItemList from '../ItemList/ItemList';
import ItemClass from '../ItemClass/ItemClass';

function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [day, month, year].join('.');
}

// Онсовной компонент
export default function Main(props) {
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({ inputDate: '', inputValue: '' });

  const handleChange = (name, value) => {
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
    // console.log('>> ' + value);
  };

  const handleSubmit = () => {
    // const formattedDate = formatDate(form.inputDate);
    const momentDate = moment(form.inputDate, 'YYYY-MM-DD');
    if (!momentDate.isValid()) return;
    // const date = momentDate.format('DD.MM.YYYY');
    const date = momentDate.format('YYYY-MM-DD');
    console.log(date, form.inputValue);

    if (records.find((obj) => obj.date.valueOf() === date.valueOf())) {
      setRecords((prevRecords) =>
        prevRecords.map((obj) => {
          if (obj.date.valueOf() === date.valueOf())
            return new ItemClass(date, Number(form.inputValue) + obj.value);
          return obj;
        })
      );
    } else {
      setRecords((prevRecords) => [
        ...prevRecords,
        new ItemClass(date, Number(form.inputValue)),
      ]);
    }

    setForm({ inputDate: '', inputValue: '' });
  };

  const handleRemove = (id) => {
    setRecords((prevRecords) => prevRecords.filter((obj) => obj.id !== id));
  };

  return (
    <>
      <Form form={form} onChange={handleChange} onSubmit={handleSubmit} />
      <ItemList isChanged={false} records={records} onRemove={handleRemove} />
    </>
  );
}
