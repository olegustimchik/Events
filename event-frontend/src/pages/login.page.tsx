import { useNavigate }   from "react-router-dom";
import { FC, useEffect } from "react";

import { UserForm }      from "../components/user-form.component";
import { useAuthStore }  from "../stores/auth.store";

export const LoginPage: FC = () => {
  const navigate = useNavigate();
  const login = useAuthStore(s => s.login);
  const token = useAuthStore(s => s.accessToken);

  useEffect(() => {
    if (token) {
      navigate("/events");
    }
  });

  const onSubmit = (email: string, password: string) => {
    login(email, password);
    if (token) {
      navigate("/events");
    }
  };

  return (
    <>
      <UserForm isLogin={true} submitForm={onSubmit}/>
    </>
  );
};
