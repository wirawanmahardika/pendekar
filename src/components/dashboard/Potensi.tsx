import { PotensiBarChart, PotensiRadarChart } from "./charts/PotensiCharts";

export default function Potensi() {
    return <div className="p-4 bg-white rounded shadow mt-8">
        <div className="flex items-center justify-between">
            <h2 className="font-bold text-xl">Potensi</h2>
            <button type="button" className="rounded px-4 py-2 bg-sky-200 text-sky-600 hover:bg-sky-300">Export Report</button>
        </div>

        <div className="flex flex-col text-gray-700 mt-3">
            <span>Menampilkan Potensi Kecamatan, Desa/Kelurahan</span>

            <div className="grid grid-cols-5 mt-2 gap-3">
                <div className="rounded flex flex-col border border-gray-300">
                    <span className="w-full bg-sky-200 rounded-t p-3 text-xl text-center font-semibold">KECAMATAN</span>
                    <div className="flex flex-col overflow-y-auto">
                        <button className="px-3 py-2 font-semibold hover:bg-sky-700 text-left hover:text-white">Sandai</button>
                        <button className="px-3 py-2 font-semibold hover:bg-sky-700 text-left hover:text-white">Sungai Laur</button>
                        <button className="px-3 py-2 font-semibold hover:bg-sky-700 text-left hover:text-white">Matar Hilir Selatan</button>
                    </div>
                </div>

                <div className="rounded flex  col-span-2 flex-col border border-gray-300">
                    <span className="w-full bg-sky-200 rounded-t p-3 text-xl text-center font-semibold">Potensi Manusia</span>
                    <div className="overflow-y-auto">
                        <PotensiBarChart />
                    </div>
                </div>

                <div className="rounded flex col-span-2 flex-col border border-gray-300">
                    <span className="w-full bg-sky-200 rounded-t p-3 text-xl text-center font-semibold">Potensi SDA</span>
                    <div className="overflow-y-auto h-full">
                    </div>
                </div>

                <div className="rounded flex flex-col border border-gray-300 overflow-hidden">
                    <span title='Desa/Kelurahan' className="w-full bg-sky-200 rounded-t p-3 text-xl text-center font-semibold">DESA/KELURAHAN</span>
                    <div className="flex flex-col overflow-y-auto">
                        <button className="px-3 py-2 font-semibold hover:bg-sky-700 text-left hover:text-white">Sandai</button>
                        <button className="px-3 py-2 font-semibold hover:bg-sky-700 text-left hover:text-white">Sungai Laur</button>
                        <button className="px-3 py-2 font-semibold hover:bg-sky-700 text-left hover:text-white">Matar Hilir Selatan</button>
                    </div>
                </div>


                <div className="rounded flex col-span-2 flex-col border border-gray-300">
                    <span className="w-full bg-sky-200 rounded-t p-3 text-xl text-center font-semibold">Lembaga Kemsyarakatan</span>
                    <div className="overflow-y-auto ">
                        <PotensiRadarChart />
                    </div>
                </div>

                <div className="rounded flex col-span-2 flex-col border border-gray-300">
                    <span className="w-full bg-sky-200 rounded-t p-3 text-xl text-center font-semibold">Sarana Dan Prasarana</span>
                    <div className="flex flex-col overflow-y-auto h-full">
                        <PotensiBarChart />
                    </div>
                </div>
            </div>
        </div>
    </div>
}