import { exportReportButtonStyle } from "../utils/themeSetting";

export default function ExportReportButton() {
    return <button type="button" className="rounded px-4 py-2 hover:!bg-neutral-300 cursor-pointer" style={exportReportButtonStyle} >
        Export Report
    </button>
}