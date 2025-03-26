export default function Login() {
    return <div className="h-screen w-screen grid grid-cols-2 bg-cover bg-bottom bg-no-repeat bg-[url(/img/login.png)]">
        <div className="justify-center items-center flex flex-col w-full mx-auto">
            <div className="flex relative text-sm gap-x-16 bg-white w-3/5 translate-y-16 justify-evenly text-sky-700 font-bold px-3 py-1 rounded" style={{ boxShadow: '6px 6px 0px rgb(0,119,178)' }}>
                <img src="/img/bupati.png" alt="" className="w-7/12 absolute bottom-full left-5" />
                <img src="/img/wakil.png" alt="" className="w-7/12 absolute bottom-full right-2" />

                <div className="invisible flex flex-col text-center">
                    <span>John Doe Kurniawan S.Pd.</span>
                    <span className="font-normal italic text-xs">Bupati Ketapang</span>
                </div>
                <div className="flex flex-col text-center absolute left-[20px]">
                    <span>John Doe Kurniawan S.Pd.</span>
                    <span className="font-normal italic text-xs">Bupati Ketapang</span>
                </div>
                <div className="flex flex-col text-center absolute right-[50px]">
                    <span>John Doe S.Pd.</span>
                    <span className="font-normal italic text-xs">Bupati Ketapang</span>
                </div>
            </div>
        </div>
        <div className="bg-[#0077B2]">

        </div>

    </div>
}