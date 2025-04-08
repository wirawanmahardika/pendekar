import { useEffect, useState } from "react"

const StatusChanger = ({ defaultStatus, setOpen }: {setOpen: (open:boolean) => void, defaultStatus: "revisi" | "ditolak" | "disetujui" }) => {
    const [status, setStatus] = useState(defaultStatus)
    const [color, setColor] = useState('bg-yellow-200 border-yellow-500')

    useEffect(() => {
        if (status === 'revisi') setColor('bg-yellow-200 border-yellow-500')
        else if (status === 'ditolak') setColor('bg-red-200 border-red-500')
        else setColor('bg-green-200 border-green-500')
    }, [status])

    const statusChange = (e:any) => {
        setOpen(true)
        setStatus(e.target.value)
    }

    return <div className={`flex ${color} border rounded w-fit gap-x-1 items-center`}>
        <select onChange={statusChange} name="status" id="" className="px-3 py-1">
            <option selected={status === 'revisi'} value="revisi">Revisi</option>
            <option selected={status === 'disetujui'} value="disetujui">Disetujui</option>
            <option selected={status === 'ditolak'} value="ditolak">Ditolak</option>
        </select>
    </div>
}


export default StatusChanger