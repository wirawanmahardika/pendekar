import PageTitle from "../components/PageTitle";
import useAuth from "../hooks/useAuth";
import { BASE_API_URL } from "../utils/api";
import useGetResultData from "../hooks/useGetResultData";
import { umkmDataType } from "../types/umkmTypes";
import ProdukUMKMDeskel from "../components/umkm/ProdukUMKMDeskel";
import JenisUsaha from "../components/umkm/JenisUsaha";
import UsahaDiWilayah from "../components/umkm/UsahaDiWilayah";
import { useState } from "react";
import LoadingDots from "../components/LoadingDots";
import useTitle from "../hooks/useTitle";

export default function UMKM() {
    useAuth()
    useTitle("UMKM")

    const [loading, setIsLoading] = useState(false)
    const resultData = useGetResultData<umkmDataType>(`${BASE_API_URL}umkm?k3=&k4=&search=&type=&limit=`, setIsLoading);
    if (loading) return <LoadingDots />

    return <div className="px-4 py-10">
        <PageTitle title="UMKM" />

        <div className="grid grid-cols-2 gap-3">
            <UsahaDiWilayah resultData={resultData} />
            <JenisUsaha resultData={resultData} />
        </div>

        <ProdukUMKMDeskel resultData={resultData} />
    </div>
}
