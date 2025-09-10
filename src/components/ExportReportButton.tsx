import { BASE_API_URL } from "../utils/api";
import { exportReportButtonStyle } from "../utils/themeSetting";

export default function ExportReportButton({ url }: { url?: string }) {
    return <button type="button" className="rounded px-4 py-2 hover:!bg-neutral-300 cursor-pointer" style={exportReportButtonStyle}
        onClick={() => window.open(`${BASE_API_URL}${url}`)}
        disabled={!url}
    >
        Export Report
    </button>
}