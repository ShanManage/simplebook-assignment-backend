import express from 'express'
import cors from 'cors';
import productRoutes from './routes/products.js'
import userRoutes from './routes/users.js'

import config from './config.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)

app.get('/', (req, res) => {
  res.send('Successful response.');
});

app.listen(config.port, () =>
  console.log(`Server is live @ ${config.hostUrl}`),
);