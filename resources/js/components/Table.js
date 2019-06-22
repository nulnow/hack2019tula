import React from 'react';

export default ({ data = [], filter = '', onEditOrSaveClick, editableItem }) => <table className="data-grid__data-table">
<tbody className="data-grid__data-table-tbody">
  {
    (data.length || null) && (
      <tr className="data-grid__data-table-tr">
        {
          Object.keys(data[0])
            .map((property, i) => <th key={i} className="data-grid__data-table-th" key={property}>{property}</th>)
        }
      </tr>
    )
  }
  {
    data.map((item, i) => (
      <tr className="data-grid__data-table-tr" key={i}>
        {
          (Object.values(item)).map((value, i) => (
            <td
              className="data-grid__data-table-td"
              key={i}
              dangerouslySetInnerHTML={{
                __html: (value || '')
                  .toString()
                  .replace(filter, text => '<span class="selected">' + text + '</span>')
              }} />
          ))
        }
      </tr>   
    ))
  }
</tbody>
</table>