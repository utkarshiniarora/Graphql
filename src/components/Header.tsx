"use client";

export default function Header() {
  return (
    <header className="header">
      <div className="brand">Muze</div>
      <label className="searchLabel">
        <span className="sr-only">Search</span>
        <input
          aria-label="Search or find something on Paper"
          className="search"
          placeholder="Search or find something on Paper"
        />
      </label>
      <button className="newPostBtn" aria-label="New Post">
        New Post
      </button>
    </header>
  );
}
