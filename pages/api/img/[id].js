// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const Jimp = require('jimp');
import { useRouter } from 'next/router'

const palette = [
  0x7666a7ff,
  0x22837aff,
  0xbd478cff,
  0xd96f68ff,
  0xb2f0bcff,
  0x49453bff,
  0xebdebcff,
  0x676252ff,
  0x9c9580ff,
  0xc9c3acff,
  0x1e5f5aff,
  0x318a83ff,
  0x3eb0a7ff,
  0x8dc7c1ff,
  0xb2d9d4ff,
  0xc9e45dff
];


const handler = async (req, res) => {
  const id = req.query.id;
  if (id.length != 44) {
      res.status(404).send('Error 404')
  } else {
    console.log(id);
    const image = await new Jimp(5,8);
    for (let x = 0; x <=4; x++) {
      for (let y = 0; y <=7; y++) {
        console.log(y + x*5);
        console.log(id[y + x*5])
        const value = parseInt(id[y + x*5], 16);
        const color = palette[value];
        image.setPixelColor(color, x, y);
      }
    }
    await image.resize(240, 240, Jimp.RESIZE_NEAREST_NEIGHBOR);
    await image.getBuffer(Jimp.MIME_PNG, (err, buffer) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'image/png');
      res.send(buffer)
    })
  }
}

export default handler;
