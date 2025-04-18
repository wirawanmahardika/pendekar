import { useState } from "react"
import useTitle from "../hooks/useTitle"
import { STRINGS } from "../utils/strings"
import { BASE_API_URL, KODE_SLUG } from "../utils/api"
import { loginTextStyle } from "../utils/themeSetting"
import KetapangLoginPage from "../components/login/KetapangKabLogin"
import { AxiosAuth } from "../utils/axios"
import { useNavigate } from "react-router-dom"


export default function Login() {
    useTitle("Login")
    const [showPass, setShowPass] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()
    if (KODE_SLUG === "ketapangkab") return <KetapangLoginPage />


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

    return <div className="h-screen w-full grid lg:grid-cols-2 bg-gray-100 relative ">
        <div className="flex flex-col justify-center items-center w-4/5 mx-auto">
            <img src="https://cdn.digitaldesa.com/statics/landing/homepage/media/misc/favicon/digides.png" alt="digides" className="w-28 mr-auto mb-10" />
            <h2 className="capitalize text-2xl font-semibold text-gray-700 text-center">{STRINGS[KODE_SLUG].desc}</h2>
            <form onSubmit={loginHandler} className="flex flex-col gap-y-3 mt-9 justify-start w-full">
                <span className="font-semibold text-3xl text-gray-800">Masuk Akun</span>

                <div role="alert" className={`${error ? 'block' : 'hidden'} alert alert-error`}>
                    <span>{error}</span>
                </div>

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

        <div
            className="hidden lg:flex justify-center items-center flex-col w-full mx-auto relative"
            style={{ backgroundColor: STRINGS[KODE_SLUG].theme.background_color }}
        >
            <div className="flex z-20 absolute top-5 left-5 w-3/4 gap-x-4 h-fit">
                <img src={STRINGS[KODE_SLUG].logo_kab_url} alt="logo-ketapang" className={`${!STRINGS[KODE_SLUG].logo_kab_url && 'hidden'} w-12`} />
                <img src={STRINGS[KODE_SLUG].logo_dss_url} alt="logo-app" className={`${!STRINGS[KODE_SLUG].logo_dss_url && 'hidden'} w-20`} />

                <div className="border-l-3 rounded-xl border-white"></div>

                <div className="flex flex-col gap-y-2">
                    <span className="text-white text-lg font-semibold">{STRINGS[KODE_SLUG].nama}</span>
                    <span className="text-white text-lg font-semibold">{STRINGS[KODE_SLUG].kabkota}</span>
                </div>
            </div>

            <div
                style={{ backgroundImage: "url('/img/login-background/default.png')" }}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-full bg-cover bg-center"
            ></div>

            <BackgroundPemerintah />

            <div style={{backgroundColor: STRINGS[KODE_SLUG].theme.background_color}} className={`italic text-white w-fit flex absolute bottom-16 text-sm gap-x-16 justify-evenly px-6 py-3 rounded`}>
                {STRINGS[KODE_SLUG].slogan}
            </div>
        </div>
    </div>
}


function BackgroundPemerintah() {
    const logo_user_2 = STRINGS[KODE_SLUG].logo_user_2
    const nama_user_2 = STRINGS[KODE_SLUG].nama_user_2
    const jabatan_user_2 = STRINGS[KODE_SLUG].jabatan_user_2

    return <div style={loginTextStyle} className={`${logo_user_2 ? "w-2/3" : "w-2/5"} flex absolute bottom-36 text-sm gap-x-16 bg-white justify-evenly font-bold px-3 py-1 rounded`}>
        <img src={STRINGS[KODE_SLUG].logo_user} alt="" className={`${logo_user_2 ? "w-7/12 left-5" : "w-full"} absolute bottom-full`} />
        <img src={STRINGS[KODE_SLUG].logo_user_2} alt="" className={`${!logo_user_2 && "hidden"} w-7/12 absolute bottom-full right-2`} />

        <div className="invisible flex flex-col text-center 2xl:text-lg">
            <span>John Doe Kurniawan S.Pd.</span><span className="font-normal italic text-xs">Bupati Ketapang</span>
        </div>

        <div className={`flex flex-col text-center absolute  2xl:text-lg ${logo_user_2 ? "left-[20px] 2xl:left-[65px]" : ""}`}>
            <span>{STRINGS[KODE_SLUG].nama_user}</span>
            <span className="font-normal italic text-xs">{STRINGS[KODE_SLUG].jabatan_user}</span>
        </div>
        <div className={`${!logo_user_2 && "hidden"} flex flex-col text-center absolute right-[20px] 2xl:right-[80px] 2xl:text-lg`}>
            <span>{nama_user_2}</span>
            <span className="font-normal italic text-xs">{jabatan_user_2}</span>
        </div>
        <div className={`${!logo_user_2 && "hidden"} flex flex-col text-center absolute right-[20px] 2xl:right-[80px] 2xl:text-lg`}>
            <span>{nama_user_2}</span>
            <span className="font-normal italic text-xs">{jabatan_user_2}</span>
        </div>
    </div>
}
