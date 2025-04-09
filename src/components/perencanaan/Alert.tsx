import { FaCheck } from "react-icons/fa";

export default function Alert({open, setOpen}: {open: boolean, setOpen: (open:boolean) => void}) {
    return <div className={`fixed p-10 w-1/3 flex flex-col items-center gap-y-6 bg-white shadow shadow-slate-300 rounded z-[999] top-1/2 left-1/2 -translate-1/2 ${open ? "block" : "hidden"}`}>
        <div className="rounded-full w-fit mx-auto border-green-500 border-2 p-6"><FaCheck className="fill-green-500" size={32} /></div>

        <span className="text-xl font-semibold">Laporan Berhasil Disetujui</span>
        <button onClick={() => setOpen(false)} className="btn btn-info font-bold text-xl px-14 w-fit">OK</button>
    </div>
}