import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signinUser } from "../assits/libs/slices/authSlice";
import { useRouter } from "next/navigation";
import { validateAuthInputs } from "../assits/validation";

export default function Signin({ toggleAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  const validate = useCallback(() => {
    const validationRules = {
      email: {
        required: true,
        pattern: /\S+@\S+\.\S+/,
        patternMessage: "صيغة البريد الإلكتروني غير صحيحة",
      },
      password: {
        required: true,
      },
    };

    const errors = validateAuthInputs({ email, password }, validationRules);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }, [email, password]);

  const handleSignin = useCallback(
    (e) => {
      e.preventDefault();
      if (validate()) {
        dispatch(signinUser({ email, password }));
      }
    },
    [email, password, validate, dispatch]
  );

  return (
    <div className="bg-white p-8 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-6">تسجيل الدخول</h2>
      <form onSubmit={handleSignin}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            البريد الإلكتروني
          </label>
          <input
            type="email"
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            كلمة المرور
          </label>
          <input
            type="password"
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded mt-4"
          disabled={loading}
        >
          {loading ? "جارٍ تسجيل الدخول..." : "تسجيل الدخول"}
        </button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </form>
      <p className="mt-4 text-center text-sm text-gray-600">
        ليس لديك حساب؟{" "}
        <button onClick={toggleAuth} className="text-blue-500 hover:underline">
          إنشاء حساب جديد
        </button>
      </p>
    </div>
  );
}
