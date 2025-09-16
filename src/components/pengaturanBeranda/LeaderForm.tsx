import { LeaderInfo } from "../../types/PengaturanBerandaTypes";

type props = {
    typeEdit: "wakil" | 'pemimpin';
    nama: string | null;
    jabatan: string | null;
    leaderInfo: LeaderInfo | null;
    setJabatan: React.Dispatch<React.SetStateAction<string | null>>
    setNama: React.Dispatch<React.SetStateAction<string | null>>
    handleSave: (nama: string, jabatan: string, typeEdit: "wakil" | 'pemimpin') => void
    setMode: React.Dispatch<React.SetStateAction<'preview' | 'edit'>>
}

export default function LeaderForm({
    typeEdit, nama, jabatan, leaderInfo, setNama, setJabatan, handleSave, setMode
}: props) {
    return <>
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Nama</label>
                <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Masukkan nama"
                    value={nama === null ? (typeEdit === "pemimpin" ? leaderInfo?.nama : leaderInfo?.nama_wakil) : nama}
                    onChange={(e) => setNama(e.target.value)}
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Jabatan</label>
                <input
                    type="text"
                    onChange={(e) => setJabatan(e.target.value)}
                    value={jabatan === null ? (typeEdit === "pemimpin" ? leaderInfo?.jabatan : leaderInfo?.jabatan_wakil) : jabatan}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Masukkan jabatan"
                />
            </div>
        </div>
        <div className="flex justify-center mt-4 py-6 gap-x-3">
            <button onClick={() => setMode("preview")} className="btn btn-neutral">
                Preview
            </button>
            <button onClick={() => handleSave(nama || "", jabatan || "", typeEdit)} className="btn btn-info">
                Simpan
            </button>
        </div>
    </>
}