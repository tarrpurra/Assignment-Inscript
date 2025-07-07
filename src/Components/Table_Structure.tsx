import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import { useState, useMemo, useCallback } from "react";
import React from "react";
import type { SortingState } from "@tanstack/react-table";
import columnConfig from "./columnConfig";
import { columnOrder } from "./column";

type TableData = { [key: string]: string };
type TableStyle = { [key: string]: string };

const linkIcon = "./src/assets/Link.png";
const reloadIcon = "./src/assets/Sync.png";
const plusIcon = "./src/assets/Add.png";
const SplitIcon = "./src/assets/Arrowsplitgreen.png";
const split = "./src/assets/Arrowsplit.png";
const more = "./src/assets/more.png";

const Rows = 100;

// Generate row data with sample data for first 5 rows, empty for others
const generateInitialData = (): { data: TableData; style: TableStyle }[] => {
  return Array.from({ length: Rows }, (_, rowIndex) => {
    const rowData: TableData = {};
    const rowStyle: TableStyle = {};

    // Only use sample data for the first 5 rows
    const sampleRow =
      rowIndex < columnOrder.length ? columnOrder[rowIndex] : null;

    columnConfig.forEach((col, colIndex) => {
      if (sampleRow) {
        const cell = sampleRow[(colIndex + 1).toString()];
        rowData[col.id] = cell?.data || "";
        rowStyle[col.id] = cell?.style || "text-left";
      } else {
        // Empty data for rows beyond the sample data
        rowData[col.id] = "";
        rowStyle[col.id] = "text-left";
      }
    });

    return { data: rowData, style: rowStyle };
  });
};

interface TableStructureProps {
  sorting: SortingState;
  setSorting: React.Dispatch<React.SetStateAction<SortingState>>;
}

