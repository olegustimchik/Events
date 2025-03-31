import "react-datepicker/dist/react-datepicker.css";
import DatePicker                       from "react-datepicker";
import { Dispatch, FC, SetStateAction } from "react";

export type DatePickerProps = {
  value  : Date;
  setDate: Dispatch<SetStateAction<Date>>;
};

const DateTimePicker: FC<DatePickerProps> = ({ setDate, value }) => {
  const onChange = (date: Date | null, _: any) => {
    if (date) {
      setDate(date);
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">Event Date & Time</label>
      <DatePicker
        selected={value}
        onChange={onChange}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        dateFormat="MMMM d, yyyy h:mm aa"
        placeholderText="Pick date & time"
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
};

export default DateTimePicker;
