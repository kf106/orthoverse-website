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
          "name": "The Orthoverse Land Collection",
          "description": "The Orthoverse is the largest NFT collection in existence, with over 1.4 quindecillion tokens in existence. Every Ethereum address already has an NFT representing a parcel of land in the Orthoverse. Vist our site to reveal your NFT and to learn more about the project.",
          "image": "https://orthoverse.io/logo.png",
          "external_link": "https://orthoverse.io/",
          "seller_fee_basis_points": 250,
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
        "external_url": "https://orthoverse.io/",
        "name": "0x" + shortId.slice(-40),
        "description": "Orthoverse Land for 0x" + shortId.slice(-40),
        "image": "https://orthoverse.io/api/img/" + shortId.slice(-40) + ".png",
        }
      res.status(200).json(metadata)
    }
  }
}
