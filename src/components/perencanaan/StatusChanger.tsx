import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import { AxiosAuth } from "../../utils/axios"
import { dataToDisplayPartType } from "../../types/PerencanaanTypes"
import { BASE_API_URL } from "../../utils/api"

const StatusChanger = ({ data, defaultStatus }: { data: dataToDisplayPartType, defaultStatus: "Revisi" | "Ditolak" | "Disetujui" | "Baru" }) => {
  const [status, setStatus] = useState(defaultStatus)
  const [color, setColor] = useState('bg-yellow-200 border-yellow-500')

  useEffect(() => {
    if (status === 'Revisi') setColor('bg-yellow-200 border-yellow-500')
    else if (status === 'Ditolak') setColor('bg-red-200 border-red-500')
    else if (status === 'Baru') setColor('bg-sky-200 border-sky-500')
    else setColor('bg-green-200 border-green-500')
  }, [status])

  const statusChange = async (e: any) => {
    setStatus(e.target.value)
    await popup(e.target.value, data)
  }

  return <div className={`flex w-fit gap-x-1 items-center`}>
    <select onChange={statusChange} defaultValue={defaultStatus} name="status" className={`pl-3 pr-9 rounded border py-1 ${color}`}>
      <option disabled value="Baru">Baru</option>
      <option disabled value="Revisi">Revisi</option>
      <option value="Disetujui">Disetujui</option>
      <option value="Ditolak">Ditolak</option>
    </select>
  </div>
}

const popup = async (status: string, data: dataToDisplayPartType) => {
  switch (status) {
    case "Ditolak":
      Swal.fire({
        title: "<strong>Ditolak</strong>",
        icon: "error",
        html: `
                  <span>Masukkan Komentar : </span>
                `,
        input: 'textarea',
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: `
                  Submit
                `,
        confirmButtonAriaLabel: "Thumbs up, great!",
        cancelButtonText: `
                  Cancel
                `,
        cancelButtonAriaLabel: "Thumbs down",
        preConfirm: async (inputValue) => {
          const form = new FormData()
          form.append('status', "Ditolak")
          form.append('komentar', inputValue)
          form.append('id_dokumen', data.id_dokumen)
          form.append('kode_desa', data.kode)
          try {
            await AxiosAuth.post(`${BASE_API_URL}perencanaan/ChangeStatus`, form, { headers: { 'Content-Type': "application/x-www-form-urlencoded" } })
            return "Berhasil ditolak"
          } catch (error: any) {
            return "Terjadi kesalahan saat menolak dokumen"
          }
        },
      }).then(res => {
        Swal.fire({
          title: res.value,
          icon: "info",
        })
      })
      break;

    case "Disetujui":
      const form = new FormData()
      form.append('status', "Disetujui")
      form.append('komentar', " ")
      form.append('id_dokumen', data.id_dokumen)
      form.append('kode_desa', data.kode)
      try {
        await AxiosAuth.post(`${BASE_API_URL}perencanaan/ChangeStatus`, form, { headers: { 'Content-Type': "application/x-www-form-urlencoded" } })
        Swal.fire({
          title: "Berhasil disetujui",
          icon: "success",
          draggable: true
        });
      } catch (error: any) {
        Swal.fire({
          title: "Gagal menyetujui, terjadi kesalahan",
          icon: "error",
          draggable: true
        });
      }
      break;

    default:
      break;
  }
}


export default StatusChanger