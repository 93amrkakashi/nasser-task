export default function Signin({ toggleAuth }) {
    return (
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-6">تسجيل الدخول</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">البريد الإلكتروني</label>
            <input type="email" className="mt-1 block w-full p-2 border border-gray-300 rounded" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">كلمة المرور</label>
            <input type="password" className="mt-1 block w-full p-2 border border-gray-300 rounded" />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mt-4">تسجيل الدخول</button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          ليس لديك حساب؟ <button onClick={toggleAuth} className="text-blue-500 hover:underline">إنشاء حساب جديد</button>
        </p>
      </div>
    );
  }
  