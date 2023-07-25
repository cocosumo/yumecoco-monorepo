
import axios from 'axios';
import { RequestHandler } from 'express';


export const reqImageToBase64: RequestHandler<
unknown,
{
  base64Img: string
},
{
  imageUrl: string,
}
> = async (req, res) => {
  try {
    const {
      imageUrl,
    } = req.body;

    console.log(req.body);

    if (!imageUrl) throw new Error('URLは指定されていません');

    const sanitizedImageUrl = imageUrl.replace(/ /g, '%20');

    const result = await axios.get(sanitizedImageUrl, {
      responseType: 'arraybuffer',
    });

    const base64Img = Buffer.from(result.data, 'binary').toString('base64');
    

    res.status(200).json({
      base64Img,
    });

    
  } catch (err) {
    res.status(400).send(err);
  }
};
