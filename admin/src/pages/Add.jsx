import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [images, setImages] = useState([]);
  const [sizes, setSizes] = useState([]);

  const [formDataState, setFormDataState] = useState({
    title: "",
    description: "",
    type: "Men",
    subType: "Topwear",
    price: "",
    bestseller: false, 
  });

  // toggle size
  const toggleSize = (size) => {
    setSizes((prev) =>
      prev.includes(size)
        ? prev.filter((item) => item !== size)
        : [...prev, size]
    );
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormDataState((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value, 
    }));
  };

  const postBlog = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", formDataState.title);
      formData.append("description", formDataState.description);
      formData.append("category", formDataState.type);
      formData.append("subCategory", formDataState.subType);
      formData.append("price", formDataState.price);
      formData.append("bestseller", formDataState.bestseller); 
      formData.append("sizes", JSON.stringify(sizes));

      images.forEach((img) => {
        formData.append("images", img);
      });

      console.log("bestseller:", formDataState.bestseller, typeof formDataState.bestseller);

      await axios.post(backendUrl + "/api/product/add", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Product Added");

      // reset
      setImages([]);
      setSizes([]);
      setFormDataState({
        title: "",
        description: "",
        type: "Men",
        subType: "Topwear",
        price: "",
        bestseller: false, 
      });

    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <form onSubmit={postBlog} className="p-4 sm:p-6 md:p-10 space-y-6">

      {/* Image Upload */}
      <div>
        <p className="mb-2 font-medium">Upload Image</p>
        <div className="flex gap-3 flex-wrap">
          <label className="cursor-pointer">
            <img
              src={assets.upload_area}
              alt=""
              className="w-20 h-20 object-cover border"
            />
            <input
              type="file"
              multiple
              hidden
              onChange={(e) => setImages(Array.from(e.target.files))}
            />
          </label>

          {images.map((img, i) => (
            <img
              key={i}
              src={URL.createObjectURL(img)}
              className="w-20 h-20 object-cover"
            />
          ))}
        </div>
      </div>

      {/* Product Name */}
      <div>
        <p className="mb-1">Product name</p>
        <input
          type="text"
          name="title"
          value={formDataState.title}
          onChange={handleChange}
          placeholder="Type here"
          required
          className="w-full border px-3 py-2 rounded-md"
        />
      </div>

      {/* Description */}
      <div>
        <p className="mb-1">Product description</p>
        <textarea
          name="description"
          value={formDataState.description}
          onChange={handleChange}
          placeholder="write content here"
          required
          className="w-full border px-3 py-2 rounded-md"
        />
      </div>

      {/* Category Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div>
          <p>Product category</p>
          <select
            name="type"
            value={formDataState.type}
            onChange={handleChange}
            className="w-full border px-2 py-2 rounded-md"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p>Sub category</p>
          <select
            name="subType"
            value={formDataState.subType}
            onChange={handleChange}
            className="w-full border px-2 py-2 rounded-md"
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div>
          <p>Product Price</p>
          <input
            type="number"
            name="price"
            value={formDataState.price}
            onChange={handleChange}
            placeholder="25"
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>
      </div>

      {/* Sizes */}
      <div>
        <p className="mb-2">Product Sizes</p>
        <div className="flex gap-2 flex-wrap">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <div
              key={size}
              onClick={() => toggleSize(size)}
              className={`px-3 py-1 border rounded cursor-pointer transition
                ${
                  sizes.includes(size)
                    ? "bg-black text-white border-black"
                    : "hover:bg-gray-100"
                }`}
            >
              <p>{size}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bestseller */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="bestseller"
          name="bestseller"
          checked={formDataState.bestseller}
          onChange={handleChange}
        />
        <label htmlFor="bestseller">Add to bestseller</label>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition"
      >
        ADD
      </button>

    </form>
  );
};

export default Add;