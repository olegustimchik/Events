
import {  Navigate, Route, Routes } from "react-router-dom";
import { ReactNode }                from "react";

import { EventList }                from "./pages/events.page";
import { LoginPage }                from "./pages/login.page";
import { SignUpPage }               from "./pages/sign-up.page";
import "./App.css";

function App() {
  const routers:Array<{ path: string, elem: ReactNode}> = [
    { path: "signin", elem: <LoginPage/> },
    { path: "signup", elem: <SignUpPage/> },
    { path: "events", elem: <EventList/>    },
    { path: "*", elem: <Navigate to="/signin" replace /> },
  ];

  return (
    <Routes>
      {routers.map(rout => <Route path={rout.path} element={rout.elem} />)}
    </Routes>
  );
}

export default App;
