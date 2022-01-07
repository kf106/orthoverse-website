// components/metaMaskButton.js
import Image from 'next/image';
import { Typography, Button } from '@material-ui/core'
import MetaMaskImg from '../public/metamask.svg';
import { formatAddress } from '../utils/utils.js';

function MetaMaskButton( { account } ) {
  return (
    <Button className="w-64 h-10"
      disableElevation
      variant='contained'
      color='secondary'
    >
      <div><Image src={ MetaMaskImg } alt="MetaMask" height="30px" width="30px"/></div>
      <Typography variant='button'>
        { (account) ? formatAddress(account) : 'Connect MetaMask' }
      </Typography>
    </Button>
  );
};

export default MetaMaskButton;
