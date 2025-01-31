import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserRegister from "./components/UserRegister";
import { Provider } from "react-redux";
import store from "./store/notesStore";
//import Login from "./components/Login";
import Home from "./pages/Home";
import AddNotes from "./components/AddNotes";
import Profile from "./components/Profile";

function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Routes>
            {/* <Route path="/" element={<Login />} /> */}
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<UserRegister />} />
            <Route path="/add-notes" element={<AddNotes />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Router>
      </Provider>
    </>
  );
}

export default App;
