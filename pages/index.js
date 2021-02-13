import Head from "next/head";
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/Home.module.css";

const ENV = process.env.NODE_ENV || "development";
const API_HOST_URL = ENV === "production" ? "https://fbar.vercel.app" : "http://localhost:3000";

export default function Home() {
  const [jp, setJp] = useState("");
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`${API_HOST_URL}/api/jp?q=${jp}`);

      setCandidates(result.data);
    };

    fetchData();
  }, [jp]);

  const handleJpChange = (event) => {
    setJp(event.target.value);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>铭语解码器</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>铭语解码器</h1>

        <div className={styles.grid}>
          <input
            type="text"
            minLength={1}
            maxLength={2}
            value={jp}
            onChange={handleJpChange}
          />
        </div>

        <div className={styles.grid}>{JSON.stringify(candidates)}</div>
      </main>

      <footer className={styles.footer}>By Shen Francisco🐦</footer>
    </div>
  );
}
