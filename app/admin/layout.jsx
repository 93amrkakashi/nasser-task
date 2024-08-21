"use client";

import { useEffect} from "react";
import { useRouter } from "next/navigation";
import { useSelector } from 'react-redux';
export default function DashLayout({ children }) {
  const router = useRouter();
  const { user} = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      router.push("/")
    }
  }, [router,user]);

  return (
    <div className="w-full min-h-[80vh] bg-gray-100 flex flex-col justify-start items-start">
      <div className="w-full flex flex-col justify-start items-center ">
        {children}
      </div>
    </div>
  );
}