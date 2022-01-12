import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Image from 'next/image'

export default function About() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Orthoverse: About</title>
        <meta name="description" content="Terms and Conditions for the Orthoverse" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div>
          <div className={styles.title}>
            <div>
            <Image
              src="/orthoverselogo.jpg"
              width="800"
              height="247"
              alt="Orthoverse Logo"
            />
            </div>
          </div>

          <div>
            <h1 className={styles.title}>
              THESE ARE THE RULES
            </h1>
          </div>

          <div className={styles.runner}>
            <div>
               Terms of Service
            </div>
          </div>

          <div className={styles.textalign}>
            <div className={styles.description}>
             <p>Current version as of 12 January, 2022.</p>
              <p><b>Introduction:</b> The Orthoverse is a web3 website for interacting with the Orthoverse NFT token contract, maintained by a decentralized team of developers.</p>
              <p><b>Modification of this Agreement:</b> We reserve the right, in our sole discretion, to modify this Agreement. All modifications become effective when they are posted, and we will notify you by updating the date at the top of the Agreement.</p>
              <p><b>Assumption of Risk:</b>By accessing the Orthoverse software, you accept and acknowledge that: blockchain and web3 software is new and untested, and we cannot guarantee that the code will function as intended. We have no control over the underlying infrastructure and are not responsible for the performance or functionality of the Ethereum mainnet. You are soley responsible for your transactions, even when facilitated through this website, including but not limited to determining any taxes that apply to your transaction, and take responsibility for any payments made through your crypto wallet. You accept responsibility for any risks associated with interacting with the Orthoverse smart contract through this website or any other software or service.</p>
               <p><b>Limitation of Liability: </b> THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</p>
              <p><b>Disclaimers:</b> We do not represent or warrant that access to the front-end interface will be continuous, uninterrupted, timely, or secure; that the information contained in the interface will be accurate, reliable, complete, or current; or that the Interface will be free from errors, defects, viruses, or other harmful elements.</p>
              <p><b>Eligibility:</b> To access or use the front-end interface, you represent that you are at least the age of majority in your jurisdiction. You further represent that your access and use of the front-end interface will fully comply with all applicable laws and regulations and that you will not access or use the front-end interface to conduct, promote, or otherwise facilitate any illegal activity. Furthermore, you represent that neither you nor any entity you represent are included in any trade embargoes or sanctions list (&quot;Subject to Restrictions&quot;), nor resident, citizen, national or agent of, or an entity organized, incorporated or doing business in such territories (&quot;Restricted Territories&quot;).</p>
              <p><b>Privacy:</b> When you use the front-end interface, the only information we collect from you is your blockchain wallet address, completed transaction hashes, and token identifiers. We do not collect any personal information from you. We also do not use third-party services like Google Analytics or Facebook Pixel. We do not take responsibility for any information you make public on the Ethereum blockchain by taking actions through the front-end interface.</p>
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

        <div className={styles.footertext}>
          Brought to you by <span className={styles.inlink}><Link href="https://www.linkedin.com/in/keirf/" passHref>Keir Finlow-Bates</Link></span> and <span className={styles.inlink}><Link href="https://www.linkedin.com/in/richardpiacentini/" passHref> Richard Piacentini</Link></span>
          <br /><br />
          Design by <span className={styles.inlink}><Link href="https://www.linkedin.com/in/philippe-borg-20525a22a/" passHref>PH Creative Studio</Link></span>
        </div>

      </footer>
    </div>
  )
}
