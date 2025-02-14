import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import UserRegister from "./components/UserRegister";
import { Provider } from "react-redux";
import store from "./store/notesStore";
//import Home from "./pages/Home";
import AddNotes from "./components/AddNotes";
import Profile from "./components/Profile";
import Sidebar from "./components/Sidebar";
import Login from "./components/Login";
import HeroSection from "./components/HeroSection";
import React, { useEffect, useState } from "react";
import Home from "./pages/Home";
import EditNotes from "./components/EditNotes";

const App: React.FC = () => {
  const [isLogged, setIsLogged] = useState<boolean>(false);

  useEffect(() => {
    const IoggedIn = localStorage.getItem("isLogged") === "true";
    setIsLogged(IoggedIn);
  });

  return (
    <>
      <Provider store={store}>
        <Router>
          <Routes>
            {/* Redirect unauthenticated users */}
            <Route
              path="/"
              element={isLogged ? <Sidebar /> : <Navigate to="/login" />}
            >
              <Route index element={<Home />} />
              <Route path="/hero-section" element={<HeroSection />} />
              <Route path="/register" element={<UserRegister />} />
              <Route path="/add-notes" element={<AddNotes />} />
              <Route path="/edit-notes/:id" element={<EditNotes />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </Provider>
    </>
  );
};

export default App;
