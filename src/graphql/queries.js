export const GET_ALL_KKP_SYARAT = `
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

export const GET_MAHASISWA = `
  query Mahasiswa($nim: String!) {
    mahasiswa(nim: $nim) {
      nim
      kodeProdi
      nama
    }
  }
`;
