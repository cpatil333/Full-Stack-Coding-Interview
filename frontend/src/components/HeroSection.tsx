import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AddDispatch } from "../store/notesStore";
import { notesAsync } from "../redux/notesSlice";
import { INotes } from "../models/user-model";

const HeroSection = () => {
  const [notesData, setNotesData] = useState<INotes | null>(null);
  const dispatch = useDispatch<AddDispatch>();

  useEffect(() => {
    const getNotesBook = async () => {
      try {
        const data = await dispatch(notesAsync());
        const response = (await data.payload) as INotes;
        console.log(response);
        if (response) {
          setNotesData(response);
        }
      } catch (error) {
        console.log("Something went wrong ", error);
        throw error;
      }
    };
    getNotesBook();
  }, []);

  return (
    <div>
      {notesData?.notesData?.map((item, index) => (
        <div
          key={index}
          className="w-200 ml-3 bg-green-400 border border-gray-500 mb-1 p-4 relative"
        >
          <div>
            <span>Notes: {item.title}</span>
            <p>{item.content}</p>
          </div>
          <div className="absolute bottom-2 right-2 flex space-x-2">
            <button className="font-bold">Edit</button>
            <button className="font-bold">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeroSection;
