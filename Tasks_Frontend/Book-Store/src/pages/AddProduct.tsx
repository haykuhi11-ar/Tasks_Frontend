import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { type Product } from '../utils/types';
import { Axios } from '../utils/api';
import { useNavigate } from 'react-router-dom';

type Book = Omit<Product, 'id'>;
export const AddProduct = () => {
  const [products] = useState<Product[]>([]);
  const [focused, setFocused] = useState<string | null>(null);
  const [submitted] = useState(false);
  const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
  } = useForm<Book>();
  const navigate = useNavigate();

  const addBook:SubmitHandler<Book> = (data) => {
      Axios.post('/', {
          id : Math.max(...products.map(p => Number(p.id)) || 0) + 1,
          ...data,
          rating: 0,
          reviews: 0,
          comments: [],
      })
      .then(() => { 
        navigate('/');
      })
      .catch(() => {
        console.error("Error adding product");
        navigate("/");
      })
      .finally(() => {  
        reset();
      })
  };

  return (
    <>
      <div className="add-font min-h-screen bg-[#021a0e] flex items-center justify-center px-4 py-16">

        {/* Card */}
        <div className="w-full max-w-md">

          {/* Header */}
          <div className="mb-8" style={{ animation: 'fadeUp 0.4s ease both' }}>
            <div className="flex items-center gap-3 mb-1">
              <div>
                <h1 className="add-title text-2xl font-bold text-white leading-tight">Add Product</h1>
                <p className="text-emerald-400 text-xs tracking-widest uppercase font-light">New listing</p>
              </div>
            </div>
            <div className="h-[2px] mt-4 bg-gradient-to-r from-emerald-400 via-orange-400 to-transparent rounded-full" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(addBook)} className="flex flex-col gap-4">

            {/* Title */}
            <div className="field-card">
              <label className="block text-emerald-300 text-xs font-medium tracking-widest uppercase mb-1.5 ml-1">
                Title
              </label>

              <div
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-200 bg-emerald-900/50
                    ${focused === 'title'
                    ? 'border-emerald-400 shadow-[0_0_0_3px_rgba(52,211,153,0.15)]'
                    : 'border-emerald-800 hover:border-emerald-700'
                  }`}
              >
                {/* Icon */}
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  stroke={focused === 'title' ? '#34d399' : '#6ee7b7'}
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.658.38a18.942 18.942 0 0 0 5.657-5.657c.492-.878.32-1.959-.38-2.658L9.568 3Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 6h.008v.008H6V6Z"
                  />
                </svg>

                <input
                  type="text"
                  placeholder="e.g. The Great Gatsby"
                  {...register('title', { required: 'Title is required' })}
                  onFocus={() => setFocused('title')}
                  onBlur={() => setFocused(null)}
                  className="flex-1 bg-transparent text-white placeholder:text-emerald-700 text-sm outline-none"
                />
              </div>
              {errors.title && (
                <span className="text-orange-400 text-xs font-light mt-1 ml-1">
                  {errors.title.message}
                </span>
              )}
            </div>

            {/* Author */}
            <div className="field-card">
              <label className="block text-emerald-300 text-xs font-medium tracking-widest uppercase mb-1.5 ml-1">
                Author
              </label>

              <div
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-200 bg-emerald-900/50
                    ${focused === 'author'
                    ? 'border-orange-400 shadow-[0_0_0_3px_rgba(251,146,60,0.15)]'
                    : 'border-emerald-800 hover:border-emerald-700'
                  }`}
              >
                {/* Icon */}
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  stroke={focused === 'author' ? '#fb923c' : '#6ee7b7'}
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6.75a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.118a7.5 7.5 0 0 1 15 0A17.933 17.933 0 0 1 12 21.75a17.933 17.933 0 0 1-7.5-1.632Z"
                  />
                </svg>

                <input
                  type="text"
                  placeholder="e.g. F. Scott Fitzgerald"
                  {...register('author', { required: 'Author is required' })}
                  onFocus={() => setFocused('author')}
                  onBlur={() => setFocused(null)}
                  className="flex-1 bg-transparent text-white placeholder:text-emerald-700 text-sm outline-none"
                />
              </div>
              {errors.author && (
                <span className="text-orange-400 text-xs font-light mt-1 ml-1">
                  {errors.author.message}
                </span>
              )}
            </div>

            {/* Photo URL */}
            <div className="field-card">
              <label className="block text-emerald-300 text-xs font-medium tracking-widest uppercase mb-1.5 ml-1">
                Photo URL
              </label>
              <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-200 bg-emerald-900/50
                ${focused === 'photo'
                  ? 'border-emerald-400 shadow-[0_0_0_3px_rgba(52,211,153,0.15)]'
                  : 'border-emerald-800 hover:border-emerald-700'
                }`}
              >
                <svg width="16" height="16" fill="none" stroke={focused === 'photo' ? '#34d399' : '#6ee7b7'} strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
                <input
                  type="text"
                  placeholder="https://example.com/photo.jpg"
                  {...register('photo', { required: 'Photo URL is required' })}
                  onFocus={() => setFocused('photo')}
                  onBlur={() => setFocused(null)}
                  className="flex-1 bg-transparent text-white placeholder:text-emerald-700 text-sm outline-none"
                />
              </div>
              {errors.photo && (
                <span className="text-orange-400 text-xs font-light">
                  {errors.photo.message}
                </span>
              )}
            </div>

            {/* Price */}
            <div className="field-card">
              <label className="block text-emerald-300 text-xs font-medium tracking-widest uppercase mb-1.5 ml-1">
                Price
              </label>
              <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-200 bg-emerald-900/50
                ${focused === 'price'
                  ? 'border-orange-400 shadow-[0_0_0_3px_rgba(251,146,60,0.15)]'
                  : 'border-emerald-800 hover:border-emerald-700'
                }`}
              >
                <span className={`text-sm font-bold transition-colors duration-200 ${focused === 'price' ? 'text-orange-400' : 'text-emerald-600'}`}>$</span>
                <input
                  type="number"
                  placeholder="0.00"
                  {...register('price', { required: 'Price is required', setValueAs: Number, min: { value: 10, message: 'Price must be at least $10' } })}
                  onFocus={() => setFocused('price')}
                  onBlur={() => setFocused(null)}
                  className="flex-1 bg-transparent text-white placeholder:text-emerald-700 text-sm outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <span className="text-emerald-600 text-xs font-light">USD</span>
              </div>
              {errors.price && (
                <span className="text-orange-400 text-xs font-light mt-1 ml-1">
                  {errors.price.message}
                </span>
              )}
            </div>

            {/* Submit */}
            <button 
              type="submit"
                    className="
              w-full
              flex
              items-center
              justify-center
              gap-1.5
              py-2
              rounded-lg
              bg-orange-400/10
              hover:bg-orange-400
              text-orange-400
              hover:text-orange-950
              text-xs
              font-semibold
              border
              border-orange-800
              hover:border-orange-400
              transition-all
              duration-200
            "
            >
              {submitted ? (
                <>
                  <svg
                    width="13"
                    height="13"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    className="animate-pulse"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m4.5 12.75 6 6 9-13.5"
                    />
                  </svg>

                  Added!
                </>
              ) : (
                <>
                  <svg
                    width="13"
                    height="13"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>

                  Add Book
                </>
              )}
            </button>
          </form>

          {/* Footer hint */}
          <p className="text-center text-emerald-700 text-xs mt-6 font-light" style={{ animation: 'fadeUp 0.5s 0.5s ease both', opacity: 0 }}>
            All fields are required to publish the listing
          </p>
        </div>
      </div>
    </>
  );
};