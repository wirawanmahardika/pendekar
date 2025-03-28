export default function FlashNews() {
    return <div className="p-4 bg-white rounded shadow">
        <h2 className="font-bold text-xl">Kabar Desa Terbaru</h2>
        <div className="flex mt-4 gap-x-6">
            <button className="px-9 py-4 font-bold text-lg text-white rounded bg-orange-500">Flash News</button>
            <div className="grow rounded bg-gray-700"></div>
        </div>
    </div>
}