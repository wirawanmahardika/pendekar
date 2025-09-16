import { useEffect, useState } from "react"
import HeadHtml from "../HeadHtml"
import { STRINGS } from "../../utils/strings"
import { BASE_API_URL, KODE_SLUG } from "../../utils/api"
import { AxiosAuth } from "../../utils/axios"
import { useNavigate } from "react-router-dom"
import { LeaderInfo } from "../../types/PengaturanBerandaTypes"

export default function DigikabLoginPage() {
    const [leaderInfo, setLeaderInfo] = useState<LeaderInfo | null>(null)
    const [showPass, setShowPass] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        AxiosAuth.get(BASE_API_URL + "setting/get-leader-info/" + KODE_SLUG)
            .then(res => { setLeaderInfo(res.data.data); })
            .catch(err => console.log(err))
    }, [])

    console.log(leaderInfo);

    const loginHandler = async (e: any) => {
        e.preventDefault();

        const form = new FormData(e.target);
        try {
            const res = await AxiosAuth.post(BASE_API_URL + "auth/login-post", form)

            if (res.status >= 400) throw new Error('username dan password tidak valid');
            const token = res.data.data.token
            localStorage.setItem('token', token)
            localStorage.setItem("role", res.data.data.user.level)
            localStorage.setItem("id", res.data.data.user.id)
            navigate('/')
        } catch (error: any) {
            setError(error.response.data.message || "Terjadi kesalahan")
        }
    };


    return <div className="h-screen w-full grid lg:grid-cols-2 bg-gray-100 relative ">
        <HeadHtml title="Login" />

        <div className="flex flex-col justify-center items-center w-3/5 m-auto">
            <img src={STRINGS[KODE_SLUG].logo_kab_url} alt="digides" className="w-16 xl:w-20 mx-auto mb-10" />
            <h2 className="capitalize mb-3 xl:text-2xl font-semibold text-gray-700 text-center">{STRINGS[KODE_SLUG].desc}</h2>
            <form onSubmit={loginHandler} className="flex flex-col gap-y-1 mt-5 justify-start w-full">
                <span className="font-semibold text-xl xl:text-3xl text-gray-800">Masuk Akun</span>

                <div role="alert" className={`${error ? 'block' : 'hidden'} alert alert-error`}>
                    <span>{error}</span>
                </div>

                <div className="flex flex-col gap-y-4 xl:gap-y-9 mt-6">
                    <div className="flex flex-col gap-y-1">
                        <label htmlFor="username" className="font-semibold">Username</label>
                        <input name="username" type="text" className="placeholder:text-stone-500 bg-gray-100 text-black placeholder:text-sm outline-none rounded-sm px-2 py-1 xl:py-2 border-2 focus:border-sky-300 shadow-lg" placeholder="Masukkan Username" />
                    </div>

                    <div className="flex flex-col gap-y-1 relative">
                        <label htmlFor="password" className="font-semibold">Password</label>
                        <input name="password" type={showPass ? "text" : "password"} className="placeholder:text-stone-500 bg-gray-100 text-black placeholder:text-sm outline-none rounded-sm pl-2 pr-10 py-1 xl:py-2 border-2 focus:border-sky-300 shadow-lg" placeholder="Masukkan Password" />

                        <img onClick={() => setShowPass((prev) => !prev)} src={showPass ? "/img/icon/show-password.svg" : "/img/icon/hide-password.svg"} alt="" className=" absolute size-5 bottom-2 right-3 cursor-pointer" />
                    </div>
                </div>

                <button className="btn btn-active border-none bg-sky-600 mt-4 xl:mt-6">Masuk</button>
            </form>
        </div>

        <div
            className="hidden lg:flex justify-center items-center flex-col w-full mx-auto relative bg-cover bg-center "
            style={{ backgroundImage: "url(/img/bg/digikab.jpg)" }}
        >
            <div className="absolute inset-0 bg-gradient-to-b from-green-500/60 to-green-500/10 flex size-full items-center justify-evenly flex-col">
                <div>
                    <h2 className="font-semibold text-6xl text-white uppercase">Selamat Datang</h2>
                    <div className="text-white rounded font-semibold text-center bg-black/30 p-2 shadow-md mt-1">
                        <span className="font-bold">Pendekar </span>
                        (Pemantauan Desa dan Kelurahan)
                    </div>
                </div>

                <div className="flex gap-x-4 justify-center">
                    <div className="flex flex-col items-center w-1/3">
                        <img src={`${BASE_API_URL}uploads/${KODE_SLUG}/image/${leaderInfo?.image}`} alt="" />
                        <div className="w-full rounded shadow-md shadow-slate-300 bg-emerald-600 text-white p-3 flex items-center justify-evenly flex-col">
                            <span className="font-bold">{leaderInfo?.nama}</span>
                            <span className="italic">{leaderInfo?.jabatan}</span>
                        </div>
                    </div>

                    <div className="flex flex-col items-center w-1/3">
                        <img src={`${BASE_API_URL}uploads/${KODE_SLUG}/image/${leaderInfo?.image_wakil}`} alt="" />
                        <div className="w-full rounded shadow-md shadow-slate-300 bg-emerald-600 text-white p-3 flex items-center justify-evenly flex-col">
                            <span className="font-bold">{leaderInfo?.nama_wakil}</span>
                            <span className="italic">{leaderInfo?.jabatan_wakil}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div >
}