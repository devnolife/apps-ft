export const CREATE_KKP_SYARAT = `
  mutation CreateKkpSyarat($input: KkpSyaratInput!) {
    createKkpSyarat(input: $input) {
      id
      prodi_kode_prodi
      nama
    }
  }
`;

export const UPDATE_KKP_SYARAT = `
  mutation UpdateKkpSyarat($id: String!, $input: KkpSyaratInput!) {
    updateKkpSyarat(id: $id, input: $input) {
      id
      prodi_kode_prodi
      nama
    }
  }
`;

export const DELETE_KKP_SYARAT = `
  mutation DeleteKkpSyarat($id: String!) {
    deleteKkpSyarat(id: $id) {
      id
    }
  }
`;
