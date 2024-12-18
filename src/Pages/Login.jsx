import React, { useContext, useEffect } from "react";
import img1 from "../assets/login/image1.png";
import img2 from "../assets/login/image2.png";
import img3 from "../assets/login/image3.png";
import img4 from "../assets/login/image4.png";
import img5 from "../assets/login/image5.png";
import img6 from "../assets/login/image6.png";
import img7 from "../assets/login/image7.png";
import img8 from "../assets/login/image8.png";
import img9 from "../assets/login/image9.png";
import vibesnap from "../assets/login/vibesnap.png";
import google from "../assets/login/google.png";
import { AuthContext } from "../AppContext/AppContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { signInWithGoogle, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/feed");
    }
  }, [user, navigate]);

  const handleGoogleLogin = async () => {
    await signInWithGoogle();
  };

  return (
    <div
      className=" flex items-center justify-center bg-black"
      style={{ height: "100vh" }}
    >
      <div className="relative max-w-sm w-full bg-white shadow-lg overflow-hidden">
        <div className="masonry-grid p-0">
          <img src={img5} alt="5" className="masonry-item" />
          <img src={img4} alt="4" className="masonry-item" />
          <img src={img1} alt="1" className="masonry-item" />
          <img src={img2} alt="2" className="masonry-item" />
          <img src={img8} alt="8" className="masonry-item" />
          <img src={img7} alt="7" className="masonry-item" />
          <img src={img6} alt="6" className="masonry-item" />
          <img src={img9} alt="9" className="masonry-item" />
          <img src={img3} alt="3" className="masonry-item" />
        </div>

        <div
          className="absolute bottom-0 w-full bg-white py-1 px-6 text-center rounded-t-lg flex flex-col items-center justify-center"
          style={{ borderRadius: "63px 63px 0 0" }}
        >
          <h1
            className="flex items-center justify-center mb-2"
            style={{
              fontFamily: "'Karla', sans-serif",
              fontWeight: 600,
              fontSize: "28px",
              color: "#1F2937",
            }}
          >
            <img src={vibesnap} alt="Vibesnap" className="h-8 w-8 mr-2" />
            Vibesnap
          </h1>
          <p
            className="text-black mb-2"
            style={{
              fontFamily: "'Kumbh Sans', sans-serif",
              fontWeight: 400,
              fontSize: "16px",
              color: "#1F2937",
            }}
          >
            Moments That Matter, Shared Forever.
          </p>
          <div className="mb-4">
            <button
              className="flex items-center justify-center"
              onClick={handleGoogleLogin} // Add Google login handler
            >
              <img src={google} alt="Google" className="h-12" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
