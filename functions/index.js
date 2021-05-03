const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")('sk_test_51Ikuh4SCnrsQyNklPeWFwGgqpUwtowKRvDtl1xQ5hh1rXN7p9mzxsechkaa2OZeDnni797YvbR3o8BMHCj9YX6jw007PckES4N');


//API

// - App config
const app = express();

// - Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// - API routes
app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
    const total = request.query.total;

    console.log("Payment Request Recieved BOOM!!! for this amount >>> ", total);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total, // subunits of the currency
        currency: "usd",
        shipping: {
            name: "ff",
            address: {
                city: "Toronto",
                country: "Canada",
                line1: "42",
                line2: "",
                postal_code: "M4B 1B5"
            }
        },
    });

    // OK - Created
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    });
});

// - Listen command
exports.api = functions.https.onRequest(app);
