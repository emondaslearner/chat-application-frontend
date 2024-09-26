import React from "react";
import dayjs from "dayjs";
import { DatePicker as  DatePickers} from "@mui/x-date-pickers";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";

interface DatePickerProps {
    value: Date;
    onChange: (e: any) => void;
    className?: string;
    id?: string
}

const DatePicker: React.FC<DatePickerProps> = ({
    value,
    onChange,
    className,
    id
}) => {
  const themeConfig = useSelector((state: any) => state.themeConfig);

  const darkTheme = createTheme({
    palette: {
      mode: themeConfig?.mode,
    },
  });


  return (
    <div id={id} className="DatePicker">
      <ThemeProvider theme={darkTheme}>
        <DatePickers maxDate={dayjs(new Date())} className={`w-full ${className}`} onChange={onChange} defaultValue={dayjs(value)} />
      </ThemeProvider>
    </div>
  );
};

export default DatePicker;
