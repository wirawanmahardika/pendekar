import { Outlet } from "react-router-dom";
import { motion } from 'framer-motion'
import Sidebar from "./sidebar";
import { useState } from "react";

export default function Wrapper() {
    const [sidebarOpen, setSidebarOpen] = useState(true)


    return <div className="h-screen w-screen bg-neutral-50 flex">
        <motion.div animate={{ width: sidebarOpen ? '20%' : '0' }} className="bg-[#0077B2] overflow-y-auto overflow-x-hidden">
            <Sidebar />
        </motion.div>

        <div className={`bg-yellow-600 grow flex flex-col`}>
            <div className="bg-white shadow-md h-[10vh] flex items-center justify-between px-5">
                <div className="flex items-center gap-x-4">
                    <svg onClick={() => setSidebarOpen(prev => !prev)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="size-8 cursor-pointer">
                        <path fillRule="evenodd" d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                    </svg>
                    <span className="font-semibold text-xl translate-y-0.5">SiCesa</span>
                </div>

                <div className="dropdown">
                    <div tabIndex={0} role="button" className=" cursor-pointer">
                        <div className="flex gap-x-3 items-center text-blue-900 font-medium">
                            <img src="/img/icon/pengaduan.png" alt="" className="w-10" />
                            <span>John Doe, S.STP., M.Si.</span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 -ml-2">
                                <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>

                    <ul tabIndex={0} className="dropdown-content rounded z-1 w-64 shadow-sm bg-white flex flex-col items-center">
                        <div className="flex flex-col gap-y-0.5 items-center p-1">
                            <span className="text-lg">John Doe</span>
                            <span className="font-light text-sm text-gray-700">Bupati Ketapang</span>
                        </div>
                        <a href="" className="flex gap-x-1 mt-2 w-full text-sm items-center bg-gray-300 p-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                <path fillRule="evenodd" d="M7.5 3.75A1.5 1.5 0 0 0 6 5.25v13.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V15a.75.75 0 0 1 1.5 0v3.75a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V5.25a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V9A.75.75 0 0 1 15 9V5.25a1.5 1.5 0 0 0-1.5-1.5h-6Zm10.72 4.72a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l1.72-1.72H9a.75.75 0 0 1 0-1.5h10.94l-1.72-1.72a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                            </svg>

                            <span>Keluar</span>
                        </a>
                    </ul>
                </div>
            </div>
            <div className="bg-gray-200 grow">
                <Outlet />
            </div>
        </div>
    </div>
}