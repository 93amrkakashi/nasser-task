"use client";

import { useState, useCallback } from 'react';
import Signin from './Signin';
import Signup from './Signup';

export default function AuthMainPage() {
  const [isSignin, setIsSignin] = useState(true);

  const toggleAuth = useCallback(() => {
    setIsSignin((prev) => !prev);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {isSignin ? (
        <Signin toggleAuth={toggleAuth} />
      ) : (
        <Signup toggleAuth={toggleAuth} />
      )}
    </div>
  );
}
