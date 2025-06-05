import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { STRINGS } from "../../utils/strings"
import { BASE_API_URL, KODE_SLUG } from "../../utils/api"
import { AxiosAuth } from "../../utils/axios"
import { loginFormBacgkroundStyle } from "../../utils/themeSetting"
import HeadHtml from "../HeadHtml"

export default function KetapangLoginPage() {
    const LeftPart = () => {
        return <div className="justify-center items-center flex flex-col w-full mx-auto relative">
            <div className="flex relative text-sm gap-x-16 w-5/6 justify-evenly font-bold px-3 py-1 rounded -translate-y-24">
                <img src="/img/ketapangkab.png" className="w-4/5" />
            </div>
        </div>
    }

    const RightPart = () => {
        const logoKabupaten = STRINGS[KODE_SLUG].logo_kab_url
        const logoApp = STRINGS[KODE_SLUG].logo_dss_url
        const [showPass, setShowPass] = useState(false)
        const navigate = useNavigate()
        const [error, setError] = useState('')

        const loginHandler = async (e: any) => {
            e.preventDefault();

            const form = new FormData(e.target);
            try {
                const res = await AxiosAuth.post(BASE_API_URL + "auth/login-post", form)

                if (res.status >= 400) throw new Error('username dan password tidak valid');
                const token = res.data.data.token
                localStorage.setItem('token', token)
                localStorage.setItem("role", res.data.data.user.level)
                navigate('/')
            } catch (error: any) {
                setError(error.message)
            }
        };

        return <div style={loginFormBacgkroundStyle} className="relative rounded-l-2xl overflow-y-auto text-white">
            <HeadHtml title="Login" />
            <div className="flex absolute left-9 top-9 gap-x-4">
                <div className="flex gap-x-2 h-fit">
                    <img src={logoKabupaten} alt="logo-ketapang" className={`${!logoKabupaten && 'hidden'} w-12`} />
                    <img src={logoApp} alt="logo-app" className={`${!logoApp && 'hidden'} w-20`} />
                </div>
                <div className="border-l-2 border-white"></div>

                <div className="flex flex-col justify-center font-semibold">
                    <span>{STRINGS[KODE_SLUG].nama}</span>
                    <span>{STRINGS[KODE_SLUG].kabkota}</span>
                </div>
            </div>

            <div className="flex justify-center items-center h-full w-full flex-col gap-y-6">
                <span className="font-semibold text-xl">Sistem Cepat Informasi Desa</span>
                <span className="font-bold text-3xl text-black">Masuk Akun</span>

                <div role="alert" className={`${error ? 'block' : 'hidden'} alert alert-error`}>
                    <span>{error}</span>
                </div>

                <form onSubmit={loginHandler} className="flex flex-col gap-y-4 w-3/5">
                    <div className="flex flex-col gap-y-1">
                        <label htmlFor="username" className="font-semibold">Username</label>
                        <input name="username" type="text" className="placeholder:text-stone-500 bg-gray-100 text-black placeholder:text-sm outline-none rounded-sm px-4 py-2 border-2 focus:border-sky-300 shadow-lg" placeholder="Masukkan Username" />
                    </div>

                    <div className="flex flex-col gap-y-1 relative">
                        <label htmlFor="username" className="font-semibold">Password</label>
                        <input name="password" type={showPass ? "text" : "password"} className="placeholder:text-stone-500 bg-gray-100 text-black placeholder:text-sm outline-none rounded-sm pl-4 pr-10 py-2 border-2 focus:border-sky-300 shadow-lg" placeholder="Masukkan Password" />

                        <img onClick={() => setShowPass((prev) => !prev)} src={showPass ? "/img/icon/show-password.svg" : "/img/icon/hide-password.svg"} alt="" className=" absolute size-5 bottom-2 right-3 cursor-pointer" />
                    </div>

                    <button className="btn btn-neutral">Masuk</button>
                </form>
            </div>
        </div>
    }
    return <div className="h-screen w-screen grid grid-cols-2 bg-cover bg-bottom bg-no-repeat bg-[url(/img/login.png)]">
        <LeftPart />
        <RightPart />
    </div>
}