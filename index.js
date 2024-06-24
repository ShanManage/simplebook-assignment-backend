import express from 'express'
import cors from 'cors';
import productRoutes from './src/routes/products.js'
import userRoutes from './src/routes/users.js'
import { decodeToken } from './src/middleware/index.js';

import config from './config.js';

const app = express();

app.use(cors());
app.use(decodeToken);
app.use(express.json());

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)

app.get('/', (req, res) => {
  res.send('Successful response.');
});

app.listen(config.port, () =>
  console.log(`Server is live @ ${config.hostUrl}`),
);