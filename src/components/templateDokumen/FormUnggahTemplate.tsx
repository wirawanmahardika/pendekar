import Swal from "sweetalert2"
import { BASE_API_URL, KODE_SLUG } from "../../utils/api"
import { AxiosAuth } from "../../utils/axios"
import { IoCloudUploadOutline } from "react-icons/io5"
import { RxCross2 } from "react-icons/rx"
import { SetStateAction } from "react"

type props = {
    openFormTambah: boolean;
    setOpenFormTambah: React.Dispatch<SetStateAction<boolean>>;
}

export default function FormUnggahTemplate({ openFormTambah, setOpenFormTambah }: props) {
    const handleUnggalTemplate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)

        try {
            const res = await AxiosAuth.post(BASE_API_URL + 'perencanaan/post-document-perencanaan/' + KODE_SLUG, formData)
            Swal.fire({ icon: 'success', text: res.data.message, title: "Sukses" })
        } catch (error) {
            Swal.fire({ icon: 'error', text: "Tidak dapat upload dokumen, terjadi kesalahan", title: "Error" })
        }
    }

    return <div className={`${!openFormTambah && "hidden"} fixed inset-0 backdrop-brightness-70`}>
        <div className="absolute top-1/2 left-1/2 -translate-1/2 bg-white rounded flex flex-col gap-y-3 p-5 w-1/4">
            <div className="flex w-full items-center">
                <IoCloudUploadOutline />
                <span className="ml-2 mr-auto font-normal">Unggah Template</span>
                <RxCross2 className="hover:text-red-500 cursor-pointer" size={20} onClick={() => setOpenFormTambah(false)} />
            </div>

            <hr className="border-none h-0.5 bg-gray-500 w-full" />

            <form onSubmit={handleUnggalTemplate} className="flex flex-col gap-y-5 mt-3">
                <div className="flex flex-col gap-y-1">
                    <label className="text-sm">Filename <sup className="text-red-500">*</sup></label>
                    <input type="text" name="filename" className="input bg-yellow-100 w-full" required />
                </div>
                <div className="flex flex-col gap-y-1">
                    <label className="text-sm">Tahun <sup className="text-red-500">*</sup></label>
                    <input type="number" min={1} name="tahun" className="input bg-yellow-100 w-full" required />
                </div>
                <div className="flex flex-col gap-y-1">
                    <label className="text-sm">Upload File <sup className="text-red-500">*</sup></label>
                    <input type="file" name="document_perencanaan" className="file-input bg-yellow-100 w-full" accept=".pdf" required />
                    <span className="text-xs font-light">Format File PDF | Max 20 MB</span>
                </div>
                <div className="flex flex-col gap-y-1">
                    <label className="text-sm">Kategori Dokumen <sup className="text-red-500">*</sup></label>
                    <div className="flex gap-x-4">
                        <div className="p-3 bg-yellow-100 rounded flex items-center gap-x-3 w-fit">
                            <input type="radio" value={"rpjmdes"} name="modul" className="radio radio-warning" />
                            <span className="text-xs">RPJMDes</span>
                        </div>
                        <div className="p-3 bg-yellow-100 rounded flex items-center gap-x-3 w-fit">
                            <input type="radio" value={'rkpdes'} name="modul" className="radio radio-warning" />
                            <span className="text-xs">RKPDes</span>
                        </div>
                        <div className="p-3 bg-yellow-100 rounded flex items-center gap-x-3 w-fit">
                            <input type="radio" value={'apbdes'} name="modul" className="radio radio-warning" />
                            <span className="text-xs">APBDes</span>
                        </div>
                    </div>
                </div>

                <button className="btn btn-info w-fit ml-auto text-white">Simpan</button>
            </form>
        </div>

    </div>
}