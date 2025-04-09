import { useMemo, useState } from "react";
import { FaMapLocation } from "react-icons/fa6";
import { getSlugType, KODE_SLUG } from "../../utils/api";

const AdministrasiDataCard = (props: any) => {
  const { listKecamatan, listDesa } = props.administraionData.data;
  const [selectedDesa, setSelectedDesa] = useState("");

  const [selectedKec, setSelectedKec] = useState(
    getSlugType() === "kecamatan"
      ? listKecamatan.find(
          (kec: any) =>
            kec.nama_kecamatan.toLowerCase() ===
            KODE_SLUG.split("-")[0].toLowerCase()
        )?.kode_wilayah || ""
      : ""
  );

  const FilteredDesa = useMemo(() => {
    setSelectedDesa("");
    if (selectedKec) {
      return listDesa.filter((desa: any) =>
        desa.kode_wilayah.startsWith(selectedKec)
      );
    }
    return [];
  }, [listDesa, selectedKec]);

  const filteredKec = useMemo(() => {
    if (getSlugType() === "kecamatan") {
      const kecamatanName = KODE_SLUG.split("-")[0];
      return listKecamatan.filter(
        (kec: any) =>
          kec.nama_kecamatan.toLowerCase() === kecamatanName.toLowerCase()
      );
    }
    return listKecamatan;
  }, [listKecamatan]);

  const dataAdministrasi = useMemo(() => {
    let buku_peraturan_di_desa = 0;
    let buku_peraturan_di_desa_add = 0;
    let buku_keputusan_kepala_desa = 0;
    let buku_keputusan_kepala_desa_add = 0;
    let buku_inventaris_dan_kekayaan_desa = 0;
    let buku_inventaris_dan_kekayaan_desa_add = 0;
    let buku_aparat_pemerintah_desa = 0;
    let buku_aparat_pemerintah_desa_add = 0;
    let buku_tanah_kas_desa = 0;
    let buku_tanah_kas_desa_add = 0;
    let buku_tanah_di_desa = 0;
    let buku_tanah_di_desa_add = 0;
    let buku_agenda = 0;
    let buku_agenda_add = 0;
    let buku_ekspedisi = 0;
    let buku_ekspedisi_add = 0;
    let buku_lembaran_desa_dan_berita_desa = 0;
    let buku_lembaran_desa_dan_berita_desa_add = 0;

    if (selectedKec && selectedDesa) {
      const deskel = listDesa.find(
        (desa: any) => desa.kode_wilayah === selectedDesa
      );
      if (deskel) {
        buku_peraturan_di_desa = parseInt(deskel.buku_peraturan_di_desa);
        buku_peraturan_di_desa_add = parseInt(
          deskel.buku_peraturan_di_desa_add
        );
        buku_keputusan_kepala_desa = parseInt(
          deskel.buku_keputusan_kepala_desa
        );
        buku_keputusan_kepala_desa_add = parseInt(
          deskel.buku_keputusan_kepala_desa_add
        );
        buku_inventaris_dan_kekayaan_desa = parseInt(
          deskel.buku_inventaris_dan_kekayaan_desa
        );
        buku_inventaris_dan_kekayaan_desa_add = parseInt(
          deskel.buku_inventaris_dan_kekayaan_desa_add
        );
        buku_aparat_pemerintah_desa = parseInt(
          deskel.buku_aparat_pemerintah_desa
        );
        buku_aparat_pemerintah_desa_add = parseInt(
          deskel.buku_aparat_pemerintah_desa_add
        );
        buku_tanah_kas_desa = parseInt(deskel.buku_tanah_kas_desa);
        buku_tanah_kas_desa_add = parseInt(deskel.buku_tanah_kas_desa_add);
        buku_tanah_di_desa = parseInt(deskel.buku_tanah_di_desa);
        buku_tanah_di_desa_add = parseInt(deskel.buku_tanah_di_desa_add);
        buku_agenda = parseInt(deskel.buku_agenda);
        buku_agenda_add = parseInt(deskel.buku_agenda_add);
        buku_ekspedisi = parseInt(deskel.buku_ekspedisi);
        buku_ekspedisi_add = parseInt(deskel.buku_ekspedisi_add);
        buku_lembaran_desa_dan_berita_desa = parseInt(
          deskel.buku_lembaran_desa_dan_berita_desa
        );
        buku_lembaran_desa_dan_berita_desa_add = parseInt(
          deskel.buku_lembaran_desa_dan_berita_desa_add
        );
      }
    } else {
      if (selectedKec) {
        listDesa.forEach((desa: any) => {
          buku_peraturan_di_desa += parseInt(desa.buku_peraturan_di_desa);
          buku_peraturan_di_desa_add += parseInt(
            desa.buku_peraturan_di_desa_add
          );
          buku_keputusan_kepala_desa += parseInt(
            desa.buku_keputusan_kepala_desa
          );
          buku_keputusan_kepala_desa_add += parseInt(
            desa.buku_keputusan_kepala_desa_add
          );
          buku_inventaris_dan_kekayaan_desa += parseInt(
            desa.buku_inventaris_dan_kekayaan_desa
          );
          buku_inventaris_dan_kekayaan_desa_add += parseInt(
            desa.buku_inventaris_dan_kekayaan_desa_add
          );
          buku_aparat_pemerintah_desa += parseInt(
            desa.buku_aparat_pemerintah_desa
          );
          buku_aparat_pemerintah_desa_add += parseInt(
            desa.buku_aparat_pemerintah_desa_add
          );
          buku_tanah_kas_desa += parseInt(desa.buku_tanah_kas_desa);
          buku_tanah_kas_desa_add += parseInt(desa.buku_tanah_kas_desa_add);
          buku_tanah_di_desa += parseInt(desa.buku_tanah_di_desa);
          buku_tanah_di_desa_add += parseInt(desa.buku_tanah_di_desa_add);
          buku_agenda += parseInt(desa.buku_agenda);
          buku_agenda_add += parseInt(desa.buku_agenda_add);
          buku_ekspedisi += parseInt(desa.buku_ekspedisi);
          buku_ekspedisi_add += parseInt(desa.buku_ekspedisi_add);
          buku_lembaran_desa_dan_berita_desa += parseInt(
            desa.buku_lembaran_desa_dan_berita_desa
          );
          buku_lembaran_desa_dan_berita_desa_add += parseInt(
            desa.buku_lembaran_desa_dan_berita_desa_add
          );
        });
      } else {
        listDesa.forEach((desa: any) => {
          buku_peraturan_di_desa += parseInt(desa.buku_peraturan_di_desa);
          buku_peraturan_di_desa_add += parseInt(
            desa.buku_peraturan_di_desa_add
          );
          buku_keputusan_kepala_desa += parseInt(
            desa.buku_keputusan_kepala_desa
          );
          buku_keputusan_kepala_desa_add += parseInt(
            desa.buku_keputusan_kepala_desa_add
          );
          buku_inventaris_dan_kekayaan_desa += parseInt(
            desa.buku_inventaris_dan_kekayaan_desa
          );
          buku_inventaris_dan_kekayaan_desa_add += parseInt(
            desa.buku_inventaris_dan_kekayaan_desa_add
          );
          buku_aparat_pemerintah_desa += parseInt(
            desa.buku_aparat_pemerintah_desa
          );
          buku_aparat_pemerintah_desa_add += parseInt(
            desa.buku_aparat_pemerintah_desa_add
          );
          buku_tanah_kas_desa += parseInt(desa.buku_tanah_kas_desa);
          buku_tanah_kas_desa_add += parseInt(desa.buku_tanah_kas_desa_add);
          buku_tanah_di_desa += parseInt(desa.buku_tanah_di_desa);
          buku_tanah_di_desa_add += parseInt(desa.buku_tanah_di_desa_add);
          buku_agenda += parseInt(desa.buku_agenda);
          buku_agenda_add += parseInt(desa.buku_agenda_add);
          buku_ekspedisi += parseInt(desa.buku_ekspedisi);
          buku_ekspedisi_add += parseInt(desa.buku_ekspedisi_add);
          buku_lembaran_desa_dan_berita_desa += parseInt(
            desa.buku_lembaran_desa_dan_berita_desa
          );
          buku_lembaran_desa_dan_berita_desa_add += parseInt(
            desa.buku_lembaran_desa_dan_berita_desa_add
          );
        });
      }
    }

    return {
      buku_peraturan_di_desa,
      buku_peraturan_di_desa_add,
      buku_keputusan_kepala_desa,
      buku_keputusan_kepala_desa_add,
      buku_inventaris_dan_kekayaan_desa,
      buku_inventaris_dan_kekayaan_desa_add,
      buku_aparat_pemerintah_desa,
      buku_aparat_pemerintah_desa_add,
      buku_tanah_kas_desa,
      buku_tanah_kas_desa_add,
      buku_tanah_di_desa,
      buku_tanah_di_desa_add,
      buku_agenda,
      buku_agenda_add,
      buku_ekspedisi,
      buku_ekspedisi_add,
      buku_lembaran_desa_dan_berita_desa,
      buku_lembaran_desa_dan_berita_desa_add,
    };
  }, [listDesa, listDesa, selectedDesa, selectedKec]);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="mb-4 flex justify-between items-center"></div>
      <div className="flex gap-x-5 pt-2">
        {getSlugType() !== "kecamatan" && (
          <select
            onChange={(e) => setSelectedKec(e.target.value)}
            value={selectedKec}
            className="focus:border-blue-400 focus:shadow border text-sm border-slate-300 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-1"
          >
            <option value="">Semua Kecamatan</option>
            {filteredKec.map((item: any) => (
              <option key={item.kode_wilayah} value={item.kode_wilayah}>
                {item.nama_kecamatan}
              </option>
            ))}
          </select>
        )}

        <select
          onChange={(e) => setSelectedDesa(e.target.value)}
          className="focus:border-blue-400 focus:shadow border text-sm border-slate-300 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-1"
        >
          <option value="">Semua Desa</option>
          {listDesa.map((item: any) => {
            return (
              <option
                key={item.kode_wilayah}
                value={item.kode_wilayah}
                selected={selectedDesa == item.kode_wilayah}
              >
                {item.nama_deskel}
              </option>
            );
          })}
        </select>
      </div>

      {/* //card */}
      <div className="pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="flex justify-between rounded-lg shadow-md p-4">
          <div className="flex gap-x-4 items-center">
            <div className="bg-cyan-100 rounded-full p-3">
              <FaMapLocation size="30" className="text-cyan-600" />
            </div>
            <div className="flex-col">
              <h3 className="text-sm ">Peraturan Desa</h3>
              <p className="text-black text-2xl font-semibold">10</p>
            </div>
          </div>
          <div className="text-sm text-emerald-400">+100/Minggu</div>
        </div>
      </div>
    </div>
  );
};

export default AdministrasiDataCard;
