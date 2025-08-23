import { useState } from "react";
import HeadHtml from "../components/HeadHtml";
import { useAuthSuperAdmin } from "../hooks/useAuth";
import LoadingDots from "../components/LoadingDots";
import useLeaderInfo from "../hooks/pengaturanBeranda/useLeaderInfo";
import useImageEditor from "../hooks/pengaturanBeranda/useImageEditor";
import ImagePreview from "../components/pengaturanBeranda/ImagePreview";
import LeaderForm from "../components/pengaturanBeranda/LeaderForm";
import ImageCropModal from "../hooks/pengaturanBeranda/ImageCropModal";

export default function PengaturanBeranda() {
  useAuthSuperAdmin()
  const { leaderInfo, loading } = useLeaderInfo()

  const {
    imageUrl, handleFileChange, uploadFile, handleUploadFileBgErase,
    handleSave, cropMode, scale, position, resetZoom, handleZoom, crop,
    setCrop, getCroppedImage, imgRef, setCropMode, setImageUrl, croppedFile
  } = useImageEditor()

  const [nama, setNama] = useState("")
  const [jabatan, setJabatan] = useState("")

  if (loading) return <LoadingDots />
  return <div className="p-6 bg-white">
    <HeadHtml title="Pengaturan Beranda" />
    <div className="p-6">
      <div className="max-w-7xl items-center mx-auto shadow rounded p-4 w-1/2">
        <span className="font-bold text-lg">Edit Foto Pejabat</span>

        <div className="w-full shadow rounded p-4 bg-gray-100">
          <ImagePreview
            leaderInfo={leaderInfo}
            uploadFile={uploadFile}
            handleUploadFileBgErase={handleUploadFileBgErase}
            imageUrl={imageUrl}
            handleFileChange={handleFileChange}
          />

          <LeaderForm
            handleSave={handleSave}
            jabatan={jabatan}
            nama={nama}
            setJabatan={setJabatan}
            setNama={setNama}
            leaderInfo={leaderInfo}
          />
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