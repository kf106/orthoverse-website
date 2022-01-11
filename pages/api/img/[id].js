// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const Jimp = require('jimp');
import { useRouter } from 'next/router'
import { tiles, palettes } from '../../../config/tiles.js';

const handler = async (req, res) => {
  const id = req.query.id;
  if ((id.length == 46) || (id.length == 47)) {    
    const castle = id.match(/-(.*)\./).pop();

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

    if (castle != '0' && castle != '8') {
     let base = parseInt(castle) - 1; 
     if (base > 7) { base = base - 8};
     console.log(base);
     tile_choice[2 + 2 *6] = 8 + (base * 4);
     tile_choice[3 + 2 *6] = 9 + (base * 4);
     tile_choice[2 + 3 *6] = 10 + (base * 4);
     tile_choice[3 + 3 *6] = 11 + (base * 4);
     palette_choice[2 + 2 *6] = 6;
     palette_choice[3 + 2 *6] = 6;
     palette_choice[2 + 3 *6] = 6;
     palette_choice[3 + 3 *6] = 6; 
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
            if (tile_color != 9) { // tile color 9 is the alpha channel
              let swatch = 2; // default to lake palette
              if (tile != 2) { 
                swatch = palette_choice[x + y * 6]; // but switch away if it is not a lake
              }
              if (tile == 4) { // forest palette
                swatch = 0;
              }
              if (tile == 7) { // pine forest palette
                swatch = 5;
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
  } else {
   res.status(404).send('Error 404')
  }
}

export default handler;
