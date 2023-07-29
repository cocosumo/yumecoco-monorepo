import { loadEnv } from 'libs';
import express from 'express';
import docusignSend from './route/docusign';
import kokoas from './route/kokoas';
import openai from './route/openai';
import { ApiNodes } from 'types';
import axios from 'axios';
import { baseUrl } from 'config';


loadEnv();

const app = express();
const PORT = process.env.PORT || 3000;
const COCO_BASE_URL = process.env.COCO_BASE_URL;

app.get('/', (_, res )=>{
  res.send('YEHEY');
});

const docusignApiRoot : ApiNodes = 'docusign';
const kokoasApiRoot : ApiNodes = 'kokoas';
const openAIRoot : ApiNodes = 'openai';


app.use(`/${docusignApiRoot}`, docusignSend);
app.use(`/${kokoasApiRoot}`, kokoas);
app.use(`/${openAIRoot}`, openai );

// cocosumo proxy
app.get('/wp/*', (req, res) => {

  console.log("'/wp' call", req.url);
  const actualEndpoint = req.url.replace('/wp/', '');
  const endpoint = `${COCO_BASE_URL}/${actualEndpoint}`;

  console.log('endpoint', endpoint);

  axios.get(endpoint)
    .then(({ data }) => {
      console.log('data', data);
      res.json(data);
    })
    .catch(err => {
      console.log('err', err);
      res.status(400).json(err);
    });
});

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
  console.log(`Test server ${baseUrl}`);
});
