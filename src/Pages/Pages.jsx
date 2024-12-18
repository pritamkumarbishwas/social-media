import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Feed from "./Feed";
import Login from "./Login";
import Profile from "./Profile";
import EditProfile from "./EditProfile";
import AddPost from "./AddPost";
import { AuthContext } from "../AppContext/AppContext";

const Pages = () => {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/feed" /> : <Login />} />

      <Route path="/feed" element={user ? <Feed /> : <Navigate to="/" />} />

      <Route
        path="/profile"
        element={user ? <Profile /> : <Navigate to="/" />}
      />

      <Route
        path="/profile/edit"
        element={user ? <EditProfile /> : <Navigate to="/" />}
      />

      <Route path="/post" element={user ? <AddPost /> : <Navigate to="/" />} />
    </Routes>
  );
};

export default Pages;
