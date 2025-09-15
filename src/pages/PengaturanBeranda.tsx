import { useState } from "react";
import HeadHtml from "../components/HeadHtml";
import { useAuthSuperAdmin } from "../hooks/useAuth";
import LoadingDots from "../components/LoadingDots";
import useLeaderInfo from "../hooks/pengaturanBeranda/useLeaderInfo";
import useImageEditor from "../hooks/pengaturanBeranda/useImageEditor";
import ImagePreview from "../components/pengaturanBeranda/ImagePreview";
import LeaderForm from "../components/pengaturanBeranda/LeaderForm";
import ImageCropModal from "../hooks/pengaturanBeranda/ImageCropModal";
import { BASE_API_URL, KODE_SLUG } from "../utils/api";

export default function PengaturanBeranda() {
  useAuthSuperAdmin()
  const [mode, setMode] = useState<'edit' | "preview">("preview")
  const [typeEdit, setTypeEdit] = useState<'wakil' | 'pemimpin'>("pemimpin")
  const [nama, setNama] = useState<string | null>(null)
  const [jabatan, setJabatan] = useState<string | null>(null)

  const { leaderInfo, loading } = useLeaderInfo(mode)
  const {
    imageUrl, handleFileChange, uploadFile, handleUploadFileBgErase,
    handleSave, cropMode, scale, position, resetZoom, handleZoom, crop,
    setCrop, getCroppedImage, imgRef, setCropMode, setImageUrl, croppedFile
  } = useImageEditor()

  if (loading) return <LoadingDots />
  return <div className="p-6 bg-white">
    <HeadHtml title="Pengaturan Beranda" />

    <div className="p-6">
      <div className={`max-w-7xl items-center mx-auto shadow rounded p-4 ${mode !== "edit" ? "hidden" : "block"}`}>
        <span className="font-bold text-lg capitalize">Edit Data {typeEdit}</span>

        <div className="w-full shadow rounded p-4 bg-gray-100">
          <ImagePreview
            typeEdit={typeEdit}
            leaderInfo={leaderInfo}
            uploadFile={uploadFile}
            handleUploadFileBgErase={handleUploadFileBgErase}
            imageUrl={imageUrl}
            handleFileChange={handleFileChange}
          />

          <LeaderForm
            typeEdit={typeEdit}
            handleSave={handleSave}
            jabatan={jabatan}
            nama={nama}
            setJabatan={setJabatan}
            setNama={setNama}
            leaderInfo={leaderInfo}
            setMode={setMode}
          />
        </div>
      </div>

      <div className={`gap-x-4 items-center mx-auto shadow rounded p-4 w-full grid-cols-2 ${mode !== "preview" ? "hidden" : "grid"}`}>
        <span className="col-span-2 font-bold text-lg">Preview Data Pejabat</span>

        <div className="w-full shadow rounded mt-4 p-4 bg-gray-100">
          <span className="font-semibold text-lg mb-2">Pemimpin</span>
          <div className="rounded mb-4 relative">
            <div className="w-full h-90 rounded flex items-center justify-center p-3 bg-gray-200">
              {leaderInfo?.image ?
                <img src={`${BASE_API_URL}uploads/${KODE_SLUG}/image/${leaderInfo?.image}`} className="h-full max-h-80 object-contain" />
                :
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-25 h-25 text-gray-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nama</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Masukkan nama"
                readOnly
                value={leaderInfo?.nama}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Jabatan</label>
              <input
                type="text"
                value={leaderInfo?.jabatan}
                readOnly
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Masukkan jabatan"
              />
            </div>
          </div>
          <div className="flex justify-center mt-4 py-6">
            <button onClick={() => {
              setTypeEdit("pemimpin")
              setMode("edit")
            }} className="btn btn-info">
              Edit
            </button>
          </div>
        </div>

        <div className="w-full shadow rounded mt-4 p-4 bg-gray-100">
          <span className="font-semibold text-lg mb-2">Wakil</span>
          <div className="rounded mb-4 relative">
            <div className="w-full h-90 rounded flex items-center justify-center p-3 bg-gray-200">
              {leaderInfo?.image_wakil ?
                <img src={`${BASE_API_URL}uploads/${KODE_SLUG}/image/${leaderInfo?.image_wakil}`} className="h-full max-h-80 object-contain" />
                :
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-25 h-25 text-gray-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nama</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Masukkan nama"
                readOnly
                value={leaderInfo?.nama_wakil}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Jabatan</label>
              <input
                type="text"
                value={leaderInfo?.jabatan_wakil}
                readOnly
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Masukkan jabatan"
              />
            </div>
          </div>
          <div className="flex justify-center mt-4 py-6">
            <button onClick={() => {
              setTypeEdit("wakil")
              setMode("edit")
            }} className="btn btn-info">
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>

    {imageUrl && cropMode && <ImageCropModal
      crop={crop}
      croppedFile={croppedFile}
      getCroppedImage={getCroppedImage}
      handleZoom={handleZoom}
      imageUrl={imageUrl}
      imgRef={imgRef}
      position={position}
      resetZoom={resetZoom}
      scale={scale}
      setCrop={setCrop}
      setCropMode={setCropMode}
      setImageUrl={setImageUrl}
    />}
  </div>
}