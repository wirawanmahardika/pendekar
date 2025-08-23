import { BiZoomIn, BiZoomOut } from "react-icons/bi";
import ReactCrop, { Crop, PixelCrop } from "react-image-crop";
import Swal from "sweetalert2";

type props = {
    scale: number;
    crop: Crop;
    imageUrl: string;
    croppedFile: File | null;
    imgRef: React.RefObject<HTMLImageElement | null>;
    position: { x: number; y: number; }
    setCropMode: React.Dispatch<React.SetStateAction<boolean>>;
    getCroppedImage: (crop: PixelCrop) => Promise<File | undefined>;
    setCrop: React.Dispatch<React.SetStateAction<Crop>>;
    setImageUrl: React.Dispatch<React.SetStateAction<string>>;
    resetZoom: () => void;
    handleZoom: (direction: "in" | "out") => void
}

export default function ImageCropModal({
    croppedFile, scale, crop, imageUrl, imgRef, position, setCrop, setImageUrl, resetZoom, handleZoom,
    getCroppedImage, setCropMode,
}: props) {
    return <>
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
}