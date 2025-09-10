import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Polygon, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { CDN_URL, getSlugType } from "../../../utils/api";
import { MapWithPolygonsProps, OptionsType, PolygonDesa, PolygonKec } from "../../../types/DashboardTypes";
import axios from "axios";

const getColorForValue = (value: any, property: OptionsType) => {
  const colorScales = {
    kd: {
      SWASEMBADA: "#03A00A",
      SWAKARYA: "#C00000",
      SWADAYA: "#327A6D",
    },
    idm: ["#03A00A", "#D3D714", "#C00000", "#0D77C3", "#327A6D"],
    sdgs: ["#03A00A", "#D3D714", "#C00000", "#0D77C3", "#0DC3A2", "#327A6D"],
    ar: ["#03A00A", "#D3D714", "#C00000", "#0D77C3", "#0DC3A2", "#327A6D"],
    program: ["#03A00A", "#D3D714", "#C00000", "#0D77C3", "#0DC3A2", "#327A6D"],
    sda: ["#03A00A", "#D3D714", "#C00000", "#0D77C3", "#0DC3A2", "#327A6D"],
    sdm: ["#03A00A", "#D3D714", "#C00000", "#0D77C3", "#0DC3A2", "#327A6D"],
    lk: ["#03A00A", "#D3D714", "#C00000", "#0D77C3", "#0DC3A2", "#327A6D"],
    sarpras: ["#03A00A", "#D3D714", "#C00000", "#0D77C3", "#0DC3A2", "#327A6D"],
  };

  if (colorScales[property]) {
    if (property === "kd") {
      return (
        colorScales[property][
          value as keyof (typeof colorScales)[typeof property]
        ] || "#000000"
      );
    } else {
      const thresholds = {
        idm: [0.491, 0.599, 0.707, 0.815, 999999],
        sdgs: [10, 20, 30, 50, 80, 999999],
        ar: [0, 3, 5, 8, 10, 999999],
        program: [0, 3, 5, 8, 10, 999999],
        sda: [0, 3, 5, 8, 10, 999999],
        sdm: [100, 500, 1000, 3000, 5000, 999999],
        lk: [0, 3, 5, 8, 10, 999999],
        sarpras: [0, 3, 5, 8, 10, 999999],
      };

      const thresholdArray = thresholds[property];
      const colorScale = colorScales[property];

      for (let i = 0; i < thresholdArray.length; i++) {
        if (value <= thresholdArray[i]) {
          return colorScale[i];
        }
      }
      return colorScale[colorScale.length - 1];
    }
  }
  return "#000000";
};

