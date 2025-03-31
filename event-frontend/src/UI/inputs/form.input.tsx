import { BiShow, BiHide }                                        from "react-icons/bi";
import   { ChangeEvent, Dispatch, FC, SetStateAction, useState } from "react";

export type FormPasswordInputProps = {
  id         : string;
  placeholder: string;
  value      : string;
  setValue   : Dispatch<SetStateAction<string>>;
  valid      : boolean;
};

export const FormPasswordInput: FC<FormPasswordInputProps> = ({ id, placeholder, setValue, valid, value }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  return (
    <div className="relative w-full">
      <input
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        id={id}
        placeholder={placeholder}
        className={` ${!valid ? "text-red-400 border-red-200" : ""} placeholder-gray-300 text-gray-700 text-sm h-12 w-full  outline-hidden border-0 border-b-1 px-3 pt-4 pb-1 text-sm focus:outline-none border-gray-300`}
      />
      <button
        type="button"
        onClick={() => setShowPassword(prev => !prev)}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-500"
      >
        {showPassword ? <BiHide/> : <BiShow/>}
      </button>
    </div>
  );
};
