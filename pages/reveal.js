import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

import { useState, useEffect } from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import { nftchain, nftparams, contractAddress, host } from '../nft.config';
import Orthoverse from '../abi/Orthoverse.json';
import MetaMaskButton from '../components/metaMaskButton';
import RevealButton from '../components/revealButton';

export default function Reveal() {
  const [ provider, setProvider ] = useState(false);
  const [ connected, setConnected ] = useState(false);
  const [ mmaccount, mmsetAccount ] = useState('0x0000000000000000000000000000000000000000');
  const [ revealed, setRevealed] = useState('hidden');

  useEffect(() => {
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined" ) {
      if (window.ethereum.isMetaMask) {
        setProvider(true);
      }
      async function listenAccountChange() {
        window.ethereum.on('accountsChanged', () => {
          connectMetaMask()
        })
      }
      listenAccountChange();
      async function listenChainChange() {
        window.ethereum.on('chainChanged', (chainId) => {
          handleChainChange(chainId);
        })
      }
      listenChainChange();
    }
  }, []);

  async function handleChainChange(chainId) {
    console.log("Chain changed to " + chainId)
    if ( chainId !== nftparams[0].chainId) {
      console.log(chainId + " is the wrong chain")
      mmsetAccount('0x0000000000000000000000000000000000000000')
      setConnected(false)
    }
  }

  async function connectMetaMask() {
    console.log("MetaMask button clicked");
    window.ethereum
      .request({method: 'eth_requestAccounts'})
      .then( (accounts) => {
        console.log(accounts);
        mmsetAccount(accounts[0]);
        checkReveal(mmaccount);
     })
     .catch( (error) => {
       console.error('Error fetching accounts', error);
       mmsetAccount('0x0000000000000000000000000000000000000000')
     })
     .finally( () => {
       // check whether chain to use is one of the original ones
       if (['0x1','0x3','0x4','0x5','0x2a', '0x2A'].includes(nftparams[0].chainId)) {
         window.ethereum
           .request({
             method: 'wallet_switchEthereumChain',
             params: [{
               chainId: nftparams[0].chainId
             }]
          })
          .then( () => { 
           setConnected(true);
          })
          .catch( (error) => {
            console.error('Error switching chain', error);   
            mmsetAccount('0x0000000000000000000000000000000000000000')  
          });
       } else {
         window.ethereum
          .request({
            method: 'wallet_addEthereumChain',
            params: nftparams
          })
          .catch( (error) => {
            console.error('Error switching chain', error);   
            mmsetAccount('0x0000000000000000000000000000000000000000')  
          });
        }
     })
  }

const myLoader = () => {
  return host + "/api/img/" + mmaccount.slice(2, 42) + ".png"
}

async function checkReveal(account) {
  const web3Modal = new Web3Modal();
  const connection = await web3Modal.connect();
  const prov = new ethers.providers.Web3Provider(connection);
  const signer = prov.getSigner();
  const contract = new ethers.Contract(contractAddress, Orthoverse.abi, signer);
  const revealState = await contract.isRevealed();
  if (revealState != 0) {
    setRevealed('revealed');
  }
}

