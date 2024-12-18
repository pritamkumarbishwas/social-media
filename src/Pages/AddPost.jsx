import React, { useState } from "react";
import {
  FaPlus,
  FaArrowLeft,
  FaCamera,
  FaImage,
  FaVideo,
  FaTrash,
} from "react-icons/fa";
import { storage, db } from "../firebase/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

const AddPost = () => {
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);
  const [description, setDescription] = useState("");

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prevImages) => [
      ...prevImages,
      ...files.map((file) => URL.createObjectURL(file)),
    ]);
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideo(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  const handleRemoveVideo = () => {
    setVideo(null);
  };

  const handlePostCreation = async () => {
    try {
      const postRef = collection(db, "posts");

      const imageUrls = [];
      // Upload images sequentially
      for (let i = 0; i < images.length; i++) {
        const imageRef = ref(storage, `images/${images[i].name}`);
        console.log("Uploading image to:", imageRef);

        // Upload the image and get the download URL
        const uploadTask = uploadBytesResumable(imageRef, images[i]);
        await uploadTask; // Await the upload task to complete

        const url = await getDownloadURL(uploadTask.snapshot.ref);
        imageUrls.push(url);
      }

      let videoUrl = "";
      // If there is a video, upload it
      if (video) {
        const videoRef = ref(storage, `videos/${video.name}`);
        const uploadTask = uploadBytesResumable(videoRef, video);
        await uploadTask; // Await the upload task to complete

        // Get the video download URL after upload completion
        videoUrl = await getDownloadURL(uploadTask.snapshot.ref);
      }

      // Add the post document to Firestore
      await addDoc(postRef, {
        description: description,
        images: imageUrls,
        video: videoUrl,
        createdAt: new Date(),
      });

      // Reset form fields after post creation
      setImages([]);
      setVideo(null);
      setDescription("");

      console.log("Post created successfully!");
    } catch (error) {
      console.error("Error uploading post:", error);
      console.log("Error creating post. Please try again later.");
    }
  };

  return (
    <div className="bg-black p-0 " style={{ minHeight: "100vh" }}>
      <div className="max-w-sm mx-auto bg-white shadow-lg overflow-hidden relative h-full">
        <div className="relative h-16 sm:h-16 flex items-center px-4">
          <button
            className="flex items-center space-x-2 bg-white text-gray-900 px-3 py-2 transition duration-300 hover:bg-gray-100"
            title="Go Back"
            onClick={() => window.history.back()}
          >
            <FaArrowLeft size={16} />
          </button>
          <span className="text-sm font-medium">New Post</span>
        </div>

        <div className="mt-4 px-4">
          {images.length > 0 && (
            <div className="grid grid-cols-2 gap-4">
              {images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt={`Selected ${index}`}
                    className="w-full h-auto rounded-md"
                  />
                  <button
                    onClick={() => handleRemoveImage(index)}
                    className="absolute bottom-2 right-2 text-white p-1 rounded-full"
                    title="Remove Photo"
                  >
                    <FaTrash size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-4 px-4">
          {video && (
            <div className="relative border p-4 rounded-md mb-4">
              <video controls className="w-full h-auto">
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <button
                onClick={handleRemoveVideo}
                className="absolute bottom-6 right-6 text-white p-1 rounded-full"
                title="Remove Video"
              >
                <FaTrash size={12} />
              </button>
            </div>
          )}
        </div>

        <div className="mt-4 text-left px-4">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write a description..."
            rows="5"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        <div className="mt-4 px-4">
          <div className="flex flex-col space-y-4">
            <label className="flex items-center cursor-pointer text-blue-500 hover:text-blue-600">
              <FaImage size={15} className="mr-3" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
                multiple
              />
              <span className="text-sm text-gray-700">Photos (Multiple)</span>
            </label>

            <label className="flex items-center cursor-pointer text-red-500 hover:text-red-600">
              <FaVideo size={15} className="mr-3" />
              <input
                type="file"
                accept="video/*"
                className="hidden"
                onChange={handleVideoChange}
              />
              <span className="text-sm text-gray-700">Video (One Only)</span>
            </label>

            <label className="flex items-center cursor-pointer text-green-500 hover:text-green-600">
              <FaCamera size={15} className="mr-3" />
              <input
                type="file"
                accept="image/*"
                capture="camera"
                className="hidden"
                onChange={handleImageChange}
                multiple
              />
              <span className="text-sm text-gray-700">
                Camera (Multiple Photos)
              </span>
            </label>
          </div>
        </div>

        <div className="mt-10 px-4">
          <button
            className="w-full bg-black text-white py-4 hover:bg-gray-900 rounded-full transition duration-300"
            title="Create Post"
            onClick={handlePostCreation}
          >
            Create Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
