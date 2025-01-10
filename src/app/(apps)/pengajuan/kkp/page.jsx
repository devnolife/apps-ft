import Grid from "@mui/material/Grid";

import { sub } from "date-fns";

import HeaderPengajuan from "@/components/pengajuan/HeaderPengajuan";
import UploadFileSingle from "@/components/image/UploadSingleFile";
import FormPengajuan from "@/views/pengajuan/kkp/FormInstansi";

const FormPengisian = {
  nama: '', alamat: '', logo: '', keterangan: '',
}

const FormPengisianSubInstansi = {
  nama: '', alamat: '', keterangan: '', jenisInstansi: '', tag_instansi: ['']
}

const PengajuanInstansi = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <HeaderPengajuan
          textHeader={'Pengajuan Lokasi Instansi'}
          subHeader={'Isi form pengajuan instansi di bawah ini'} />
      </Grid>
      <Grid item xs={12} md={9}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <FormPengajuan textHeader={'Pengajuan Instansi'} formData={FormPengisian} />
          </Grid>
          <Grid item xs={12}>
            <FormPengajuan textHeader={'Sub Instansi'} formData={FormPengisianSubInstansi} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <UploadFileSingle textHeader={'Upload Gambar'} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
};

export default PengajuanInstansi;
