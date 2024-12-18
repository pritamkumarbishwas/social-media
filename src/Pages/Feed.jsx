import React, { useContext, useState, useEffect } from "react";
import PostCard from "./PostCard";
import menu from "../assets/images/Menu.png";
import Twitter from "../assets/images/twitter.png";
import Facebook from "../assets/images/facebook.png";
import Whatsapp from "../assets/images/Whatsapp.png";
import Instagram from "../assets/images/Instagram.png";
import Messenger from "../assets/images/messenger.png";
import Red from "../assets/images/Red.png";
import discord from "../assets/images/discort.png";
import telegram from "../assets/images/telegram.png";
import { AiOutlineCopy } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { AuthContext } from "../AppContext/AppContext";
import { useNavigate } from "react-router-dom";

function Feed() {
  const { user } = useContext(AuthContext);
  console.log("user", user);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const [displayName, setDisplayName] = useState(
    user?.displayName || "Guest User"
  );
  const [photoURL, setPhotoURL] = useState(user?.displayName || "Guest User");

  useEffect(() => {
    if (user?.displayName) {
      setDisplayName(user.displayName);
    }
    if (user?.photoURL) {
      setPhotoURL(user.photoURL);
    }
  }, [user]);


  const posts = [
    {
      id: 1,
      userName: "Aarav",
      timeAgo: "2 hours ago",
      userAvatar: "https://via.placeholder.com/50",
      content:
        "Just arrived in New York City! Excited to explore the sights, sounds, and energy of this amazing place. 🗽",
      hashtags: "#NYC #Travel",
      images: [
        "https://via.placeholder.com/150x150",
        "https://via.placeholder.com/150x150",
      ],
      likes: 67,
    },
    {
      id: 2,
      userName: "Sneha",
      timeAgo: "1 day ago",
      userAvatar: "https://via.placeholder.com/50",
      content:
        "Loving the beach vibes here! Sun, sand, and good company. 🌊🌴 #Vacation #BeachLife",
      hashtags: "#Vacation #BeachLife",
      images: [
        "https://via.placeholder.com/150x150",
        "https://via.placeholder.com/150x150",
      ],
      likes: 120,
    },
    {
      id: 3,
      userName: "Sam",
      timeAgo: "3 days ago",
      userAvatar: "https://via.placeholder.com/50",
      content:
        "Exploring the mountains today! The view from the top is breathtaking. 🏔️ #Adventure",
      hashtags: "#Adventure #Mountains",
      images: [
        "https://via.placeholder.com/150x150",
        "https://via.placeholder.com/150x150",
      ],
      likes: 89,
    },
  ];

  const handleCopy = () => {
    navigator.clipboard
      .writeText("https://www.arnav/feed")
      .then(() => alert("Link copied to clipboard!"))
      .catch((error) => alert("Failed to copy link!"));
  };
  const handleAddPostClick = () => {
    navigate("/post");
  };
  const handleProfileClick = () => {
    navigate("/profile");
  };
  return (
    <div className="bg-black min-h-screen p-0">
      <div className="p-4 max-w-sm mx-auto bg-white ">
        <div className="flex items-center gap-4 p-2 max-w-sm mx-auto  mb-2">
          <img
            src={photoURL || menu}
            alt={displayName || "Guest User"}
            className="rounded-full w-16 h-16 "
            onClick={handleProfileClick}
            style={{ cursor: "pointer" }}
          />
          <div>
            <p
              className="text-gray-600 "
              style={{
                fontSize: "10px",
                fontWeight: 400,
                fontFamily: "Kumbh Sans",
              }}
            >
              Welcome Back,
            </p>
            <h2
              className=" font-bold text-gray-900"
              style={{
                fontSize: "16px",
                fontWeight: 600,
                fontFamily: "Kumbh Sans",
                color: "#000",
              }}
            >
              {displayName}
            </h2>
          </div>
        </div>

        <h1
          className=" font-bold mb-4 text-left"
          style={{
            fontSize: "24px",
            fontWeight: 800,
            fontFamily: "Karla",
            color: "#000",
          }}
        >
          Feeds
        </h1>
        <div className="flex flex-col items-center gap-6">
          {posts.map((post, i) => (
            <div key={post.id} className="w-full flex justify-center">
              <PostCard feed={post} color={i} setIsModalOpen={setIsModalOpen} />
            </div>
          ))}
        </div>
      </div>

      {/* this is the share component */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white p-6 rounded-xl  space-y-6"
            onClick={(e) => e.stopPropagation()}
            style={{ width: "22rem" }}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Share post</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 text-xl"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="flex flex-col items-center">
                <div
                  className=" p-4 rounded-full"
                  style={{ background: "#E9F6FB" }}
                >
                  <img src={Twitter} alt="Twitter" className="w-4 h-4" />
                </div>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 400,
                    fontFamily: "Kumbh Sans",
                  }}
                >
                  Twitter
                </span>
              </div>
              <div className="flex flex-col items-center">
                <div
                  className=" p-4 rounded-full"
                  style={{ background: "#E7F1FD" }}
                >
                  <img src={Facebook} alt="Facebook" className="w-4 h-4" />
                </div>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 400,
                    fontFamily: "Kumbh Sans",
                  }}
                >
                  Facebook
                </span>
              </div>
              <div className="flex flex-col items-center">
                <div
                  className=" p-4 rounded-full"
                  style={{ background: "#FDECE7" }}
                >
                  <img src={Red} alt="Reddit" className="w-4 h-4" />
                </div>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 400,
                    fontFamily: "Kumbh Sans",
                  }}
                >
                  Reddit
                </span>
              </div>
              <div className="flex flex-col items-center">
                <div
                  className=" p-4 rounded-full"
                  style={{ background: "#ECF5FA" }}
                >
                  <img src={discord} alt="Discord" className="w-4 h-4" />
                </div>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 400,
                    fontFamily: "Kumbh Sans",
                  }}
                >
                  Discord
                </span>
              </div>
              <div className="flex flex-col items-center">
                <div
                  className=" p-4 rounded-full"
                  style={{ background: "#E7FBF0" }}
                >
                  <img src={Whatsapp} alt="Whatsapp" className="w-4 h-4" />
                </div>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 400,
                    fontFamily: "Kumbh Sans",
                  }}
                >
                  Whatsapp
                </span>
              </div>
              <div className="flex flex-col items-center">
                <div
                  className=" p-4 rounded-full"
                  style={{ background: "#E5F3FE" }}
                >
                  <img src={Messenger} alt="Messenger" className="w-4 h-4" />
                </div>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 400,
                    fontFamily: "Kumbh Sans",
                  }}
                >
                  Messenger
                </span>
              </div>
              <div className="flex flex-col items-center">
                <div
                  className=" p-4 rounded-full"
                  style={{ background: "#E5F3FE" }}
                >
                  <img src={telegram} alt="Telegram" className="w-4 h-4" />
                </div>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 400,
                    fontFamily: "Kumbh Sans",
                  }}
                >
                  Telegram
                </span>
              </div>
              <div className="flex flex-col items-center">
                <div
                  className=" p-4 rounded-full"
                  style={{ background: "#E5F3FE" }}
                >
                  <img src={Instagram} alt="Instagram" className="w-4 h-4" />
                </div>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 400,
                    fontFamily: "Kumbh Sans",
                  }}
                >
                  Instagram
                </span>
              </div>
            </div>
            <div className="relative">
              <label className="block text-sm text-gray-600">Page Link</label>
              <div className="flex items-center">
                <input
                  type="text"
                  value="https://www.arnav/feed"
                  readOnly
                  className="w-full p-2 mt-2 border border-gray-300 rounded-md pr-12"
                />
                <button
                  onClick={handleCopy}
                  className="absolute right-2 text-gray-500"
                  style={{ top: "2.5rem" }}
                >
                  <AiOutlineCopy size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div
        className="fixed "
        style={{
          right: "27%",
          bottom: "10px",
        }}
      >
        <button
          className="bg-black text-white p-3 rounded-full shadow-lg  transition duration-300"
          title="Add Post"
          onClick={handleAddPostClick}
        >
          <FaPlus size={20} />
        </button>
      </div>
    </div>
  );
}

export default Feed;
