import { createRoutesFromElements, Route, RouterProvider, createBrowserRouter } from "react-router-dom"
import Login from "./pages/Login"
import Wrapper from "./components/Wrapper"
import Dashboard from "./pages/Dashboard"
import Perencanaan from "./pages/Perencanaan"
import Pembangunan from "./pages/Pembangunan"
import Bansos from "./pages/Bansos"
import ProfilDesa from "./pages/ProfilDesa"
import UMKM from "./pages/UMKM"
import Berita from "./pages/Berita"
import Wisata from "./pages/Wisata"
import Kependudukan from "./pages/Kependudukan"
import AdministrasiUmum from "./pages/AdministrasiUmum"
import NotFound from "./pages/NotFound"

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<Login />} />
      <Route element={<Wrapper />} errorElement={<NotFound />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="/bansos" element={<Bansos />} />
        <Route path="/profil-desa" element={<ProfilDesa />} />
        <Route path="/perencanaan" element={<Perencanaan />} />
        <Route path="/umkm" element={<UMKM />} />
        <Route path="/pembangunan" element={<Pembangunan />} />
        <Route path="/wisata" element={<Wisata />} />
        <Route path="/berita" element={<Berita />} />
        <Route path="/kependudukan" element={<Kependudukan />} />
        <Route path="/umum" element={<AdministrasiUmum />} />
      </Route>
    </>
  )
)

function App() {
  return <RouterProvider router={router} />
}

export default App
