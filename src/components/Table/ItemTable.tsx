import React from "react";
import Pagination from "../Pagination/Pagination";
import SearchForm from "../Search/Search";
import SelectionBox from "../SelectBox/SelectBox";

interface TableColumn {
  key: string;
  label: string;
}

interface TableRow {
  [key: string]: any; 
}

interface TableProps {
  columns: TableColumn[];
  data: TableRow[];
  itemsPerPage?: number;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  nextButton: () => void;
  previousButton: () => void;
  pageNum: number;
  total: number;
  blocked?: boolean;
  setBlocked?: React.Dispatch<React.SetStateAction<boolean>>;
}

const ItemTable: React.FC<TableProps> = ({
  columns,
  data,
  search,
  setSearch,
  nextButton,
  previousButton,
  pageNum,
  total,
  blocked,
  setBlocked,
}) => {
  const options = [
    { label: 'Unblocked', action: () => setBlocked?.(false) },
    { label: 'Blocked', action: () => setBlocked?.(true) },
  ];

  return (
    <div className="flex flex-col  h-full pb-16 ">
      <div className="flex items-center justify-between max-sm:flex-col max-sm:items-end">
      {options && <SelectionBox buttonLabel={blocked?'Blocked':'Unblocked'} options={options} />}
      <SearchForm search={search} setSearch={setSearch}/>
      </div>
      <div className="overflow-x-auto no-scrollbar">
        <div className="min-w-full inline-block align-middle">
          <div className="border  border-gray-300  min-h-[350px]">
            <table className="min-w-full relative">
              <thead>
                <tr className="bg-gray-50">
                  {columns.map((column) => (
                    <th
                      key={column.key}
                      className="p-5 text-left text-xs leading-6 font-semibold text-gray-900 capitalize "
                    >
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
                {data.length > 0 ? (
                  data.map((row, rowIndex) => (
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
                  ))
                ) : (
                  <div className=" w-full absolute flex justify-center items-center min-h-[250px]   text-gray-500 text-xs">
                    no data available
                  </div>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Pagination nextButton={nextButton} previousButton={previousButton} pageNum={pageNum} totalPages={total}/>
    </div>
  );
};

export default ItemTable;
