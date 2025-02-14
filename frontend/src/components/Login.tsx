import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AddDispatch } from "../store/notesStore";
import { userLoginAsync } from "../redux/notesSlice";
import { ILogin } from "../models/user-model";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const dispatch = useDispatch<AddDispatch>();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const changeEventHandle = (e: any) => {
    setInput({ ...input, [e.target.name]: [e.target.value] });
  };

  const submitHandle = async (e: any) => {
    e.preventDefault();
    try {
      const formsData = new FormData();
      formsData.append("email", input.email);
      formsData.append("password", input.password);

      const data = await dispatch(userLoginAsync(formsData));
      const response = data.payload as ILogin;
      console.log(response.message);
      if (!response) {
        alert("Invalid user name or pasword");
        return false;
      } else {
        alert(response.message);
        // ✅ Store the login state
        localStorage.setItem("isLogged", "true"); // Mark user as logged in
        localStorage.setItem("token", response.token); // Store token (if needed)
        navigate("/"); // Redirect after login
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center lg:h-screen px-5 py-5">
        <div className="lg:w-xl md:w-xl w-full mt-10 bg-white border border-gray-500 px-5 py-5 rounded-xl ">
          <form onSubmit={submitHandle}>
            <div className="mb-3">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={input.email}
                placeholder="Enter Email"
                className="lg:w-[450px] md:w-[450px] w-[300px] ml-3 outline-none border border-gray-300 px-2 py-2"
                onChange={changeEventHandle}
              />
            </div>
            <div className="mb-3">
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={input.password}
                placeholder="Enter Password"
                className="lg:w-[450px] md:w-[450px] w-[300px] ml-3 outline-none border border-gray-300 px-2 py-2"
                onChange={changeEventHandle}
              />
            </div>
            <div className="mb-3">
              <button
                type="submit"
                className="lg:w-full md:w-full w-[300px] font-bold bg-gray-900 text-white px-2 py-2 rounded-lg"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
