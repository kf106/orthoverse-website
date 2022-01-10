import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Image from 'next/image';

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
          <div className={styles.title}>
            <div>
            <Image
              src="/orthoverselogo.png"
              width="800"
              height="247"
            />
            </div>
          </div>

          <div className={styles.title}>
            <div>
            WELCOME TO THE ORTHOVERSE
            </div>
          </div>

          <div className={styles.runner}>
            <div>
              Where everyone already owns their land NFT
            </div>
          </div>

          <div className={styles.textalign}>
          <div className={styles.grid}>
            <div className={styles.nftimg}><Image src="/nft/nft1.jpg" layout="fill" /></div>
            <div className={styles.nftimg}><Image src="/nft/nft2.jpg" layout="fill" /></div>
            <div className={styles.nftimg}><Image src="/nft/nft3.jpg" layout="fill" /></div>
            <div className={styles.nftimg}><Image src="/nft/nft4.jpg" layout="fill" /></div>
          </div>
          </div>

          <div className={styles.textalign}>
          <div className={styles.grid}>
            <Link href="/about" passHref><a>
            <div className={styles.card}>
              <h2>Read more &rarr;</h2>
              <p>Find out more about this 1.5 quindecillion NFT token airdrop</p>
            </div>
            </a></Link>
            <Link href="/reveal" passHref>
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

        <div className={styles.footertext}>
          Brought to you by <span className={styles.inlink}><Link href="https://www.linkedin.com/in/keirf/" passHref>Keir Finlow-Bates</Link></span> and <span className={styles.inlink}><Link href="https://www.linkedin.com/in/richardpiacentini/" passHref> Richard Piacentini</Link></span>
          <br /><br />
          Design by <span className={styles.inlink}><Link href="https://www.linkedin.com/in/philippe-borg-20525a22a/" passHref>PH Creative Studio</Link></span>
        </div>

      </footer>
    </div>
  )
}
