import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";
import { toast } from "react-toastify";

const Product = () => {
  const { productId } = useParams();

  const { products, currency, addToCart } = useContext(ShopContext);

  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState(null);
  const [size, setSize] = useState("");

  const fetchProductData = async () => {
    products.find((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.images[0]);
      }
    });
  };

  const parsedSizes = (() => {
    try {
      return JSON.parse(productData?.sizes?.[0] || "[]");
    } catch {
      return [];
    }
  })();

  const handleAddToCart = async () => {
    console.log("Selected size:", size);
    if (!size) {
      toast.error("Select Product Size");
      return;
    }

    await addToCart(productData._id, size);
    toast.success("Product added to cart")
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className="px-4 sm:px-6 lg:px-12 py-6">
      {/* Product Data */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Product Images */}
        <div className="flex flex-col-reverse lg:flex-row gap-4 w-full lg:w-1/2">
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto">
            {productData.images.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                alt=""
                className="w-16 h-16 sm:w-20 sm:h-20 object-cover border cursor-pointer"
              />
            ))}
          </div>

          <div className="w-full">
            <img
              src={image}
              alt=""
              className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover rounded"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="w-full lg:w-1/2 space-y-4">
          <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold">
            {productData.name}
          </h1>

          <div className="flex items-center gap-1">
            <img src={assets.star_icon} className="w-4 h-4" alt="" />
            <img src={assets.star_icon} className="w-4 h-4" alt="" />
            <img src={assets.star_icon} className="w-4 h-4" alt="" />
            <img src={assets.star_icon} className="w-4 h-4" alt="" />
            <img src={assets.star_dull_icon} className="w-4 h-4" alt="" />
            <p className="text-sm text-gray-600">(122)</p>
          </div>

          <p className="text-xl font-bold">
            {currency}
            {productData.price}
          </p>

          <p className="text-sm text-gray-600 leading-relaxed">
            {productData.description}
          </p>

          <div>
            <p className="font-medium mb-2">Select Size</p>

            <div className="flex gap-2 flex-wrap">
              {parsedSizes.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSize(item)}
                  className={`px-4 py-1 border text-sm ${
                    item === size ? "bg-black text-white" : ""
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button
            // disabled={!size}
            onClick={handleAddToCart}
            className={`px-6 py-2 text-sm ${
              size
                ? "bg-black text-white"
                : "bg-gray-400 text-white cursor-not-allowed"
            }`}
          >
            ADD TO CART
          </button>

          <hr />

          <div className="text-sm text-gray-600 space-y-1">
            <p>100% Original Product</p>
            <p>Cash on delivery is available on this product</p>
            <p>Easy return and exchange policy within 7 days</p>
          </div>
        </div>
      </div>

      {/* Description & Review */}
      <div className="mt-10">
        <div className="flex gap-6 border-b pb-2">
          <b>Description</b>
          <p className="text-gray-500">Reviews (122)</p>
        </div>

        <div className="mt-4 text-sm text-gray-600 space-y-3">
          <p>
            An e-commerce website is an online platform that facilitates the
            buying and selling of products or services over the internet. It
            serves as a virtual marketplace where businesses and individuals can
            showcase their products, interact with customers, and conduct
            transactions without the need for a physical presence. E-commerce
            websites have gained immense popularity due to their convenience,
            accessibility, and the global reach they offer.
          </p>
          <p>
            E-commerce websites typically display products or services along
            with detailed descriptions, images, prices, and any available
            variations (e.g., sizes, colors). Each product usually has its own
            dedicated page with relevant information.
          </p>
        </div>
      </div>

      {/* Display Related Product */}

      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
