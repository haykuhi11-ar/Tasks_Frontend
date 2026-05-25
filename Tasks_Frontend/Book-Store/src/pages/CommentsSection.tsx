import { useEffect, useState } from "react";
import type { Comment, Product } from "../utils/types";
import { Axios } from "../utils/api";


export const CommentSection = ({ product }: { product: Product }) => {

    const [comments, setComments] = useState<Comment[]>([]);
    const [commentText, setCommentText] = useState("");
    const [rating, setRating] = useState(0);
    const [averageRating, setAverageRating] = useState(product.rating);
    const addComment = () => {

        if (!commentText.trim() || rating === 0) {
            return;
        }

        const newComment: Comment = {
            id: Math.max(...comments.map(c => c.id), 0) + 1,
            username: "new_user",
            comment: commentText,
            rating: rating,
        };

        setComments(prev => [...prev, newComment]);

        setCommentText("");
        setRating(0);
    };

    useEffect(() => {
        if (comments.length === 0) {
            setAverageRating(0);
            return;
        }

        const total = comments.reduce((acc, c) => acc + c.rating, 0);

        setAverageRating(Number((total / comments.length) || 1));
        
        Axios
        .patch(`/products/${product.id}`, {
            ...product,
            comments: [...comments, ...product.comments],
            rating: averageRating,
            reviews: comments.length + product.reviews,
        })
        .catch(error => {
            console.error(error);
        });
    }, [comments, averageRating]);


    return (
        <div className="mt-12 border-t border-emerald-900 pt-10">

            {/* Header */}
            <div className="flex items-center justify-between gap-4 flex-wrap mb-8">

                <div>
                    <h2 className="text-2xl font-bold text-white">
                        Reviews & Ratings
                    </h2>

                    <p className="text-emerald-500 text-sm mt-1">
                        Share your thoughts about this book
                    </p>
                </div>

                {/* Average rating */}
                <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-green-950/60 border border-emerald-900">

                    <div className="flex items-center gap-1">

                        {product.rating > 0 && (
                            <svg
                                key={product.rating}
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill={product.rating <= Math.round(averageRating) ? "#fb923c" : "none"}
                                stroke="#fb923c"
                                strokeWidth="2"
                            >
                                <path d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321 1.01l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.386a.562.562 0 0 1-.84.61l-4.725-2.885a.563.563 0 0 0-.586 0L6.98 20.562a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557L3.04 10.407a.562.562 0 0 1 .32-1.01l5.519-.442a.563.563 0 0 0 .475-.345l2.125-5.11Z" />
                            </svg>
                        )}
                    </div>

                    <div>
                        <p className="text-white font-bold text-lg">
                            {product.rating || "0.0"}
                        </p>

                        <p className="text-emerald-500 text-xs">
                            {product.reviews} reviews
                        </p>
                    </div>
                </div>
            </div>

            {/* Form */}
            <div className="p-6 rounded-3xl bg-green-950/50 border border-green-900 mb-10">

                <textarea
                    placeholder="Write your review..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="w-full min-h-[120px] rounded-2xl bg-[#021a0e] border border-green-900 focus:border-emerald-400 outline-none resize-none px-4 py-3 text-emerald-100 placeholder:text-emerald-700 transition-colors"
                />

                {/* Stars */}
                <div className="flex items-center gap-2 mt-5">

                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            className="transition-all duration-200 hover:scale-110"
                        >
                            <svg
                                width="26"
                                height="26"
                                viewBox="0 0 24 24"
                                fill={star <= rating ? "#fb923c" : "none"}
                                stroke="#fb923c"
                                strokeWidth="2"
                            >
                                <path d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321 1.01l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.386a.562.562 0 0 1-.84.61l-4.725-2.885a.563.563 0 0 0-.586 0L6.98 20.562a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557L3.04 10.407a.562.562 0 0 1 .32-1.01l5.519-.442a.563.563 0 0 0 .475-.345l2.125-5.11Z" />
                            </svg>
                        </button>
                    ))}

                    <span className="ml-2 text-sm text-emerald-500">
                        {rating
                            ? `${rating}/5 selected`
                            : "Select rating"}
                    </span>
                </div>

                {/* Submit */}
                <button
                    onClick={addComment}
                    className="mt-6 px-6 py-3 rounded-2xl bg-emerald-400 hover:bg-emerald-300 text-green-950 font-bold transition-all duration-300 hover:-translate-y-1"
                >
                    Submit Review
                </button>
            </div>

            {/* Comments */}
            <div key={product.id} className="space-y-5">

                {product.comments.map((comment) => (
                    <div
                        key={comment.id}
                        className="p-5 rounded-3xl bg-green-950/40 border border-green-900"
                    >

                        <div className="flex items-start justify-between gap-4 mb-3">

                            <div className="flex items-center gap-3">

                                {/* Avatar */}
                                <div className="w-11 h-11 rounded-full bg-orange-400/20 border border-orange-400/30 flex items-center justify-center text-orange-400 font-bold uppercase">
                                    {comment.username[0]}
                                </div>

                                <div>
                                    <h4 className="text-white font-semibold">
                                        {comment.username}
                                    </h4>

                                    <p className="text-emerald-600 text-xs">
                                        Just now
                                    </p>
                                </div>
                            </div>

                            {/* Stars */}
                            <div className="flex items-center gap-1">

                                {[1, 2, 3, 4, 5].map((star) => (
                                    <svg
                                        key={star}
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill={star <= comment.rating ? "#fb923c" : "none"}
                                        stroke="#fb923c"
                                        strokeWidth="2"
                                    >
                                        <path d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321 1.01l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.386a.562.562 0 0 1-.84.61l-4.725-2.885a.563.563 0 0 0-.586 0L6.98 20.562a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557L3.04 10.407a.562.562 0 0 1 .32-1.01l5.519-.442a.563.563 0 0 0 .475-.345l2.125-5.11Z" />
                                    </svg>
                                ))}
                            </div>
                        </div>

                        <p className="text-emerald-100/80 leading-7 text-sm">
                            {comment.comment}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};