import { BsFillSignTurnRightFill } from "react-icons/bs"
import { umkmProdukDesaStyle } from "../../utils/themeSetting"
import { umkmCardType } from "../../types/umkmTypes"
import { CDN_URL } from "../../utils/api"

const ProdukCard = ({ data }: { data: umkmCardType }) => {
    return <div className="flex bg-white rounded p-5 shadow gap-x-3 items-center">
        <div className="w-1/2 relative">
            <img
                // src="${CDN_URL}uploads/marketplace/products/dbc9d16b76ad7eed18cf741223a5b9a8.jpg"
                src={`${CDN_URL}uploads/marketplace/products/${data.foto}`}
                alt="produk"
                className="rounded-l-lg"
            />
            <span style={umkmProdukDesaStyle.category} className="text-center px-2 py-1 rounded-tl-sm text-white absolute rounded-br-sm top-0 left-0 text-[10px]">{data.tipe_usaha}</span>
        </div>
        <div className="flex flex-col w-1/2 gap-y-1 text-gray-800">
            <span className="font-semibold text-lg leading-6">{data.nama_usaha}</span>
            <span className="text-xs font-semibold capitalize">Desa {data.nama_deskel}, Kec {data.nama_kecamatan}</span>
            <span className="text-xs">Order Via : </span>
            <ul className="text-xs pl-5">
                <li>DIGIDES</li>
                <li>Toko Pedia</li>
                <li>Grab/Gojek</li>
            </ul>
            <div className="flex gap-x-3 items-center text-sm" style={umkmProdukDesaStyle.penunjukArah}>
                <BsFillSignTurnRightFill />
                <a href={"/dashboard/" + data.map}>Penunjuk Arah</a>
            </div>
        </div>
    </div>
}
export default ProdukCard
