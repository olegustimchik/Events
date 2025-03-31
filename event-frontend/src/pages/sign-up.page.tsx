import { useNavigate }   from "react-router-dom";
import { FC, useEffect } from "react";

import { UserForm }      from "../components/user-form.component";
import { useAuthStore }  from "../stores/auth.store";

export const SignUpPage: FC = () => {
  const navigate = useNavigate();
  const register = useAuthStore(s => s.register);
  const token = useAuthStore(s => s.accessToken);

  useEffect(() => {
    if (token) {
      navigate("/events");
    }
  });

  const onSubmit = (email: string, password: string) => {
    register(email, password);
  };

  return (
    <>
      <UserForm isLogin={false} submitForm={onSubmit}/>
    </>
  );
};
