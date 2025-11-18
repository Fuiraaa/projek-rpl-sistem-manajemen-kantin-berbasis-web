import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterSuccess() {
  const [counter, setCounter] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => prev - 1);
    }, 1000);

    if (counter === 0) {
      navigate("/login");
    }

    return () => clearInterval(interval);
  }, [counter, navigate]);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold text-green-600">
        Register Berhasil!
      </h1>
      <p className="text-gray-700 mt-2">
        Anda akan diarahkan ke halaman login dalam {counter} detik...
      </p>
    </div>
  );
}
