import { AiFillWechat } from "react-icons/ai";
import { Link } from "react-router-dom";
import Hero from "../assets/img/hero.jpg";

const Home = () => {
  return (
    <div className="bg-black w-full h-[93.6vh]">
      <div className="relative">
        <div className="border-b border-slate-800">
          <div className="container m-auto px-6 pt-24 border-slate-800 border-r border-l md:px-12 lg:pt-[4.8rem] lg:px-7">
            <div className="flex items-center flex-wrap gap-12 px-2 md:px-0">
              <div className="lg:w-6/12 lg:-ml-7">
                <div className="relative">
                  <img
                    src={Hero}
                    alt="Chat"
                    loading="lazy"
                    className="bg-center h-[35vh] md:h-[70vh] bg-no-repeat rounded-lg"
                  />
                </div>
              </div>

              <div className="relative lg:w-6/12 lg:-ml-20">
                <h1 className="font-bold text-slate-200 text-5xl sm:text-6xl md:text-7xl xl:text-8xl select-none">
                  Share the world with your{" "}
                  <span className="text-primary">weeb</span> friends.
                </h1>
                <div className="mt-5 mb-5 md:mt-16 select-none">
                  <Link
                    to="/chat"
                    className="w-36 py-3 px-3 flex justify-between text-white text-center rounded-md border-2 border-slate-500 transition duration-300 bg-gray-900 hover:bg-primary hover:border-primary active:bg-primary active:border-primary focus:bg-primary focus:border-primary"
                  >
                    Get Started <AiFillWechat size={25} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
