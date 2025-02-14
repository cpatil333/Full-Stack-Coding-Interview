import Notes from "../models/Notes.js";

export const addNotes = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (title === "" || content === "") {
      return res
        .status(400)
        .json({ message: "Something wrong", success: false });
    }

    const data = await Notes.create({
      title,
      content,
    });

    return res
      .status(201)
      .json({ message: "Data saved successfully..", success: true });
  } catch (error) {
    console.log(error);
  }
};

export const editNotes = async (req, res) => {
  try {
    const { id, title, content,  } = req.body;
  
    if (title === "" || content === "") {
      return res
        .status(400)
        .json({ message: "Something wrong", success: false });
    }

    // const titleId = req.params.id;
    const notesData = await Notes.findById(id);

    if (!notesData) {
      return res
        .status(400)
        .json({ message: "Notes doen't not exist", success: false });
    }

    notesData.title = title;
    notesData.content = content;

    const data = await notesData.save();

    return res
      .status(201)
      .json({ message: "Data updated successfully..", data, success: true });
  } catch (error) {
    console.log(error);
  }
};

export const notesById = async (req, res) => {
  try {
    const titleId = req.params.id;
    const notesData = await Notes.findById(titleId);

    if (!notesData) {
      return res
        .status(400)
        .json({ message: "Notes doen't not exist", success: false });
    }

    return res.status(201).json({
      message: "Data received successfully..",
      data: notesData,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const notesGetAll = async (req, res) => {
  try {
    const notesData = await Notes.find({});

    if (!notesData) {
      return res
        .status(400)
        .json({ message: "Notes data doen't not exist", success: false });
    }

    return res.status(201).json({
      message: "Data received successfully..",
      notesData,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const notesDeleteById = async (req, res) => {
  try {
    const titleId = req.params.id;
    const notesData = await Notes.findById(titleId);

    if (!notesData) {
      return res
        .status(400)
        .json({ message: "Notes doen't not exist", success: false });
    }

    const deletedNotes = await Notes.findOneAndDelete({ _id: titleId });

    if (!deletedNotes) {
      return res.status(400).json({
        message: "Data failed",
        success: false,
      });
    }

    return res.status(201).json({
      message: "Data deleted successfully..",
      data: notesData,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
