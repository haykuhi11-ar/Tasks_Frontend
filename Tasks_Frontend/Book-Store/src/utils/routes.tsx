import { createBrowserRouter } from "react-router-dom";
import { Products } from "../pages/Products";
import { Layout } from "../pages/Layout";
import { AddProduct } from "../pages/AddProduct";
import { ProductDetails } from "../pages/ProductDetails";
import { NotFound } from "../pages/NotFound";
import { EditProduct } from "../pages/EditProduct";
import { DeleteProduct } from "../pages/DeleteProduct";

export const routes = createBrowserRouter([
    {
        path: "/", 
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Products />
            },
            {
                path: "/add-product",
                element: <AddProduct /> 
            },
            {
                path: "/products/:id",
                element: <ProductDetails />
            },
            {
                path: "/products/edit-product/:id",
                element: <EditProduct />
            },
            {
                path: "/products/delete-product/:id",
                element: <DeleteProduct />
            },
            {
                path: "*",
                element: <NotFound />
            }
        ]
    },
]);
