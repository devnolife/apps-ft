import Grid from "@mui/material/Grid"
import axios from "axios"
import { useState } from "react"
import { TextField, Button, RadioGroup, FormControlLabel, Radio, Select, MenuItem } from "@mui/material"

const AddPersyaratan = ({ user }) => {
  const [formData, setFormData] = useState({
    prodi_kode_prodi: "",
    nama: "",
    logo: "",
    url_check: "",
    response_should_be: "",
    is_upload_file: true,

    is_activated: true,
    created_by: user
  });
  const [userType, setUserType] = useState(user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value === "true"
    });
  };

  const handleUserTypeChange = (e) => {
    const { value } = e.target;
    setUserType(value);
    if (value === 'prodi') {
      setFormData({
        ...formData,
        url_check: "",
        response_should_be: "",
        created_by: user
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const mutation = `
      mutation CreateKkpSyarat {
        createKkpSyarat(
          input: {
            prodi_kode_prodi: "${formData.prodi_kode_prodi}"
            nama: "${formData.nama}"
            logo: "${formData.logo}"
            url_check: "${formData.url_check}"
            response_should_be: "${formData.response_should_be}"
            is_upload_file: ${formData.is_upload_file}
            is_activated: ${formData.is_activated}
            created_by: "${formData.created_by}"
          }
        ) {
          id
          nama
        }
      }
    `;
    try {
      const response = await axios.post("https://superapps.if.unismuh.ac.id/graphql", { query: mutation });
      console.log(response.data);
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

