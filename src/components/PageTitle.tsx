import { pageTitleStyle } from "../utils/themeSetting";
import { formatDate } from "../utils/formatter";
export default function PageTitle({ title, last_updated = new Date().toISOString() }: { title: string, last_updated?: string | Date }) {
    return <div className="flex justify-between items-center mb-6">
        <h1 style={pageTitleStyle.title} className="font-semibold text-4xl text-sky-600">{title}</h1>
        <span style={pageTitleStyle.time} className="px-2 py-3 rounded bg-sky-600 font-semibold text-white">{ formatDate(typeof last_updated === 'string' ? last_updated : last_updated.toISOString()) }</span>
    </div>
}