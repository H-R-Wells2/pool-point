'use client'

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';
import { MdRefresh } from "react-icons/md";

const Navbar = () => {

  const pathname = usePathname();
  const router = useRouter();
  const handleRefresh = () => {
    router.replace('/results')
  }

  return (
    <div className="w-full mx-auto px-4 sm:px-6 lg:px-6 bg-gray-700 shadow-md shadow-teal-500 fixed top-0 z-10">
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
          {pathname === '/results' && <button onClick={handleRefresh} className="text-white bg-gray-600 p-[2px] rounded-full active:rotate-45 transition-all ease-in-out"><MdRefresh className="h-6 w-6"/></button>
          }
        </div>
      </div>
    </div>
  );
};

export default Navbar;
