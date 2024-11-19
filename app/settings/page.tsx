import { MdSettings } from "react-icons/md";

const Page = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="flex justify-center items-center mb-2">
        <MdSettings className="h-5 w-5" />
        <h2>Settings</h2>
      </div>
      <div className="py-4 px-3 rounded-lg gap-1 flex flex-col justify-center items-center bg-slate-700">
        <div className="flex items-center gap-1">
          <label htmlFor="amount">Amount: </label>
          <input
            type="text"
            placeholder="add table amount..."
            className="px-2 py-1 rounded-lg outline-none text-black"
          />
        </div>
        <button
          type="submit"
          className="bg-teal-500 text-white px-4 py-2 rounded-lg w-full mt-4"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default Page;
