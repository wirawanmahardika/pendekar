import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import Login from "./pages/Login"
import Wrapper from "./components/Wrapper"
import Dashboard from "./pages/Dashboard"
import Perencanaan from "./pages/Perencanaan"
import Bansos from "./pages/Bansos"

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Wrapper />} >
        <Route index element={<Dashboard />} />
        <Route path="bansos" element={<Bansos />} />
        <Route path="perencanaan" element={<Perencanaan />} />
      </Route>

    </>
  )
)

function App() {
  return <RouterProvider router={router} />
}

export default App
