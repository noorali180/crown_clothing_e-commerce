require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  try {
    // recieving the amount from event.
    const { amount } = JSON.parse(event.body);

    // making a paymentIntent, using stripe library,
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
    });

    // returning sucess status code and paymentIntent, as well,
    return {
      statusCode: 200,
      body: JSON.stringify({ paymentIntent }),
    };
  } catch (error) {
    console.log(error);

    return {
      statusCode: 400,
      body: JSON.stringify({ error }),
    };
  }
};
