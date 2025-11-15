import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  if (!user)
    return <p className="pt-24 text-center text-xl">Please Login First</p>;

  return (
    <div className="pt-24 max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>

      <div className="bg-white shadow-md p-4 rounded-lg">
        <p className="text-lg"><b>Email:</b> {user.email}</p>
        <p className="text-lg mt-2"><b>User ID:</b> {user.uid}</p>
      </div>
    </div>
  );
}