const MapWithPolygons: React.FC<MapWithPolygonsProps> = ({
  resultData,
  selectedOption,
}) => {
  const [polygonCoordKab, setPolygonCoordKab] = useState<any[]>([]);
  const [polygonCoordKec, setPolygonCoordKec] = useState<PolygonKec[]>([]);
  const [polygonCoordDesa, setPolygonCoordDesa] = useState<PolygonDesa[]>([]);

  const fetchDataMap = async (url: string) => {
    try {
      const { data: response } = await axios.get(url);

      if (!response || response.status === 404) {
        console.error("Data not found or URL is empty");
        return [];
      }

      const responseData = response as any;

      if (
        responseData &&
        responseData.features &&
        responseData.features.length > 0
      ) {
        const mapPolygon: any[] = [];
        const coordinates = responseData.features[0].geometry.coordinates;

        if (coordinates && coordinates.length > 0) {
          if (responseData.features[0].geometry.type === "MultiPolygon") {
            coordinates.forEach((coords: any) => {
              const polygon: [number, number][] = [];
              coords[0].forEach((coord: [number, number]) => {
                polygon.push([coord[1], coord[0]]);
              });
              mapPolygon.push(polygon);
            });
          } else {
            coordinates[0].forEach((item: [number, number]) => {
              mapPolygon.push([item[1], item[0]]);
            });
          }
        } else {
          console.error("Coordinates are empty or missing");
          return [];
        }

        return mapPolygon;
      } else {
        console.error("Response data is empty or missing expected structure");
        return [];
      }
    } catch (error) {
      console.error("Error:", error);
      return [];
    }
  };

  useEffect(() => {
    if (!resultData) return;

    const fetchDataMapKab = (k1: string, k2: string) =>
      fetchDataMap(`${CDN_URL}statics/geojson/${k1}/${k2}.json`);

    const fetchDataMapKec = (k1: string, k2: string, k3: string) =>
      fetchDataMap(`${CDN_URL}statics/geojson/${k1}/${k2}/${k3}.json`);

    const fetchDataMapDesa = (k1: string, k2: string, k3: string, k4: string) =>
      fetchDataMap(`${CDN_URL}statics/geojson/${k1}/${k2}/${k3}/${k4}.json`);

    // Process desa data
    if (resultData?.list_desa) {
      const isKecamatan = getSlugType() === "kecamatan";
      const kecamatanKode = resultData?.dss?.k3;

      // Filter desa based on kecamatan code if in kecamatan mode
      const filteredDesa = isKecamatan
        ? resultData.list_desa.filter((item: any) => item.k3 === kecamatanKode)
        : resultData.list_desa;

      if (filteredDesa.length === 0 && isKecamatan) {
        console.error(`No matching desa for kecamatan ${kecamatanKode}`);
      }

      // Process filtered desa
      const newPolygonCoordDesa = filteredDesa.map(async (item: any) => {
        let mapPolygonResponse = null;
        if (item.k1 && item.k2 && item.k3 && item.k4) {
          mapPolygonResponse = await fetchDataMapDesa(
            item.k1,
            item.k2,
            item.k3,
            item.k4,
          );
        }

        // Extract potensi data
        const potensiData = {
          sda: {
            perikanan: parseInt(item.sda_perikanan) || 0,
            pertanian: parseInt(item.sda_pertanian) || 0,
            perkebunan: parseInt(item.sda_perkebunan) || 0,
          },
          sdm: parseInt(item.sdm_total) || 0,
          lk: parseInt(item.lk_total) || 0,
          sarpras: {
            ibadah: parseInt(item.sarpras_ibadah) || 0,
            sekolah: parseInt(item.sarpras_sekolah) || 0,
            umum: parseInt(item.sarpras_umum) || 0,
          },
        };

        return {
          provinsi: resultData.dss?.provinsi,
          kabupaten: resultData.dss?.kabkota,
          kecamatan: item.nama_kecamatan,
          deskel: item.nama_deskel,
          link: item.slug_desa,
          ar: item.capaian?.ar,
          idm: parseFloat(item.skor_idm) || 0,
          kd: item.capaian?.kd,
          program: item.capaian?.program,
          sdgs: parseFloat(item.sdgs_total) || 0,
          sda:
            potensiData.sda.perikanan +
            potensiData.sda.pertanian +
            potensiData.sda.perkebunan,
          sdm: potensiData.sdm,
          lk: potensiData.lk,
          sarpras:
            potensiData.sarpras.ibadah +
            potensiData.sarpras.sekolah +
            potensiData.sarpras.umum,
          potensiData: potensiData,
          polyDes: mapPolygonResponse,
        };
      });

      Promise.all(newPolygonCoordDesa)
        .then((completedPolygonCoordDesa) => {
          setPolygonCoordDesa(completedPolygonCoordDesa);
        })
        .catch((error) => {
          console.error("Error fetching desa data:", error);
        });
    }

    // Process kecamatan data
    if (resultData?.list_kecamatan) {
      const isKecamatan = getSlugType() === "kecamatan";
      const kecamatanData = resultData.list_kecamatan;

      if (isKecamatan) {
        const kecamatanKode = resultData?.dss?.k3;

        if (kecamatanKode && kecamatanKode !== "00") {
          const filteredKecamatan = kecamatanData.filter(
            (item: any) => item.k3 === kecamatanKode,
          );

          if (filteredKecamatan.length > 0) {
            const promises = filteredKecamatan.map(async (item: any) => {
              const mapPolygonData = await fetchDataMapKec(
                item.k1,
                item.k2,
                item.k3,
              );
              return {
                polyKec: mapPolygonData,
                nama_kecamatan: item.nama_kecamatan,
              };
            });

            Promise.all(promises)
              .then((newPolygonCoordKec) => {
                setPolygonCoordKec(newPolygonCoordKec);
              })
              .catch((error) => {
                console.error("Error fetching kecamatan data:", error);
              });
          } else {
            console.error(`No matching kecamatan with code ${kecamatanKode}`);
          }
        } else {
          console.error("Kecamatan code not found or invalid.");
        }
      } else {
        // Kabupaten mode: Show all kecamatan
        const promises = kecamatanData.map(async (item: any) => {
          const mapPolygonData = await fetchDataMapKec(
            item.k1,
            item.k2,
            item.k3,
          );
          return {
            polyKec: mapPolygonData,
            nama_kecamatan: item.nama_kecamatan,
          };
        });

        Promise.all(promises)
          .then((newPolygonCoordKec) => {
            setPolygonCoordKec(newPolygonCoordKec);
          })
          .catch((error) => {
            console.error("Error fetching all kecamatan data:", error);
          });
      }
    }

    // Process kabupaten data
    if (resultData?.list_kabupaten && resultData.list_kabupaten.length > 0) {
      const newPolygonCoordKab = resultData.list_kabupaten[0];

      if (
        newPolygonCoordKab &&
        newPolygonCoordKab.k1 &&
        newPolygonCoordKab.k2
      ) {
        fetchDataMapKab(newPolygonCoordKab.k1, newPolygonCoordKab.k2)
          .then((polygonData) => {
            setPolygonCoordKab(polygonData);
          })
          .catch((error) => {
            console.error("Error fetching kabupaten data:", error);
          });
      } else {
        console.error(
          "Invalid data for kabupaten fetch. Missing 'k1' or 'k2'.",
        );
      }
    }
  }, [resultData]);

  const kabOptions = {
    color: "white",
    fillColor: "#D4DCC2",
    weight: 2,
    fillOpacity: 1,
  };

  const kecOptions = {
    color: "white",
    fillColor: "#D4DCC2",
    weight: 1,
    fillOpacity: 1,
  };

  const desaOptions = {
    color: "white",
    fillColor: "#C00000",
    weight: 1,
    fillOpacity: 1,
  };

  // Format potensi data for visualization
  const formatPotensiData = (data: PolygonDesa) => {
    if (!data) return null;

    const potensiData = {
      sda: {
        perikanan: data.potensiData?.sda?.perikanan || 0,
        pertanian: data.potensiData?.sda?.pertanian || 0,
        perkebunan: data.potensiData?.sda?.perkebunan || 0,
      },
      sdm: data.potensiData?.sdm || 0,
      lk: data.potensiData?.lk || 0,
      sarpras: {
        ibadah: data.potensiData?.sarpras?.ibadah || 0,
        sekolah: data.potensiData?.sarpras?.sekolah || 0,
        umum: data.potensiData?.sarpras?.umum || 0,
      },
    };

    return potensiData;
  };

  return (
    <>
      {polygonCoordKab && polygonCoordKab.length > 0 && (
        <MapContainer
          zoom={10}
          scrollWheelZoom={false}
          style={{ height: "500px", width: "100%" }}
          bounds={
            polygonCoordKec.length > 0
              ? polygonCoordKec.map(({ polyKec }) => polyKec)
              : polygonCoordKab || [
                  [-90, -180],
                  [90, 180],
                ]
          }
        >
          <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png" />

          {/* Kabupaten polygon when no kecamatan is active */}
          {polygonCoordKec.length === 0 && (
            <Polygon positions={polygonCoordKab} pathOptions={kabOptions} />
          )}

          {/* Kecamatan polygons */}
          {polygonCoordKec.length > 0 &&
            polygonCoordKec.map(({ polyKec }, index) => (
              <Polygon
                key={`kec-${index}`}
                positions={polyKec}
                pathOptions={kecOptions}
              />
            ))}

          {/* Desa polygons */}
          {polygonCoordDesa.map((data, index) => {
            const {
              polyDes,
              provinsi,
              kabupaten,
              kecamatan,
              deskel,
              link,
              kd,
              idm,
              sdgs,
              ar,
              program,
              sda,
              sdm,
              lk,
              sarpras,
            } = data;

            // Get appropriate value based on selected option
            const capaianValue =
              selectedOption === "kd"
                ? kd
                : selectedOption === "idm"
                  ? idm
                  : selectedOption === "sdgs"
                    ? sdgs
                    : selectedOption === "ar"
                      ? ar
                      : selectedOption === "program"
                        ? program
                        : selectedOption === "sda"
                          ? sda
                          : selectedOption === "sdm"
                            ? sdm
                            : selectedOption === "lk"
                              ? lk
                              : selectedOption === "sarpras"
                                ? sarpras
                                : 0;

            const desaColor = getColorForValue(capaianValue, selectedOption);
            const desaPathOptions = { ...desaOptions, fillColor: desaColor };

            const formattedPotensiData = formatPotensiData(data);
            if (formattedPotensiData)
              return (
                <Polygon
                  key={`desa-${index}`}
                  positions={polyDes}
                  pathOptions={desaPathOptions}
                >
                  <Popup maxWidth={400}>
                    <div className="w-full min-w-[320px] md:min-w-[380px]">
                      <div className="space-y-3">
                        <div className="flex justify-between items-start mb-3">
                          <div className="w-3/4 pr-2">
                            <h5 className="text-lg font-bold">Desa {deskel}</h5>
                            <p className="capitalize text-sm text-gray-600">
                              Kec. {kecamatan},{" "}
                              {kabupaten?.toString().toLowerCase()}, Prov.{" "}
                              {provinsi?.toString().toLowerCase()}
                            </p>
                          </div>

                          {/* Link CCTV di sudut kanan */}
                          <div className="shrink-0">
                            <a
                              href={`https://${link}.digitaldesa.id`}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-block"
                            >
                              <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                                  />
                                </svg>
                                CCTV
                              </span>
                            </a>
                          </div>
                        </div>

                        {/* Grid konten capaian dan potensi */}
                        <div className="grid grid-cols-2 gap-6 mt-4">
                          <div className="font-bold">
                            <h5 className="font-bold mb-2">Capaian</h5>
                            <div className="grid grid-cols-6 gap-y-1 text-sm">
                              <div className="col-span-2">KD</div>
                              <div className="col-span-4">: {kd || "N/A"}</div>
                              <div className="col-span-2">IDM</div>
                              <div className="col-span-4">
                                : {idm?.toFixed(3) || "N/A"}
                              </div>
                              <div className="col-span-2">SDGs</div>
                              <div className="col-span-4">
                                : {sdgs || "N/A"}
                              </div>
                              <div className="col-span-2">AR</div>
                              <div className="col-span-4">: {ar || "N/A"}</div>
                              <div className="col-span-2">Program</div>
                              <div className="col-span-4">
                                : {program || "N/A"}
                              </div>
                            </div>
                          </div>
                          <div className="font-bold">
                            <h5 className="font-bold mb-2">Potensi</h5>
                            <div className="grid grid-cols-6 gap-y-1 text-sm">
                              <div className="col-span-2">SDA</div>
                              <div className="col-span-4">: {sda || "N/A"}</div>
                              <div className="col-span-2">SDM</div>
                              <div className="col-span-4">: {sdm || "N/A"}</div>
                              <div className="col-span-2">LK</div>
                              <div className="col-span-4">: {lk || "N/A"}</div>
                              <div className="col-span-2">SarPras</div>
                              <div className="col-span-4">
                                : {sarpras || "N/A"}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Popup>
                </Polygon>
              );
          })}
        </MapContainer>
      )}
    </>
  );
};

export default MapWithPolygons;
