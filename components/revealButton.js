// components/mintButton.js
import Image from 'next/image';
import { Typography, Button } from '@material-ui/core'
import ortho from '../public/favicon-32x32.png';

const stateText = {
  "hidden": "Reveal your NFT",
  "revealing": "Revealing...",
  "revealed": "Congratulations!",
  "rejected": "User rejected tx",
  "insufficient": "Address has insufficient funds"
}

function RevealButton( { state } ) {

  return (
    <Button className="w-64 h-10"
      disableElevation
      variant='contained'
      color='secondary'
    >
      <div>
        <Image 
          src={ ortho }
          alt="Reveal NFT"
          height="30px"
          width="30px"
          className={( stateText[state] == 'Revealing...' ) ? 'animate-spin' : ''}
      />
      </div>
      <Typography variant='button'>
        { stateText[state] }
      </Typography>
    </Button>
  );
};

export default RevealButton;
