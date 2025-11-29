import React from "react";
import { Search, X } from "react-bootstrap-icons";
import styles from "./Header.module.css";

const Header: React.FC = () => {
  const [query, setQuery] = React.useState("");

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>GameShelf</div>

        <div className={styles.searchWrapper}>
          <Search className={styles.searchIcon} />

          <input
            className={styles.searchInput}
            placeholder="Search game..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
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
