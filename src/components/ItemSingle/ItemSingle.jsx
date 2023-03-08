import React from 'react';
import moment from 'moment';

import ItemClass from '../ItemClass/ItemClass';

export default function ItemSingle(props) {
  const { date, value } = props.record;

  return (
    <>
      <tr>
        <td>{moment(date).format('DD.MM.YYYY')}</td>
        <td>{value.toFixed(1)}</td>
        <td>
          <span className="remove" onClick={props.onRemove}>
            X
          </span>
        </td>
      </tr>
    </>
  );
}
