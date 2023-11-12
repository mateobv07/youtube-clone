import { getVideos } from "@/firebase/functions";
import Link from "next/link";
import Image from "next/image";

import styles from "./page.module.css";

export default async function Home() {
  const videos = await getVideos();

  return (
    <main className={styles.main}>
      {videos.map((video) => (
        <Link
          href={`/watch?v=${video.filename}`}
          className={styles.thumbnailContainer}
        >
          <Image
            src={"/thumbnail.png"}
            alt="video"
            width={200}
            height={120}
            className={styles.thumbnail}
          />
          <p className={styles.videoTitle}>{video.title}</p>
        </Link>
      ))}
    </main>
  );
}
