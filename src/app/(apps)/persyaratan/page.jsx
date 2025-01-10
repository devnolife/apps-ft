/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import React, { useEffect, useState, useMemo } from "react";

import axios from "axios";
import { MenuItem, Card, CardContent, Button, Typography, TablePagination, Drawer, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, CircularProgress } from "@mui/material";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable, getFilteredRowModel, getPaginationRowModel, getSortedRowModel } from '@tanstack/react-table';

import classnames from 'classnames';

import { toast } from 'react-toastify';

import styles from '@core/styles/table.module.css';
import CustomTextField from '@core/components/mui/TextField';
import TablePaginationComponent from '@components/TablePaginationComponent';
import AddPersyaratan from "./add";


import 'react-toastify/dist/ReactToastify.css';
import useApiGraphql from '@hooks/useApiGraphql';


const role = 'admin'

const Page = () => {
  const [data, setData] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const query = `
    query GetAllKkpSyarat {
      getAllKkpSyarat {
        id
        prodi_kode_prodi
        nama
        url_check
        response_should_be
        is_upload_file
        is_activated
      }
    }
  `;

  const { data: fetchedData, error, isLoading } = useApiGraphql(query);

  useEffect(() => {
    if (fetchedData) {
      setData(fetchedData.getAllKkpSyarat);
    }

    if (error) {
      toast.error(process.env.NODE_ENV === 'production' ? 'Ada Kesalahan ..' : error.message);
    }
  }, [fetchedData, error]);

  const handleAddRequirement = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleEditRequirement = (id) => {
    const requirement = data.find(item => item.id === id);

    setEditData(requirement);
    setDrawerOpen(true);
  };

  const handleDeleteRequirement = async () => {
    const mutation = `
      mutation RemoveKkpSyarat($id: String!) {
        removeKkpSyarat(id: $id) {
          id
          nama
        }
    }
    `;

    try {
      const { data: deleteData, error: deleteError } = useApiGraphql(mutation, { id: deleteId });

      if (deleteError) {
        throw new Error(deleteError.message);
      }

      setData(data.filter(item => item.id !== deleteId));
      toast.success('Requirement deleted successfully');
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete requirement');
    } finally {
      setDeleteDialogOpen(false);
      setDeleteId(null);
    }
  };

  const confirmDeleteRequirement = (id) => {
    setDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const columnHelper = createColumnHelper();

  const columns = useMemo(() => [
    columnHelper.accessor((row, index) => index + 1, {
      cell: info => <div className="truncate">{info.getValue()}</div>,
      header: 'ID'
    }),
    columnHelper.accessor('prodi_kode_prodi', {
      cell: info => <div className="truncate">{info.getValue()}</div>,
      header: 'Kode Prodi'
    }),
    columnHelper.accessor('nama', {
      cell: info => <div className="truncate">{info.getValue()}</div>,
      header: 'Nama'
    }),
    columnHelper.accessor('url_check', {
      cell: info => <div className="truncate">{info.getValue()}</div>,
      header: 'URL Check'
    }),
    columnHelper.accessor('response_should_be', {
      cell: info => <div className="truncate">{info.getValue()}</div>,
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
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className='flex gap-2'>
          <IconButton onClick={() => handleEditRequirement(row.original.id)}>
            <i className='tabler-edit' />
          </IconButton>
          <IconButton onClick={() => confirmDeleteRequirement(row.original.id)}>
            <i className='tabler-trash' />
          </IconButton>
        </div>
      )
    }
  ], []);

  const table = useReactTable({
    data,
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

  if (isLoading) {
    return <div className='flex items-center justify-center h-screen'>
      <CircularProgress />
    </div>
  }

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
          <Button variant="contained" color="primary" onClick={handleAddRequirement}>
            Tambah Persyaratan
          </Button>
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
      <AddPersyaratan
        open={drawerOpen}
        onClose={handleDrawerClose}
        setData={setData}
        data={data}
        editData={editData}
        title={editData ? "Edit Persyaratan" : "Tambah Persyaratan"}
      />
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this requirement?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteRequirement} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default Page;
