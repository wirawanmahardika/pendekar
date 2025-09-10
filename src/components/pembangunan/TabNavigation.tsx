
const TabNavigation = ({ modeKeuangan, setModeKeuangan }: {
  modeKeuangan: string;
  setModeKeuangan: (mode: string) => void;
}) => (
  <ul className="flex border-b mb-4" id="borderedTab" role="tablist">
    <li className="mr-2" role="presentation">
      <button
        className={`py-2 px-4 font-bold transition-colors ${
          modeKeuangan === "apbdes"
            ? `text-blue-600 border-b-2 border-blue-600`
            : "text-gray-500"
        }`}
        onClick={() => setModeKeuangan("apbdes")}
        id="apbd-tab"
        type="button"
        role="tab"
        aria-controls="apbd"
        aria-selected={modeKeuangan === "apbdes"}
      >
        APBDes
      </button>
    </li>
    <li className="hidden" role="presentation">
      <button
        className="py-2 px-4 font-bold text-gray-500"
        id="proposal-tab"
        type="button"
        role="tab"
        aria-controls="proposal"
        aria-selected="false"
      >
        PROPOSAL
      </button>
    </li>
    <li className="mr-2" role="presentation">
      <button
        className={`py-2 px-4 font-bold transition-colors ${
          modeKeuangan === "rkp"
            ? `text-blue-600 border-b-2 border-blue-600`
            : "text-gray-500"
        }`}
        onClick={() => setModeKeuangan("rkp")}
        id="rkp-tab"
        type="button"
        role="tab"
        aria-controls="rkp"
        aria-selected={modeKeuangan === "rkp"}
      >
        RKP
      </button>
    </li>
  </ul>
);

export default TabNavigation;