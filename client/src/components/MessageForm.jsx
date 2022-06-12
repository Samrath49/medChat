import { useSelector } from "react-redux";

const MessageForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const user = useSelector((state) => state.user);

  return (
    <>
      <div>
        MessageForm
        <form
          action=""
          onSubmit={handleSubmit}
          className="h-full flex flex-col justify-evenly items-center gap-3"
        >
          <div className="w-auto border-2 border-slate-700 p-96 rounded-xl">
            {!user && <div className="text-red-400">Please Login</div>}
          </div>
          <div className="">
            <input
              type="text"
              name="message"
              htmlFor="message"
              className="w-full md:w-96 rounded-xl p-3 mt-2 outline-none  bg-transparent text-slate-800 border-2 border-gray-600 text-md font-semibold hover:border-gray-400 active:border-gray-400"
              placeholder="Hi "
              disabled={!user}
              // onChange={handleChange}
              required
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default MessageForm;
