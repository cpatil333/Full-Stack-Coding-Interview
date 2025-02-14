import axios from "axios";
import { IGetNotes, ILogin, INotes, IUser } from "../models/user-model";

const API_BASE_URL = "http://localhost:8000/app/v1";

export const register = async (registerData: FormData) => {
  try {
    //console.log("FormData:", [...registerData.entries()]);
    const resopnse = await axios.post(
      `${API_BASE_URL}/user/register`,
      registerData,
      {
        headers: {
          "Content-Type": "application/json; charset=utf-8", // Note: This might need to be 'multipart/form-data' depending on your API.
        },
        withCredentials: true,
      }
    );
    return resopnse.data as IUser;
  } catch (error) {
    console.log("Error saving data", error);
    throw error;
  }
};

export const login = async (loginData: FormData) => {
  try {
    //console.log("FormData:", [...registerData.entries()]);
    const resopnse = await axios.post(`${API_BASE_URL}/user/login`, loginData, {
      headers: {
        "Content-Type": "application/json; charset=utf-8", // Note: This might need to be 'multipart/form-data' depending on your API.
      },
      withCredentials: true,
    });
    return resopnse.data as ILogin;
  } catch (error) {
    console.log("Error saving data", error);
    throw error;
  }
};

//Notes
export const getNotes = async (): Promise<INotes[]> => {
  try {
    const resopnse = await axios.get(`${API_BASE_URL}/notes/get`, {
      headers: {
        "Content-Type": "application/json; charset=utf-8", // Note: This might need to be 'multipart/form-data' depending on your API.
      },
      withCredentials: true,
    });
    return resopnse.data as INotes[];
  } catch (error) {
    console.log("Error receiving data", error);
    throw error;
  }
};

//Add new Notes
export const insertNotes = async (formsData: FormData) => {
  try {
    const resopnse = await axios.post(
      `${API_BASE_URL}/notes/insert`,
      formsData,
      {
        headers: {
          "Content-Type": "application/json; charset=utf-8", // Note: This might need to be 'multipart/form-data' depending on your API.
        },
        withCredentials: true,
      }
    );
    return resopnse.data as IGetNotes;
  } catch (error) {
    console.log("Error receiving data", error);
    throw error;
  }
};

//Edit exist Notes
export const editNotes = async (formsData: FormData) => {
  try {
    const resopnse = await axios.put(
      `${API_BASE_URL}/notes/update`,
      formsData,
      {
        headers: {
          "Content-Type": "application/json; charset=utf-8", // Note: This might need to be 'multipart/form-data' depending on your API.
        },
        withCredentials: true,
      }
    );
    return resopnse.data as IGetNotes;
  } catch (error) {
    console.log("Error receiving data", error);
    throw error;
  }
};

//get single exist Notes
export const getNotesById = async (id: string) => {
  try {
    const resopnse = await axios.get(`${API_BASE_URL}/notes/get/${id}`, {
      headers: {
        "Content-Type": "application/json; charset=utf-8", // Note: This might need to be 'multipart/form-data' depending on your API.
      },
      withCredentials: true,
    });
    return resopnse.data as IGetNotes;
  } catch (error) {
    console.log("Error receiving data", error);
    throw error;
  }
};

//delete single exist Notes
export const deleteNotesById = async (id: string) => {
  try {
    const resopnse = await axios.delete(`${API_BASE_URL}/notes/delete/${id}`, {
      headers: {
        "Content-Type": "application/json; charset=utf-8", // Note: This might need to be 'multipart/form-data' depending on your API.
      },
      withCredentials: true,
    });
    return resopnse.data as IGetNotes;
  } catch (error) {
    console.log("Error receiving data", error);
    throw error;
  }
};
