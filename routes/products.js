import express from 'express'
const router = express.Router()

const products = [
  {
    product_id: 1,
    product_name: "Product 01",
    product_description: "product one description"
  },
  {
    product_id: 2,
    product_name: "Product 02",
    product_description: "product two description"
  }
]

router.get('/', (req, res) => {
  res.send(products)
})

router.post('/', (req, res) => {
  const product = req.body;
  products.push({ ...product, product_id: products.length + 1 });
  res.send(`${product.product_name} has been added to the Database`);
}) 

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const product = products.find((product) => product.product_id == id)
  res.send(product)
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  products.filter((product) => product.product_id != id)
  res.send(`${id} deleted successfully from database`);
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;

  const { product_name, product_description } = req.body;

  const product = products.find((product) => product.product_id == id)

  if(product_name) product.product_name = product_name;
  if(product_description) product.product_description = product_description;

  res.send(`product with the ${id} has been updated`)
});

export default router