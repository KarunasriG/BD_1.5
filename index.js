const express = require('express');
let cors = require('cors');

const app = express();
const port = 3000;

// app.use(express.static('static'));
app.use(cors());

let taxRate = 5;
let discountPercentage = 10;
let loyaltyRate = 2;

app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  let totalCartValue = cartTotal + newItemPrice;
  res.send(totalCartValue.toString());
});

app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember;
  if (isMember) {
    cartTotal = cartTotal - cartTotal * (discountPercentage / 100);
  }
  res.send(cartTotal.toString());
});

app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let cartAmount = cartTotal * (taxRate / 100);
  res.send(cartAmount.toString());
});

app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod.toLowerCase();
  let distance = parseFloat(req.query.distance);

  let deliverDays;

  if (shippingMethod === 'standard') {
    deliverDays = distance / 50;
  } else if (shippingMethod === 'express') {
    deliverDays = distance / 100;
  } else {
    res.send('Invalid shipping method');
  }

  res.send(deliverDays.toString());
});

app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  let shippingCost = weight * distance * 0.1;
  res.send(shippingCost.toString());
});

app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  let loyaltyPoints = purchaseAmount * loyaltyRate;
  res.send(loyaltyPoints.toString());
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
