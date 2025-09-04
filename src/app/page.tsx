"use client";

import Header from "@/components/Header";
import NavTabs from "@/components/NavTabs";
import {useQuery } from "@apollo/client/react";
import { gql } from "@apollo/client";


const GET_POSTS = gql`
  query {
    posts {
      id
      author
      content
      likes
      timestamp
    }
  }
`;

export default function HomePage() {
  const { data, loading, error } = useQuery(GET_POSTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data || !data.posts) return <p>No posts available.</p>;

  return (
    <main>
       <Header />
      <NavTabs />
      <h1>Muze Feed</h1>
      {data.posts.map((post: any) => (
        <div
          key={post.id}
          style={{
            border: "1px solid gray",
            padding: "1rem",
            margin: "1rem 0",
          }}
        >
          <h2>@{post.author}</h2>
          <p>{post.content}</p>
          <p>❤️ {post.likes}</p>
          <small>{new Date(post.timestamp).toLocaleString()}</small>
        </div>
      ))}
    </main>
  );
}
