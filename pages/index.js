import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Orthoverse: Home</title>
        <meta name="description" content="The Orthoverse" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div>
          <div>
            <h1 className={styles.title}>
              Welcome to the Orthoverse
            </h1>
          </div>

          <div className={styles.textalign}>
            <div className={styles.description}>
              Where everyone already owns their land NFT
            </div>
          </div>

          <div className={styles.textalign}>
          <div className={styles.grid}>
            <Link href="/about"><a>
            <div className={styles.card}>
              <h2>Read more &rarr;</h2>
              <p>Find out more about this 1.5 quadricillion NFT token airdrop</p>
            </div>
            </a></Link>
            <Link href="">
            <div className={styles.card}>
              <h2>Reveal your NFT &rarr;</h2>
              <p>See what your NFT looks like and make it visible to others</p>
            </div>
            </Link>
          </div>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
          Some text here
      </footer>
    </div>
  )
}
