'use client'
import { useState, useMemo } from 'react'

import IconButton from '@mui/material/IconButton'
import Chip from '@mui/material/Chip'
import { createColumnHelper } from '@tanstack/react-table'

import { Checkbox, Typography } from '@mui/material'

import DataTable from '@components/DataTable'
import ViewLetter from './ViewLetter'
import OptionMenu from '@core/components/option-menu'
import { getInitials } from '@/utils/getInitials'
import CustomAvatar from '@core/components/mui/Avatar'
import AddUserDrawer from './AddUserDrawer'

const statusColor = {
  Diproses: 'warning',
  'Menunggu persetujuan': 'info',
  Disetujui: 'success'
}

const columnHelper = createColumnHelper()

const TableLetter = ({ db }) => {
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [data, setData] = useState(db)
  const [viewSuratOpen, setViewSuratOpen] = useState(false)
  const [selectedSurat, setSelectedSurat] = useState(null)

  const handleViewSurat = surat => {
    setSelectedSurat(surat)
    setViewSuratOpen(true)
  }

  const getAvatar = params => {
    const { avatar, pengaju } = params

    if (avatar) {
      return <CustomAvatar src={avatar} size={34} />
    } else {
      return <CustomAvatar size={34}>{getInitials(pengaju || '')}</CustomAvatar>
    }
  }

  const columns = useMemo(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler()
            }}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler()
            }}
          />
        )
      },
      columnHelper.accessor('nomorSurat', {
        header: 'Nomor Surat',
        cell: ({ row }) => (
          <Typography color='text.primary' className='font-medium'>
            {row.original.nomorSurat}
          </Typography>
        )
      }),
      columnHelper.accessor('judulSurat', {
        header: 'Judul Surat',
        cell: ({ row }) => (
          <Typography color='text.primary' className='font-medium'>
            {row.original.judulSurat}
          </Typography>
        )
      }),
      columnHelper.accessor('jenisSurat', {
        header: 'Jenis Surat',
        cell: ({ row }) => (
          <Typography color='text.primary' className='capitalize'>
            {row.original.jenisSurat}
          </Typography>
        )
      }),
      columnHelper.accessor('penerima', {
        header: 'Penerima',
        cell: ({ row }) => (
          <div className='flex items-center gap-4'>
            {getAvatar({ avatar: row.original.avatar, pengaju: row.original.penerima })}
            <div className='flex flex-col'>
              <Typography color='text.primary' className='font-medium'>
                {row.original.penerima}
              </Typography>
              <Typography variant='body2'>{row.original.kontak}</Typography>
            </div>
          </div>
        )
      }),
      columnHelper.accessor('statusSurat', {
        header: 'Status Surat',
        cell: ({ row }) => (
          <Chip
            variant='tonal'
            label={row.original.statusSurat}
            size='small'
            color={statusColor[row.original.statusSurat]}
            className='capitalize'
          />
        )
      }),
      columnHelper.accessor('metodePengambilan', {
        header: 'Metode Pengambilan',
        cell: ({ row }) => (
          <Typography className='capitalize' color='text.primary'>
            {row.original.metodePengambilan}
          </Typography>
        )
      }),
      columnHelper.accessor('action', {
        header: 'Action',
        cell: ({ row }) => (
          <div className='flex items-center'>
            <IconButton onClick={() => handleViewSurat(row.original)}>
              <i className='tabler-eye text-textSecondary' />
            </IconButton>
            <IconButton onClick={() => setData(data?.filter(surat => surat.id !== row.original.id))}>
              <i className='tabler-trash text-textSecondary' />
            </IconButton>
            <OptionMenu
              iconButtonProps={{ size: 'medium' }}
              iconClassName='text-textSecondary'
              options={[
                {
                  text: 'Download',
                  icon: 'tabler-download',
                  menuItemProps: { className: 'flex items-center gap-2 text-textSecondary' }
                },
                {
                  text: 'Edit',
                  icon: 'tabler-edit',
                  menuItemProps: { className: 'flex items-center gap-2 text-textSecondary' }
                }
              ]}
            />
          </div>
        ),
        enableSorting: false
      })
    ],
    [data]
  )

  return (
    <>
      <DataTable
        data={data}
        columns={columns}
        title='Filter Surat'
        globalFilterPlaceholder='Cari Mahasiswa'
        addButtonLabel='Tambahkan Surat Baru'
        onAddButtonClick={() => setAddUserOpen(!addUserOpen)}
      />
      {selectedSurat && (
        <ViewLetter
          open={viewSuratOpen}
          handleClose={() => setViewSuratOpen(false)}
          suratData={selectedSurat}
        />
      )}
      <AddUserDrawer
        open={addUserOpen}
        handleClose={() => setAddUserOpen(!addUserOpen)}
        userData={data}
        setData={setData}
      />
    </>
  )
}

