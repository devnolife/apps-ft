import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Select, MenuItem, Card, CardContent, Button, Typography, TablePagination } from "@mui/material";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable, getFilteredRowModel, getPaginationRowModel, getSortedRowModel } from '@tanstack/react-table';
import styles from '@core/styles/table.module.css';
import classnames from 'classnames';
import CustomTextField from '@core/components/mui/TextField';
import TablePaginationComponent from '@components/TablePaginationComponent';

const TablePersyaratan = ({ user }) => {
  const [data, setData] = useState([]);
  const [userType, setUserType] = useState(user);
  const [globalFilter, setGlobalFilter] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const query = userType === 'admin' ? `
        query GetAllKkpSyarat {
          getAllKkpSyarat {
            id
            prodi_kode_prodi
            nama
            url_check
            response_should_be
            is_upload_file
            is_activated
            is_deleted
            created_by
            updated_by
            created_at
            updated_at
          }
        }
      ` : `
        query GetAllKkpSyarat {
          getAllKkpSyarat {
            id
            nama
            logo
            is_upload_file
            is_activated
          }
        }
      `;
      try {
        const response = await axios.post("https://superapps.if.unismuh.ac.id/graphql", { query });
        setData(response.data.data.getAllKkpSyarat);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [userType]);

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  const filteredData = userType === 'admin' ? data : data.filter(row => row.created_by === user);

  const columnHelper = createColumnHelper();

  const columns = useMemo(() => [
    userType === 'admin' && columnHelper.accessor('prodi_kode_prodi', {
      cell: info => info.getValue(),
      header: 'Kode Prodi'
    }),
    columnHelper.accessor('nama', {
      cell: info => info.getValue(),
      header: 'Nama'
    }),
    userType === 'admin' && columnHelper.accessor('url_check', {
      cell: info => info.getValue(),
      header: 'URL Check'
    }),
    userType === 'admin' && columnHelper.accessor('response_should_be', {
      cell: info => info.getValue(),
      header: 'Response Should Be'
    }),
    columnHelper.accessor('is_upload_file', {
      cell: info => info.getValue() ? <i className='text-xl tabler-icon-file' /> : <i className='text-xl tabler-icon-x' />,
      header: 'Is Upload File'
    }),
    columnHelper.accessor('is_activated', {
      cell: info => info.getValue() ? <i className='text-xl tabler-icon-check' /> : <i className='text-xl tabler-icon-x' />,
      header: 'Is Activated'
    }),
    userType === 'admin' && columnHelper.accessor('created_by', {
      cell: info => info.getValue(),
      header: 'Created By'
    }),
    userType === 'admin' && columnHelper.accessor('created_at', {
      cell: info => new Date(info.getValue()).toLocaleString(),
      header: 'Created At'
    })
  ].filter(Boolean), [userType]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      globalFilter
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onGlobalFilterChange: setGlobalFilter
  });

  return (
    <Card>
      <CardContent className='flex flex-wrap justify-between gap-4 max-sm:flex-col sm:items-center'>
        <CustomTextField
          value={globalFilter ?? ''}
          onChange={value => setGlobalFilter(String(value))}
          placeholder='Search'
          className='max-sm:is-full'
        />
        <div className='flex items-start gap-4 max-sm:flex-col sm:items-center max-sm:is-full'>
          <CustomTextField
            select
            value={table.getState().pagination.pageSize}
            onChange={e => table.setPageSize(Number(e.target.value))}
            className="is-full sm:is-[70px]"
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 400
                }
              }
            }}
          >
            <MenuItem value='prodi'>Prodi</MenuItem>
            <MenuItem value='22021'>Pengairan</MenuItem>
            <MenuItem value='22022'>Elektro</MenuItem>
            <MenuItem value='32322'>Arsitektur</MenuItem>
            <MenuItem value='55202'>Informatika</MenuItem>
            <MenuItem value='31313'>PWK</MenuItem>
          </CustomTextField>
        </div>
      </CardContent>
      <div className='overflow-x-auto'>
        <table className={styles.table}>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>

                {headerGroup.headers.map(header => (
                  <th key={header.id}>
                    {header.isPlaceholder ? null : (
                      <div
                        className={classnames({
                          'flex items-center': header.column.getIsSorted(),
                          'cursor-pointer select-none': header.column.getCanSort()
                        })}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{
                          asc: <i className='text-xl tabler-chevron-up' />,
                          desc: <i className='text-xl tabler-chevron-down' />
                        }[header.column.getIsSorted()] ?? null}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          {table.getFilteredRowModel().rows.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                  No data available
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {table.getRowModel().rows.map(row => (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
      <TablePagination
        component={() => <TablePaginationComponent table={table} />}
        count={table.getFilteredRowModel().rows.length}
        rowsPerPage={table.getState().pagination.pageSize}
        page={table.getState().pagination.pageIndex}
        onPageChange={(_, page) => {
          table.setPageIndex(page)
        }}
      />
    </Card>
  );
};

export default TablePersyaratan;



