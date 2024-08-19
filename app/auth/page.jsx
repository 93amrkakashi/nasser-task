"use client"

import { useState } from 'react';
import Signin from './Signin';
import Signup from './Signup';

export default function AuthPage() {
  const [isSignin, setIsSignin] = useState(true);

  const toggleAuth = () => {
    setIsSignin(!isSignin);
  };

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
