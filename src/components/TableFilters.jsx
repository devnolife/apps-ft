import { useEffect, useState } from 'react';

import { MenuItem } from '@mui/material';

import CustomTextField from '@core/components/mui/TextField';

const TableFilters = ({ setData, tableData, filterField, filterOptions = [], label }) => {
  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    const filteredData = tableData?.filter(item => {
      if (filterValue && String(item[filterField]) !== filterValue) return false;

      return true;
    });

    setData(filteredData || []);
  }, [filterValue, tableData, setData, filterField]);

  return (
    <CustomTextField
      sx={{ minWidth: 200 }}
      select
      value={filterValue}
      onChange={e => setFilterValue(e.target.value)}
      SelectProps={{ displayEmpty: true }}
    >
      <MenuItem value=''>{label}</MenuItem>
      {filterOptions.map(option => (
        <MenuItem key={option} value={String(option)}>
          {option}
        </MenuItem>
      ))}
    </CustomTextField>
  );
};

export default TableFilters;
