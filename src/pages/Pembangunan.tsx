import PageTitle from "../components/PageTitle";
import TabNavigation from "../components/pembangunan/TabNavigation";
import { APBDesSection } from "../components/pembangunan/APBDesSection";
import ProposalSection from "../components/pembangunan/ProposalSection";
import RKPSection from "../components/pembangunan/RKPSection";
import useAuth from "../hooks/useAuth";
import LoadingDots from "../components/LoadingDots";
import HeadHtml from "../components/HeadHtml";
import usePembangunan from "../hooks/pembangunan/usePembangunan";

const Pembangunan = () => {
  useAuth();
  const { loading, modeKeuangan, dataPembanguan, lastUpdated, setModeKeuangan} = usePembangunan()
  
  if (loading || !dataPembanguan) return <LoadingDots />;
  return (
    <div className="px-4 py-10">
      <HeadHtml title="Pembangunan" />
      <PageTitle title={"Pembangunan"} last_updated={lastUpdated} />

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-8">
        <div className="p-4">
          <TabNavigation
            modeKeuangan={modeKeuangan}
            setModeKeuangan={setModeKeuangan}
          />

          <APBDesSection dataPembangunan={dataPembanguan} />
          <RKPSection dataPembangunan={dataPembanguan} />
          <ProposalSection />
        </div>
      </div>
    </div>
  );
};

export default Pembangunan;
