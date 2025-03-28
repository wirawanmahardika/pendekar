export default function ExportReportButton({ clickUrl }: { clickUrl?: string }) {
    const clickAction = () => window.open(clickUrl)

    return <button
        type="button"
        className="btn btn-primary"
        style={{
            color: "#ffffff",
            backgroundColor: "#0d6efd"
        }}
        disabled={!clickUrl}
        onClick={clickAction}
    >
        Export Report
    </button>
}