import { useState } from "react"
import useTitle from "../hooks/useTitle"

export default function Login() {
    useTitle("Login")
    return <div className="h-screen w-screen grid grid-cols-2 bg-cover bg-bottom bg-no-repeat bg-[url(/img/login.png)]">
        <LeftPart />
        <RightPart />
    </div>
}

const LeftPart = () => {
    return <div className="justify-center items-center flex flex-col w-full mx-auto relative">
        <div className="flex absolute top-5 left-5 w-full gap-x-4">
            <img src="/img/logo/logo.png" alt="logo-ketapang" className="w-8" />
            <img src="/img/logo/sicesa.png" alt="sicesa" className="w-20" />
        </div>

        <div className="flex relative text-sm gap-x-16 bg-white w-2/3 translate-y-20 justify-evenly text-sky-700 font-bold px-3 py-1 rounded" style={{ boxShadow: '6px 6px 0px rgb(0,119,178)' }}>
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

}

const RightPart = () => {
    const [showPass, setShowPass] = useState(false)

    return <div className="bg-[#0077B2] relative rounded-l-2xl overflow-y-auto text-white">
        <div className="flex absolute left-9 top-9 gap-x-4">
            <img
                className="size-14"
                src="https://cdn.digitaldesa.com/statics/landing/homepage/media/misc/favicon/digides.png"
                alt="digides-logo"
            />
            <div className="border-l-2 border-white"></div>

            <div className="flex flex-col justify-center font-semibold">
                <span>SiCesa</span>
                <span>Kabupaten Ketapang</span>
            </div>
        </div>

        <div className="flex justify-center items-center h-full w-full flex-col gap-y-6">
            <span className="font-semibold text-xl">Sistem Cepat Informasi Desa</span>
            <span className="font-bold text-3xl text-black">Masuk Akun</span>

            <form action="" className="flex flex-col gap-y-4 w-3/5">
                <div className="flex flex-col gap-y-1">
                    <label htmlFor="username" className="font-semibold">Username</label>
                    <input type="text" className="placeholder:text-stone-500 bg-gray-100 text-black placeholder:text-sm outline-none rounded-sm px-4 py-1 border-2 focus:border-sky-300 shadow-lg" placeholder="Masukkan Username" />
                </div>

                <div className="flex flex-col gap-y-1 relative">
                    <label htmlFor="username" className="font-semibold">Password</label>
                    <input type={showPass ? "text" : "password"} className="placeholder:text-stone-500 bg-gray-100 text-black placeholder:text-sm outline-none rounded-sm pl-4 pr-10 py-1 border-2 focus:border-sky-300 shadow-lg" placeholder="Masukkan Password" />

                    <img onClick={() => setShowPass((prev) => !prev)} src={showPass ? "/img/icon/show-password.svg" : "/img/icon/hide-password.svg"} alt="" className=" absolute size-5 bottom-2 right-3 cursor-pointer" />
                </div>

                <button className="btn btn-active">Masuk</button>
            </form>
        </div>
    </div>
}