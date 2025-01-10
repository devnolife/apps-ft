'use client'
import { useState } from 'react'

import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

import { useEditor, EditorContent } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import { Underline } from '@tiptap/extension-underline'
import { Placeholder } from '@tiptap/extension-placeholder'
import { TextAlign } from '@tiptap/extension-text-align'

import CustomTextField from '@core/components/mui/TextField'
import '@/libs/styles/tiptapEditor.css'


const FormPengajuan = ({ textHeader, formData }) => {
  const [errors, setErrors] = useState({})

  const handleBlur = (key, value) => {
    if (value.trim() === '' && key !== 'keterangan') {
      setErrors(prevErrors => ({ ...prevErrors, [key]: 'Harus di isi ...' }))
    } else {
      setErrors(prevErrors => {
        const newErrors = { ...prevErrors }

        delete newErrors[key]

        return newErrors
      })
    }
  }

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Tulis sesuatu di sini...'
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph']
      }),
      Underline
    ],
    content: `
      <p>

      </p>
    `
  })

  return (
    <Card>
      <CardHeader title={textHeader} />
      <CardContent>
        <Grid container spacing={6} className='mbe-6'>
          {Object.keys(formData).map((key) => (
            key !== 'logo' && (
              <Grid item xs={12} sm={key === 'keterangan' ? 12 : 6} key={key}>
                {key === 'keterangan' ? (
                  <>
                    <Typography className='mbe-1'>Deskripsi (Opsional)</Typography>
                    <Card className='p-0 border shadow-none'>
                      <CardContent className='p-0'>
                        <Divider className='mli-6' />
                        <EditorContent editor={editor} className='bs-[135px] overflow-y-auto flex ' />
                      </CardContent>
                    </Card>
                  </>
                ) : key === 'jenisInstansi' ? (
                  <>
                    <Typography className='mbe-1'>Jenis Instansi</Typography>
                    <Select
                      size='small'
                      fullWidth
                      value={formData[key]}
                      onBlur={(e) => handleBlur(key, e.target.value)}
                      error={!!errors[key]}
                    >
                      <MenuItem value=''>Pilih jenis instansi</MenuItem>
                      <MenuItem value='Pemerintahan'>Pemerintahan</MenuItem>
                      <MenuItem value='Swasta'>Swasta</MenuItem>
                      <MenuItem value='Project'>Project</MenuItem>
                    </Select>
                    {errors[key] && <Typography color='error'>{errors[key]}</Typography>}
                  </>
                ) : key === 'tag_instansi' ? (
                  <>
                    <CustomTextField
                      fullWidth
                      label='Tag Instansi'
                      placeholder='Tentang apa'
                      onBlur={(e) => handleBlur(key, e.target.value)}
                      error={!!errors[key]}
                      helperText={errors[key]}
                    />
                  </>
                ) : (
                  <>
                    <CustomTextField
                      fullWidth
                      label={key.charAt(0).toUpperCase() + key.slice(1)}
                      placeholder={formData[key]}
                      onBlur={(e) => handleBlur(key, e.target.value)}
                      error={!!errors[key]}
                      helperText={errors[key]}
                    />
                  </>
                )}
              </Grid>
            )
          ))}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default FormPengajuan
