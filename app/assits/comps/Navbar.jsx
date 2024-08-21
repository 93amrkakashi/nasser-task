"use client";

import React, { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../libs/slices/authSlice";
import Image from "next/image";

export default function NavBar() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = useCallback(() => {
    setDropdownOpen((prev) => !prev);
  }, []);

  const handleLogout = useCallback(() => {
    dispatch(logout());
    setDropdownOpen(false);
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown")) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <nav className="w-full bg-gray-800 p-4 shadow-md fixed top-0 left-0 right-0 z-10">
      <div dir="ltr" className="w-full px-4 flex justify-between items-center">
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
          {user && user.role === "admin" && (
            <Link
              href={"/admin"}
              className="text-white hover:text-gray-300 transition-colors duration-300 ease-in-out"
            >
              لوحة التحكم
            </Link>
          )}
          {user ? (
            <div className="relative dropdown">
              <button
                onClick={toggleDropdown}
                className="text-white hover:text-gray-300 transition-colors duration-300 ease-in-out flex items-center"
              >
                <p className="text-center rounded-full w-6 h-6 font-bold text-black bg-white">
                  <Image
                    src={
                      "https://www.transparentpng.com/download/user/gray-user-profile-icon-png-fP8Q1P.png"
                    }
                    width={30}
                    height={30}
                    alt="user"
                  />
                </p>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 shadow-lg rounded-md">
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