const Table_Structure: React.FC<TableStructureProps> = ({
  sorting,
  setSorting,
}) => {
  const [tableData, setTableData] = useState<
    { data: TableData; style: TableStyle }[]
  >(generateInitialData());

  // Create a stable update function
  const updateCellValue = useCallback(
    (rowIndex: number, colId: string, value: string) => {
      setTableData((prev) => {
        const updated = [...prev];
        updated[rowIndex] = {
          ...updated[rowIndex],
          data: {
            ...updated[rowIndex].data,
            [colId]: value,
          },
        };
        return updated;
      });
    },
    []
  );

  // Memoize the column definitions
  const columnDefs: ColumnDef<{ data: TableData; style: TableStyle }>[] =
    useMemo(() => {
      const editableColumns: ColumnDef<{
        data: TableData;
        style: TableStyle;
      }>[] = columnConfig.map((col) => ({
        id: col.id,
        accessorKey: `data.${col.id}`,
        header: () => (
          <div className={`flex items-center justify-between w-full`}>
            <div className="flex items-center">
              {!["Priority", "Due Date", "Est. Value","new"].includes(col.label) && (
                <img
                  src={col.icon}
                  alt={`${col.label} icon`}
                  className="max-w-full h-auto mr-2"
                />
              )}
              <span className="text-sm text-gray-700">{col.label=="new"?"":col.label}</span>
            </div>
            <span id="clickable" className="cursor-pointer">
              <img
                src="./src/assets/chevron.png"
                alt="Sort or Edit"
                className="w-3 h-3"
                onClick={() => console.log("Chevron clicked")}
              />
            </span>
          </div>
        ),
        cell: (info) => {
          const rowIndex = info.row.index;
          const colId = col.id;
          const value = info.row.original.data[colId] || "";
          const style = info.row.original.style[colId] || "text-left";
          const isChip = style.includes("border");

          return (
            <div className="flex items-center justify-center h-full w-full">
              {isChip ? (
                <span
                  className={`inline-block text-xs font-medium leading-none px-2 py-0.5 rounded-full ${style}`}
                >
                  {value}
                </span>
              ) : (
                <input
                  className={`w-full h-8 px-2 outline-none text-black ${style}`}
                  value={value}
                  onChange={(e) => {
                    updateCellValue(rowIndex, colId, e.target.value);
                  }}
                />
              )}
            </div>
          );
        },
      }));

      // Add row number as first column
      return [
        {
          id: "row-number",
          header: "#",
          cell: ({ row }) => row.index + 1,
          size: 50,
        },
        ...editableColumns,
      ];
    }, [updateCellValue]);

  const table = useReactTable({
    data: tableData,
    columns: columnDefs,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="w-full h-full overflow-auto">
      <table className="table-fixed border-collapse w-max min-w-full text-sm">
        <thead className="bg-white boreder border-2 border-white sticky top-0 z-10 ">
          <tr>
            {/* Row Number Placeholder */}
            <th className="border border-gray-200 w-[50px] "></th>

            <th colSpan={4} className="border-2 border-white">
              <div className="flex items-center bg-gray-200 px-3 py-1 rounded w-full">
                {/* Left: Icon + Label */}
                <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-md">
                  <img src={linkIcon} alt="link" className="w-4 h-4" />
                  <span className="text-sm font-medium text-gray-800">
                    Q3 Financial Overview
                  </span>
                </div>

                {/* Right: Reload Icon */}
                <img src={reloadIcon} alt="reload" className="ml-3 w-3 h-3" />
              </div>
            </th>
            <th></th>
            {/* ABC (1 column: Assigned) */}
            <th className="bg-[#d2e0d4] text-center border-2 border-white">
              <div className="flex items-center justify-center space-x-2 bg-[#d2e0d4] text-green-800 px-3 py-1 rounded w-full">
                <img src={SplitIcon} alt="split" className="w-4 h-4" />
                <span className="text-[#505450]">ABC</span>
                <img src={more} alt="more" className="w-4 h-4" />
              </div>
            </th>

            {/* Answer a question spans 2 columns (Priority, Due Date) */}
            <th
              colSpan={2}
              className="text-center bg-[#DCCFFC]  border-2 border-white"
            >
              <div className="flex items-center justify-center space-x-2 bg-[#DCCFFC] text-purple-100 px-3 py-1 rounded w-full ">
                <img src={split} alt="split" className="w-4 h-4" />
                <span className="text-[#505450]">Answer a question</span>
                <span className="text-[#505450]">⋯</span>
              </div>
            </th>

            {/* Extract (1 column: Est. Value) */}
            <th className=" bg-[#fac2af] border-2 border-white">
              <div className="flex items-center space-x-2 bg-[#fac2af] text-orange-800 px-3 py-1 rounded w-full">
                <img src={split} alt="split" className="w-4 h-4" />
                <span>Extract</span>
                <span className="text-gray-500">⋯</span>
              </div>
            </th>

            {/* Add Button (last empty column) */}
            <th className="w-[60px] bg-gray-100">
              <button
                className="flex items-center justify-center w-[124px] h-[36px] px-2 bg-gray-100 py-1 border border-gray-200 rounded hover:bg-gray-50 "
                onClick={() => {
                  console.log("Add column button clicked");
                }}
              >
                <img src={plusIcon} alt="add column" className="w-4 h-4" />
              </button>
            </th>
          </tr>

          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header, index) => {
                let customClass = "";
                if (header.id === "assigned") customClass = "header-assigned";
                else if (header.id === "priority")
                  customClass = "header-priority";
                else if (header.id === "dueDate")
                  customClass = "header-due-date";
                else if (header.id === "estValue")
                  customClass = "header-est-value";
                // Add white border between column headers only
                const isLast = index === headerGroup.headers.length - 1;
                return (
                  <th
                    id={header.id}
                    key={header.id}
                    className={`px-4 py-2 text-left text-gray-500 font-semibold
                      ${index === 0 ? "border-l-2 border-white" : ""}
                      ${!isLast ? "border-r-2 border-white" : ""}
                      ${
                        header.id === "row-number"
                          ? "bg-gray-200 font-medium text-lg text-gray-400 text-center"
                          : `h-10 w-64 bg-gray-100 ${customClass}`
                      }
                    `}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className={`border border-gray-300 text-center text-gray-400 transition-all duration-150 ${
                    cell.column.id === "row-number"
                      ? "bg-white font-medium w-10 "
                      : "hover:inset-ring-2 hover:inset-ring-[#6C8B70] hover:shadow-[4px_-4px_10px_1px_rgba(108,139,112,0.25)]"
                  }`}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table_Structure;
