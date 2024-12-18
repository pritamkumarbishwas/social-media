import { Button } from "@material-tailwind/react";
import React, { useContext, useState, useCallback, useEffect } from "react";
import { FaPlus, FaPen, FaArrowLeft } from "react-icons/fa";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/firebase";
import { AuthContext } from "../AppContext/AppContext";
import debounce from "lodash.debounce";
import background from "../assets/background.png";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();

  const { user, updateName, updateBio } = useContext(AuthContext);
  console.log("user", user);
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [bio, setBioChange] = useState(user?.bio || "");

  console.log("bio", bio);

  const [profileImage, setProfileImage] = useState(
    user?.photoURL || "Guest User"
  );
  const [headerImage, setHeaderImage] = useState(null);

  useEffect(() => {
    if (user?.displayName) {
      setDisplayName(user.displayName);
    }
    if (user?.photoURL) {
      setProfileImage(user.photoURL);
    }
    if (user?.bio) {
      setBioChange(user.bio);
    }
  }, [user]);

  const debouncedUpdateName = useCallback(
    debounce((name) => {
      if (user?.uid) {
        updateName(user.uid, name);
      }
    }, 1000),
    [user?.uid, updateName]
  );

  const debouncedUpdateBioChange = useCallback(
    debounce((bio) => {
      if (user?.uid && bio !== user.bio) {
        updateBio(user.uid, bio);
      }
    }, 1000),
    [user?.uid, updateBio]
  );

  if (!user?.uid) {
    console.error("User is not authenticated");
    return <div>Please log in first.</div>;
  }

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setDisplayName(newName);
    debouncedUpdateName(newName);
  };

  const handleBioChange = (e) => {
    const newBio = e.target.value;
    setBioChange(newBio);
    debouncedUpdateBioChange(newBio);
  };

  const handleImageChange = (e, imageType) => {
    const file = e.target.files[0];
    if (imageType === "profile") {
      setProfileImage(file);
    } else if (imageType === "header") {
      setHeaderImage(file);
    }
  };

  const handleAddPostClick = () => {
    navigate("/post");
  };

  return (
    <div className="bg-black p-0" style={{ height: "100vh" }}>
      <div className="max-w-sm mx-auto bg-white shadow-lg overflow-hidden relative h-full">
        {/* Header with background image */}
        <div
          className="relative h-40 sm:h-40"
          style={{
            backgroundImage: `url(${background})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "0 0 20px 20px",
          }}
        >
          <button
            className="absolute top-2 left-2 bg-white text-gray-500 p-2 rounded-full shadow-md"
            title="Go Back"
            onClick={() => window.history.back()}
          >
            <FaArrowLeft size={14} />
          </button>

          <label
            htmlFor="header-image"
            className="absolute bottom-2 right-2 bg-white text-gray-500 p-2 rounded-full shadow-md cursor-pointer"
            title="Edit Header Image"
          >
            <FaPen size={14} />
          </label>
          <input
            id="header-image"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleImageChange(e, "header")}
          />
        </div>

        <div className="relative -mt-12 px-4">
          <div className="relative w-24 h-24 sm:w-32 sm:h-32">
            <img
              src={profileImage}
              alt="Profile"
              className="w-full h-full rounded-full border-4 border-white"
              style={{ marginLeft: "0" }}
            />
            <label
              htmlFor="profile-image"
              className="absolute bottom-0 right-0 bg-white text-gray-500 p-2 rounded-full shadow-md cursor-pointer"
              title="Edit Profile Picture"
            >
              <FaPen size={14} />
            </label>
            <input
              id="profile-image"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleImageChange(e, "profile")}
            />
          </div>
        </div>

        <div className="mt-4 text-left px-4">
          <input
            type="text"
            value={displayName}
            onChange={handleNameChange}
            placeholder="Name"
            className="w-full mb-3 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <textarea
            value={bio}
            onChange={handleBioChange}
            placeholder="Bio"
            rows="3"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        {/* Floating Add Post button */}
        <div
          className="absolute bottom-4 right-4"
          style={{
            zIndex: 10,
          }}
        >
          <button
            className="bg-black text-white p-3 rounded-full shadow-lg transition duration-300"
            title="Add Post"
            onClick={handleAddPostClick}
          >
            <FaPlus size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
