import { SetStateAction } from "react";
import { KODE_SLUG } from "../../utils/api";
import { STRINGS } from "../../utils/strings";

type props = {
    modulType: "APBDes" | "RKPDes" | "RPJMDes";
    setModulType: React.Dispatch<SetStateAction<"APBDes" | "RKPDes" | "RPJMDes">>;
    setOpenFormTambah: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NavigationTabs({ setModulType, modulType, setOpenFormTambah }: props) {
    return <div className="flex bg-white rounded shadow p-5 justify-between items-center">
        <div role="tablist" style={{color: STRINGS[KODE_SLUG].theme.color_deep}} className="tabs tabs-border font-semibold">
            <a role="tab" onClick={() => { setModulType('RPJMDes'); }} className={`${modulType === "RPJMDes" && "tab-active"} tab text-lg`}>RPJMDes</a>
            <a role="tab" onClick={() => { setModulType('RKPDes'); }} className={`${modulType === "RKPDes" && "tab-active"} tab text-lg`}>RKPDes</a>
            <a role="tab" onClick={() => { setModulType('APBDes'); }} className={`${modulType === "APBDes" && "tab-active"} tab text-lg`}>APBDes</a>
        </div>
        <button onClick={() => setOpenFormTambah(true)} className="btn text-white" style={{ backgroundColor: STRINGS[KODE_SLUG].theme.color_deep }}>Unggah Template</button>
    </div>
}