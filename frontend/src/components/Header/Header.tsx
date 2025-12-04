import React from "react";
import { Search, X } from "react-bootstrap-icons";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Header() {
  const [query, setQuery] = React.useState("");
  const navigate = useNavigate();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          GameShelf
        </Link>

        <div className={styles.searchWrapper}>
          <Search 
            className={styles.searchIcon} 
          />

          <input
            className={styles.searchInput}
            placeholder="Search games..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />

        {query.length > 0 && (
          <X
            className={styles.clearIcon}
            onClick={() => setQuery("")}
          />
        )}
        </div>
      </div>
    </header>
  );
};

export default Header;
