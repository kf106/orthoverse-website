import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function About() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Orthoverse: About</title>
        <meta name="description" content="About the Orthoverse" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div>
          <div>
            <h1 className={styles.title}>
              About the Orthoverse
            </h1>
          </div>

          <div className={styles.textalign}>
            <div className={styles.description}>
              How to mint an insane number of NFTs in one go
              <p>With the Orthoverse ERC1155 contract we have minted a different unique NFT 
                 with a different image into every Ethereum address that exists,
                 or could exist.</p>
              <p>Your personal ORTH token can already be seen on the Ethereum blockchain,
                 and on this site on the <Link href="/reveal" passHref><a className={styles.inlink}>Reveal</a></Link> page.</p>
              <p>However, in order to view and trade it on NFT sales and
                 auctions platforms, you should got to the <Link href="/reveal" passHref><a className={styles.inlink}>Reveal</a></Link> page and 
                 submit one cheap transaction.</p>
              <p>And we mean cheap. Have a look at the following comparisons:</p>
              <ul>
                <li>Minting an ERC721 NFT: $58</li>
                <li>Transfering an ERC20 : $22</li>
                <li className={styles.libold}>Revealing your ORTH : $15</li>
              </ul>
              <p>(Assumes a gas price of 100 gwei and an ETH price of $3400)</p>
              <p>When we say &quot;an insane number&quot;, we are not kidding. Almost 1.5 quindecillion ORTH NFTs now
              exist on the blockchain. That&apos;s a number followed by 48 zeroes.</p>
              <p>To put this in context: there is one ORTH token for every ten atoms in the Earth.</p>
            </div>
          </div>

          <div className={styles.textalign}>
          <div className={styles.grid}>
            <Link href="/" passHref>
            <div className={styles.card}>
              <h2>Back &larr;</h2>
              <p>Return to the home page</p>
            </div>
            </Link>
            <Link href="/reveal" passHref>
            <div className={styles.card}>
              <h2>Reveal your NFT &rarr;</h2>
              <p>Why are you waiting?</p>
            </div>
            </Link>
          </div>
          </div>

        </div>
      </main>

      <footer className={styles.footer}>

        <div className={styles.main} className={styles.textalign}>
          Brought to you by 
          <div className={styles.inlink}>
          <Link href="https://www.linkedin.com/in/keirf/" passHref>
            Keir Finlow-Bates
          </Link>
          </div>
          and 
          <div className={styles.inlink}>
          <Link href="https://www.linkedin.com/in/richardpiacentini/" passHref>
            Richard Piacentini
          </Link>
          </div>
        </div>

      </footer>
    </div>
  )
}
