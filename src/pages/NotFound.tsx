import { useRouteError } from "react-router-dom";
import HeadHtml from "../components/HeadHtml";
import { notFoundStyle } from "../utils/themeSetting";

const NotFound = () => {
  const error = useRouteError()
  console.log(error);
  

  return (
    <div className=" flex items-center justify-center h-screen" style={notFoundStyle}>
      <HeadHtml title="Halaman Tidak Ditemukan" />
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-white">404</h1>
        <p className="text-2xl text-white mt-4">Halaman Tidak Ditemukan</p>
        <p className="text-white mt-2">
          Halaman yang Anda cari tidak tersedia
        </p>
        <a
          href="/"
          className="mt-6 inline-block px-6 py-3 bg-white text-black rounded-lg text-lg font-semibold hover:bg-gray-200 transition-colors"
        >
          Kembali ke Beranda
        </a>
      </div>
    </div>
  );
};

export default NotFound;
