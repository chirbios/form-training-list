import React, { useState } from 'react';

import ItemSingle from '../ItemSingle/ItemSingle';

// Универсальная функция сортировки элементов массива
// https://habr.com/ru/post/279867/
function compare(field, order) {
  var len = arguments.length;
  if (len === 0) {
    return (a, b) => (a < b && -1) || (a > b && 1) || 0;
  }
  if (len === 1) {
    switch (typeof field) {
      case 'number':
        return field < 0
          ? (a, b) => (a < b && 1) || (a > b && -1) || 0
          : (a, b) => (a < b && -1) || (a > b && 1) || 0;
      case 'string':
        return (a, b) =>
          (a[field] < b[field] && -1) || (a[field] > b[field] && 1) || 0;
    }
  }
  if (len === 2 && typeof order === 'number') {
    return order < 0
      ? (a, b) => (a[field] < b[field] && 1) || (a[field] > b[field] && -1) || 0
      : (a, b) =>
          (a[field] < b[field] && -1) || (a[field] > b[field] && 1) || 0;
  }
  var fields, orders;
  if (typeof field === 'object') {
    fields = Object.getOwnPropertyNames(field);
    orders = fields.map((key) => field[key]);
    len = fields.length;
  } else {
    fields = new Array(len);
    orders = new Array(len);
    for (let i = len; i--; ) {
      fields[i] = arguments[i];
      orders[i] = 1;
    }
  }
  return (a, b) => {
    for (let i = 0; i < len; i++) {
      if (a[fields[i]] < b[fields[i]]) return orders[i];
      if (a[fields[i]] > b[fields[i]]) return -orders[i];
    }
    return 0;
  };
}

export default function AllRecords(props) {
  const { records } = props;

  const handleRemove = (id) => {
    props.onRemove(id);
  };

  console.log(records);
  const sortedRecords = records.sort((a, b) => {
    console.log(Date.parse(a.date), Date.parse(b.date));
    if (Date.parse(a.date) < Date.parse(b.date)) return 1;
    return -1;
  });
  // const sortedRecords = records.sort(compare(Date.parse(props.date), -1));
  // const sortedRecords = records.sort((a, b) => (a < b && 1) || (a > b && -1) || 0)

  return (
    <>
      <table
        border="1"
        cellSpacing="0"
        cellPadding="2"
        className="Steps-records"
      >
        <thead>
          <tr>
            <th>Дата (ДД.ММ.ГГ)</th>
            <th>Пройдено (км)</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {sortedRecords.map((obj) => (
            <ItemSingle
              record={obj}
              onRemove={() => handleRemove(obj.id)}
              id={obj.id}
              key={obj.id}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}
