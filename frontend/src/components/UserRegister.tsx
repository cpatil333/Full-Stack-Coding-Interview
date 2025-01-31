import { useState } from "react";
import { useDispatch } from "react-redux";
import { AddDispatch } from "../store/notesStore";
import { userRegisterAsync } from "../redux/notesSlice";
import { IUser } from "../models/user-model.tsx";
import { useNavigate } from "react-router-dom";

const UserRegister = () => {
  const dispatch = useDispatch<AddDispatch>();
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const changeEventHandler = (e: any) => {
    setInput({ ...input, [e.target.name]: [e.target.value] });
  };

  const handleSubmitform = async (e: any) => {
    e.preventDefault();
    try {
      const formsData = new FormData();
      formsData.append("name", input.name);
      formsData.append("email", input.email);
      formsData.append("password", input.password);

      const data = await dispatch(userRegisterAsync(formsData));
      const response = data.payload as IUser;
      if (!response) {
        alert("Data not saved..");
        return false;
      } else {
        alert("Data saved successfully..");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center h-screen">
        <div className="register_form bg-gray-100 px-4 py-4 rounded-xs border border-red-200">
          <form onSubmit={handleSubmitform}>
            <div className="mb-3">
              <label className="font-bold">Name :</label>
              <input
                type="text"
                name="name"
                placeholder="Enter Name"
                value={input.name}
                className="outline-none w-96 font-semibold px-2 py-2 border border-gray-300"
                onChange={changeEventHandler}
              />
            </div>
            <div className="mb-3">
              <label className="font-bold">Email :</label>
              <input
                type="email"
                name="email"
                value={input.email}
                placeholder="Enter Email"
                className="outline-none w-96 font-semibold px-2 py-2 border border-gray-300"
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <label className="font-bold">Password :</label>
              <input
                type="password"
                name="password"
                value={input.password}
                placeholder="Enter Password"
                className="outline-none w-96 font-semibold px-2 py-2 border border-gray-300"
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full mt-2 bg-gray-900 text-white px2 py-2 rounded-lg"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
