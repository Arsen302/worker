import * as express from 'express';
import * as sharp from 'sharp';

class Converter {
  // https://sharp.pixelplumbing.com/api-output
  // https://www.npmjs.com/package/sharp нужен класс конвертер,
  // у которого будут методы для работы с разными форматами
  // https://medium.com/better-programming/sharp-high-performance-node-js-image-processing-library-3f04df66c722
  // https://www.youtube.com/watch?v=1oVme5nIEpY

  // if (req.file === '.jpg' || req.file === '.jpeg') {
  // await sharp(photo).png({ quality: 100 });
  // } else if (req.file === '.png') {
  //   await sharp().jpeg({ quality: 100 });
  // } else {
  //   return req.file
  // }

  async convertJpgToPng(req: express.Request, res: express.Response) {
    const data = sharp().png();
  }

  async convertPngToJpg(req: express.Request, res: express.Response) {
    const data = sharp().jpeg();
  }

  async convertSvgToPng(req: express.Request, res: express.Response) {
    const data = sharp().png();
  }

  async convertPngToSvg(req: express.Request, res: express.Response) {
    const data = sharp().toBuffer(); // как в svg поменять???
  }
}
