import React from 'react';
import Pagination from '../Pagination/Pagination';

interface TableColumn {
  key: string;
  label: string;
}

interface TableProps {
  columns: TableColumn[];
  data: any[];
  itemsPerPage?: number;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  nextButton: () => void;
  previousButton: () => void;
  pageNum: number;
  total: number;
}

const ItemTable: React.FC<TableProps> = ({
  columns,
  data,
  itemsPerPage = 10,
  search,
  setSearch,
  nextButton,
  previousButton,
  pageNum,
  total
}) => {
  return (
    <div className="flex flex-col pb-16">
      <div className="overflow-x-auto ">
        <div className="min-w-full inline-block align-middle">
          <div className="border rounded-xl border-gray-300">
            <table className="min-w-full rounded-xl">
              <thead>
                <tr className="bg-gray-50">
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className="p-5 text-left text-xs leading-6 font-semibold text-gray-900 capitalize rounded-t-xl"
                  >
                    {column.label}
                  </th>
                ))}
                  
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
              {data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={`p-5 whitespace-nowrap text-xs leading-6 font-medium text-gray-900`}
                >
                  {columns.map((column) => (
                    <td key={column.key} className="px-4 py-4">
                      {row[column.key]}
                    </td>
                  ))}
                </tr>
              ))}
               
              </tbody>
            </table>
          </div>
        </div>
      </div>
        <Pagination/>
    </div>
  );
};

export default ItemTable;
