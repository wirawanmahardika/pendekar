import { useState } from "react";
import ExportReportButton from "../components/ExportReportButton";
import PageTitle from "../components/PageTitle";
import { tableHeaderStyle, tabNavigationStyle } from "../utils/themeSetting";
import ReactECharts from 'echarts-for-react';
import { BiSearch } from "react-icons/bi";
import useAuth from "../hooks/useAuth";

type chartTypes = 'umur' | 'pendidikan' | 'perkawinan' | 'agama' | 'pekerjaan'

export default function Kependudukan() {
    useAuth()
    const [chartType, setChartType] = useState<chartTypes>('umur')
    const changeChart = (type: chartTypes) => {
        setChartType(type)
    }

    return <div className="px-4 py-10">
        <PageTitle title="ADMINISTRASI KEPENDUDUKAN" />

        <div className="p-5 bg-white rounded shadow flex flex-col">
            <div className="flex justify-between items-center">
                <span className="font-bold text-xl">Statistik Data Penduduk</span>
                <ExportReportButton />
            </div>

            <div className="flex gap-x-5 pt-2">
                <select name="" className="focus:border-blue-400 focus:shadow border text-sm bg-white border-slate-300 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-1">
                    <option value="">Semua Kecamatan</option>
                    <option value="">Semua Kecamatan</option>
                    <option value="">Semua Kecamatan</option>
                </select>

                <select name="" className="focus:border-blue-400 focus:shadow border text-sm bg-white border-slate-300 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-1">
                    <option value="">Semua Desa</option>
                    <option value="">Semua Desa</option>
                    <option value="">Semua Desa</option>
                </select>
            </div>

            <TabNavigation setChartType={changeChart} />
            <BarChart type={chartType} />
        </div>

        <div className="p-4 bg-white rounded shadow mt-8">
            <div className="flex items-center justify-between">
                <h2 className="font-bold text-xl">Rekap Kependudukan</h2>
                <ExportReportButton />
            </div>
            <div className="flex gap-x-5 pt-2">
                <div className="flex relative">
                    <input type="text" placeholder="Cari Desa/Kelurahan..." className="focus:border-blue-400 focus:shadow border text-sm border-slate-300 rounded text-neutral-600 w-full outline-none pl-2 pr-10 py-1" />
                    <BiSearch className="absolute right-2 top-1/2 -translate-y-1/2 size-6 fill-slate-600" />
                </div>

                <select name="" className="focus:border-blue-400 focus:shadow border text-sm border-slate-300 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-1">
                    <option value="">Semua Kecamatan</option>
                    <option value="">Semua Kecamatan</option>
                    <option value="">Semua Kecamatan</option>
                </select>

                <select name="" className="focus:border-blue-400 focus:shadow border text-sm border-slate-300 rounded text-neutral-600 w-1/4 outline-none pl-2 pr-4 py-1">
                    <option value="">Semua Desa</option>
                    <option value="">Semua Desa</option>
                    <option value="">Semua Desa</option>
                </select>
            </div>

            <table className="overflow-x-auto min-w-full mt-5 text-neutral-700 text-center">
                <thead>
                    <tr style={tableHeaderStyle}>
                        <th className="p-2 border border-gray-300">No</th>
                        <th className="p-2 border border-gray-300">Kecamatan</th>
                        <th className="p-2 border border-gray-300">Desa</th>
                        <th className="p-2 border border-gray-300">Laki-Laki</th>
                        <th className="p-2 border border-gray-300">Perempuan</th>
                        <th className="p-2 border border-gray-300">Jumlah Penduduk</th>
                        <th className="p-2 border border-gray-300">Jumlah KK</th>
                        <th className="p-2 border border-gray-300">Wajib KTP</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="p-2 border border-gray-300">1</td>
                        <td className="p-2 border border-gray-300">Sandai</td>
                        <td className="p-2 border border-gray-300">Alam Pakuan</td>
                        <td className="p-2 border border-gray-300">0</td>
                        <td className="p-2 border border-gray-300">0</td>
                        <td className="p-2 border border-gray-300">0</td>
                        <td className="p-2 border border-gray-300">0</td>
                        <td className="p-2 border border-gray-300">0</td>
                    </tr>
                    <tr>
                        <td className="p-2 border border-gray-300">2</td>
                        <td className="p-2 border border-gray-300">Sandai</td>
                        <td className="p-2 border border-gray-300">Alam Pakuan</td>
                        <td className="p-2 border border-gray-300">0</td>
                        <td className="p-2 border border-gray-300">0</td>
                        <td className="p-2 border border-gray-300">0</td>
                        <td className="p-2 border border-gray-300">0</td>
                        <td className="p-2 border border-gray-300">0</td>
                    </tr>
                    <tr>
                        <td className="p-2 border border-gray-300">3</td>
                        <td className="p-2 border border-gray-300">Sandai</td>
                        <td className="p-2 border border-gray-300">Alam Pakuan</td>
                        <td className="p-2 border border-gray-300">0</td>
                        <td className="p-2 border border-gray-300">0</td>
                        <td className="p-2 border border-gray-300">0</td>
                        <td className="p-2 border border-gray-300">0</td>
                        <td className="p-2 border border-gray-300">0</td>
                    </tr>
                </tbody>
            </table>


            <div className="flex mt-4 justify-center">
                <div className="join">
                    <button className="join-item btn bg-white text-gray-800">{"<<"}</button>
                    <button className="join-item btn bg-white text-gray-800">1</button>
                    <button className="join-item btn bg-white text-gray-800">...</button>
                    <button className="join-item btn bg-white text-gray-800">9</button>
                    <button className="join-item btn bg-white text-gray-800">{">>"}</button>
                </div>
            </div>
        </div>
    </div>
}

