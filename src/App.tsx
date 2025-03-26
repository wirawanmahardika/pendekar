import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Wrapper from "./components/wrapper"

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Wrapper />} >
        <Route index element={<Home />} />

      </Route>

    </>
  )
)

function App() {
  return <RouterProvider router={router} />
}

export default App
