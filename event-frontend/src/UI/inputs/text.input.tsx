import   { ChangeEvent, Dispatch, FC, SetStateAction } from "react";

export type TextInputProps = {
  id         : string;
  placeholder: string;
  value      : string;
  setValue   : Dispatch<SetStateAction<string>>;
  valid      : boolean;
};

export const TextInput: FC<TextInputProps> = ({ id, placeholder, setValue, valid, value }) => {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={value}
        onChange={onChange}
        id={id}
        placeholder={placeholder}
        className={` ${!valid ? "text-red-400 border-red-200" : ""} placeholder-gray-300 text-gray-700 text-sm h-12 w-full  outline-hidden border-0 border-b-1 px-3 pt-4 pb-1 text-sm focus:outline-none border-gray-300`}
      />
    </div>
  );
};
