export default function CommentItem({ comment }) {
  return (
    <div className="bg-gray-100 rounded-lg p-2 mt-2 text-sm">
      <p>💬 {comment.text}</p>
      <p className="text-xs text-gray-500">{new Date(comment.time).toLocaleString()}</p>
    </div>
  );
}
