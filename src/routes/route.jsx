import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";

import { Home } from "../components/Home";
import { Login } from "../components/Login";

import { Signup } from "../components/Signup";
import { Student } from "../components/Student";

export const Rout = () => {
  const navigate = useNavigate();
  const token = useSelector((store) => store.user.token);
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  return (
    <>
      <Routes>
        <Route path={"/"} element={<Home />}></Route>
        <Route path={"/myStudent/*/:id"} element={<Student />} />
        <Route path={"/signup"} element={<Signup />}></Route>
        <Route path={"/login"} element={<Login />}></Route>
      </Routes>
    </>
  );
};
