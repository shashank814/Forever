import orderModel from "../models/order.model.js";
import userModel from "../models/user.model.js";
import Stripe from "stripe";
import Razorpay from "razorpay";

// Global Variables
const currency = "inr";
const deliveryCharge = 40;

// Gateway Initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_sECRET,
});

export async function placeOrder(req, res) {
  try {
    const userId = req.user.userId;
    const { items, amount, address } = req.body;

    const newOrder = await orderModel.create({
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    });

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    return res.status(201).json({
      message: "Order Placed",
    });
  } catch (error) {
    console.log(error);
  }
}

export async function placeOrderStripe(req, res) {
  try {
    const userId = req.user.userId;
    const { items, amount, address } = req.body;
    const { origin } = req.headers; // origin -> loaclhost:5173

    const newOrder = await orderModel.create({
      userId,
      items,
      amount,
      address,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    });

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: deliveryCharge * 100,
      },
      quantity: 1,
    }));

    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: deliveryCharge * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
  }
}

export async function verifyStripe(req, res) {
  const userId = req.user.userId;
  const { orderId, success } = req.body;

  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      res.json({ success: true });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false });
    }
  } catch (error) {
    console.log(error);
  }
}

export async function placeOrderRazorpay(req, res) {
  try {
    const userId = req.user.userId;
    const { items, amount, address } = req.body;

    const newOrder = await orderModel.create({
      userId,
      items,
      amount,
      address,
      paymentMethod: "Razorpay",
      payment: false,
      date: Date.now(),
    });

    const options = {
      amount: amount * 100,
      currency: currency.toUpperCase(),
      receipt: newOrder._id.toString(),
    };

    await razorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.json({ success: false, message: error });
      }
      return res.json({ success: true, order });
    });
  } catch (error) {
    console.log(error);
  }
}

export async function verifyRazorpay(req, res) {
  try {
    const userId = req.user.userId;
    const { razorpay_order_id } = req.body;

    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
   
    if(orderInfo.status === 'paid') {
      await orderModel.findByIdAndUpdate(orderInfo.receipt, { payment: true })
      await userModel.findByIdAndUpdate(userId, {cartData: {}})
      res.json({ success: true, message: "Payment Successfull" })
    } else {
      res.json({ success: false, message: "Payment failed" })
    }
  } catch (error) {
    console.log(error);
  }
}

export async function allOrders(req, res) {
  try {
    const orders = await orderModel.find({});
    return res.status(200).json({
      message: "all orders fetched",
      orders,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function userOrders(req, res) {
  try {
    const userId = req.user.userId;

    const orders = await orderModel.find({ userId });

    return res.status(200).json({
      message: "Orders Fetched",
      orders,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function updateStatus(req, res) {
  try {
    const { orderId, status } = req.body;

    await orderModel.findByIdAndUpdate(orderId, { status });

    return res.status(200).json({
      message: "Status Updated",
    });
  } catch (error) {
    console.log(error);
  }
}
