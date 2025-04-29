import { FaMapLocation } from "react-icons/fa6";
import { IAdministrasiCard } from "../../types/administrasi/AdministrasiTypes";
import { cardAdministrationStyle } from "../../utils/themeSetting";

const AdministrasiCard = ({ title, data, dataPerWeek }: IAdministrasiCard) => {
  return (
    <div className="flex justify-between rounded-lg shadow-md p-4">
      <div className="flex gap-x-4 items-center">
        <div style={cardAdministrationStyle} className="bg-cyan-100 rounded-full p-3">
          <FaMapLocation size="30" />
        </div>  
        <div className="flex-col">
          <h3 className="text-sm ">{title}</h3>
          <p className="text-black text-2xl font-semibold">{data} </p>
        </div>
      </div>
      <div className="text-sm text-emerald-400"> +{dataPerWeek}/Minggu</div>
    </div>
  );
};

export default AdministrasiCard;