const TabNavigation = ({ setChartType }: { setChartType: (tabName: chartTypes) => void }) => {
    const [currentTab, setCurrentTab] = useState('umur')
    const changeTab = (tabName: chartTypes) => () => {
        setCurrentTab(tabName)
        setChartType(tabName)
    }


    return <div className="grid grid-cols-5 mt-5" >
        <span onClick={changeTab('umur')} style={currentTab === 'umur' ? tabNavigationStyle : {}} className="transition-all cursor-pointer border-gray-500 border-b-2 text-lg font-semibold text-gray-500 text-center">Umur</span>
        <span onClick={changeTab('pendidikan')} style={currentTab === 'pendidikan' ? tabNavigationStyle : {}} className="transition-all cursor-pointer border-gray-500 border-b-2 text-lg font-semibold text-gray-500 text-center">Pendidikan</span>
        <span onClick={changeTab('pekerjaan')} style={currentTab === 'pekerjaan' ? tabNavigationStyle : {}} className="transition-all cursor-pointer border-gray-500 border-b-2 text-lg font-semibold text-gray-500 text-center">Pekerjaan</span>
        <span onClick={changeTab('perkawinan')} style={currentTab === 'perkawinan' ? tabNavigationStyle : {}} className="transition-all cursor-pointer border-gray-500 border-b-2 text-lg font-semibold text-gray-500 text-center">Perkawinan</span>
        <span onClick={changeTab('agama')} style={currentTab === 'agama' ? tabNavigationStyle : {}} className="transition-all cursor-pointer border-gray-500 border-b-2 text-lg font-semibold text-gray-500 text-center">Agama</span>
    </div>
}

const getBarChartOption = (type: chartTypes) => {
    const baseOption = {
        xAxis: { type: "category", data: ["A", "B", "C", "D", "E"] },
        yAxis: { type: "value" },
        series: [{ type: "bar", data: [10, 20, 15, 30, 25] }],
    };

    switch (type) {
        case "umur":
            return baseOption;
        case "pendidikan":
            return {
                ...baseOption,
                series: [{ type: "bar", data: [10, 20, 30, 40, 50], stack: "group1" },
                { type: "bar", data: [5, 15, 25, 35, 45], stack: "group1" }],
            };
        case "pekerjaan":
            return {
                ...baseOption,
                xAxis: { type: "value" },
                yAxis: { type: "category", data: ["A", "B", "C", "D", "E"] },
            };
        case "perkawinan":
            return {
                ...baseOption,
                series: [
                    { type: "bar", data: [10, 20, 30, 40, 50], name: "Group 1" },
                    { type: "bar", data: [15, 25, 35, 45, 55], name: "Group 2" },
                ],
            };
        case "agama":
            return {
                ...baseOption,
                series: [{
                    type: "bar",
                    data: [10, 20, 30, 40, 50],
                    itemStyle: {
                        color: {
                            type: "linear",
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                { offset: 0, color: "#ff5722" },
                                { offset: 1, color: "#ff9800" }
                            ]
                        },
                    },
                }],
            };
    }
};

const BarChart = ({ type }: { type: chartTypes }) => {
    return <ReactECharts option={getBarChartOption(type)} />;
};