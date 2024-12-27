import React, { useState } from "react";
import AddPersyaratan from "./AddPersyaratan";
import TablePersyaratan from "./TablePersyaratan";
import { Grid, Button, Drawer, Switch, FormControlLabel } from "@mui/material";

const ListPersyaratan = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [user, setUser] = useState('admin');

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleRoleChange = (event) => {
    setUser(event.target.checked ? 'prodi' : 'admin');
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <Button variant="contained" color="primary" onClick={toggleDrawer(true)}>
          Tambah Persyaratan
        </Button>
      </Grid>
      <Grid item xs={6} style={{ textAlign: 'right' }}>
        <FormControlLabel
          control={<Switch size="medium"
            checked={user === 'prodi'} onChange={handleRoleChange} />}
          label="Prodi"
        />
      </Grid>
      <Grid item xs={12}>
        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
          <AddPersyaratan user={user} />
        </Drawer>
      </Grid>
      <Grid item xs={12}>
        <TablePersyaratan user={user} />
      </Grid>
    </Grid>
  );
};

export default ListPersyaratan;
