import { BrowserRouter, Routes, Route } from "react-router";
import Lgin from './features/auth/pages/Lgin';
import Register from './features/auth/pages/Register';

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<h1>Welcome to the App</h1>} />
                <Route path='/login' element={<Lgin />} />
                <Route path='/register' element={<Register />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes