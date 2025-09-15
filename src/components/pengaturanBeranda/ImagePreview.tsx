import { useState } from "react";
import { LeaderInfo } from "../../types/PengaturanBerandaTypes";
import { BASE_API_URL, KODE_SLUG } from "../../utils/api";
// import { BiTrash } from "react-icons/bi";

type props = {
    typeEdit: "wakil" | 'pemimpin';
    imageUrl: string;
    leaderInfo: LeaderInfo | null,
    uploadFile: File | null,
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>,
    handleUploadFileBgErase: (setCropping: React.Dispatch<React.SetStateAction<boolean>>) => void,
}

export default function ImagePreview({
    typeEdit, imageUrl, leaderInfo, handleFileChange, uploadFile, handleUploadFileBgErase
}: props) {
    const [cropping, setCropping] = useState(false)
    return <div className="rounded mb-4 relative">
        <div className="w-full h-90 rounded flex items-center justify-center p-3 bg-gray-200">
            {imageUrl ?
                <div className="relative">
                    <div className={`${!cropping && "hidden"} bg-black opacity-60 inset-0 absolute text-white text-lg place-items-center grid`}>Sedang Proses...</div>
                    <img src={imageUrl} className="h-full max-h-80 object-contain" />
                </div>
                :
                (typeEdit === "pemimpin" ? leaderInfo?.image : leaderInfo?.image_wakil) ?
                    <img src={`${BASE_API_URL}uploads/${KODE_SLUG}/image/${(typeEdit === "pemimpin" ? leaderInfo?.image : leaderInfo?.image_wakil)}`} className="h-full max-h-80 object-contain" />
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-25 h-25 text-gray-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>}
        </div>

        <div className="flex gap-x-3 items-center mt-6">
            <label className="btn btn-primary grow" htmlFor="image">Unggah Foto</label>
            <input onChange={handleFileChange} type="file" className="hidden" id="image" />
            {/* <BiTrash size={32} className="shrink-0 text-red-600" /> */}
        </div>

        {uploadFile && <button onClick={() => {
            setCropping(true)
            handleUploadFileBgErase(setCropping)
        }} className="px-2 py-1 bg-white rounded hover:bg-gray-100 cursor-pointer absolute top-5 right-5">
            <img src="/img/icon/background-removed.png" alt="background-removed" />
        </button>}

    </div>
}