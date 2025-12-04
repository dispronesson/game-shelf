import React from "react";
import { Link } from "react-router-dom";
import styles from "./GameCard.module.css";

import {
  Windows,
  Playstation,
  Xbox,
  Tux,
  Apple,
} from "react-bootstrap-icons";

export type PlatformType = "pc" | "xbox" | "playstation" | "linux" | "macos";

interface GameCardProps {
  slug: string;
  image: string;
  title: string;
  releaseDate: string;
  platforms: PlatformType[];
  genres: string[];
}

const platformIcons: Record<PlatformType, React.ReactNode> = {
  pc: <Windows />,
  xbox: <Xbox />,
  playstation: <Playstation />,
  linux: <Tux />,
  macos: <Apple />,
};

function GameCard(props: GameCardProps) {
  return (
    <Link to={`/game/${props.slug}`} className={styles.card}>
      <div
        className={styles.image}
        style={{ backgroundImage: `url(${props.image})` }}
      />

      <div className={styles.content}>
        <div className={styles.platforms}>
          {props.platforms.map((p) => (
            <span key={p} className={styles.icon}>
              {platformIcons[p]}
            </span>
          ))}
        </div>

        <h3 className={styles.title}>{props.title}</h3>

        <div className={styles.row}>
          <span>Release date:</span>
          <span>{props.releaseDate}</span>
        </div>
        <div className={styles.line} />

        <div className={styles.row}>
          <span>Genres:</span>
          <span>{props.genres.join(", ")}</span>
        </div>
        <div className={styles.line} />
      </div>
    </Link>
  );
};

export default GameCard;
