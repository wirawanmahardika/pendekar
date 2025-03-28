import { pageTitleStyle } from "../utils/themeSetting";

export default function PageTitle({ title }: { title: string }) {
    return <div className="flex justify-between items-center mb-6">
        <h1 style={pageTitleStyle.title} className="font-semibold text-4xl text-sky-600">{title}</h1>
        <span style={pageTitleStyle.time} className="px-2 py-3 rounded bg-sky-600 font-semibold text-white">Last Update : 05 September 2024, 09:54 AM</span>
    </div>
}