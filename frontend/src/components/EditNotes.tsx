import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AddDispatch } from "../store/notesStore";
import {
  ediNotesAsync,
  getnotesByIdAsync,
  insertNotesAsync,
} from "../redux/notesSlice";
import { IGetNotes, INotes } from "../models/user-model";

const EditNotes: React.FC = () => {
  const dispatch = useDispatch<AddDispatch>();
  const [input, setInput] = useState({
    _id: "",
    title: "",
    content: "",
  });
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    getNotesById();
  }, []);

  const getNotesById = async () => {
    try {
      const data = await dispatch(getnotesByIdAsync(params.id!.toString()));
      const response = await (data.payload as IGetNotes).data;
      if (response) {
        setInput({
          _id: response._id,
          title: response.title,
          content: response.content,
        });
      } else {
        alert("No Notes found..");
        return false;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const formsData = new FormData();
      formsData.append("id", input._id);
      formsData.append("title", input.title);
      formsData.append("content", input.content);

      const data = await dispatch(ediNotesAsync(formsData));
      const response = data.payload as INotes;

      if (!response) {
        alert("Data not saved..");
        return false;
      } else {
        alert("Data updated successfully..");
        navigate("/");
      }
    } catch (error) {
      console.error("Error while submitting the form: ", error);
      throw error;
    }
  };

  const handleChangeEvent = (e: any) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex items-center justify-center">
      <div className="lg:w-150 md:w-150 w-85 border border-gray-500 my-10 px-5 py-5">
        <form onSubmit={handleSubmit}>
          <label className="hidden">{input._id}</label>
          <div>
            <label>Title</label>    
            <input
              type="text"
              name="title"
              value={input.title}
              placeholder="Enter Title"
              onChange={handleChangeEvent}
              className="lg:w-100 md:w-100 w-70 border border-gray-600 px-2 py-2 m-2 outline-none focus:border-amber-500"
            />
          </div>
          <div>
            <div>
              <label>Content</label>
            </div>
            <textarea
              name="content"
              rows={5}
              value={input.content}
              placeholder="Enter Content"
              onChange={handleChangeEvent}
              className="lg:w-100 md:w-100 w-70 border border-gray-600 px-2 py-2 m-2 outline-none focus:border-amber-500"
            ></textarea>
          </div>
          <div className="mt-5">
            <button
              type="submit"
              className="w-full bg-black px-3 py-3 text-white font-bold rounded-xl"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditNotes;
