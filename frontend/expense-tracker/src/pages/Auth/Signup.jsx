import React, { useState, useContext } from "react";
import Authlayout from "../../components/layouts/Authlayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/inputs/Input";
import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelector from "../../components/inputs/ProfilePhotoSelector";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/UserContext";
import uploadImage from "../../utils/uploadImage";

const Signup = () => {
  const [profilePic, setprofilePic] = useState(null);
  const [fullName, setFullname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!fullName) return seterror("Please enter your name");
    if (!validateEmail(email))
      return seterror("Please enter a valid email address");
    if (!password) return seterror("Please enter the password");

    seterror("");

    let profileImageUrl = "";

    try {
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post(
        API_PATHS.AUTH.REGISTER,
        {
          fullName,
          email,
          password,
          profileImageUrl,
        }
      );

      const { user, token } = response.data;

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
      <div className="w-full flex justify-center items-start pt-10 md:pt-16 px-6">
        <div className="w-full max-w-md">

          <h3 className="text-2xl font-semibold text-black text-center">
            Create an account
          </h3>

          <p className="text-sm text-slate-600 mt-2 mb-8 text-center">
            Join us today by entering your details
          </p>

          <form onSubmit={handleSignup}>
            <div className="mb-6 flex justify-center">
              <ProfilePhotoSelector
                image={profilePic}
                setImage={setprofilePic}
              />
            </div>

            <div className="space-y-4">
              <Input
                value={fullName}
                onChange={({ target }) => setFullname(target.value)}
                label="Full name"
                placeholder="Saanvi"
                type="text"
              />

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
            </div>

            {error && (
              <p className="text-red-500 text-xs mt-3">
                {error}
              </p>
            )}

            <button type="submit" className="btn-primary mt-6 w-full">
              Sign up
            </button>

            <p className="text-sm text-slate-600 mt-6 text-center">
              Already have an account?{" "}
              <Link
                className="font-medium text-primary hover:underline"
                to="/login"
              >
                Sign in
              </Link>
            </p>

          </form>
        </div>
      </div>
    </Authlayout>
  );
};

export default Signup;