/* eslint-disable */
/* eslint-disable indent */
/* eslint-disable object-curly-spacing */
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51JWCtPF3exqVwaua4mZjlPv8nOPmJvQ4jGlTwJBhgXbwU9HyIz7UGD5nZc9ZvOLfOZ3sHtlzXMRpEx6oCvcRBT7O00qt0OmLQM"
);

// API

// App config
const app = express();

// Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// API routes
app.get("/", (req, res) =>
  res
    .status(200)
    .send("This is the API end point for Amazon-Clone-Ecommerce-Website")
);

app.post("/payments/create", async (req, res) => {
  const total = req.query.total;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });

  // OK - Created
  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// Listen command
exports.api = functions.https.onRequest(app);

// Example endpoint
// http://localhost:5001/clone-db7a6/us-central1/api
