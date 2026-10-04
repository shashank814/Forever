import React, { useContext, useEffect, useState } from 'react'

import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'

const Collection = () => {

  const { products, search, showSearch } = useContext(ShopContext)

  const [showFilter, setShowFilter] = useState(false)
  const [filterProducts, setFilterProducts] = useState([])
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [sortType, setSortType] = useState('relevant')

  const toggleCategory = (e) => {
    if(category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setCategory(prev => [...prev, e.target.value])
    }
  }

  const toggleSubCategory = (e) => {
    if(subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setSubCategory(prev => [...prev, e.target.value])
    }
  }

  const applyFilter = () => {
    let productCopy = products.slice()

    if(showSearch && search) {
      productCopy = productCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if(category.length > 0) {
      productCopy = productCopy.filter(item => category.includes(item.category))
    }

    if(subCategory.length > 0) {
      productCopy = productCopy.filter(item => subCategory.includes(item.subCategory))
    }

    setFilterProducts(productCopy)
  }

  const sortProduct = () => {
    let fpCopy = filterProducts.slice()

    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a,b) => (a.price - b.price)))
        break;
      case 'high-low':
        setFilterProducts(fpCopy.sort((a,b) => (b.price - a.price)))
        break;
      default: 
        applyFilter();
        break;
    }
  }

  useEffect(() => {
    applyFilter()
  }, [category, subCategory, search, showSearch, products])

  useEffect(() => {
    sortProduct()
  }, [sortType])

  return (
    <div className='flex flex-col sm:flex-row gap-6 px-4 sm:px-8 lg:px-16 mt-10'>

      {/* Filter Options */}
      <div className='min-w-60 sm:w-1/4'>
        <p 
          onClick={() => setShowFilter(!showFilter)} 
          className='flex items-center justify-between cursor-pointer text-base font-medium'
        >
          FILTERS
          <img 
            src={assets.dropdown_icon} 
            alt="" 
            className={`w-3 transition-transform ${showFilter ? 'rotate-180' : ''}`}
          />
        </p>

        {/* Category Filter */}
        <div className={`${showFilter ? 'block' : 'hidden'} sm:block border border-gray-200 rounded-md p-4 mt-4`}>
          <p className='mb-3 font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm text-gray-600'>
            <p className='flex items-center gap-2'>
              <input type="checkbox" value={'Men'} onChange={toggleCategory} /> Men
            </p>
            <p className='flex items-center gap-2'>
              <input type="checkbox" value={'Women'} onChange={toggleCategory} /> Women
            </p>
            <p className='flex items-center gap-2'>
              <input type="checkbox" value={'Kids'} onChange={toggleCategory} /> Kids
            </p>
          </div>
        </div>

        {/* SubCategory Filter */}
        <div className={`${showFilter ? 'block' : 'hidden'} sm:block border border-gray-200 rounded-md p-4 mt-4`}>
          <p className='mb-3 font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm text-gray-600'>
            <p className='flex items-center gap-2'>
              <input type="checkbox" value={'Topwear'} onChange={toggleSubCategory} /> Topwear
            </p>
            <p className='flex items-center gap-2'>
              <input type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory} /> Bottomwear
            </p>
            <p className='flex items-center gap-2'>
              <input type="checkbox" value={'Winterwear'} onChange={toggleSubCategory} /> Winterwear
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className='flex-1'>
        <div className='flex flex-col sm:flex-row justify-between items-center gap-4 mb-6'>
          <Title text1={'ALL'} text2={'COLLECTIONS'} />

          {/* Product Sort */}
          <select 
            onChange={(e) => setSortType(e.target.value)} 
            className='border border-gray-300 text-sm px-3 py-2 rounded-md outline-none'
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Map Products */}
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filterProducts.map((item, index) => (
              <ProductItem 
                key={index} 
                name={item.name} 
                id={item._id} 
                price={item.price} 
                images={item.images}
              />
            ))
          }
        </div>
      </div>

    </div>
  )
}

export default Collection