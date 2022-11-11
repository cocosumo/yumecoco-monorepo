import { loadEnv } from 'libs';
import express from 'express';
import docusignSend from './route/docusign';
loadEnv();

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/test', (_, res )=>{
  res.status(200).send('YEHEY');
});
app.use('/docusign', docusignSend);

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
