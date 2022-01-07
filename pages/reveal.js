import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

import { useState, useEffect } from 'react';
import Web3Modal from 'web3modal';
import { nftchain, nftparams, contractAddress, host } from '../nft.config';
import ABI from '../abi/Orthoverse.json';
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

function checkReveal(account) {
  
}

function revealNFT(account) {
  
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
            <p style={{ display: (provider && !connected) ?  'block' : 'none' }}>
              Connect your MetaMask wallet to the { nftchain } blockchain.
            </p>
            <p style={{ display: (provider && connected) ?  'block' : 'none' }}>
              You are connected to the { nftchain } blockchain.
            </p>
            <div style={{ display: provider ? 'block' : 'none' }}>
              <div onClick={() => connectMetaMask() }>
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
                <p>
                  This is what your ORTH token looks like. There is no other token exactly the same.
                </p>
                <div className={styles.grid}>
                  <div className={styles.nft}>
                    <Image
                      loader={ myLoader }
                      src={ mmaccount.slice(2,42)}
                      alt="ORTH token"
                      width="360"
                      height="360"
                    />
                  </div>
                </div>
                <p>
                  Click the button below to reveal your token (involves a small Ethereum transaction):
                </p>
                { (revealed == 'hidden') && (
                  <div onClick={() => revealNFT() }>
                    <RevealButton state={ revealed } />
                  </div>
                )}
                { (revealed != 'hidden') && (
                  <div>
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
                <span className={styles.libold}>Step Two:</span>
              </div>
              <div>
                <p>
                  Your NFT has been revealed and can be seen on NFT auction platforms such as OpenSea:
                </p>
                <div className={styles.grid}>
                  <div className={styles.nft}>
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
            </div>
          </li>


        </ul>
        </div>
        </div>
      </main>

      <footer className={styles.footer}>
          Some text here
      </footer>
    </div>
  )
}
