import { RouterProvider } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import { router } from "./router/router"

function App() {
  return <RouterProvider router={router} />
}

export default App
