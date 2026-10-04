import React from 'react'

const NewsLetterBox = () => {

    const onSubmitHandler = (e) => {
        e.preventDefault()
    }

  return (
    <div className='text-center px-4 sm:px-0'>
      
      <p className='text-xl sm:text-2xl font-medium text-gray-800'>
        Subscribe now & get 20% off
      </p>

      <p className='text-gray-500 mt-3 text-sm sm:text-base max-w-xl mx-auto'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, in?
      </p>

      <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row w-full sm:w-1/2 items-center gap-3 mx-auto my-6 border rounded-md p-2'>
        
        <input
          type="email"
          placeholder='Enter your email'
          className='w-full flex-1 outline-none px-2 py-2 text-sm sm:text-base'
          required
        />

        <button
          type='submit'
          className='w-full sm:w-auto bg-black text-white text-xs sm:text-sm px-6 sm:px-10 py-3 sm:py-4 rounded-md'
        >
          Subscribe
        </button>

      </form>

    </div>
  )
}

export default NewsLetterBox