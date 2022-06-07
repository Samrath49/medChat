import { useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";

const cookies = new Cookies();

const initialState = {
  fullName: "",
  username: "",
  password: "",
  confirmPassword: "",
  phoneNumber: "",
  avatarURL: "",
};

const Auth = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(true);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // console.log(form);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, password, phoneNumber, avatarURL } = form;

    const URL = import.meta.env.VITE_SERVER_URL || "http://localhost:5000/auth";

    const {
      data: { token, userId, fullName, hashedPassword },
    } = await axios.post(`${URL}/${isSignup ? "signup" : "login"}`, {
      username,
      password,
      fullName: form.fullName,
      phoneNumber,
      avatarURL,
    });

    cookies.set("token", token);
    cookies.set("username", username);
    cookies.set("fullName", fullName);
    cookies.set("userId", userId);

    if (isSignup) {
      cookies.set("phoneNumber", phoneNumber);
      cookies.set("avatarURL", avatarURL);
      cookies.set("hashedPassword", hashedPassword);
    }

    window.location.reload();
  };

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
  };

  return (
    <>
      <div className="bg-black h-screen w-screen flex justify-center">
        <p className="font-bold relative text-[14rem] text-transparent bg-clip-text bg-gradient-to-b from-slate-200/70  to-black items-start select-none">
          {isSignup ? "Sign Up" : "Sign In"}
        </p>
        <div className="absolute overflow-hidden mt-52 text-slate-100">
          {/* <div className="h-40-r w-40-r bg-gradient-to-tr from-blue-700 to-green-500 rounded-full absolute left-2/4 -top-56 transform rotate-160"></div> */}
          {/* <div className="h-40-r w-40-r bg-gradient-to-tr from-purple-700 via-pink-500 to-red-500 rounded-full absolute top-2/3 right-2/4 transform rotate-180"></div> */}
          <div className="px-16 md:px-48 py-14 h-auto bg-white bg-opacity-10 rounded-t-xl rounded-b-xl shadow-5xl z-2 backdrop-filter backdrop-blur-xl">
            <div className="text-center gap-10">
              <form
                action=""
                onSubmit={handleSubmit}
                className="h-full flex flex-col justify-evenly items-center gap-3"
              >
                {isSignup && (
                  <input
                    type="text"
                    name="fullName"
                    htmlFor="fullName"
                    // autocomplete="off"
                    className="w-full md:w-96 rounded-xl p-3 mt-2 outline-none bg-transparent text-slate-200 border-2 border-gray-600 text-md font-semibold hover:border-gray-400 active:border-gray-400"
                    placeholder="Full Name"
                    onChange={handleChange}
                    required
                  />
                )}
                <div className="">
                  <input
                    type="text"
                    name="username"
                    htmlFor="username"
                    className="w-full md:w-96 rounded-xl p-3 mt-2 outline-none  bg-transparent text-slate-200 border-2 border-gray-600 text-md font-semibold hover:border-gray-400 active:border-gray-400"
                    placeholder="Username"
                    onChange={handleChange}
                    required
                  />
                </div>
                {isSignup && (
                  <div className="">
                    <input
                      type="text"
                      name="phoneNumber"
                      htmlFor="phoneNumber"
                      className="w-full md:w-96 rounded-xl p-3 mt-2 outline-none  bg-transparent text-slate-200 border-2 border-gray-600 text-md font-semibold hover:border-gray-400 active:border-gray-400"
                      placeholder="Phone Number"
                      onChange={handleChange}
                      required
                    />
                  </div>
                )}
                {isSignup && (
                  <div className="">
                    <input
                      type="url"
                      name="avatarURL"
                      htmlFor="avatarURL"
                      className="w-full md:w-96 rounded-xl p-3 mt-2 outline-none  bg-transparent text-slate-200 border-2 border-gray-600 text-md font-semibold hover:border-gray-400 active:border-gray-400"
                      placeholder="Avatar url"
                      onChange={handleChange}
                      required
                    />
                  </div>
                )}
                <div className="">
                  <input
                    type="password"
                    name="password"
                    htmlFor="password"
                    className="w-full md:w-96 rounded-xl p-3 mt-2 outline-none  bg-transparent text-slate-200 border-2 border-gray-600 text-md font-semibold hover:border-gray-400 active:border-gray-400"
                    placeholder="Your Password"
                    onChange={handleChange}
                    required
                  />
                </div>
                {isSignup && (
                  <div className="">
                    <input
                      type="password"
                      name="confirmPassword"
                      htmlFor="confirmPassword"
                      className="w-full md:w-96 rounded-xl p-3 mt-2 outline-none  bg-transparent text-slate-200 border-2 border-gray-600 text-md font-semibold hover:border-gray-400 active:border-gray-400"
                      placeholder="Confirm Password"
                      onChange={handleChange}
                      required
                    />
                  </div>
                )}
                <div className="mt-5 mb-5">
                  <button className="rounded-xl p-3 w-40 border-2 border-slate-700/90 bg-gradient-to-br from-slate-600/60 to-black cursor-pointer hover:border-slate-500">
                    {isSignup ? "Sign Up" : "Sign In"}
                  </button>
                </div>
              </form>

              <div className="text-lg text-slate-500 select-none">
                <p>
                  {isSignup
                    ? "Already have an account"
                    : "Don't have an account"}
                  <span
                    onClick={switchMode}
                    className="text-slate-400 hover:text-slate-300 cursor-pointer"
                  >
                    {" "}
                    {isSignup ? "Sign In" : "Sign Up"}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
