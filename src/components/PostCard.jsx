import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase";
import * as timeago from "timeago.js";

export default function PostCard({ post }) {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);

  const toggleLike = async () => {
    const ref = doc(db, "posts", post.id);
    if (post.likes?.includes(user.uid)) {
      await updateDoc(ref, { likes: arrayRemove(user.uid) });
    } else {
      await updateDoc(ref, { likes: arrayUnion(user.uid) });
    }
  };

  const addComment = async (text) => {
    if (!user) return;
    await addDoc(collection(db, "posts", post.id, "comments"), {
      text,
      uid: user.uid,
      time: Date.now(),
    });
  };

  useEffect(() => {
    const q = query(
      collection(db, "posts", post.id, "comments"),
      orderBy("time")
    );

    return onSnapshot(q, (snapshot) => {
      setComments(snapshot.docs.map((d) => d.data()));
    });
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-xl p-4 mb-6">
      {/* Post Text */}
      <p className="text-lg text-gray-800">{post.text}</p>

      {/* Post Image */}
      {post.imageUrl && (
        <img
          src={post.imageUrl}
          className="w-full rounded-xl mt-3"
        />
      )}

      {/* Actions */}
      <div className="flex justify-between mt-3 text-gray-600">
        <button onClick={toggleLike} className="flex items-center space-x-2">
          <span>❤️</span>
          <span>{post.likes?.length || 0}</span>
        </button>

        <p className="text-sm">
          {post.time ? timeago.format(post.time.toDate()) : ""}
        </p>
      </div>

      {/* Comment Box */}
      <input
        type="text"
        placeholder="Write a comment..."
        className="w-full bg-gray-50 border p-2 rounded-lg mt-3"
        onKeyDown={(e) => e.key === "Enter" && addComment(e.target.value)}
      />

      {/* Showing Comments */}
      {comments.map((c, i) => (
        <p key={i} className="text-sm bg-gray-100 p-2 rounded mt-2">
          💬 {c.text}
        </p>
      ))}
    </div>
  );
      }
