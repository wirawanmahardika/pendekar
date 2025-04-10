import { useEffect, useState } from "react";
import PageTitle from "../components/PageTitle";
import TabNavigation from "../components/pembangunan/TabNavigation";
import { APBDesSection } from "../components/pembangunan/APBDesSection";
import ProposalSection from "../components/pembangunan/ProposalSection";
import RKPSection from "../components/pembangunan/RKPSection";
import useTitle from "../hooks/useTitle";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import { BASE_API_URL, getApiToken } from "../utils/api";

// Mock data for preview purposes (optional)
const mockResultData = {
  tahun: "2023",
  last_updated: "2023-07-15",
  apbd: {
    desa: 245,
    anggaran: 245000000000,
    realisasi: 198000000000,
    penyerapan: 80,
  },
  list_kecamatan: Array(15)
    .fill(null)
    .map((_, index) => ({
      kode_wilayah: `3.${Math.floor(index / 10) + 1}.${(index % 10) + 1}`,
      nama_kecamatan: `Kecamatan ${index + 1}`,
      anggaran_2021: Math.floor(Math.random() * 10000000000) + 5000000000,
      anggaran_2022: Math.floor(Math.random() * 15000000000) + 8000000000,
      anggaran_2023: Math.floor(Math.random() * 20000000000) + 10000000000,
      realisasi_2023: Math.floor(Math.random() * 15000000000) + 5000000000,
      sisa_2023: Math.floor(Math.random() * 5000000000) + 1000000000,
      k1: 3,
      k2: Math.floor(index / 10) + 1,
      k3: (index % 10) + 1,
    })),
  list_desa: Array(30)
    .fill(null)
    .map((_, index) => ({
      kode_wilayah: `3.${Math.floor(index / 10) + 1}.${(index % 10) + 1}.${index + 1}`,
      nama_deskel: `Desa ${index + 1}`,
      k1: 3,
      k2: Math.floor(index / 10) + 1,
      k3: (index % 10) + 1,
      k4: index + 1,
    })),
  list_rkpdes: Array(30)
    .fill(null)
    .map((_, index) => ({
      nama_kecamatan: `Kecamatan ${Math.floor(index / 5) + 1}`,
      nama_deskel: `Desa ${index + 1}`,
      nama_proyek: `Proyek Pembangunan ${index + 1}`,
      lokasi: `Lokasi ${index + 1}`,
      biaya: Math.floor(Math.random() * 500000000) + 100000000,
      manfaat: "Peningkatan Infrastruktur",
      tahun: "2023",
      pelaksana: "Pemda",
      kode_wilayah: `3.${Math.floor(index / 10) + 1}.${(index % 10) + 1}.${index + 1}`,
      k1: 3,
      k2: Math.floor(index / 10) + 1,
      k3: (index % 10) + 1,
      k4: index + 1,
    })),
};

const Pembangunan = () => {
  useAuth();
  const [resultData, setResultData] = useState(mockResultData);
  const [modeKeuangan, setModeKeuangan] = useState("apbdes");

  useTitle("Pembangunan");
  useEffect(() => {
    // dynamic data fetch in here
    axios
      .get(`${BASE_API_URL}keuangan?k3=&k4=`, {
        headers: { Authorization: getApiToken() },
      })
      .then(({ data }) => {
        setResultData(data.data);
      });

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

  return (
    <div className="px-4 py-10">
      <PageTitle title={"Pembangunan"} />

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
