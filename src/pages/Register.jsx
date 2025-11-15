import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Register() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const register = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, pass);
      alert("Account Created!");
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div className="pt-24 max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Register</h1>

      <input
        className="w-full bg-gray-100 p-3 rounded-lg mb-2"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="w-full bg-gray-100 p-3 rounded-lg mb-2"
        placeholder="Password"
        onChange={(e) => setPass(e.target.value)}
      />

      <button
        onClick={register}
        className="w-full bg-blue-600 text-white py-2 rounded-lg mt-2"
      >
        Register
      </button>
    </div>
  );
}
