import {  useNavigate }            from "react-router-dom";
import { FC, FormEvent, useState } from "react";

import { FormEmailInput }          from "../UI/inputs/email.input";
import { FormPasswordInput }       from "../UI/inputs/form.input";

export type UserFormProps = {
  isLogin   : boolean;
  submitForm: (email: string, password: string) => void;
};

export const UserForm: FC<UserFormProps> = ({ isLogin, submitForm }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [secondPass, setSecondPass] = useState<string>("");
  const [validEmail, setValidEmail] = useState<boolean>(true);
  const [validPass, setValidPass] = useState<boolean>(true);
  const validateEmail = (str: string) => {
    if (!str || (!/\S+@\S+\.\S+/.test(str))) {
      return false;
    }

    return true;
  };

  const validatePass = (str: string) => {
    if (!str || str.length < 8) {
      return false;
    }

    return true;
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setValidEmail(false);
    } else {
      setValidEmail(true);
    }

    if (!validatePass(password)) {
      setValidPass(false);

      return;
    } else {
      setValidPass(true);
    }

    if (!isLogin && password !== secondPass) {
      setValidPass(false);

      return;
    } else {
      setValidPass(true);
    }
    submitForm(email, password);
  };

  const goTo = (_: any) => {
    if (isLogin) {
      navigate("/signup");
    } else {
      navigate("/signin");
    }
  };

  return (
    <>
      <section className="user-form flex flex-col items-center w-80 sm:w-80 md:w-96 h-fit justify-center rounded-3xl p-4 bg-white">
        <h2 className="text-gray-700 sm:text-sm md:text-lg">Form</h2>
        <form onSubmit={onSubmit} className="flex flex-col w-full md:w-full sm:w-full justify-center items-center gap-y-2 mb-4" noValidate>
          <FormEmailInput  placeholder="Email" value={email} setValue={setEmail} id="email" valid={validEmail}/>
          <FormPasswordInput  placeholder="Password" value={password} setValue={setPassword} id="password" valid={validPass}/>
          {!isLogin && <FormPasswordInput  placeholder="Confirm password" value={secondPass} setValue={setSecondPass} id="confirm-password" valid={validPass}/>
          }
          <button type="submit" className="h-12 w-2/3 bg-blue-700 text-white py-2 border-1 border-gray-300 rounded-full hover:border-blue-400 hover:text-gray-700 hover:bg-white">
            { isLogin ? "Sign In" : "Sign Up"}
          </button>
        </form>
        <button className="h-12 w-2/3 bg-white text-gray-700 py-2  border-1 border-gray-300 rounded-full hover:border-blue-400" onClick={goTo}>
          { !isLogin ? "Sign In" : "Sign Up"}
        </button>
      </section>
    </>
  );
};
