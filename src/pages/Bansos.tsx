import PageTitle from "../components/PageTitle";
import useAuth from "../hooks/useAuth";
import PendudukMendapatBantuan from "../components/bansos/PendudukMendapatBantuan";
import RekapPenerimaBantuanSosial from "../components/bansos/RekapPenerimaBantuanSosial";
import LoadingDots from "../components/LoadingDots";
import HeadHtml from "../components/HeadHtml";
import useBansos from "../hooks/bansos/useBansos";

export default function Bansos() {
  useAuth()
  const { loading, bansosData } = useBansos()
  if (loading) return <LoadingDots />

  return <div className="px-4 py-10">
    <HeadHtml title="Bansos" />
    <PageTitle title="Bantuan Sosial" last_updated={bansosData?.last_updated} />
    <PendudukMendapatBantuan resultData={bansosData} />
    <RekapPenerimaBantuanSosial resultData={bansosData} />
  </div>
}
