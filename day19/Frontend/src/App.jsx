import { RouterProvider } from 'react-router'
import router from './app.routes.jsx'
// import AppRoutes from './routes'
// import './style.scss'
import { AuthProvider } from './features/auth/auth.context.jsx'
import '../src/features/shared/global.scss'
import { PostContextProvider } from './features/post/post.context.jsx'

const App = () => {
  return (
    // <AuthProvider>
    //   <AppRoutes/>
    // </AuthProvider>


    <AuthProvider>
      <PostContextProvider>
        <RouterProvider router={router} />
      </PostContextProvider>
    </AuthProvider>
  )
}

export default App
