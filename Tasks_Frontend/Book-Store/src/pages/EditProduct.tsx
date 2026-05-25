import { useEffect, useState } from "react";
import type { Product } from "../utils/types";
import { Axios } from "../utils/api";
import { useNavigate, useParams } from "react-router";
import { useForm, type SubmitHandler } from "react-hook-form";

export const EditProduct = () => {
    const [product, setProduct] = useState<Product | null>(null);
    const navigate = useNavigate();
    const { handleSubmit, register, formState: { errors } } = useForm<Partial<Product>>();
    const {id} = useParams();

    useEffect(() => {
        Axios
        .get<Product>(`/products/${id}`)
        .then(response => {
            setProduct(response.data);
            console.log(response.data);
        })
        .catch(() => {
            console.error("Error fetching product");
            navigate("*");
          })
    }, [id,  navigate]);

  const editBook: SubmitHandler<Partial<Product>> = (data) => {
    if (!product) return;
    const newProduct = {
      ...product,
      ...data
    };

     Axios
      .patch(`/products/${product?.id}`, newProduct)
      .then(() => {
        navigate('/');
      })
      .catch(() => {
        console.error("Error updating product");
        navigate("*");
      });
  };

  return (
    <div 
        className="min-h-screen bg-[#021a0e] flex items-center justify-center px-4 py-16 add-font">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Edit Product</h1>
          <p className="text-emerald-400 text-xs tracking-widest uppercase font-light mt-1">
            Update listing details
          </p>
          <div className="h-[2px] mt-4 bg-gradient-to-r from-orange-400 via-emerald-400 to-transparent rounded-full" />
        </div>

        {/* Form */}
        <form 
        onSubmit= {handleSubmit(editBook)}
        className="flex flex-col gap-4">

          {/* Title */}
          <div className="field-card">
            <label className="block text-emerald-300 text-xs uppercase tracking-widest mb-1 ml-1">
              Title
            </label>

            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-900/50 border border-emerald-800 focus-within:border-emerald-400 transition-all">
              <svg width="16" height="16" fill="none" stroke="#6ee7b7" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.658.38a18.942 18.942 0 0 0 5.657-5.657c.492-.878.32-1.959-.38-2.658L9.568 3Z" />
              </svg>

              <input
                type="text"
                placeholder="Edit title..."
                className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-emerald-700"
              />
            </div>
          </div>

          {/* Author */}
          <div className="field-card">
            <label className="block text-emerald-300 text-xs uppercase tracking-widest mb-1 ml-1">
              Author
            </label>

            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-900/50 border border-emerald-800 focus-within:border-orange-400 transition-all">
              <svg width="16" height="16" fill="none" stroke="#6ee7b7" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6.75a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.118a7.5 7.5 0 0 1 15 0A17.933 17.933 0 0 1 12 21.75a17.933 17.933 0 0 1-7.5-1.632Z" />
              </svg>

              <input
                type="text"
                placeholder="Edit author..."
                className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-emerald-700"
              />
            </div>
          </div>

          {/* Photo URL */}
          <div className="field-card">
            <label className="block text-emerald-300 text-xs uppercase tracking-widest mb-1 ml-1">
              Photo URL
            </label>

            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-900/50 border border-emerald-800 focus-within:border-emerald-400 transition-all">
              <svg width="16" height="16" fill="none" stroke="#6ee7b7" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Z" />
              </svg>

              <input
                type="text"
                placeholder="Edit image URL..."
                className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-emerald-700"
              />
            </div>
          </div>

          {/* Price */}
          <div className="field-card">
            <label className="block text-emerald-300 text-xs uppercase tracking-widest mb-1 ml-1">
              Price
            </label>

            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-900/50 border border-emerald-800 focus-within:border-orange-400 transition-all">
              <span className="text-orange-400 font-bold">$</span>

              <input
                type="number"
                {...register("price", { setValueAs: Number, min: { value: 10, message: "Price must be at least $10" } })}
                placeholder="0.00"
                className="flex-1 bg-transparent text-white placeholder:text-emerald-700 text-sm outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none">
                </input>

              <span className="text-emerald-600 text-xs">USD</span>
            </div>
            {errors.price && (
              <p className="text-red-500 text-xs mt-1 ml-1">
                {errors.price.message}
              </p>
            )}
          </div>

          {/* Save Button */}
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
              mt-2
            "
          >
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
                d="M5 13l4 4L19 7"
              />
            </svg>

            Save Changes
          </button>

        </form>
      </div>
    </div>
  );
};