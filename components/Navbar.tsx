import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="w-full mx-auto px-4 sm:px-6 lg:px-6 bg-gray-700 sticky z-30 top-0 shadow-md shadow-teal-500">
      <div className="flex justify-between h-16 ">
        <div className="flex justify-between items-center w-full">
          <Link href={"/"} className="flex gap-3 items-center">
            <div className="relative h-11 w-11 object-cover">
              <Image
                src="/logo.png"
                alt="Logo"
                fill
                className="rounded-full object-cover shadow-2xl"
              />
            </div>
            <h2 className="text-2xl font-medium">
              Pool<span className="text-teal-500">Point</span>
            </h2>
          </Link>
          <div>
            <Link href={"/login"} className="text-xl font-medium">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
