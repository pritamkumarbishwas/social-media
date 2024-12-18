import React from "react";

const FeedCard = ({ feed, color, setIsModalOpen }) => {
  return (
    <div
      className={`p-4 max-w-sm mx-auto ${
        color % 2 === 0 ? "bg-[#F7EBFF]" : "bg-[#FFFAEE]"
      } rounded-[26px] shadow-sm space-y-4`}
    >
      <div className="flex items-center space-x-3">
        <img
          src={feed.userAvatar}
          alt="Profile"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold text-gray-800">{feed.userName}</p>
          <p className="text-xs text-gray-500">{feed.timeAgo}</p>
        </div>
      </div>

      <p className="text-sm text-gray-700">
        {feed.content}
        {feed.hashtags && (
          <span className="text-blue-500"> {feed.hashtags}</span>
        )}
      </p>

      {/* Images */}
      <div className="flex space-x-2">
        {feed.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt="Post Content"
            className="w-1/2 rounded-lg object-cover"
          />
        ))}
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-1">
          <span className="text-pink-500">❤</span>
          <span className="text-gray-700 text-sm">{feed.likes}</span>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center bg-gray-100 px-3 py-1 rounded-full text-gray-700 hover:bg-gray-200"
        >
          <span>➤</span> <span className="ml-1 text-sm">Share</span>
        </button>
      </div>
    </div>
  );
};

export default FeedCard;
