import { formatDate } from "../../utils/utils/formatter";

const PageTitle = ({ update }: { update: string }) => (
    <div className="mt-3 mb-5 flex justify-between items-center">
        <h1 className="text-blue-500 font-bold text-2xl">PEMBANGUNAN</h1>
        <div>
            <h5>
                <span className="inline-block py-3 px-4 bg-blue-400 text-white rounded-md">
                      Last Update : {formatDate(update)}
                </span>
            </h5>
        </div>
    </div>
);
export default PageTitle