export default TableLetter

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import TablePagination from '@mui/material/TablePagination'
import MenuItem from '@mui/material/MenuItem'

import classnames from 'classnames'
import { rankItem } from '@tanstack/match-sorter-utils'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/react-table'

import TablePaginationComponent from '@components/TablePaginationComponent'
import CustomTextField from '@core/components/mui/TextField'
import TableFilters from '@/components/TableFilters'
import tableStyles from '@core/styles/table.module.css'

const Icon = styled('i')({})

const fuzzyFilter = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value)

  addMeta({
    itemRank
  })

  return itemRank.passed
}

const DebouncedInput = ({ value: initialValue, onChange, debounce = 500, ...props }) => {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])
  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value])

  return <CustomTextField {...props} value={value} onChange={e => setValue(e.target.value)} />
}

const DataTable = ({ data, columns, title, globalFilterPlaceholder, addButtonLabel, onAddButtonClick }) => {
  const [rowSelection, setRowSelection] = useState({})
  const [filteredData, setFilteredData] = useState(data)

  const [globalFilter, setGlobalFilter] = useState('')

  useEffect(() => {
    const filtered = data.filter(row => {
      return Object.values(row).some(value =>
        String(value).toLowerCase().includes(globalFilter.toLowerCase())
      );
    });

    setFilteredData(filtered);
  }, [globalFilter, data]);

  const table = useReactTable({
    data: filteredData,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter
    },
    state: {
      rowSelection,
      globalFilter
    },
    initialState: {
      pagination: {
        pageSize: 5
      }
    },
    enableRowSelection: true,
    globalFilterFn: fuzzyFilter,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues()
  })

  return (
    <Card>
      <CardHeader title='Tabel Persuratan a' className='pbe-4' />
      {/* <TableFilters setData={setFilteredData} tableData={data} /> */}
      <div className='flex flex-col items-start justify-between gap-4 p-6 md:flex-row md:items-center border-bs'>
        <div className='flex flex-col items-start gap-4 sm:flex-row max-sm:is-full sm:items-center'>
          <CustomTextField
            select
            value={table.getState().pagination.pageSize}
            onChange={e => table.setPageSize(Number(e.target.value))}
            className='max-sm:is-full sm:is-[70px]'
          >
            <MenuItem value='5'>5</MenuItem>
            <MenuItem value='10'>10</MenuItem>
            <MenuItem value='15'>15</MenuItem>
            <MenuItem value='25'>25</MenuItem>
            <MenuItem value='50'>50</MenuItem>
          </CustomTextField>
          <DebouncedInput
            value={globalFilter ?? ''}
            onChange={value => setGlobalFilter(String(value))}
            placeholder={globalFilterPlaceholder}
            className='max-sm:is-full'
          />
        </div>
        <div className='flex flex-col items-start gap-4 sm:flex-row max-sm:is-full sm:items-center'>
          <Button
            color='secondary'
            variant='tonal'
            startIcon={<i className='tabler-upload' />}
            className='max-sm:is-full'
          >
            Export
          </Button>
          <Button
            variant='contained'
            startIcon={<i className='tabler-plus' />}
            onClick={onAddButtonClick}
            className='max-sm:is-full'
          >
            {addButtonLabel}
          </Button>
        </div>
      </div>
      <div className='overflow-x-auto'>
        <table className={tableStyles.table}>
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
              {table
                .getRowModel()

                .rows.slice(0, table.getState().pagination.pageSize)
                .map(row => (
                  <tr key={row.id} className={classnames({ selected: row.getIsSelected() })}>
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
  )
}

export default DataTable
