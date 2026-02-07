import React from 'react';

const Table = ({ headers, data, renderRow }) => {
  return (
    <div className="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50 even:bg-gray-50 odd:bg-white transition-colors duration-150">
                {renderRow(item, index)}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headers.length} className="px-6 py-4 text-center text-sm text-gray-500">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
