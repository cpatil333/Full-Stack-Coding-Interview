export interface IUser {
  name: string;
  email: string;
  password: string;
}
export interface ILogin {
  message: string;
  user: {
    _id: string;
    email: string;
    password: string;
  };
  token: string;
  success: boolean;
}

export interface  INotes {
  message: string;
  notesData: Array<{
    _id: string;
    title: string;
    content: string;
  }>;
  success: boolean;
}
export interface IGetNotes {
  message: string;
  data: {
    _id: string;
    title: string;
    content: string;
  };
  success: boolean;
}

export interface INotesManagementState {
  users: IUser[];
  login: ILogin[];
  notes: INotes[];
  getNotes: IGetNotes[];
}
