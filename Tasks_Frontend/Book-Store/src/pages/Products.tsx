import { useEffect, useState } from "react";
import type { Product } from "../utils/types";
import { Axios } from "../utils/api";
import { Link } from "react-router-dom";

export const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Axios.get<Product[]>("/products")
            .then(response => setProducts(response.data))
            .catch(error => {
                console.error("Error fetching products:", error);
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <>
            <div className="products-font min-h-screen bg-[#021a0e] px-5 sm:px-8 py-12">

                {/* Page header */}
                <div className="max-w-6xl mx-auto mb-10" style={{ animation: 'fadeUp 0.4s ease both' }}>
                    <h1 className="product-title text-3xl font-bold text-white mb-1">Browse Books</h1>
                    <div className="h-[2px] w-48 bg-gradient-to-r from-emerald-400 via-orange-400 to-transparent rounded-full mt-3" />
                    <p className="text-emerald-500 text-sm font-light mt-2 tracking-wide">
                        {loading ? 'Loading collection…' : `${products.length} titles available`}
                    </p>
                </div>

                {/* Grid */}
                <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">

                    {loading
                        ? Array.from({ length: 10 }).map((_, i) => (
                            <div key={i} className="flex flex-col gap-3">
                                <div className="skeleton w-full aspect-[2/3]" />
                                <div className="skeleton h-4 w-3/4" />
                                <div className="skeleton h-3 w-1/2" />
                                <div className="skeleton h-3 w-1/4" />
                            </div>
                        ))
                        : products.map((product, i) => (
                            <div
                                key={product.id}
                                className="card-animate card-hover flex flex-col bg-green-950/60 border border-green-900 rounded-xl overflow-hidden cursor-pointer"
                                style={{ animationDelay: `${i * 0.06}s` }}
                            >
                                {/* Cover */}
                                <div className="img-zoom relative w-full aspect-[2/3] overflow-hidden bg-green-900/40">
                                    <img
                                        src={product.photo}
                                        alt={product.title}
                                        className="w-full h-full object-cover"
                                        onError={e => {
                                            (e.currentTarget as HTMLImageElement).src =
                                                'https://placehold.co/200x300/052e16/34d399?text=No+Cover';
                                        }}
                                    />
                                    {/* Price badge */}
                                    <span className="absolute top-2 right-2 bg-orange-400 text-orange-950 text-[11px] font-bold px-2 py-0.5 rounded-lg shadow-md">
                                        ${product.price}
                                    </span>
                                </div>

                                {/* Info */}
                                <div className="flex flex-col gap-1 px-3 py-3 flex-1">
                                    <h2 className="product-title text-white text-sm font-semibold leading-snug line-clamp-2">
                                        {product.title}
                                    </h2>
                                    <p className="text-emerald-400 text-xs font-light tracking-wide line-clamp-1">
                                        {product.author}
                                    </p>

                                    <Link
                                        to={`/products/${product.id}`}
                                        className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-orange-400/10 hover:bg-orange-400 text-orange-400 hover:text-orange-950 text-xs font-semibold border border-orange-800 hover:border-orange-400 transition-all duration-200"
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
                                                d="M2.25 12s3.75-6.75 9.75-6.75S21.75 12 21.75 12 18 18.75 12 18.75 2.25 12 2.25 12Z"
                                            />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>

                                        View Details
                                    </Link>
                                    {/* Add to cart */}
                                    <button className="mt-auto pt-3 w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-400 text-emerald-400 hover:text-green-950 text-xs font-semibold border border-emerald-800 hover:border-emerald-400 transition-all duration-200">
                                        <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                        </svg>
                                        Add to Cart
                                    </button>
                                    <Link
                                        to={`/products/edit-product/${product.id}`}

                                        className="mt-auto pt-3 w-full flex items-center
                                        justify-center gap-1.5 py-2 rounded-lg bg-orange-500/10
                                        hover:bg-orange-400 text-orange-400 hover:text-orange-950 text-xs
                                        font-semibold border border-orange-800 hover:border-orange-400
                                        transition-all duration-200"
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
                                                d="M16.862 3.487a2.1 2.1 0 0 1 2.97 2.97L7.125 19.164l-3.75.75.75-3.75L16.862 3.487Z"
                                            />
                                        </svg>

                                        Edit
                                    </Link>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    );
};