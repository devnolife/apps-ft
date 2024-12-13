import { useEffect, useState } from 'react';
import CustomTextField from '@core/components/mui/TextField';

const DebouncedInput = ({ value: initialValue, onChange, debounce = 500, ...props }) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <CustomTextField
      {...props}
      value={value}
      onChange={e => setValue(e.target.value)}
    />
  );
};

export default DebouncedInput;
