"use client";

import { useState } from "react";

export default function NavTabs() {
  const [active, setActive] = useState("For You");
  const tabs = ["For You", "Following", "Discover Feeds"];

  return (
    <nav className="nav-tabs">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActive(tab)}
          className={`nav-tab-button ${active === tab ? "active" : ""}`}
        >
          {tab}
        </button>
      ))}
    </nav>
  );
}
