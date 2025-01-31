import React, { useState } from "react";

const AddNotes = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
  });

  const handleSubmit = () => {};

  const handleChangeEvent = (e: any) => {
    setInput({ ...input, [e.targrt.name]: [e.target.value] });
  };

  return (
    <div className="max-w-120 border h-screen items-center justify-center border-gray-500 my-5">
      <form onChange={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            placeholder="Enter Title"
            onChange={handleChangeEvent}
          />
        </div>
        <div>
          <label>Description</label>
          <input
            type="text"
            placeholder="Enter Description"
            onChange={handleChangeEvent}
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddNotes;
