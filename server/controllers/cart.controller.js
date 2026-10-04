import userModel from "../models/user.model.js"


export async function addToCart(req, res) {
  try {

    const userId = req.user.userId
    const { itemId, size } = req.body;

    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    let cartData = userData.cartData || {};

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    return res.status(200).json({
      message: "Added to cart"
    });

  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Something went wrong"
    });
  }
}



export async function updateCart(req, res) {
    try {
        
       const userId = req.user.userId
        const { itemId, size, quantity } = req.body

        const userData = await userModel.findById(userId)
         let cartData = await userData.cartData

         cartData[itemId][size] = quantity

        await userModel.findByIdAndUpdate(userId, {cartData}) 

        return res.status(200).json({
            message: "Cart Updated"
        })

    } catch (error) {
       console.log(error.message);
        return res.status(400).json({
            message: "Something went wrong"
        })
    }
}




export async function getUserCart(req, res) {
    try {

         const userId = req.user.userId

        const userData = await userModel.findById(userId)
         let cartData = await userData.cartData

        return res.status(200).json({
            message: "Cart data fetched successfully",
            cartData
        })

    } catch (error) {
       console.log(error.message);
        return res.status(400).json({
            message: "Something went wrong"
        })
    }
}