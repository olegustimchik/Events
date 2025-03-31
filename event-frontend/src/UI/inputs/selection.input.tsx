import { ChangeEvent, Dispatch, FC, SetStateAction } from "react";

export type SelectionInputProps = {
  id      : string;
  label   : string;
  options : Array<{name: string, value: string}>;
  value   : string;
  setValue: Dispatch<SetStateAction<string>>;
};

export const SelectionInput: FC<SelectionInputProps> = ({ id, label, options, setValue, value }) => {
  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  return (
    <div className="flex flex-row gap-2 bg-white p-2 items-center">
      <label htmlFor={id} className="text-md font-medium text-gray-700">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={ onChange}
        className="bg-white text-sm rounded-3xl px-3 pr-4 py-2 border border-gray-300 border-1 focus:outline-none hover:border-blue-400"
      >
        { options.map((item, index) => <option key={index} value={item.value}>{item.name}</option>)}
      </select>
    </div>
  );
};
