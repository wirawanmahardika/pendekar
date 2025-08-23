import { useRef, useState } from "react";
import { removeBackground } from "@imgly/background-removal";
import Swal from "sweetalert2";
import { Crop, PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { BASE_API_URL } from "../../utils/api";
import { AxiosAuth } from "../../utils/axios";
import { fileToWebP } from "../../utils/fileToWebp";

export default function useImageEditor() {
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

    const [uploadFile, setUploadFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState("")

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

    const handleSave = async (nama: string, jabatan: string) => {
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
            Swal.fire({ text: "Berhasil update data pemimpin", title: "Sukses", icon: "success" });
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

    return {
        crop, cropMode, imageUrl, uploadFile, scale, position,
        imgRef, croppedFile,
        setCrop, setCropMode, setImageUrl,
        getCroppedImage, handleUploadFileBgErase,
        handleFileChange,
        handleSave, handleZoom, resetZoom
    }
}