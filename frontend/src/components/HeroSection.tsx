import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AddDispatch } from "../store/notesStore";
import { deletenotesByIdAsync, notesAsync } from "../redux/notesSlice";
import { IGetNotes, INotes } from "../models/user-model";
import { Link } from "react-router-dom";

const HeroSection: React.FC = () => {
  const [notesData, setNotesData] = useState<INotes | null>(null);
  const dispatch = useDispatch<AddDispatch>();

  useEffect(() => {
    getNotesBook();
  }, []);

  const getNotesBook = async () => {
    try {
      const data = await dispatch(notesAsync());
      const response = (await data.payload) as INotes;
      //console.log(response);
      if (response) {
        setNotesData(response);
      }
    } catch (error) {
      console.log("Something went wrong ", error);
      throw error;
    }
  };

  const handleDeleteNotes = async (notesId: any) => {
    try {
      const data = await dispatch(deletenotesByIdAsync(notesId));
      const response = await (data.payload as IGetNotes).data;
      if (response) {
        getNotesBook();
        return true;
      } else {
        alert("Notes Cannot delete");
        return false;
      }
    } catch (error) {}
  };
  return (
    <div className="items-center justify-center">
      {notesData?.notesData?.map((item, index) => (
        <div
          key={index}
          className="md:w-135 lg:h-[150px] md:h-[160px] h-[220px] lg:w-200 bg-green-400 border border-gray-500 mb-1 p-4 relative"
        >
          <div>
            <span>Notes: {item.title}</span>
            <p>{item.content}</p>
          </div>
          <div className="absolute bottom-2 mt-25 right-2 flex h-[25px] space-x-2">
            <button className="font-bold">
              <Link to={`/edit-notes/${item._id}`}> Edit</Link>
            </button>
            <button
              className="font-bold"
              onClick={() => handleDeleteNotes(item._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeroSection;
