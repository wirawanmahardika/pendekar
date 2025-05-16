import { useState } from "react"
import { BASE_API_URL } from "../utils/api"
import { loginFormBacgkroundStyle, loginTextStyle } from "../utils/themeSetting"
import { AxiosAuth } from "../utils/axios"
import { useNavigate } from "react-router-dom"
import DATAS from "../utils/datas"
import useTitle from "../hooks/useTitle"

export default function KetapangLoginPage () {
    useTitle("Login")

    const LeftPart = () => {
        const logoKabupaten = DATAS.logo_kab_url
        const logoApp = DATAS.logo_dss_url
        const bupati = DATAS.nama_user
        const wakilBupati = DATAS.nama_user_2

        return <div className="justify-center items-center flex flex-col w-full mx-auto relative">
            <div className="flex absolute top-5 left-5 w-full gap-x-4 h-fit">
                <img src={logoKabupaten} alt="logo-ketapang" className={`${!logoKabupaten && 'hidden'} w-12`} />
                <img src={logoApp} alt="logo-app" className={`${!logoApp && 'hidden'} w-20`} />
            </div>

            <div style={loginTextStyle} className="flex relative text-sm gap-x-16 bg-white w-5/6 translate-y-20 justify-evenly font-bold px-3 py-1 rounded">
                <img src="/img/bupati.png" alt="" className="w-7/12 absolute bottom-full left-5" />
                <img src="/img/wakil.png" alt="" className="w-7/12 absolute bottom-full right-2" />

                <div className="invisible flex flex-col text-center 2xl:text-lg">
                    <span>John Doe Kurniawan S.Pd.</span><span className="font-normal italic text-xs">Bupati Ketapang</span>
                </div>

                <div className="flex flex-col text-center absolute left-[20px] 2xl:left-[65px] 2xl:text-lg">
                    <span>{bupati}</span>
                    <span className="font-normal italic text-xs">Bupati Ketapang</span>
                </div>
                <div className="flex flex-col text-center absolute right-[20px] 2xl:right-[80px] 2xl:text-lg">
                    <span>{wakilBupati}</span>
                    <span className="font-normal italic text-xs">Wakil Bupati Ketapang</span>
                </div>
            </div>
        </div>

    }

    const RightPart = () => {
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
                navigate('/')
            } catch (error: any) {
                setError(error.message)
            }
        };

        return <div style={loginFormBacgkroundStyle} className="relative rounded-l-2xl overflow-y-auto text-white">
            <div className="flex absolute left-9 top-9 gap-x-4">
                <img
                    className="size-14"
                    src="https://cdn.digitaldesa.com/statics/landing/homepage/media/misc/favicon/digides.png"
                    alt="digides-logo"
                />
                <div className="border-l-2 border-white"></div>

                <div className="flex flex-col justify-center font-semibold">
                    <span>{DATAS.nama}</span>
                    <span>{DATAS.kabkota}</span>
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