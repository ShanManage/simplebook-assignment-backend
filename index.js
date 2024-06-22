import express from 'express'
import bodyParser from 'body-parser'
import productRoutes from './routes/products.js'

const app = express();

app.use(bodyParser.json());

app.use('/products', productRoutes)
app.get('/', (req, res) => {
  res.send('Successful response.');
});

app.listen(3001, () => console.log('Example app is listening on port 3001.'));