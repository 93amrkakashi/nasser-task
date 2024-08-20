"use client";

import React,{useState} from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../libs/slices/authSlice";

export default function NavBar() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-gray-800 p-4 shadow-md fixed top-0 left-0 right-0 z-10">
    <div
      dir="ltr"
      className="container mx-auto flex justify-between items-center"
    >
      <div className="text-white text-lg font-bold">
        <Link
          href={"/"}
          className="text-white hover:text-gray-300 transition-colors duration-300 ease-in-out"
        >
          موسوعة الكتب
        </Link>
      </div>
      <div className="flex w-[70%] justify-end items-center gap-4">
      <Link
          href={"/"}
          className="text-white hover:text-gray-300 transition-colors duration-300 ease-in-out"
        >
           الكتب
        </Link>
        {user ? (
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="text-white hover:text-gray-300 transition-colors duration-300 ease-in-out flex items-center"
            >
                <p className="text-center rounded-full w-[25px] font-bold h-[25px] text-black bg-white">{user.name.slice(0,1)}</p>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 shadow-lg rounded-md">
                {user.role =="admin" && (
                  <Link
                  onClick={()=>{
                    setDropdownOpen(false)
                  }}
                  href={"/addbook"}
                    className="text-center block px-4 py-2 w-full hover:bg-gray-100"
                  >
                    اضافة كتاب
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="text-center block px-4 py-2 w-full hover:bg-gray-100"
                >
                  تسجيل الخروج
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
          href={"/auth"}
          className="text-white hover:text-gray-300 transition-colors duration-300 ease-in-out"
        >
          تسجيل الدخول
        </Link>
        )}
      </div>
    </div>
  </nav>
  );
}






