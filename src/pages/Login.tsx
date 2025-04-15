import { useState } from "react"
import useTitle from "../hooks/useTitle"
import { STRINGS } from "../utils/strings"
import { BASE_API_URL, KODE_SLUG } from "../utils/api"
import { loginFormBacgkroundStyle, loginTextStyle } from "../utils/themeSetting"


export default function Login() {
    useTitle("Login")
    const [showPass, setShowPass] = useState(false)


    // if (KODE_SLUG === "ketapangkab") return <KetapangLoginPage />
    const logoKabupaten = STRINGS[KODE_SLUG].logo_kab_url
        const logoApp = STRINGS[KODE_SLUG].logo_dss_url

    return <div className="h-screen w-screen grid grid-cols-2 bg-gray-100 relative">
        <div className="flex flex-col justify-center items-center w-4/5 mx-auto">
            <img src="https://cdn.digitaldesa.com/statics/landing/homepage/media/misc/favicon/digides.png" alt="digides" className="w-28 mr-auto" />
            <h2 className="capitalize text-2xl font-semibold text-gray-700">sistem cepat informasi desa</h2>
            <form action="" className="flex flex-col gap-y-3 mt-9 justify-start w-full">
                <span className="font-semibold text-3xl text-gray-800">Masuk Akun</span>

                <div className="flex flex-col gap-y-9 mt-6">
                    <div className="flex flex-col gap-y-1">
                        <label htmlFor="username" className="font-semibold">Username</label>
                        <input name="username" type="text" className="placeholder:text-stone-500 bg-gray-100 text-black placeholder:text-sm outline-none rounded-sm px-4 py-2 border-2 focus:border-sky-300 shadow-lg" placeholder="Masukkan Username" />
                    </div>

                    <div className="flex flex-col gap-y-1 relative">
                        <label htmlFor="password" className="font-semibold">Password</label>
                        <input name="password" type={showPass ? "text" : "password"} className="placeholder:text-stone-500 bg-gray-100 text-black placeholder:text-sm outline-none rounded-sm pl-4 pr-10 py-2 border-2 focus:border-sky-300 shadow-lg" placeholder="Masukkan Password" />

                        <img onClick={() => setShowPass((prev) => !prev)} src={showPass ? "/img/icon/show-password.svg" : "/img/icon/hide-password.svg"} alt="" className=" absolute size-5 bottom-2 right-3 cursor-pointer" />
                    </div>
                </div>

                <button className="btn btn-active border-none bg-sky-600 mt-6">Masuk</button>
            </form>
        </div>

        <div className="justify-center items-center flex flex-col w-full mx-auto relative" style={{backgroundColor: STRINGS[KODE_SLUG].background_color}}>
            <div className="flex absolute top-5 left-5 w-full gap-x-4 h-fit">
                <img src={logoKabupaten} alt="logo-ketapang" className={`${!logoKabupaten && 'hidden'} w-12`} />
                <img src={logoApp} alt="logo-app" className={`${!logoApp && 'hidden'} w-20`} />

                <div className="border-l-3 rounded-xl border-white"></div>

                <div className="flex flex-col gap-y-2">
                    <span className="text-white text-lg font-semibold">SiCesa</span>
                    <span className="text-white text-lg font-semibold">Kabupaten Ketapang</span>
                </div>
            </div>

            <div style={loginTextStyle} className="flex relative text-sm gap-x-16 bg-white w-2/3 translate-y-20 justify-evenly font-bold px-3 py-1 rounded">
                <img src="/img/bupati.png" alt="" className="w-7/12 absolute bottom-full left-5" />
                <img src="/img/wakil.png" alt="" className="w-7/12 absolute bottom-full right-2" />

                <div className="invisible flex flex-col text-center 2xl:text-lg">
                    <span>John Doe Kurniawan S.Pd.</span><span className="font-normal italic text-xs">Bupati Ketapang</span>
                </div>

                <div className="flex flex-col text-center absolute left-[20px] 2xl:left-[65px] 2xl:text-lg">
                    <span>John Doe Kurniawan S.Pd.</span>
                    <span className="font-normal italic text-xs">Bupati Ketapang</span>
                </div>
                <div className="flex flex-col text-center absolute right-[20px] 2xl:right-[80px] 2xl:text-lg">
                    <span>John Doe S.Pd.</span>
                    <span className="font-normal italic text-xs">Wakil Bupati Ketapang</span>
                </div>
            </div>
        </div>
    </div>
}

