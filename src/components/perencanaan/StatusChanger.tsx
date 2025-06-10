import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import { AxiosAuth } from "../../utils/axios"
import { BASE_API_URL } from "../../utils/api"
import { dokumenDanPerencaanPartType } from "../../types/perencaan/DokumenDanPerencanaan"

const StatusChanger = ({ data, defaultStatus }: { data: dokumenDanPerencaanPartType, defaultStatus: "Revisi" | "Ditolak" | "Disetujui" | "Baru" }) => {
  const [status, setStatus] = useState(defaultStatus)
  const [color, setColor] = useState('bg-yellow-200 border-yellow-500')

  useEffect(() => {
    if (status === 'Revisi') setColor('bg-yellow-200 border-yellow-500')
    else if (status === 'Ditolak') setColor('bg-red-200 border-red-500')
    else if (status === 'Baru') setColor('bg-sky-200 border-sky-500')
    else setColor('bg-green-200 border-green-500')
  }, [status])

  const statusChange = async (e: any) => {
    const isSuccess = await popup(e.target.value, data)
    if (isSuccess) setStatus(e.target.value)
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

const popup = async (status: string, data: dokumenDanPerencaanPartType) => {
  let isSuccess = true;
  switch (status) {
    case "Ditolak":
      Swal.fire({
        title: "<strong>Ditolak</strong>",
        icon: "error",
        html: `<span>Masukkan Komentar : </span>`,
        input: 'textarea',
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: `Submit`,
        confirmButtonAriaLabel: "Thumbs up, great!",
        cancelButtonText: `Cancel`,
        cancelButtonAriaLabel: "Thumbs down",
        preConfirm: async (inputValue) => {
          const form = new FormData()
          console.log(inputValue);
          form.append('status', "Ditolak")
          form.append('komentar', inputValue)
          form.append('id_dokumen', data.id_dokumen)
          form.append('kode_desa', data.kode)
          form.append('id_pic', localStorage.getItem("id") || "")
          try {
            await AxiosAuth.post(`${BASE_API_URL}perencanaan/ChangeStatus`, form, { headers: { 'Content-Type': "application/x-www-form-urlencoded" } })
            return "Berhasil ditolak"
          } catch (error: any) {
            return "Terjadi kesalahan saat menolak dokumen"
          }
        },
      }).then(res => {
        Swal.fire({
          title: res.isConfirmed ? res.value : "Proses penggantian status dibatalkan",
          icon: "info",
        });
      })
      break;

    case "Disetujui":
      Swal.fire({
        title: "<strong>Disetujui</strong>",
        icon: "success",
        html: `<span>Masukkan Komentar : </span>`,
        input: 'textarea',
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: `Submit`,
        confirmButtonAriaLabel: "Thumbs up, great!",
        cancelButtonText: `Cancel`,
        cancelButtonAriaLabel: "Thumbs down",
        preConfirm: async (inputValue) => {
          const form = new FormData()
          console.log(inputValue);
          
          form.append('status', "Disetujui")
          form.append('komentar', inputValue)
          form.append('id_dokumen', data.id_dokumen)
          form.append('kode_desa', data.kode)
          form.append('id_pic', localStorage.getItem("id") || "")
          try {
            await AxiosAuth.post(`${BASE_API_URL}perencanaan/ChangeStatus`, form, { headers: { 'Content-Type': "application/x-www-form-urlencoded" } })
            return "Berhasil Disetujui"
          } catch (error: any) {
            return "Terjadi kesalahan saat menyetujui dokumen"
          }
        },
      }).then(res => {
        Swal.fire({
          title: res.isConfirmed ? res.value : "Proses penggantian status dibatalkan",
          icon: "info",
        });
      })

      break;

    default:
      break;
  }

  return isSuccess
}


export default StatusChanger