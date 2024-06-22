import express from 'express'
import cors from 'cors';
import productRoutes from './routes/products.js'

import config from './config.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/products', productRoutes)

app.get('/', (req, res) => {
  res.send('Successful response.');
});

app.listen(config.port, () =>
  console.log(`Server is live @ ${config.hostUrl}`),
);