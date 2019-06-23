import React from 'react';

export default ({ data = [], filter = '', onEditOrSaveClick, editableItem, onPrintClick }) => <table className="data-grid__data-table">
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
          (Object.keys(item)).map((key, i) => {

            let value = item[key]

            if (key === 'json_body') {
              const parsed = JSON.parse(value)
              const values = Object.values(parsed)
              const str = values.join()
              value = str
            }

            return (
              <td
                className="data-grid__data-table-td"
                key={i}
                dangerouslySetInnerHTML={{
                  __html: (value || '')
                    .toString()
                    .replace(filter, text => '<span class="selected">' + text + '</span>')
                }} />
            )
          })
        }
        <td>
            <button className="btn btn-link" onClick={() => onPrintClick(item.id)}>Печать</button>
          </td>
      </tr>   
    ))
  }
</tbody>
</table>