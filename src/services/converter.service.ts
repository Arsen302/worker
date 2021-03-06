import * as express from 'express';
import * as path from 'path';
import * as sharp from 'sharp';
import { v4 as uuid } from 'uuid';
import Photo from '../models/photo.model';

export const converter = async (data: any) => {
  // [?]какой я должен использовать тип для объекта, просто объект?

  const msg = JSON.parse(data.content.toString());
  const { name, convertedName, filePath, user } = msg;

  try {
    const image = await sharp(filePath)
      .toFormat('png')
      .png({ quality: 100 })
      .toFile(`src\\convertedPhotos\\${convertedName}.png`);
    console.log('Success converting...');
    // [?].toFile(`src\\convertedPhotos\\${uuid}.png`);
    // сделать так чтобы он сохранял файл в паsпку

    const convertedFilePath = await path.resolve(
      'src/convertedPhotos/',
      `${convertedName}`
    );

    console.log('Saving photo in DB...');

    const photo = await new Photo();

    photo.name = name;
    photo.convertedName = convertedName;
    photo.clientName = name;
    photo.filePath = filePath;
    photo.user = user;
    photo.convertedFilePath = convertedFilePath;

    await photo.save();

    console.log('Success saving in DB...');

    return image;
  } catch (err) {
    console.log(err);
  }
};
class Converter {
  async convertJpgToPng() {
    try {
      const image = await sharp()
        .toFormat('png')
        .png({ quality: 100 })
        .toFile(`${uuid}.png`);
      // [?].toFile(src/convertedPhotos/`${uuid}.png`);
      // сделать так чтобы он сохранял файл в папку
      console.log('Success converting');

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
