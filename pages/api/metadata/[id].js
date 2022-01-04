// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { useRouter } from 'next/router'


function hexToLat (input) {
  let result = "";
  if (parseInt(input[0], 16) < 15) {
    result = result + "+";
  } else {
    result = result + "+";
  }
  result = result + Math.floor(parseInt(input.slice(1,4), 16)*90/4095) + "." + parseInt(input.slice(4,10), 16)
  return result;
}

function hexToLong (input) {
  let result = "";
  if (parseInt(input[0], 16) < 15) {
    result = result + "+";
  } else {
    result = result + "+";
  }
  result = result + Math.floor(parseInt(input.slice(1,4), 16)*180/4095) + "." + parseInt(input.slice(4,10), 16);
  return result;
}

export default function handler(req, res) {

  const id = req.query.id;
  if ( id == 'contract.json') {
      const contract = {
          "name": "PICT NFT Collection",
          "description": "The PICT NFT collection provides a unique NFT for each and every Ethereum address that exists or can ever exist",
          "image": "https://pict.fi/logo.png",
          "external_link": "https://pict.fi/",
          "seller_fee_basis_points": 500,
          "fee_recipient": "0x2Ccc96B3690F88F05b1B99319c4eCfce033Dddd5"
        }
      res.status(200).json(contract)
  } else {
    const shortId = id.slice(0,-5);  // remove .json
    if (shortId.length != 64) {
      res.status(404).send('Error 404');
    } else {
      const Lat = hexToLat(shortId.slice(-20));
      const Long = hexToLong(shortId.slice(-40).slice(0, 20));
      const metadata = {
        "attributes": [
          {
              "trait_type": "Latitude",
              "value": Lat,
          },
          {
              "trait_type": "Longitude",
              "value": Long,
          }
        ],
        "external_url": "https://pict.fi/",
        "name": "0x" + shortId.slice(-40),
        "description": "PICT NFT for address 0x" + shortId.slice(-40),
        "image": "https://pict.fi/api/img/" + shortId.slice(-40) + ".png",
        }
      res.status(200).json(metadata)
    }
  }
}
