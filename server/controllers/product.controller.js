import { uploadFile } from "../config/storage.service.js";
import productModel from "../models/product.model.js";

// export async function addProduct(req, res) {
//   const { name, description, price, category, subCategory, sizes, bestSeller } =
//     req.body;

//   const filesUrls = await Promise.all(
//     req.files.map(async (file) => {
//       const response = await uploadFile({
//         buffer: file.buffer,
//         fileName: file.originalname,
//       });
//       return response.url;
//     }),
//   );

//   const product = await productModel.create({
//     name, price, category, subCategory, sizes, bestSeller, description,
//     images: filesUrls,
//   })

//   res.status(200).json({
//     message: "product created successfully",
//     data: {
//       product,
//     },
//   });
// }

export async function addProduct(req, res) {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
    } = req.body;

    // ✅ FIX 1: correct key + convert to boolean
    const bestSeller = req.body.bestseller === "true";

    // ✅ FIX 2: parse sizes correctly
    const sizes = JSON.parse(req.body.sizes || "[]");

    // ✅ upload images
    const filesUrls = await Promise.all(
      req.files.map(async (file) => {
        const response = await uploadFile({
          buffer: file.buffer,
          fileName: file.originalname,
        });
        return response.url;
      })
    );

    const product = await productModel.create({
      name,
      price,
      category,
      subCategory,
      description,
      bestSeller,   // ✅ now correct boolean
      sizes,        // ✅ proper array
      images: filesUrls,
    });

    res.status(200).json({
      message: "product created successfully",
      data: { product },
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error creating product" });
  }
}


export async function listProducts(req, res) {
  const product = await productModel.find({})
  return res.status(200).json({
    message: "All products fetched successfully",
    data: {
      product
    }
  })
}

export async function removeProduct(req, res) {
  const {id} = req.params
  await productModel.findByIdAndDelete(id)

  return res.status(200).json({
    message: "product removed successfully"
  })
}

export async function singleProduct(req, res) {
  const {id} = req.params
  const product = await productModel.findById(id)

  return res.status(200).json({
    message: "product fetched successfully",
    product
  })
}
