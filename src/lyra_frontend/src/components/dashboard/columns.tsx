"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        className="w-4 h-4 mr-5"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => {
          const rowsToToggle = table
            .getPreFilteredRowModel()
            .rows.filter((row) => {
              // Replace 'someColumn' with the actual column key you're checking
              // and 'someValue' with the value you want to exclude
              return row.getValue("status") !== "trained";
            });

          rowsToToggle.forEach((row) => {
            row.toggleSelected(!!value);
          });
        }}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  // {
  //   accessorKey: "timestamp",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Timestamp
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  //   cell: ({ row }) => {
  //     const timestamp = parseFloat(row.getValue("timestamp"));
  //     // Assume the timestamp is seconds since 1970, but allow for very old dates
  //     const date = new Date(timestamp * 1000);

  //     // Check if the date is valid
  //     if (isNaN(date.getTime())) {
  //       return <div className="text-left">Invalid Date</div>;
  //     }

  //     const day = date.getUTCDate().toString().padStart(2, "0");
  //     const month = (date.getUTCMonth() + 1).toString().padStart(2, "0"); // getMonth() is zero-indexed
  //     const year = date.getUTCFullYear();
  //     const hours = date.getUTCHours().toString().padStart(2, "0");
  //     const minutes = date.getUTCMinutes().toString().padStart(2, "0");

  //     return (
  //       <div className="text-left">{`${day}/${month}/${year} ${hours}:${minutes}`}</div>
  //     );
  //   },
  // },
  {
    accessorKey: "text",
    header: "Text",
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status: string = row.getValue("status");
      return <div className="py-2 px-4">{status.toUpperCase()}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
              className="text-red-500"
            >
              Remove data
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
