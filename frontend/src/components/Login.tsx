import { useState } from "react";
import { useDispatch } from "react-redux";
import { AddDispatch } from "../store/notesStore";
import { userLoginAsync } from "../redux/notesSlice";
import { ILogin } from "../models/user-model";
import { useNavigate } from "react-router-dom";

const Login = () => {
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
        alert("login successfully..");
        navigate("/register");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center h-screen">
        <div className="max-w-2xl bg-white border border-gray-500 px-5 py-5 rounded-xl ">
          <form onSubmit={submitHandle}>
            <div className="mb-3">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={input.email}
                placeholder="Enter Email"
                className="outline-none border border-gray-300 px-2 py-2"
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
                className="outline-none border border-gray-300 px-2 py-2"
                onChange={changeEventHandle}
              />
            </div>
            <div className="mb-3">
              <button
                type="submit"
                className="w-full font-bold bg-gray-900 text-white px-2 py-2 rounded-lg"
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
