import * as express from 'express';
import * as sharp from 'sharp';

class Converter {
  // https://sharp.pixelplumbing.com/api-output
  // https://www.npmjs.com/package/sharp нужен класс конвертер,
  // у которого будут методы для работы с разными форматами,
  // нужно как-то импортировать string полученный от брокера в сервис,
  // и использовать модуль path чтобы зарезолвить файл

  // https://medium.com/better-programming/sharp-high-performance-node-js-image-processing-library-3f04df66c722
  // https://codingshiksha.com/javascript/node-js-express-image-resizer-and-converter-web-app-using-sharp-library-deployed-to-heroku-2020/

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
