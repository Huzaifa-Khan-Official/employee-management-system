import React, { useState } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from '../../App';
import LoaderContext from '../../Context/Loader.context.js';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />
    }
]);

export default function Navigaion() {
    const [loader, setLoader] = useState(true);

    return (
        <LoaderContext.Provider value={{ loader, setLoader }}>
            <RouterProvider router={router} />
        </LoaderContext.Provider>
    )
}