async function revealNFT(account) {
  setRevealed('revealing');
  const web3Modal = new Web3Modal();
  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, Orthoverse.abi, signer);
  try {
    const transaction = await contract.reveal();
    transaction.wait()
    .then(response => {
      console.log("Transaction response:")
      console.log(response)
      if (response.events[0].transactionHash !== undefined) {
        const event = response.events[0]
        const txHash = event.transactionHash
        console.log("Transaction hash is " + txHash)
        setRevealed('revealed')
      } else {
        setRevealed("rejected")
        console.log("Transaction was rejected by user")
      }
    })
    .catch (ex => {
      setRevealed("rejected")
      console.log("Transaction was rejected by user")
      console.error(ex);
    });
  } catch(ex) {
    if (ex.message == "MetaMask Tx Signature: User denied transaction signature.") {
      setRevealed("rejected")
      console.log("Transaction was rejected by user")
  } else if (ex.data.message.startsWith("err: insufficient funds")) {
    setRevealed("insufficient");
    console.log("User has insufficient funds")
  } else {
    console.log("Caught unexpected transaction error")
    console.log(ex);
    }
  }
}

  return (
    <div className={styles.container}>
      <Head>
        <title>Orthoverse: Reveal</title>
        <meta name="description" content="The Orthoverse" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div>
          <h1 className={styles.title}>
            Reveal Your Token
          </h1>
        </div>

        <div className={styles.textalign}>
        <div className={styles.description}>
        <ul>

          <li>
            <div>
              <div>
                <span className={styles.libold}>Step One</span>
              </div>
            </div>
            <div style={{ display: !provider ?  'block' : 'none' }}>
              To use this site you need to install the 
              <a href="https://metamask.io/"> MetaMask </a>
              plugin.
            </div>       
            <div style={{ display: (provider && !connected) ?  'block' : 'none' }}>
              Connect your MetaMask wallet to the { nftchain } blockchain.
            </div>
            <div style={{ display: (provider && connected) ?  'block' : 'none' }}>
              You are connected to the { nftchain } blockchain.
            </div>
            <div style={{ display: provider ? 'block' : 'none' }}>
              <div className="mt-4" onClick={() => connectMetaMask() }>
                <MetaMaskButton account={ mmaccount } />
              </div>
            </div>
            <div>&nbsp;</div>
          </li>

          <li style={{ display: (connected && (revealed != 'revealed')) ?  'block' : 'none' }}>
            <div>
              <div>
                <span className={styles.libold}>Step Two:</span>
              </div>
              <div>
                <div>
                  This is what your ORTH token looks like. There is no other token exactly the same.
                </div>

                  <div>
                    <Image
                      loader={ myLoader }
                      src={ mmaccount.slice(2,42)}
                      alt="ORTH token"
                      width="360"
                      height="360"
                    />
                  </div>

                <div>
                  Click the button below to reveal your token (involves a small Ethereum transaction):
                </div>
                { (revealed == 'hidden') && (
                  <div className="mt-4" onClick={() => revealNFT() }>
                    <RevealButton state={ revealed } />
                  </div>
                )}
                { (revealed != 'hidden') && (
                  <div className="mt-4" >
                    <RevealButton state={ revealed } />
                  </div>
                )}
                { ( revealed == 'revealing') && (
                  <div>
                    Please be patient - after you accept the MetaMask request it can take up 
                    to half a minute for your NFT to be revealed.
                  </div>
                )}
                { (revealed == 'rejected') && (
                  <div> 
                    <div>
                      ❌ You cancelled your minting transaction.
                    </div>
                    <div>
                      Reload the page to try again.
                    </div>
                  </div>
                )}
                { (revealed == 'insufficient') && (
                  <div> 
                    <div>
                      ❌ You do not have enough funds in your wallet.
                    </div>
                    <div>
                      Obtain some more ETH, and then reload the page to try again.
                    </div>
                  </div>
                )}
              </div>
            </div>
          </li>

          <li style={{ display: (connected && (revealed == 'revealed')) ?  'block' : 'none' }}>
            <div>
              <div>
                <span className={styles.libold}>Revealed!</span>
              </div>
              <div>
                <div>
                  Your NFT is revealed and can be seen on NFT auction platforms such as OpenSea.
                </div>

                  <div>
                    <Image
                      loader={ myLoader }
                      src={ mmaccount.slice(2,42)}
                      alt="ORTH token"
                      width="360"
                      height="360"
                    />
                  </div>

              </div>
            </div>
          </li>


        </ul>
        </div>
        </div>

        <div className={styles.textalign}>
          <div className={styles.grid}>
            <Link href="/about" passHref><a>
            <div className={styles.card}>
              <h2>Read more &rarr;</h2>
              <p>Find out more about this project</p>
            </div>
            </a></Link>
            <Link href="/" passHref>
            <div className={styles.card}>
              <h2>Return Home &rarr;</h2>
              <p>Go back to the main page of the site</p>
            </div>
            </Link>
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
