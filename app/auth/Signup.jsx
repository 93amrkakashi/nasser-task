"use client"

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../libs/slices/authSlice';
import { useRouter } from 'next/navigation';


export default function Signup({ toggleAuth }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);
  const router = useRouter()
  const handleSignup = (e) => {
    e.preventDefault();
    dispatch(signupUser({ name, email, password,role:"user" }));
  };
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);
  return (
    <div className="bg-white p-8 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-6">إنشاء حساب جديد</h2>
      <form onSubmit={handleSignup}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">الاسم</label>
          <input
            type="text"
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">البريد الإلكتروني</label>
          <input
            type="email"
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">كلمة المرور</label>
          <input
            type="password"
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded mt-4"
          disabled={loading}
        >
          {loading ? 'جارٍ الإنشاء...' : 'إنشاء حساب'}
        </button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </form>
      <p className="mt-4 text-center text-sm text-gray-600">
        لديك حساب؟{' '}
        <button onClick={toggleAuth} className="text-blue-500 hover:underline">
          تسجيل الدخول
        </button>
      </p>
    </div>
  );
}
