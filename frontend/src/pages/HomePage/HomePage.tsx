import { useEffect, useRef, useState, useCallback } from "react";
import axios from "axios";
import GameCard from "../../components/GameCard/GameCard"
import type { PlatformType } from "../../components/GameCard/GameCard"
import styles from "./HomePage.module.css";

interface RawgGame {
  id: number;
  slug: string;
  name: string;
  background_image: string;
  released: string;
  parent_platforms: { platform: { slug: string } }[];
  genres: { name: string }[];
};

interface RawgResults {
  count: number;
  results: RawgGame[];
}

const PAGE_SIZE = 20;

function HomePage() {
  const [games, setGames] = useState<RawgGame[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const loaderRef = useRef<HTMLDivElement | null>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const loadMore = useCallback(async () => {
    if (loading) return;
    if (totalPages && page > totalPages) return;

    setLoading(true);

    const res = await axios.get<RawgResults>(`/api/games?page=${page}`);
    const data = res.data;

    if (!totalPages) {
      setTotalPages(Math.ceil(data.count / PAGE_SIZE));
    }

    setGames(prev => {
      const existingIds = new Set(prev.map(g => g.id));
      const filtered = data.results.filter(g => !existingIds.has(g.id));
      return [...prev, ...filtered];
    });
    setPage(prev => prev + 1);

    setLoading(false);
  }, [loading, page, totalPages]);


  // первый запрос
  useEffect(() => {
    loadMore();
  }, []);

  // скролл подгрузка
  useEffect(() => {
    if (!loaderRef.current) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) loadMore();
    });

    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [loadMore]);

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>All Games</h1>

      <div className={styles.grid}>
        {games.map(g => (
          <GameCard
            key={g.id}
            slug={g.slug}
            image={g.background_image}
            title={g.name}
            releaseDate={g.released}
            platforms={g.parent_platforms.map(p => p.platform.slug as PlatformType)}
            genres={g.genres.map(g => g.name)}
          />
        ))}
      </div>

      <div ref={loaderRef} className={styles.observerTrigger} />

      {loading && <div className={styles.spinner} />}
    </div>
  );
}

export default HomePage;
