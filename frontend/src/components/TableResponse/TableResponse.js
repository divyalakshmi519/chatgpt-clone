import React from 'react';
import './TableResponse.css';

export default function TableResponse({ table }){
  if(!table || !table.length) return null;
  return (
    <div className="table-box">
      <table>
        <tbody>
          {table.map((r,i) => (
            <tr key={i}>
              <td className="k">{r.key}</td>
              <td className="v">{r.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
