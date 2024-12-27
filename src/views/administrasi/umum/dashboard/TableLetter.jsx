'use client'
import { useState, useMemo } from 'react'
import IconButton from '@mui/material/IconButton'
import Chip from '@mui/material/Chip'
import { createColumnHelper } from '@tanstack/react-table'
import DataTable from '@components/DataTable'
import ViewLetter from './ViewLetter'
import CratedLetter from './CardWelcome'
import OptionMenu from '@core/components/option-menu'
import { getInitials } from '@/utils/getInitials'
import CustomAvatar from '@core/components/mui/Avatar'
import { Checkbox, Typography } from '@mui/material'

const statusColor = {
  Diproses: 'warning',
  'Menunggu persetujuan': 'info',
  Disetujui: 'success'
}

const columnHelper = createColumnHelper()

const TableLetter = ({ db }) => {
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [data, setData] = useState(...[db])
  const [viewSuratOpen, setViewSuratOpen] = useState(false)
  const [selectedSurat, setSelectedSurat] = useState(null)

  const handleViewSurat = surat => {
    setSelectedSurat(surat)
    setViewSuratOpen(true)
  }

  const getAvatar = params => {
    const { avatar, fullName } = params

    if (avatar) {
      return <CustomAvatar src={avatar} size={34} />
    } else {
      return <CustomAvatar size={34}>{getInitials(fullName)}</CustomAvatar>
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
            {getAvatar({ avatar: row.original.avatar, fullName: row.original.penerima })}
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
        title='Filters'
        globalFilterPlaceholder='Search User'
        addButtonLabel='Tambahkan Surat Baru'
        onAddButtonClick={() => setAddUserOpen(!addUserOpen)}
      />
      <CratedLetter
        open={addUserOpen}
        handleClose={() => setAddUserOpen(!addUserOpen)}
        userData={data}
        setData={setData}
      />
      {selectedSurat && (
        <ViewLetter
          open={viewSuratOpen}
          handleClose={() => setViewSuratOpen(false)}
          suratData={selectedSurat}
        />
      )}
    </>
  )
}

export default TableLetter
