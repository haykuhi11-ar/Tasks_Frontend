import { useNavigate, useParams } from "react-router-dom";
import type { Product } from "../utils/types";
import { useEffect, useState } from "react";
import { Axios } from "../utils/api";
import { CommentSection } from "./CommentsSection";

export const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        Axios
            .get<Product>(`/products/${id}`)
            .then(response => setProduct(response.data))
            .catch(() => {
                navigate("*");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#021a0e] flex items-center justify-center">
                <div className="w-14 h-14 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!product) {
        return null;
    }

    return (

        <div className="min-h-screen bg-[#021a0e] px-5 sm:px-8 py-10 text-white">

            {/* Background glow */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-emerald-500/10 blur-3xl rounded-full" />
            </div>

            <div className="relative max-w-6xl mx-auto">

                {/* Back button */}
                <button
                    onClick={() => navigate(-1)}
                    className="mb-8 flex items-center gap-2 text-sm text-emerald-400 hover:text-orange-400 transition-colors"
                >
                    <svg
                        width="18"
                        height="18"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 19.5 8.25 12l7.5-7.5"
                        />
                    </svg>

                    Back to books
                </button>

                {/* Card */}
                <div className="grid lg:grid-cols-2 gap-10 items-start bg-green-950/50 border border-green-900 rounded-3xl overflow-hidden shadow-2xl shadow-black/40 backdrop-blur-sm">

                    {/* Image section */}
                    <div className="relative h-full bg-gradient-to-br from-green-950 to-emerald-950 p-6 flex items-center justify-center">

                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(52,211,153,0.18),transparent_65%)]" />

                        <img
                            src={product.photo}
                            alt={product.title}
                            className="relative z-10 w-full max-w-md rounded-2xl object-cover shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:scale-[1.02] transition-transform duration-500"
                            onError={(e) => {
                                (e.currentTarget as HTMLImageElement).src =
                                    "https://placehold.co/600x900/052e16/34d399?text=No+Cover";
                            }}
                        />
                    </div>

                    {/* Content */}
                    <div className="p-7 sm:p-10 flex flex-col h-full">

                        {/* Category */}
                        <span className="w-fit mb-4 px-3 py-1 rounded-full bg-orange-400/10 border border-orange-400/20 text-orange-400 text-xs tracking-[0.2em] uppercase font-semibold">
                            Premium Edition
                        </span>

                        {/* Title */}
                        <h1 className="text-4xl sm:text-5xl font-bold leading-tight text-white">
                            {product.title}
                        </h1>

                        {/* Decorative line */}
                        <div className="h-[2px] w-40 bg-gradient-to-r from-emerald-400 via-orange-400 to-transparent rounded-full mt-5 mb-6" />

                        {/* Author */}
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-11 h-11 rounded-full bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center">
                                <svg
                                    width="20"
                                    height="20"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    className="text-emerald-400"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                                    />
                                </svg>
                            </div>

                            <div>
                                <p className="text-xs uppercase tracking-[0.2em] text-emerald-600">
                                    Author
                                </p>

                                <p className="text-lg text-emerald-200 font-medium">
                                    {product.author}
                                </p>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-8">
                            <p className="text-emerald-100/80 leading-8 text-[15px]">
                                A beautifully crafted book that blends immersive
                                storytelling with unforgettable atmosphere.
                                Perfect for readers who love deep narratives,
                                emotional journeys, and elegant design.
                            </p>
                        </div>

                        {/* Price */}
                        <div className="flex items-end gap-3 mb-8">
                            <span className="text-5xl font-bold text-orange-400">
                                ${product.price}
                            </span>

                            <span className="text-emerald-500 line-through text-lg">
                                ${(product.price + 12).toFixed(2)}
                            </span>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 mt-auto">

                            {/* Add to cart */}
                            <button className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl bg-emerald-400 hover:bg-emerald-300 text-green-950 font-bold transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-emerald-900/40">
                                <svg
                                    width="18"
                                    height="18"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272"
                                    />
                                </svg>

                                Add to Cart
                            </button>

                            {/* Wishlist */}
                            <button className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl border border-orange-400/30 bg-orange-400/10 hover:bg-orange-400 hover:text-orange-950 text-orange-400 font-semibold transition-all duration-300">
                                <svg
                                    width="18"
                                    height="18"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m21 8.25c0-2.485-2.015-4.5-4.5-4.5-1.74 0-3.249.99-4 2.437-.751-1.447-2.26-2.437-4-2.437-2.485 0-4.5 2.015-4.5 4.5 0 7.22 8.5 12 8.5 12s8.5-4.78 8.5-12Z"
                                    />
                                </svg>

                                Wishlist
                            </button>
                            {/* Delete */}
                            <button
                                onClick={() => navigate(`/products/delete-product/${product.id}`)}
                                className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl border border-red-400/30 bg-red-400/10 hover:bg-red-400 hover:text-red-950 text-red-400 font-semibold transition-all duration-300"
                            >
                                <svg
                                    width="18"
                                    height="18"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                    />
                                </svg>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <CommentSection product={product} />
        </div>
    );
};