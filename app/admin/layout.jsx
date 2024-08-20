"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSelector } from 'react-redux';
export default function DashLayout({ children }) {
  const router = useRouter();
  const { user, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      router.push("/")
    }
}, []);
 
  return (
    <div className="w-full min-h-[80vh] bg-gray-100 flex flex-col justify-start items-start">
      <div className="w-full flex flex-col justify-start items-center ">
               {children}
      </div>
    </div>
  );
}