import { JSX, useState } from "react";
import { motion } from "framer-motion";

import { AiOutlineSchedule } from "react-icons/ai";
import { BiSolidDashboard } from "react-icons/bi";
import { FaHandsHelping, FaRegCircle } from "react-icons/fa";
import { GiBrickWall, GiVillage } from "react-icons/gi";
import { MdTrendingUp } from "react-icons/md";
import { RiAdminLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { STRINGS } from "../utils/strings";
import { KODE_SLUG } from "../utils/api";


export default function Sidebar() {
    return <div className="flex flex-col items-center p-5 w-[20vw] text-white">
        <h2 className="font-semibold text-3xl mt-3">{STRINGS[KODE_SLUG].nama}</h2>
        <span className="text-yellow-300 text-sm mt-3 capitalize">{STRINGS[KODE_SLUG].desc}</span>

        <nav className="flex flex-col mt-10 w-full gap-y-6">
            <span className="font-semibold">MENU</span>

            <Nav text="Dashboard" url="/" icon={<BiSolidDashboard className="p-0 size-5" />} />
            <NavWithSubNav text="Administrator" icon={<RiAdminLine className="p-0 size-5" />} subNavs={[
                { text: 'Umum', url: '/umum' },
                { text: 'Kependudukan', url: '/kependudukan' },
            ]} />
            <Nav text="Pembangunan" url="pembangunan" icon={<GiBrickWall className="p-0 size-5" />} />
            <NavWithSubNav text="Potensi" icon={<MdTrendingUp className="p-0 size-5" />} subNavs={[
                { text: 'UMKM', url: '/umkm' },
                { text: 'Berita', url: '/berita' },
                { text: 'Wisata', url: '/wisata' },
            ]} />
            <Nav text="Profil Desa" url="profil-desa" icon={<GiVillage className="p-0 size-5" />} />
            <Nav text="Bansos" url="bansos" icon={<FaHandsHelping className="p-0 size-5" />} />
            {
                KODE_SLUG === "ketapangkab" &&
                <Nav text="Perencanaan" url="perencanaan" icon={<AiOutlineSchedule className="p-0 size-5" />} />
            }
        </nav >
    </div >
}

function Nav({ icon, text, url }: { icon: JSX.Element, text: string, url: string }) {
    return <NavLink to={url} className="flex items-center gap-x-2">
        {icon}
        <span>{text}</span>
    </NavLink>
}

function NavWithSubNav(
    { icon, text, subNavs }:
        { icon: JSX.Element, text: string, subNavs: { url: string, text: string }[] }) {

    const [isOpen, setIsOpen] = useState(false)
    const defineHeightBySubNavs = () => {
        switch (subNavs.length) {
            case 1: return '20px'
            case 2: return '55px'
            case 3: return '90px'
            default: return '0px'
        }
    }

    let height = defineHeightBySubNavs()
    return <>
        <div className="flex items-center gap-x-2 cursor-pointer" onClick={() => setIsOpen(prev => !prev)}>
            {icon}
            <span>{text}</span>
            <motion.svg animate={{ rotate: isOpen ? '90deg' : 0 }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 ml-auto">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </motion.svg>
        </div>

        <motion.div initial={{ height: 0 }} animate={{ height: isOpen ? height : 0 }} className="overflow-hidden -my-3 w-full flex flex-col pl-5 gap-y-3">
            {
                subNavs.map(nav => {
                    return <NavLink to={nav.url} className="flex gap-x-2 items-center">
                        <FaRegCircle className="size-3" />
                        <span className="text-sm">{nav.text}</span>
                    </NavLink>
                })
            }
        </motion.div>
    </>
}
