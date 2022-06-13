import { useState, useEffect, useContext } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiFillPlusCircle,
} from "react-icons/ai";
import botImg from "../assets/img/bot.jpeg";
import { AppContext } from "../context/appContext";
import { useLoginUserMutation, useSignupUserMutation } from "../Api/appApi";

const signUpState = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  picture: null,
};

const signInState = {
  username: "",
  password: "",
};

const Auth = () => {
  const [signInValues, setSignInValues] = useState(signInState);
  const [signUpValues, setSignUpValues] = useState(signUpState);
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [img, setImg] = useState(null);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const [loginUser, { loading, err }] = useLoginUserMutation();
  const [signUpUser, { isLoading, error }] = useSignupUserMutation();

  const { socket } = useContext(AppContext);

  const navigate = useNavigate();
  let location = useLocation();

  async function uploadImage() {
    const data = new FormData();
    data.append("file", img);
    data.append("upload_preset", "weebCordUserImg");
    try {
      setUploadingImg(true);
      let res = await fetch(
        "https://api.cloudinary.com/v1_1/aib/image/upload",
        {
          method: "post",
          body: data,
        }
      );
      const urlData = await res.json();
      setUploadingImg(false);
      return urlData.url;
    } catch (error) {
      setUploadingImg(false);
      console.log(error);
    }
  }

  const handleSignUpForm = async (e) => {
    e.preventDefault();
    if (!img) return alert("Please upload your profile picture");
    const url = await uploadImage(img);
    console.log(url);
    console.log(
      signUpValues.username,
      signUpValues.email,
      signUpValues.password,
      url
    );
    // signup the user
    signUpUser({ ...signUpValues, picture: url }).then(({ data }) => {
      if (data) {
        console.log(data);
        navigate("/chat");
      }
    });
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    // console.log(signInValues);
    loginUser({ ...signInValues }).then(({ data }) => {
      if (data) {
        // socket work
        socket.emit("new-user");
        // navigate to the chat
        navigate("/chat");
      }
    });
  };

  function validateImg(e) {
    const file = e.target.files[0];
    if (file.size >= 1048576) {
      return alert("Max file size is 1mb");
    } else {
      setImg(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }

  const onChange = (e) => {
    if (isSignup) {
      setSignUpValues({ ...signUpValues, [e.target.name]: e.target.value });
    } else {
      setSignInValues({ ...signInValues, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    if (location.pathname == "/login") {
      setIsSignup(false);
    } else {
      setIsSignup(true);
    }
  });

  return (
    <div className="bg-black h-screen w-auto flex justify-center">
      <p className="font-bold relative text-[14rem] text-transparent bg-clip-text bg-gradient-to-b from-slate-200/70 to-black items-start select-none">
        {isSignup ? "Sign Up" : "Sign In"}
      </p>
      <div className="absolute overflow-hidden mt-52 text-slate-100">
        <div className="auth px-16 md:px-48 py-14 h-auto bg-white bg-opacity-10 rounded-t-xl rounded-b-xl shadow-5xl z-2 backdrop-filter backdrop-blur-xl">
          <div className="text-center gap-10">
            <form
              action=""
              onChange={onChange}
              onSubmit={isSignup ? handleSignUpForm : handleSignIn}
              className="h-full flex flex-col justify-evenly items-center gap-3"
            >
              {isSignup && (
                <div className="relative mb-3">
                  <img
                    src={imagePreview || botImg}
                    loading="lazy"
                    className="w-24 h-24 rounded-full border-2 border-slate-500"
                  />
                  <label htmlFor="image-upload" className="image-upload-label">
                    <AiFillPlusCircle
                      size={20}
                      className="text-primary ml-[65px] mt-[-25px] cursor-pointer"
                    />
                  </label>
                  <input
                    type="file"
                    id="image-upload"
                    name="picture"
                    htmlFor="picture"
                    hidden
                    accept="image/png, image/jpeg"
                    onChange={validateImg}
                  />
                </div>
              )}
              <div className="">
                <input
                  type="text"
                  name="username"
                  htmlFor="username"
                  className="w-full md:w-96 rounded-xl p-3 mt-2 outline-none  bg-transparent text-slate-200 border-2 border-gray-600 text-md font-semibold hover:border-gray-400 active:border-gray-400"
                  placeholder="Username"
                  required
                />
              </div>
              {isSignup && (
                <div className="">
                  <input
                    type="text"
                    name="email"
                    htmlFor="email"
                    className="w-full md:w-96 rounded-xl p-3 mt-2 outline-none  bg-transparent text-slate-200 border-2 border-gray-600 text-md font-semibold hover:border-gray-400 active:border-gray-400"
                    placeholder="Your Email"
                    required
                  />
                </div>
              )}
              <div className="flex justify-between w-full md:w-96 rounded-xl p-3 mt-2 outline-none  bg-transparent text-slate-200 border-2 border-gray-600 text-md font-semibold hover:border-gray-400 active:border-gray-400">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  htmlFor="password"
                  className="flex w-[19.5rem] outline-none  bg-transparent"
                  placeholder="Your Password"
                  // pattern="^[A-Za-z0-9]{3,16}$"
                  required
                />
                {!showPassword ? (
                  <AiFillEyeInvisible
                    size="24"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-slate-600 hover:text-slate-400 cursor-pointer"
                  />
                ) : (
                  <AiFillEye
                    size="24"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-slate-600 hover:text-slate-400 cursor-pointer"
                  />
                )}
              </div>
              {isSignup && (
                <div className="flex justify-between w-full md:w-96 rounded-xl p-3 mt-2 outline-none  bg-transparent text-slate-200 border-2 border-gray-600 text-md font-semibold hover:border-gray-400 active:border-gray-400">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    htmlFor="confirmPassword"
                    className="flex w-[19.5rem] outline-none  bg-transparent"
                    placeholder="Confirm Password"
                    // pattern="values.password"
                    required
                  />
                  {!showConfirmPassword ? (
                    <AiFillEyeInvisible
                      size="24"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="text-slate-600 hover:text-slate-400 cursor-pointer"
                    />
                  ) : (
                    <AiFillEye
                      size="24"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="text-slate-600 hover:text-slate-400 cursor-pointer"
                    />
                  )}
                </div>
              )}
              <div className="mt-5 mb-5 select-none">
                <button className="rounded-xl p-3 w-40 border-2 border-slate-700/90 bg-gradient-to-br from-slate-600/60 to-black cursor-pointer hover:border-slate-500">
                  {/* {isSignup ? "Sign Up" : "Sign In"} */}
                  {isSignup && uploadingImg ? (
                    <svg
                      role="status"
                      className="inline w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-primary"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                  ) : isSignup ? (
                    "Sign Up"
                  ) : (
                    "Sign In"
                  )}
                  {/* {uploadingImg && (
                    
                  )} */}
                </button>
              </div>
            </form>

            <div className="text-lg text-slate-600 select-none">
              <Link to={isSignup ? "/login" : "/register"}>
                {isSignup ? "Already have an account" : "Need an account?"}
                <span className="text-slate-400 hover:text-slate-300 cursor-pointer">
                  {" "}
                  {isSignup ? "Sign In" : "Register"}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
