import { Transaction } from '@/lib/data';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'transactionId',
    header: 'Transaction ID',
    cell: ({ row }) => row.original.transactionId,
  },
  {
    accessorKey: 'transferAmount',
    header: 'Transfer Amount',
    cell: ({ row }) => row.original.transferAmount, 
  },
  {
    accessorKey: 'time',
    header: 'Time',
    cell: ({ row }) => row.original.time,
  }
];