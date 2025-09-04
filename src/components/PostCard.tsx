"use client";
import { useMutation } from "@apollo/client/react";
import { LIKE_POST } from "./gql";
import { useUIStore } from "@/lib/store";
import { timeAgo } from "@/lib/time";
import { Post } from "@/lib/types";


export default function PostCard({ post }: { post: Post }) {
  const { bumpLike, optimisticLikes } = useUIStore();
  const [likePost, { loading }] = useMutation(LIKE_POST, {
    variables: { id: post.id },
    optimisticResponse: {
      likePost: {
        __typename: "Post",
        id: post.id,
        likes: post.likes + 1,
      },
    },
    update(cache, { data }) {
      const updated = data?.likePost;
      if (!updated) return;
      cache.modify({
        fields: {
          posts(existingRefs = [], { readField }) {
            return existingRefs.map((ref: any) =>
              readField("id", ref) === post.id ? { ...ref, likes: updated.likes } : ref
            );
          },
        },
      });
    },
    onCompleted() { /* no-op */ },
  });

  const displayLikes = (optimisticLikes[post.id] ?? 0) + post.likes;

 return (
    <div className="post-card" aria-label={`Post by ${post.author}`} tabIndex={0}>
      <header style={{ display: "flex", alignItems: "center", marginBottom: "0.5rem" }}>
        <div
          style={{
            width: "2rem",
            height: "2rem",
            borderRadius: "50%",
            backgroundColor: "#ccc",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: "0.5rem",
          }}
          aria-hidden="true"
        >
          {post.author[0]?.toUpperCase()}
        </div>
        <div>
          <div style={{ fontWeight: "bold" }}>{post.author}</div>
          <div style={{ fontSize: "0.75rem", color: "#666" }} title={post.timestamp}>
            {timeAgo(post.timestamp)}
          </div>
        </div>
      </header>

      <p style={{ margin: "0.5rem 0" }}>
        {post.content}
        {post.content.length > 180 && (
          <a href="#" style={{ color: "orange", marginLeft: "0.25rem" }}>Read more</a>
        )}
      </p>

      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt=""
          loading="lazy"
          decoding="async"
          style={{
            width: "100%",
            borderRadius: "8px",
            margin: "0.5rem 0",
          }}
        />
      )}

      <footer style={{ marginTop: "0.5rem" }}>
        <div style={{ display: "flex", gap: "1rem", fontSize: "0.875rem", color: "#666" }}>
          <span>♥ {displayLikes}</span>
          <span>💬 {post.comments}</span>
          <span>🔁 {post.reposts}</span>
          <span>👁 {post.views.toLocaleString()}</span>
        </div>
        <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
          <button
            className="like-btn"
            onClick={() => { bumpLike(post.id); likePost(); }}
            disabled={loading}
          >
            Like
          </button>
          <button className="like-btn">Comment</button>
          <button className="like-btn">Repost</button>
          <button className="like-btn">Thanks</button>
        </div>
      </footer>
    </div>
  );

}
