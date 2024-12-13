/* eslint-disable react-hooks/exhaustive-deps */
// index.jsx

'use client';

import { useEffect, useState, useMemo } from 'react';

import { useRouter } from 'next/navigation';

import { Card, Button, Typography, MenuItem } from '@mui/material';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from '@tanstack/react-table';

import CustomTextField from '@core/components/mui/TextField';
import CustomAvatar from '@core/components/mui/Avatar';
import tableStyles from '@core/styles/table.module.css';
import { getInitials } from '@/utils/getInitials';

import DebouncedInput from '@components/DebouncedInput';
import TableFilters from '@components/TableFilters';

const dataMahasiswa = [
  {
    nama: 'Ade Surya',
    nim: '123456789',
    semester: 1,
    ipk: 3.5,
    ips: 3.5,
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  }
]

const ListPaMahasiswa = ({ mahasiswa }) => {
  const [data, setData] = useState(dataMahasiswa);
  const [filteredData, setFilteredData] = useState(data);
  const [globalFilter, setGlobalFilter] = useState('');
  const router = useRouter();

  const columnHelper = createColumnHelper();

  const getAvatar = ({ avatar, fullName }) => {
    return avatar ? (
      <CustomAvatar src={avatar} size={34} />
    ) : (
      <CustomAvatar size={34}>{getInitials(fullName)}</CustomAvatar>
    );
  };

  const columns = useMemo(
    () => [
      columnHelper.accessor('nama', {
        header: 'Nama',
        cell: ({ row }) => (
          <div className='flex items-center gap-4'>
            {getAvatar({ avatar: row.original.avatar, fullName: row.original.nama })}
            <div className='flex flex-col'>
              <Typography color='text.primary' className='font-medium'>
                {row.original.nama}
              </Typography>
            </div>
          </div>
        ),
      }),
      columnHelper.accessor('nim', {
        header: 'NIM',
        cell: info => info.getValue(),
      }),
      columnHelper.accessor('semester', {
        header: 'Semester',
        cell: info => info.getValue(),
      }),
      columnHelper.accessor('ipk', {
        header: 'IPK',
        cell: info => info.getValue().toFixed(2),
      }),
      columnHelper.accessor('ips', {
        header: 'IPS',
        cell: info => info.getValue().toFixed(2),
      }),
      columnHelper.accessor('action', {
        header: 'Action',
        cell: ({ row }) => (
          <Button
            variant='outlined'
            size='small'
            onClick={() => router.push(`/dosen/mahasiswa/${row.original.nim}`)}
          >
            Detail
          </Button>
        ),
        enableSorting: false,
      }),
    ],
    [router]
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      <Card>
        <div className='flex items-center justify-between gap-4 p-6'>
          <div className='flex items-center gap-4'>
            <CustomTextField
              select
              value={table.getState().pagination.pageSize}
              onChange={e => table.setPageSize(Number(e.target.value))}
            >
              {[5, 10, 25, 50].map(size => (
                <MenuItem key={size} value={size}>
                  {size}
                </MenuItem>
              ))}
            </CustomTextField>
            <DebouncedInput
              value={globalFilter ?? ''}
              onChange={value => setGlobalFilter(String(value))}
              placeholder='Cari Mahasiswa'
            />
          </div>
          <TableFilters
            setData={setFilteredData}
            tableData={data}
            filterField='semester'
            filterOptions={[1, 2, 3, 4, 5, 6, 7, 8]}
            label='Semester'
          />
        </div>
        <div className='overflow-x-auto'>
          <table className={`${tableStyles.table} table-auto w-full`}>
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id} className='bg-gray-200'>
                  {headerGroup.headers.map(header => (
                    <th key={header.id} className='px-4 py-2 text-left'>
                      {header.isPlaceholder ? null : (
                        <div
                          className={
                            header.column.getCanSort()
                              ? 'cursor-pointer select-none flex items-center'
                              : ''
                          }
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {{
                            asc: ' 🔼',
                            desc: ' 🔽',
                          }[header.column.getIsSorted()] ?? null}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map(row => (
                <tr key={row.id} className='border-b hover:bg-gray-100'>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className='px-4 py-2'>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
};

export default ListPaMahasiswa;
