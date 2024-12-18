import { Button } from "@material-tailwind/react";
import React, { useContext, useEffect, useState } from "react";
import { FaPlus, FaArrowLeft } from "react-icons/fa";
import { AuthContext } from "../AppContext/AppContext";
import { useNavigate } from "react-router-dom";
import menu from "../assets/images/Menu.png";
import background from "../assets/background.png";

const ProfileCard = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [displayName, setDisplayName] = useState(
    user?.displayName || "Guest User"
  );
  const [bio, setBio] = useState(user?.bio || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "Guest User");

  useEffect(() => {
    if (user?.displayName) {
      setDisplayName(user.displayName);
    }
    if (user?.photoURL) {
      setPhotoURL(user.photoURL);
    }
    if (user?.bio) {
      setBio(user.bio);
    }
  }, [user]);

  const handleEditProfileClick = () => {
    navigate("/profile/edit");
  };

  const handleAddPostClick = () => {
    navigate("/post");
  };

  return (
    <div className="bg-black p-0">
      <div className="max-w-sm mx-auto bg-white shadow-lg overflow-hidden relative h-full">
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
        </div>

        <div
          className="relative -mt-12 px-4"
          style={{ display: "inline-block" }}
        >
          <div className="relative w-24 h-24 sm:w-32 sm:h-32">
            <img
              src={photoURL || menu}
              alt={displayName || "Guest User"}
              className="w-full h-full rounded-full border-4 border-white"
            />
          </div>
        </div>

        <div className=" flex justify-end" style={{ marginTop: "-48px" }}>
          <button
            className="text-black font-semibold py-2 px-14 mr-3 rounded-full outline outline-1 outline-black"
            onClick={handleEditProfileClick}
          >
            Edit Profile
          </button>
        </div>

        <div className="mt-2 text-left px-4 sm:mt-2">
          <h2
            className="text-gray-800 font-extrabold text-2xl"
            style={{
              fontFamily: "Karla",
            }}
          >
            {displayName}
          </h2>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">{bio}</p>
        </div>

        <div className="mt-6 px-4 pb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">My Posts</h3>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2">
            <div className="relative rounded-lg overflow-hidden">
              <img
                src="https://via.placeholder.com/300"
                alt="Design meet"
                className="w-full h-40 object-cover sm:h-40"
              />
              <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                1/2
              </div>
              <div className="absolute bottom-2 left-2 text-white font-semibold">
                Design meet
              </div>
              <div className="absolute bottom-2 right-2 text-white">💙 67</div>
            </div>
          </div>
        </div>

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

export default ProfileCard;
