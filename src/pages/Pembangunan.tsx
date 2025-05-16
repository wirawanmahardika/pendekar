import { useEffect, useState } from "react";
import PageTitle from "../components/PageTitle";
import TabNavigation from "../components/pembangunan/TabNavigation";
import { APBDesSection } from "../components/pembangunan/APBDesSection";
import ProposalSection from "../components/pembangunan/ProposalSection";
import RKPSection from "../components/pembangunan/RKPSection";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import { BASE_API_URL, getApiToken } from "../utils/api";
import LoadingDots from "../components/LoadingDots";
import useTitle from "../hooks/useTitle";

const Pembangunan = () => {
  useAuth();
  useTitle("Pembangunan")
  const [loading, setLoading] = useState(true);
  const [resultData, setResultData] = useState();
  const [modeKeuangan, setModeKeuangan] = useState("apbdes");
  const [lastUpdated, setLastUpdated] = useState("");
  
  useEffect(() => {
    // dynamic data fetch in here
    axios
      .get(`${BASE_API_URL}keuangan?k3=&k4=`, {
        headers: { Authorization: getApiToken() },
      })
      .then(({ data: result }) => {
        setResultData(result.data);
        setLastUpdated(result.data.last_updated);
      }).finally(() => setLoading(false));

    // Show the correct tab content based on modeKeuangan
    const showTab = (tabId: string) => {
      document.querySelectorAll('[role="tabpanel"]').forEach((panel) => {
        panel.classList.add("hidden");
      });
      const targetPanel = document.getElementById(tabId);
      if (targetPanel) {
        targetPanel.classList.remove("hidden");
      }
    };

    if (modeKeuangan === "apbdes") showTab("bordered-apbd");
    else if (modeKeuangan === "rkp") showTab("bordered-rkp");
    else if (modeKeuangan === "proposal") showTab("bordered-proposal");
  }, [modeKeuangan]);
  if (loading || !resultData) return <LoadingDots />;
  return (
    <div className="px-4 py-10">
      <PageTitle title={"Pembangunan"} last_updated={lastUpdated} />

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-8">
        <div className="p-4">
          <TabNavigation
            modeKeuangan={modeKeuangan}
            setModeKeuangan={setModeKeuangan}
          />

          <APBDesSection resultData={resultData} />
          <RKPSection resultData={resultData} />
          <ProposalSection />
        </div>
      </div>
    </div>
  );
};

export default Pembangunan;
