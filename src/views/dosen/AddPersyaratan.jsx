import Grid from "@mui/material/Grid"
import axios from "axios"
import { useState } from "react"
import { TextField, Button, RadioGroup, FormControlLabel, Radio, Select, MenuItem } from "@mui/material"
import { CREATE_KKP_SYARAT, UPDATE_KKP_SYARAT } from 'src/graphql/mutations';
import { useDispatch, useSelector } from 'react-redux';
import { setFormData, resetFormData } from 'src/store/slices/formSlice';

const AddPersyaratan = ({ user }) => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form);
  const [userType, setUserType] = useState(user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFormData({ [name]: value }));
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFormData({ [name]: value === "true" }));
  };

  const handleUserTypeChange = (e) => {
    const { value } = e.target;
    setUserType(value);
    if (value === 'prodi') {
      dispatch(setFormData({
        url_check: "",
        response_should_be: "",
        created_by: user
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const mutation = formData.id ? UPDATE_KKP_SYARAT : CREATE_KKP_SYARAT;
    const variables = {
      input: {
        prodi_kode_prodi: formData.prodi_kode_prodi,
        nama: formData.nama,
        logo: formData.logo,
        url_check: formData.url_check,
        response_should_be: formData.response_should_be,
        is_upload_file: formData.is_upload_file,
        is_activated: formData.is_activated,
        created_by: formData.created_by
      }
    };
    if (formData.id) {
      variables.id = formData.id;
    }
    try {
      const response = await axios.post("https://superapps.if.unismuh.ac.id/graphql", { query: mutation, variables });
      console.log(response.data);
      dispatch(resetFormData());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Grid>
      <h1>Prasyarat</h1>
      <Select value={userType} onChange={handleUserTypeChange} fullWidth margin="normal">
        <MenuItem value="prodi">Prodi</MenuItem>
        <MenuItem value="admin">Admin</MenuItem>
      </Select>
      <form onSubmit={handleSubmit}>
        <TextField label="Prodi Kode Prodi" name="prodi_kode_prodi" value={formData.prodi_kode_prodi} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Nama Syarat" name="nama" value={formData.nama} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Logo" name="logo" value={formData.logo} onChange={handleChange} fullWidth margin="normal" />
        {userType === 'admin' && (
          <>
            <TextField label="URL Check" name="url_check" value={formData.url_check} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="Response Should Be" name="response_should_be" value={formData.response_should_be} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="Created By" name="created_by" value={formData.created_by} onChange={handleChange} fullWidth margin="normal" />
          </>
        )}
        <RadioGroup name="is_upload_file" value={formData.is_upload_file.toString()} onChange={handleRadioChange}>
          <FormControlLabel value="true" control={<Radio />} label="Butuh Upload Gambar" />
          <FormControlLabel value="false" control={<Radio />} label="Tidak Butuh Upload Gambar" />
        </RadioGroup>

        <RadioGroup name="is_activated" value={formData.is_activated.toString()} onChange={handleRadioChange}>
          <FormControlLabel value="true" control={<Radio />} label="Langsung Aktif" />
          <FormControlLabel value="false" control={<Radio />} label="Tidak Langsung Aktif" />
        </RadioGroup>
        <Button type="submit" variant="contained" color="primary">Submit</Button>
      </form>
    </Grid>
  )
}

export default AddPersyaratan
