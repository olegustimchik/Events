import { CiSearch }                                  from "react-icons/ci";
import { ChangeEvent, Dispatch, FC, SetStateAction } from "react";

export type EmailInputProps = {
  id         : string;
  placeholder: string;
  value      : string | undefined;
  setValue   : Dispatch<SetStateAction<string>>;
};

export const SearchInput: FC<EmailInputProps> = ({ id, placeholder, setValue,  value }) => {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  return (
    <div className="relative w-full h-12 border rounded-3xl border-gray-300 items-center hover:border-blue-400">
      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-sm text-gray-500">
        <CiSearch/>
      </span>
      <input
        type="email"
        value={value}
        onChange={onChange}
        id={id}
        placeholder={placeholder}
        className="pl-7 placeholder-gray-300 text-gray-700 text-sm h-12 w-full pt-1 pb-1 text-sm focus:outline-none"
      />
    </div>
  );
};
