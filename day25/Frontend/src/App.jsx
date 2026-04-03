import { RouterProvider } from 'react-router'
import '../src/features/shared/global.scss'
import router from './app.routes.jsx'
import { AuthContextProvider } from './features/auth/auth.context'




function App() {
    return (
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    )
}

export default App
