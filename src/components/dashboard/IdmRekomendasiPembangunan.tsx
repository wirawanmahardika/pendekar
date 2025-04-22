import { useState } from "react";
import { sdgsDataTypes } from "../../types/DashboardTypes";
import { CDN_URL } from "../../utils/api";
import axios from "axios";

export default function IDMRekomendasiPembangunan() {

      const [sdgsOpen, setSdgsOpen] = useState(false)
      const [sdgsDatas, setSdgsDatas] = useState<sdgsDataTypes>()
      
    const fetchRekomendasiSDGS = async (kodeWilayah: string) => {
        try {
          const res = await axios.get(`${CDN_URL}statics/sdgs/${kodeWilayah.replace(/\./g, "/")}/skor.json`)
          setSdgsDatas(res.data);
          setSdgsOpen(true)
        } catch (error: any) {
          alert(error.message || "Something went wrong");
        }
      };
    

    return <div className={`${!sdgsOpen && 'hidden'} fixed inset-0 z-[9999] bg-white overflow-y-auto`}>
    <div className="w-full p-5 bg-sky-600 flex justify-between items-center">
      <span className="text-xl text-white font-semibold">[SDGs]</span>
      <button onClick={() => setSdgsOpen(false)} className="btn btn-error">Tutup</button>
    </div>
    <div className="p-4 w-full">
      <div className="flex flex-col items-center gap-y-2 mt-4">
        <span className="text-3xl font-semibold">{sdgsDatas?.average}</span>
        <span className="text-xl">Skor SDGs Desa</span>
      </div>

      <div className="grid grid-cols-6 gap-4 mt-8">
        {
          sdgsDatas?.data.map(d => {
            return <div key={d.goals} className="flex flex-col gap-y-2">
              <img src={d.image} alt={d.title} />
              <span className="text-center font-semibold text-xl">{d.score}</span>
            </div>
          })
        }
      </div>
    </div>
  </div>
}