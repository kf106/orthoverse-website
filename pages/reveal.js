import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

import { useState, useEffect } from 'react';
import Web3Modal from 'web3modal';
import { nftchain, nftparams, contractAddress, host } from '../nft.config';
import ABI from '../abi/ABI.json';
import MetaMaskButton from '../components/metaMaskButton';

export default function Reveal() {
  const [ provider, setProvider ] = useState(false);
  const [ connected, setConnected ] = useState(false);
  const [ mmaccount, mmsetAccount ] = useState('0x0000000000000000000000000000000000000000');

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

          <li style={{ display: connected ?  'block' : 'none' }}>
            <div>
              <div>
                <span className={styles.libold}>Step Two:</span>
              </div>
              <p>
                Marvel at the glory of your own personal ORTH token (unless you have already revealed it and
                transfered it to someone else):
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
