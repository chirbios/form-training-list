import React from 'react';
import { nanoid } from 'nanoid';

// Класс элемента таблицы записей
export default class ItemClass {
  constructor(date, value) {
    this.id = nanoid();
    this.date = date;
    this.value = value;
  }
}
