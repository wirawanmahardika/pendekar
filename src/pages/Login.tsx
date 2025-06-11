import { useState } from "react"
import { STRINGS } from "../utils/strings"
import { BASE_API_URL, KODE_SLUG } from "../utils/api"
import KetapangLoginPage from "../components/login/KetapangKabLogin"
import { AxiosAuth } from "../utils/axios"
import { useNavigate } from "react-router-dom"
import HeadHtml from "../components/HeadHtml"


export default function Login() {
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
            <img src="/img/logo/logo.png" alt="digides" className="w-16 xl:w-20 mx-auto mb-10" />
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
            className="hidden lg:flex justify-center items-center flex-col w-full mx-auto relative bg-cover bg-center"
            style={{ backgroundColor: STRINGS[KODE_SLUG].theme.color_deep }}
        >
            <div className="flex z-20 absolute left-3 top-3 xl:top-5 xl:left-5 w-3/4 gap-x-4 h-fit">
                <img src={STRINGS[KODE_SLUG].logo_kab_url} alt="logo-ketapang" className={`${!STRINGS[KODE_SLUG].logo_kab_url && 'hidden'} w-14 xl:w-16`} />
                <img src={STRINGS[KODE_SLUG].logo_dss_url} alt="logo-app" className={`${!STRINGS[KODE_SLUG].logo_dss_url && 'hidden'} w-10 xl:w-20`} />

                <div className="border-l-3 rounded-xl border-white"></div>

                <div className="flex flex-col gap-y-2">
                    <span className="text-white xl:text-lg font-semibold">{STRINGS[KODE_SLUG].title}</span>
                    <span className="text-white xl:text-lg font-semibold">{STRINGS[KODE_SLUG].kabkota}</span>
                </div>
            </div>

            <div
                style={{ backgroundImage: `url('/img/bg/${STRINGS[KODE_SLUG].logo_background_image_login}')` }}
                className="absolute bg-red-800 bg-cover bg-center inset-24 xl:inset-40 z-20"
            ></div>
        </div>
    </div >
}