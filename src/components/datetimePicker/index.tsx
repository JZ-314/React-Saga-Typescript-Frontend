import React from 'react';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

const CustomDateTimePicker = ({ placeholder, value, onChange }: any) => {
  return (
    <div>
      <Datetime
        inputProps={{ placeholder }}
        className="datetime-picker"
        timeFormat={true}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default CustomDateTimePicker;
