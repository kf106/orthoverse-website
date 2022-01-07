export const nftparams = [{
                           "chainId": "0x4",
                           "blockExplorerUrls": [ "https://rinkeby.etherscan.io" ],
                           "chainName": "Rinkeby Test Network",
                           "nativeCurrency": {
                             "name": "Eth",
                             "symbol": "ETH",
                             "decimals": 18
                            },
                            "rpcUrls": [
                              "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
                            ]
                         }]

export const host = "http://localhost:3000";
export const contractAddress = "0x23f37d0D611E2CDB81C6830eCeb9b56f5B023BE0";
export const nftexplorer = nftparams[0].blockExplorerUrls[0];
export const nftchain = nftparams[0].chainName;

const bsc_main_nftparams = [{
                           "chainId": "0x38",
                           "blockExplorerUrls": [ "https://bscscan.com/" ],
                           "chainName": "Binance Smart Chain",
                           "nativeCurrency": {
                             "name": "BNB",
                             "symbol": "BNB",
                             "decimals": 18
                            },
                            "rpcUrls": [
                              "https://bsc-dataseed.binance.org/",
                            ]
                         }]

const bsc_test_nftparams = [{
                           "chainId": "0x61",
                           "blockExplorerUrls": [ "https://testnet.bscscan.com" ],
                           "chainName": "Binance Smart Chain Testnet",
                           "nativeCurrency": {
                             "name": "tBNB",
                             "symbol": "tBNB",
                             "decimals": 18
                            },
                            "rpcUrls": [
                              "https://data-seed-prebsc-1-s1.binance.org:8545",
                            ]
                         }]

const ropsten_nftparams = [{
                           "chainId": "0x3",
                           "blockExplorerUrls": [ "https://ropsten.etherscan.io" ],
                           "chainName": "Ropsten Test Network",
                           "nativeCurrency": {
                             "name": "Eth",
                             "symbol": "ETH",
                             "decimals": 18
                            },
                            "rpcUrls": [
                              "https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
                            ]
                         }]

const rinkeby_nftparams = [{
                           "chainId": "0x4",
                           "blockExplorerUrls": [ "https://rinkeby.etherscan.io" ],
                           "chainName": "Rinkeby Test Network",
                           "nativeCurrency": {
                             "name": "Eth",
                             "symbol": "ETH",
                             "decimals": 18
                            },
                            "rpcUrls": [
                              "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
                            ]
                         }]

const polygon_nftparams = [{
                           "chainId": "0x89",
                           "blockExplorerUrls": [ "https://polygonscan.com" ],
                           "chainName": "Matic(Polygon) Mainnet",
                           "nativeCurrency": {
                             "name": "Matic",
                             "symbol": "MATIC",
                             "decimals": 18
                            },
                            "rpcUrls": [
                              "https://rpc-mainnet.matic.network",
                              "wss://ws-mainnet.matic.network",
                              "https://rpc-mainnet.matic.quiknode.pro",
                              "https://matic-mainnet.chainstacklabs.com"
                            ]
                         }]

const mumbai_nftparams = [{
                           "chainId": "0x13881",
                           "blockExplorerUrls": [ "https://mumbai.polygonscan.com" ],
                           "chainName": "Matic(Polygon) Testnet Mumbai",
                           "nativeCurrency": {
                             "name": "tMatic",
                             "symbol": "tMATIC",
                             "decimals": 18
                            },
                            "rpcUrls": [
                              "https://rpc-mumbai.matic.today",
                              "wss://rpc-mumbai.matic.today",
                              "https://matic-mumbai.chainstacklabs.com"
                            ]
                     }]
