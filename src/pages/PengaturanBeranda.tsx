import { useEffect, useRef, useState } from "react";
import { removeBackground } from "@imgly/background-removal";
import HeadHtml from "../components/HeadHtml";
import { useAuthSuperAdmin } from "../hooks/useAuth";
import { AxiosAuth } from "../utils/axios";
import { BASE_API_URL } from "../utils/api";
import Swal from "sweetalert2";
import { BiTrash, BiZoomIn, BiZoomOut } from "react-icons/bi";
import { fileToWebP } from "../utils/fileToWebp";
import ReactCrop, { Crop, PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

export default function PengaturanBeranda() {
  useAuthSuperAdmin()
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [cropMode, setCropMode] = useState(false)
  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    x: 0,
    y: 0,
    width: 10,
    height: 10,
  });
  const [croppedFile, setCroppedFile] = useState<File | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [scale, setScale] = useState(1); // State untuk zoom
  const [position, setPosition] = useState({ x: 0, y: 0 }); // State untuk pan

  const [leaderInfo, setLeaderInfo] = useState<any>();
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("")
  const [nama, setNama] = useState("")
  const [jabatan, setJabatan] = useState("")

  useEffect(() => {
    AxiosAuth.get(BASE_API_URL + "/profil/get-leader-info")
      .then(res => {
        console.log(res.data.data);
        
        setLeaderInfo(res.data.data);
      });
  }, []);

  const getCroppedImage = async (crop: PixelCrop) => {
    if (!imgRef.current || !crop.width || !crop.height) return;

    const canvas = document.createElement("canvas");
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const scaleX = imgRef.current.naturalWidth / (imgRef.current.width / scale);
    const scaleY = imgRef.current.naturalHeight / (imgRef.current.height / scale);

    ctx.drawImage(
      imgRef.current,
      (crop.x + position.x) * scaleX,
      (crop.y + position.y) * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise<File>((resolve) => {
      canvas.toBlob((blob) => {
        if (!blob) return;
        const file = new File([blob], selectedFile!.name, { type: selectedFile!.type });
        setCroppedFile(file);
        resolve(file);
      }, selectedFile!.type);
    });
  };

  const handleUploadFileBgErase = async () => {
    if (!croppedFile) return;

    try {
      const blob = await removeBackground(croppedFile);
      const img = new Image();
      img.src = URL.createObjectURL(blob);

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");

        if (!ctx) return;
        ctx.drawImage(img, 0, 0);

        canvas.toBlob(
          (webpBlob) => {
            if (!webpBlob) return;

            const newFile = new File([webpBlob], croppedFile.name.replace(/\.[^/.]+$/, ".webp"), { type: "image/webp" });
            const imageUrl = URL.createObjectURL(newFile);
            setImageUrl(imageUrl);
            setUploadFile(newFile);
          },
          "image/webp",
          0.8
        );
      };
    } catch (err) {
      console.error("Gagal hapus background", err);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];

    const image = await fileToWebP(file)
    setImageUrl(URL.createObjectURL(file));
    setUploadFile(image)
    setSelectedFile(file);
    setCropMode(true)
    // Reset zoom dan position saat gambar baru dipilih
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleSave = async () => {
    if (!uploadFile) return Swal.fire({
      title: "Error",
      text: "Pilih foto terlebih dahulu",
      timer: 2000
    });

    const formData = new FormData();
    formData.append("image", uploadFile);
    formData.append("nama", nama);
    formData.append("jabatan", jabatan);

    try {
      await AxiosAuth.post(BASE_API_URL + "profil/leader-info-upsert", formData);
      Swal.fire({text: "Berhasil update foto!", title: "Sukses", icon: "success"});
    } catch (err) {
      console.error(err);
    }
  };

  // Fungsi untuk menangani zoom
  const handleZoom = (direction: 'in' | 'out') => {
    setScale(prev => {
      const newScale = direction === 'in' ? prev * 1.2 : prev / 1.2;
      return Math.min(Math.max(newScale, 0.5), 3); // Batasi zoom antara 0.5x dan 3x
    });
  };

  // Fungsi untuk mereset zoom dan posisi
  const resetZoom = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  return <div className="p-6 bg-white">
    <HeadHtml title="Pengaturan Beranda" />
    <div className="p-6">
      <div className="max-w-7xl items-center mx-auto shadow rounded p-4 w-1/2">
        <span className="font-bold text-lg">Edit Foto Pejabat</span>

        <div className="w-full shadow rounded p-4 bg-gray-100">
          <div className="rounded mb-4 relative">
            <div className="w-full h-90 rounded flex items-center justify-center p-3 bg-gray-200">
              {imageUrl ?
                <img src={imageUrl} className="h-full max-h-80 object-contain" /> :
                leaderInfo?.image_url ?
                  <img src={leaderInfo?.image_url} className="h-full max-h-80 object-contain" />
                  :
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-25 h-25 text-gray-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>}
            </div>

            <div className="flex gap-x-3 items-center mt-6">
              <label className="btn btn-primary grow" htmlFor="image">Unggah Foto</label>
              <input onChange={handleFileChange} type="file" className="hidden" id="image" />
              <BiTrash size={32} className="shrink-0 text-red-600" />
            </div>

            {uploadFile && <button onClick={handleUploadFileBgErase} className="px-2 py-1 bg-white rounded hover:bg-gray-100 cursor-pointer absolute top-5 right-5">
              <img src="/img/icon/background-removed.png" alt="background-removed" />
            </button>}

          </div>

          {/* Form Inputs */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nama</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Masukkan nama"
                value={nama || leaderInfo?.nama || ""}
                onChange={(e) => setNama(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Jabatan</label>
              <input
                type="text"
                onChange={(e) => setJabatan(e.target.value)}
                value={jabatan || leaderInfo?.jabatan || ""}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Masukkan jabatan"
              />
            </div>
          </div>
          <div className="flex justify-center mt-4 py-6">
            <button onClick={handleSave} className="btn btn-info">
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>

    {imageUrl && cropMode && (
      <>
        {/* Backdrop */}
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>

        {/* Modal Crop yang Diperbaiki */}
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white p-4 rounded-lg max-w-4xl w-full max-h-[90vh] flex flex-col">
            <h3 className="text-lg font-semibold mb-4">Crop Gambar</h3>
            
            {/* Kontrol Zoom */}
            <div className="flex gap-2 mb-4">
              <button 
                onClick={() => handleZoom('out')} 
                className="p-2 bg-gray-200 rounded hover:bg-gray-300"
                disabled={scale <= 0.5}
              >
                <BiZoomOut size={20} />
              </button>
              <button 
                onClick={resetZoom}
                className="p-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Reset
              </button>
              <button 
                onClick={() => handleZoom('in')} 
                className="p-2 bg-gray-200 rounded hover:bg-gray-300"
                disabled={scale >= 3}
              >
                <BiZoomIn size={20} />
              </button>
              <span className="p-2 text-sm">
                Zoom: {Math.round(scale * 100)}%
              </span>
            </div>
            
            {/* Area Crop dengan Scroll */}
            <div className="flex-1 overflow-auto mb-4 border rounded">
              <div 
                style={{
                  transform: `scale(${scale})`,
                  transformOrigin: 'top left',
                  width: '100%',
                  height: '100%',
                  position: 'relative'
                }}
              >
                <ReactCrop
                  crop={crop}
                  onChange={setCrop}
                  onComplete={c => getCroppedImage(c)}
                  aspect={1}
                  className="max-h-full"
                >
                  <img
                    src={imageUrl}
                    ref={imgRef}
                    alt="to crop"
                    style={{ 
                      maxHeight: '70vh', 
                      width: 'auto',
                      display: 'block',
                      transform: `translate(${position.x}px, ${position.y}px)`
                    }}
                  />
                </ReactCrop>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button 
                onClick={() => {
                  setCropMode(false);
                  setImageUrl("");
                }} 
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Batal
              </button>
              <button 
                onClick={async () => {
                  if (croppedFile) {
                    const url = URL.createObjectURL(croppedFile);
                    setImageUrl(url);
                    setCropMode(false);
                    Swal.fire({
                      title: "Berhasil",
                      text: "Gambar berhasil di-crop",
                      icon: "success",
                      timer: 2000
                    });
                  }
                }} 
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Simpan Crop
              </button>
            </div>
          </div>
        </div>
      </>
    )}
  </div>
}