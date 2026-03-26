import { createBrowserRouter } from "react-router-dom"
import Lgin from './features/auth/pages/Lgin';
import Register from './features/auth/pages/Register';
import Feed from "./features/post/pages/Feed";


const router = createBrowserRouter([
    {
        path: '/login',
        element: <Lgin/>
    }, 
    {
        path: '/register',
        element: <Register/>
    },
    {
        path: '/',
        element: <Feed/>
    }
])

export default router