import { useState } from "react";
import { db, storage } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuth } from "../context/AuthContext";

export default function CreatePost() {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const { user } = useAuth();

  const createPost = async () => {
    if (!user) return alert("Login Required!");

    let imageUrl = "";
    if (img) {
      const imgRef = ref(storage, `posts/${Date.now()}-${img.name}`);
      await uploadBytes(imgRef, img);
      imageUrl = await getDownloadURL(imgRef);
    }

    await addDoc(collection(db, "posts"), {
      text,
      imageUrl,
      uid: user.uid,
      time: serverTimestamp(),
      likes: [],
    });

    setText("");
    setImg(null);
  };

  return (
    <div className="bg-white shadow rounded-xl p-4 mb-4">
      <textarea
        className="w-full bg-gray-50 p-3 rounded-lg border"
        rows="3"
        placeholder="What's on your mind?"
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>

      <input
        type="file"
        className="mt-2"
        onChange={(e) => setImg(e.target.files[0])}
      />

      <button
        onClick={createPost}
        className="w-full mt-3 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
      >
        Post
      </button>
    </div>
  );
    }
