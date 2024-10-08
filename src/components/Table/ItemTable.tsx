import React from "react";
import SearchForm from "../Search/Search";
import SelectionBox from "../SelectBox/SelectBox";
import { Table, ChevronDown } from "lucide-react";
import Pagination from "../Pagination/Pagination";

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
  options?: { label: string; action: () => void }[];
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
  options = [
    { label: "Unblocked", action: () => setBlocked?.(false) },
    { label: "Blocked", action: () => setBlocked?.(true) },
  ],
}) => {
  return (
    <div className="flex flex-col pb-8 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 max-sm:flex-col max-sm:items-stretch max-sm:space-y-4">
        {options && (
          <SelectionBox
            buttonLabel={blocked ? options[1].label : options[0].label}
            options={options}
          />
        )}
        <SearchForm search={search} setSearch={setSearch} />
      </div>
      <div className="overflow-x-auto no-scrollbar">
        <div className="min-w-full inline-block align-middle">
          <div className="min-h-[350px] relative">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {columns.map((column) => (
                    <th
                      key={column.key}
                      className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                    >
                      <div className="flex items-center">
                        {column.label}
                        <ChevronDown className="ml-1 h-4 w-4" />
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.length > 0 ? (
                  data.map((row, rowIndex) => (
                    <tr
                      key={rowIndex}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      {columns.map((column) => (
                        <td
                          key={column.key}
                          className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                        >
                          {row[column.key]}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={columns.length}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center"
                    >
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <Table className="h-12 w-12 text-gray-400" />
                        <p>No data available</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="mt-4 px-4">
        <Pagination
          nextButton={nextButton}
          previousButton={previousButton}
          pageNum={pageNum}
          totalPages={total}
        />
      </div>
    </div>
  );
};

export default ItemTable;
