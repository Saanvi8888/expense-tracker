import React, { useState, useContext } from "react";
import Authlayout from "../../components/layouts/Authlayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/inputs/Input";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/UserContext";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      seterror("Please enter a valid email address.");
      return;
    }

    seterror("");

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN,{ email, password });
      const { token, user } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response?.data?.message) {
        seterror(error.response.data.message);
      } else {
        seterror("Something went wrong. Please try again.");
      }
    }
  };

return (
  <Authlayout>
    <div className="w-full flex justify-center items-center min-h-screen px-6">

      <div className="w-full max-w-md">
        <h3 className="text-2xl font-semibold text-black text-center">
          Welcome Back
        </h3>

        <p className="text-sm text-slate-600 mt-2 mb-10 text-center">
          Please enter your details to log in
        </p>

        <form onSubmit={handleLogin}>
          <Input
            value={email}
            onChange={({ target }) => setemail(target.value)}
            label="Email address"
            placeholder="name@email.com"
            type="text"
          />

          <Input
            value={password}
            onChange={({ target }) => setpassword(target.value)}
            label="Password"
            placeholder="Minimum 8 characters"
            type="password"
          />

          {error && (
            <p className="text-red-500 text-xs mt-2">{error}</p>
          )}

          <button type="submit" className="btn-primary mt-6 w-full">
            Sign in
          </button>

          <p className="text-sm text-slate-600 mt-6 text-center">
            Don’t have an account?{" "}
            <Link className="font-medium text-primary hover:underline" to="/signup">
              Sign up
            </Link>
          </p>
        </form>
      </div>

    </div>
  </Authlayout>
);
};

export default Login;