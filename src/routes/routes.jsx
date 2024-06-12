import {
    createBrowserRouter,
} from "react-router-dom";
import Home from "../pages/Home";
import StarshipList from "../pages/StarshipList";
import Details from "../pages/Details";
import Login from "../pages/Login";
import Register from "../pages/Register";
import App from "../App";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/starshipList", 
                element: <StarshipList />,
            },
            {
                path: "/starshipdetail/:id", 
                element: <Details />,
            },
            {
                path: "/login", 
                element: <Login />,
            },
            {
                path: "/register", 
                element: <Register />,
            },
        ],
    },
]);