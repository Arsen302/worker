import * as express from 'express';
import * as sharp from 'sharp';
import { v4 as uuid } from 'uuid';
import Photo from 'src/models/photo.model';

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

  // const image || photo = data{} || 'pathToData';

  async convertJpgToPng(req: express.Request, res: express.Response, file) {
    try {
      const image = await sharp(file)
        .toFormat('png')
        .png({ quality: 100 })
        .toFile(`${uuid}.png`);
      // .toFile(src/convertedPhotos/`${uuid}.png`);
      // сделать так чтобы он сохранял файл в папку
      console.log('Success converting');

      const photo = await new Photo();
      photo.converted_file_path = image;

      await photo.save();
      console.log('Success converting');

      return image;
    } catch (err) {
      console.log(err);
    }
  }

  async convertPngToJpg(req: express.Request, res: express.Response) {
    const data = sharp().jpeg();
  }

  async convertWebPToPng(req: express.Request, res: express.Response) {
    const data = sharp().png();
  }

  async convertPngToWebP(req: express.Request, res: express.Response) {
    const data = sharp().webp();
  }

  async convertSvgToPng(req: express.Request, res: express.Response) {
    // const data = sharp(photo).png().toFile(`${uuid}.png`);
  }

  async convertPngToSvg(req: express.Request, res: express.Response) {
    const data = sharp().toBuffer(); // как в svg поменять???
  }
}

export default new Converter();
