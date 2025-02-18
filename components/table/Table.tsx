import data from "@/lib/data";
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    flexRender
  } from "@tanstack/react-table";
import {columns} from './columns';
import { useState } from "react";
import { motion} from "framer-motion";


const Table = () => {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
    

    const table = useReactTable({
        data: data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
          pagination: {
            pageSize: 5,
          },
        },
      });

      const handleRowClick = (rowId: string) => {
        setExpandedRow(expandedRow === rowId ? null : rowId); // Toggle expansion
      };
  return (
    <div className="mx-auto md:py-8 flex flex-col bg-transparent">
    <table className="table-auto text-left text-white">
    <thead className="backdrop-blur-sm bg-gradient-to-b from-black to-bg-black/30">
{table.getHeaderGroups().map((headerGroup) => (
    
            <tr key={headerGroup.id} className="bg-black">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-1 py-5 md:p-9 font-bold md:text-[18px] text-[16px] text-center text-[#0029FF]"
                >
                    
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
</thead>
<tbody>
{table.getRowModel().rows.map((row) => (
            <>
              <tr
                key={row.id}
                className="backdrop-blur-sm bg-black bg-gradient-to-b from-black to-bg-black/30 hover:bg-[#0029FF] font-semibold cursor-pointer"
                onClick={() => handleRowClick(row.id)}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-1 py-5 md:p-9 text-center text-[13px] md:text-[16px]"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>


              {expandedRow === row.id && (
                <motion.tr
                initial={{ opacity: 0.5, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0.5, height: 0 }}
                transition={{ duration: 1, ease: "easeInOut" }}
              >
                  <td colSpan={columns.length} className="p-5 bg-black text-white">
                    <div className="p-4 border border-gray-700 rounded-lg w-full">
                      <h3 className="text-[14px] md:text-lg font-bold">More Details</h3>
                      <p className="text-sm text-gray-400">Transactional Details
                      </p>
                    </div>
                  </td>
                  </motion.tr>
              )}
            </>
          ))}
          
</tbody>

    </table>
    <div className="flex justify-between mt-4">
        <button
          className="bg-gradient-to-r from-[#0029FF] to-[#0000008e] rounded-full border border-gray-500 px-4 py-2 text-white"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </button>
        <span className="text-white">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>
        <button
          className="bg-gradient-to-r from-[#0029FF] to-[#0000008e] rounded-full px-4 py-2 border border-gray-500 text-white"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </button>
      </div>
  </div>
  )
}

export default Table;