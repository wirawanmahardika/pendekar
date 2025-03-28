export default function PageTitle({ title }: { title: string }) {
    return <div className="flex justify-between items-center mb-6">
        <h1 className="font-semibold text-4xl text-sky-600">{title}</h1>
        <span className="px-2 py-3 rounded bg-sky-600 font-semibold text-white">Last Update : 05 September 2024, 09:54 AM</span>
    </div>
}