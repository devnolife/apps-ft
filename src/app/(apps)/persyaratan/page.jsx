/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import React, { useEffect, useState, useMemo } from "react";

import { MenuItem, Card, CardContent, Button, TablePagination, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, CircularProgress, Chip } from "@mui/material";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable, getFilteredRowModel, getPaginationRowModel, getSortedRowModel } from '@tanstack/react-table';
import { toast } from 'react-toastify';


import styles from '@core/styles/table.module.css';
import CustomTextField from '@core/components/mui/TextField';
import TablePaginationComponent from '@components/TablePaginationComponent';
import AddPersyaratan from "./add";
import useApiGraphql from "@/hooks/useApiGraphql";
import CustomAvatar from '@core/components/mui/Avatar'

const role = 'admin'; // Ubah sesuai kebutuhan

const Page = () => {
  const [data, setData] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [selectedProdi, setSelectedProdi] = useState('');

  const handleProdiChange = (event) => {
    setSelectedProdi(event.target.value);
  };

  const { query, loading } = useApiGraphql();

  const fetchRequirements = async () => {
    const queryStr = `
      query GetAllKkpSyarat {
        getAllKkpSyarat {
          id
          nama
          is_upload_file
          is_activated
          prodi_kode_prodi
        }
      }
    `;

    try {
      const response = await query(queryStr);

      setData(response.data.getAllKkpSyarat);
    } catch (error) {
      toast.error(process.env.NODE_ENV === 'production' ? 'Ada Kesalahan ..' : error.message);
    }
  };

  useEffect(() => {
    fetchRequirements();
  }, []);

  const handleAddRequirement = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleEdit = (row) => {
    setEditData(row);
    setDrawerOpen(true);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const columnHelper = createColumnHelper();

  const columns = useMemo(() => {
    const baseColumns = [
      columnHelper.accessor((row, index) => index + 1, {
        cell: info => <div className="truncate">{info.getValue()}</div>,
        header: 'ID'
      }),
      columnHelper.accessor('nama', {
        cell: info => <div className="break-words truncate">{info.getValue()}</div>,
        header: 'Nama'
      }),
      columnHelper.accessor('is_upload_file', {
        cell: info => (
          <Chip
            variant="tonal"
            label={info.getValue() ? 'Iya' : 'Tidak'}
            color={info.getValue() ? 'success' : 'error'}
          />
        ),
        header: 'Upload File'
      }),
      columnHelper.accessor('is_activated', {
        cell: info => (
          <Chip
            variant="tonal"
            label={info.getValue() ? 'Iya' : 'Tidak'}
            color={info.getValue() ? 'success' : 'error'}
          />
        ),
        header: 'Aktif'
      })
    ];

    if (role === 'admin') {
      return [
        ...baseColumns,
        columnHelper.accessor('prodi_kode_prodi', {
          cell: info => <div className="truncate">{info.getValue()}</div>,
          header: 'Kode Prodi'
        }),
        columnHelper.accessor('url_check', {
          cell: info => <div className="truncate">{info.getValue()}</div>,
          header: 'URL Check'
        }),
        columnHelper.accessor('response_should_be', {
          cell: info => <div className="truncate">{info.getValue()}</div>,
          header: 'Response Should Be'
        }),
        {
          id: 'actions',
          header: 'Actions',
          cell: ({ row }) => (
            <div className="flex gap-4">
              <i onClick={() => handleEdit(row.original)}
                className="tabler-icon tabler-edit" />
              <i onClick={() => handleDelete(row.original.id)} className="tabler-icon tabler-trash" />
            </div>
          )
        }
      ];
    }

    return [
      ...baseColumns,
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <div className="flex gap-4">
            <i onClick={() => handleEdit(row.original)}
              className="tabler-icon tabler-edit" />
            <i onClick={() => handleDelete(row.original.id)} className="tabler-icon tabler-trash" />
          </div>
        )
      }
    ];
  }, [role]);

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

  if (loading) {
    return <div className='flex items-center justify-center h-screen'>
      <CircularProgress />
    </div>
  }

  const handleConfirmDelete = () => {
    // Add your delete logic here
    setDeleteDialogOpen(false);
  };

  return (
    <Card>
      <CardContent className='flex flex-wrap justify-between gap-4 max-sm:flex-col sm:items-center'>
        {role === 'admin' && (
          <>
            <CustomTextField
              value={globalFilter ?? ''}
              onChange={value => setGlobalFilter(String(value))}
              placeholder='Search'
              className='max-sm:is-full'
            />
            <div className='flex gap-3'>
              <CustomTextField
                select
                value={selectedProdi}
                onChange={handleProdiChange}
                variant="outlined"
              >
                <MenuItem value="55202">Informatika</MenuItem>
                <MenuItem value="22012">Pengairan</MenuItem>
                <MenuItem value="22012">Elektro</MenuItem>
                <MenuItem value="22012">Arsitektur</MenuItem>
                <MenuItem value="55511">PWK</MenuItem>
              </CustomTextField>
              <Button variant="contained" color="primary" onClick={handleAddRequirement}>
                Tambah Persyaratan
              </Button>
            </div>
          </>
        )}
      </CardContent>
      <div className='overflow-x-auto'>
        <table className={styles.table}>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
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
          table.setPageIndex(page);
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
          <Button onClick={handleConfirmDelete} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default Page;
