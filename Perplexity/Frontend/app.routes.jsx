import { createBrowserRouter } from "react-router";
import Login from "./src/features/auth/pages/Login";
import Register from "./src/features/auth/pages/Register";
import Dashboard from "./src/features/chat/pages/Dashboard";
import Protected from "./src/features/auth/components/Protected";

export const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/',
        element: <Protected> <Dashboard /> </Protected>
    }
])