import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { login, register, reset } from "../features/auth/authSlice";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Spinner from "../components/Spinner";

const LoginPage = () => {
  const [isInLoginYN, setIsInLoginYN] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isError, message, isSuccess, user } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    // dispatch(reset());
  }, [isError, message]);

  useEffect(() => {
    if (isSuccess || user) {
      navigate("/");
    }
  }, [isSuccess, user, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const userData = {
      email: data.get("email"),
      password: data.get("password"),
    };

    // if !isInLoginYN -> register, else follow up to regular login.
    if (!isInLoginYN) {
      userData.name = data.get("name");
      return dispatch(register(userData));
    }

    dispatch(login(userData));
  };

  return (
    <main className="container">
      <div className="center f-col">
        <form id="loginForm" className="login" onSubmit={handleSubmit}>
          <div className="flex a-center mb-2">
            <div
              className={`auth-header ${isInLoginYN && "active"}`}
              onClick={() => setIsInLoginYN(true)}
            >
              <h2>Login</h2>
            </div>
            <div
              className={`auth-header ${!isInLoginYN && "active"}`}
              onClick={() => setIsInLoginYN(false)}
            >
              <h2>Register</h2>
            </div>
          </div>
          {!isInLoginYN && (
            <div className="form-control">
              <label htmlFor="name">Name</label>
              <input name="name" id="name" placeholder="Name" />
            </div>
          )}
          <div className="form-control">
            <label htmlFor="Name">Email</label>
            <input type="email" name="email" id="email" placeholder="Email" />
          </div>
          <div className="form-control">
            <label htmlFor="Name">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
            />
          </div>
          <div className="custom-hr"></div>
          <button type="submit" className="btn loginButton btn-fullwidth mt-2">
            {isInLoginYN ? "Login" : "Register"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default LoginPage;
