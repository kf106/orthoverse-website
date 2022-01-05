// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const Jimp = require('jimp');
import { useRouter } from 'next/router'
import { tiles } from '../../../config/tiles.js';

const palettes = [
  [0xeeeeeeff, 0x666666ff, 0x88b889ff, 0x5bb859ff, 0x3b9718ff, 0x034e15ff, 0x002d06ff, 0x000000ff], // forest
  [0xeeeeeeff, 0x666666ff, 0xb88889ff, 0xb85b59ff, 0x973b18ff, 0x4e0315ff, 0x2d0006ff, 0x000000ff], // rust
  [0xeeeeeeff, 0x666666ff, 0x8889b8ff, 0x5b59b8ff, 0x3b1897ff, 0x03154eff, 0x00062dff, 0x000000ff], // dusk
  [0xeeeeeeff, 0x666666ff, 0xbaab75ff, 0xc1a231ff, 0xab7b00ff, 0x4f4100ff, 0x2e2500ff, 0x000000ff], // desert
  [0xeeeeeeff, 0x666666ff, 0xacacacff, 0xa6a6a6ff, 0x848484ff, 0x424242ff, 0x252525ff, 0x000000ff], // grays
];



const handler = async (req, res) => {
  const id = req.query.id;
  if (id.length != 44) {
      res.status(404).send('Error 404')
  } else {
    // build an array of which feature
    let tile_choice = [];
    let palette_choice = [];
    for (let i = 0; i < 36; i++) {
        tile_choice.push(parseInt(id[i], 16) & 7);
        palette_choice.push((parseInt(id[i], 16) & 8) / 8);
    }

    const image = await new Jimp(105,105, palettes[parseInt(id[39], 16) % 5][5]);
    for (let y = 4; y < 10; y++) {
      for (let x = 6; x < 99; x++) {
        image.setPixelColor(palettes[parseInt(id[39], 16) % 5][3], x, y);
      }
    }
    for (let x = 6; x < 99; x++) {
        image.setPixelColor(palettes[parseInt(id[39], 16) % 5][2], x, 3);
        image.setPixelColor(palettes[parseInt(id[39], 16) % 5][2], x, 10);
    }

    // scan through tiles
    const x_offset = 32;
    const y_offset = 40;
    for (let x = 0; x <6; x++) {
      for (let y = 0; y <6; y++) {
        const tile = tile_choice[x + y * 6];
        for (let scan_x = 0; scan_x <16; scan_x++) {
          for (let scan_y = 0; scan_y <11; scan_y++) {
            const tile_color = tiles[tile][scan_y][scan_x];
            // console.log("tile color for " + scan_x.toString() + " and " + scan_y.toString() + " is " + tile_color.toString());
            if (tile_color != 9) {
              let swatch = 2;
              if (tile != 2) { 
                swatch = palette_choice[x + y * 6];
              }
              if (tile == 4) {
                swatch = 0;
              }
              const color = palettes[swatch][tile_color];
              image.setPixelColor(color, (x * 11) + x_offset - (y*6) + scan_x, (y * 6) + y_offset + scan_y);
            }
          }
        }
      }
    } 
    await image.resize(360, 360, Jimp.RESIZE_NEAREST_NEIGHBOR);
    await Jimp.loadFont(Jimp.FONT_SANS_12_BLACK).then(font => {
      image.print(font, 36, 16, "0x" + id.slice(0,40));
    });
    await image.getBuffer(Jimp.MIME_PNG, (err, buffer) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'image/png');
      res.send(buffer)
    })
  }
}

export default handler;
