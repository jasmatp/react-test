const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const USERS = "./users.json";
const PRODUCTS = "./product.json";
const CARTS = "./cart.json";

const readData= (file) => JSON.parse(fs.readFileSync(file, "utf-8"));
const writeData = (file, data) => fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf-8");

app.get("/users", (req, res) => {
    // res.json(readData(USERS));
    const users = JSON.parse(fs.readFileSync('users.json', 'utf-8'));
    res.json(users);
})

app.post("/users", (req, res) => {
  const users = readData(USERS);
  users.push(req.body);
  writeData(USERS, users);
  res.status(201).send('User added');
})

app.put('/users/:email', (req, res) => {
    const users = readData(USERS);
    const updated = users.map(u => u.email === req.params.email ? req.body : u);
    writeData(USERS, updated);
    res.send('User updated');
  });
  
  app.delete('/users/:email', (req, res) => {
    const users = readData(USERS);
    const filtered = users.filter(u => u.email !== req.params.email);
    writeData(USERS, filtered);
    res.send('User deleted');
  });
  
  // PRODUCTS ROUTES
  app.get('/products', (req, res) => {
    res.json(readData(PRODUCTS));
  });
  
  app.post('/products', (req, res) => {
    const products = readData(PRODUCTS);
    products.push(req.body);
    writeData(PRODUCTS, products);
    res.status(201).send('Product added');
  });

  
  // Start server
  app.listen(5000, () => console.log('Server running on http://localhost:5000'));