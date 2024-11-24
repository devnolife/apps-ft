'use client'

import { useState, useMemo } from 'react'

import Link from 'next/link'

import Card from '@mui/material/Card'
import LinearProgress from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'

import classnames from 'classnames'

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getSortedRowModel
} from '@tanstack/react-table'

import CustomAvatar from '@core/components/mui/Avatar'

import tableStyles from '@core/styles/table.module.css'

const columnHelper = createColumnHelper()

const ProgressTable = ({ dataProgress }) => {
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState('')

  const columns = useMemo(
    () => [
      columnHelper.accessor('progress', {
        header: 'Progress Akademik',
        cell: ({ row }) => {
          const isDisabled = row.original.status === 'nonaktif'

          return (
            <div className='flex items-center gap-4'>
              <CustomAvatar variant='rounded' skin='light' color={row.original.color}>
                <i className={classnames('text-[28px]', row.original.logo)} />
              </CustomAvatar>
              <div className='flex flex-col'>
                <Typography
                  component={isDisabled ? 'span' : Link}
                  href={isDisabled ? undefined : row.original.url}
                  className={classnames('font-medium', {
                    'hover:text-primary': !isDisabled,
                    'text-gray-400 cursor-not-allowed': isDisabled,
                  })}
                  color={isDisabled ? 'text.secondary' : 'text.primary'}
                >
                  {row.original.progress}
                </Typography>
              </div>
            </div>
          )
        }
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: ({ row }) => (
          <Typography className={classnames('font-medium', {
            'text-green-600': row.original.status === 'aktif',
            'text-red-600': row.original.status === 'nonaktif',
          })}>
            {row.original.status}
          </Typography>
        ),
      }),
      columnHelper.accessor('progressValue', {
        header: 'Progress',
        cell: ({ row }) => {
          const isDisabled = row.original.status === 'nonaktif'
          const progressValue = Math.floor((row.original.completedTasks / row.original.totalTasks) * 100)

          return (
            <div className='flex items-center gap-4 min-is-48'>
              <Typography
                className={classnames('font-medium', {
                  'text-gray-400': isDisabled,
                  'text-primary': !isDisabled,
                })}
              >
                {`${progressValue}%`}
              </Typography>
              <LinearProgress
                color={isDisabled ? 'inherit' : 'primary'}
                value={progressValue}
                variant='determinate'
                className={classnames('is-full bs-2', {
                  'bg-gray-200': isDisabled,
                })}
                sx={{
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: isDisabled ? '#b0b0b0' : undefined,
                  },
                }}
              />
              <Typography
                variant='body2'
                className={classnames({
                  'text-gray-400': isDisabled,
                })}
              >
                {`${row.original.completedTasks}/${row.original.totalTasks}`}
              </Typography>
            </div>
          )
        }
      }),
    ],
    []
  )

  const table = useReactTable({
    data: dataProgress,
    columns,
    state: {
      rowSelection,
      globalFilter,
    },
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableRowSelection: true,
  })

  return (
    <Card>
      <div className='p-4'>
        <TextField
          label='Cari Progress'
          variant='outlined'
          value={globalFilter ?? ''}
          onChange={e => setGlobalFilter(e.target.value)}
          size='small'
        />
      </div>
      <div className='overflow-x-auto'>
        <table className={tableStyles.table}>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id}>
                    {!header.isPlaceholder && (
                      <div
                        className={classnames({
                          'flex items-center': header.column.getIsSorted(),
                          'cursor-pointer select-none': header.column.getCanSort()
                        })}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getIsSorted() && (
                          <i className={`text-xl tabler-chevron-${header.column.getIsSorted() === 'asc' ? 'up' : 'down'}`} />
                        )}
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
                  <Typography variant='body2' color='textSecondary'>
                    Data tidak tersedia
                  </Typography>
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {table.getRowModel().rows.map(row => (
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
    </Card>
  )
}

export default ProgressTable
