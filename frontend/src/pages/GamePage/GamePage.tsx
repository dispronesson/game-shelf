import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./GamePage.module.css";

interface GameFull {
  id: number;
  slug: string;
  name: string;
  description: string;
  background_image: string;
  released: string;

  parent_platforms: { platform: { slug: string; name: string } }[];
  platforms: {
    platform: { slug: string; name: string };
    requirements?: { minimum?: string; recommended?: string };
  }[];

  publishers: { name: string }[];
  developers: { name: string }[];
  genres: { name: string }[];

  esrb_rating?: { name: string };
}

interface Screenshot {
  id: number;
  image: string;
}

function GamePage() {
  const { slug } = useParams();

  const [game, setGame] = useState<GameFull | null>(null);
  const [screens, setScreens] = useState<Screenshot[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  
  useEffect(() => {
    console.log(slug);
    if (!slug) return;

    const load = async () => {
      try {
        const res = await axios.get<GameFull>(`/api/games/${slug}`);
        setGame(res.data);

        const sc = await axios.get<{ results: Screenshot[] }>(`/api/games/${slug}/screenshots`);
        setScreens(sc.data.results ?? []);

      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [slug]);

  useEffect(() => {
    const close = (e: KeyboardEvent) => e.key === "Escape" && setSelectedImg(null);
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  if (loading)
    return (
        <div className={styles.loaderContainer}>
            <div className={styles.spinner}></div>
        </div>
    );
  if (!game) return <div>Game not found</div>;

  // берем требования только от PC-платформы
  const pc = game.platforms.find(p => p.platform.slug === "pc");
  const min = pc?.requirements?.minimum;
  const rec = pc?.requirements?.recommended;

  return (
    <div className={styles.page}>

      {/* HEADER */}
      <h1 className={styles.title}>{game.name}</h1>

      {/* платформы как иконки */}
      <div className={styles.platforms}>
        {game.parent_platforms?.map(p => (
          <span key={p.platform.slug} className={styles.platIcon}>
            {p.platform.name}
          </span>
        ))}
      </div>

      {/* обложка */}
      <img className={styles.cover} src={game.background_image} alt={game.name} />

      {/* ABOUT */}
      <h2 style={{ color: "black", fontWeight: 600 }}>About</h2>
      <p className={styles.desc}>
        <span dangerouslySetInnerHTML={{ __html: game.description }} />
      </p>

      {/* INFO GRID */}
      <div className={styles.infoGrid}>
        <div>
          <p><b>Platforms:</b> {game.parent_platforms.map(p => p.platform.name).join(", ")}</p>
          <p><b>Release date:</b> {game.released}</p>
          <p><b>Publisher:</b> {game.publishers.map(p => p.name).join(", ")}</p>
        </div>

        <div>
          <p><b>Genre:</b> {game.genres.map(g => g.name).join(", ")}</p>
          <p><b>Developer:</b> {game.developers.map(d => d.name).join(", ")}</p>
          <p><b>Age rating:</b> {game.esrb_rating?.name ?? "—"}</p>
        </div>
      </div>

      {/* SYSTEM REQUIREMENTS */}
      {pc && (min || rec) && (
        <div className={styles.systemReq}>
          <h3>System requirements for PC</h3>
          {min && <p><b>Minimum:</b> <span dangerouslySetInnerHTML={{ __html: min }} /></p>}
          {rec && <p><b>Recommended:</b> <span dangerouslySetInnerHTML={{ __html: rec }} /></p>}
        </div>
      )}

      <h3>Screenshots</h3>
      <div className={styles.screens}>
        {screens.map(s => (
          <img
            key={s.id}
            src={s.image}
            alt=""
            className={styles.screenImg}
            onClick={() => setSelectedImg(s.image)}
          />
        ))}
      </div>

      {selectedImg && (
        <div className={styles.modal} onClick={() => setSelectedImg(null)}>
          <img
            src={selectedImg}
            className={styles.modalImg}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

    </div>
  );
}

export default GamePage;