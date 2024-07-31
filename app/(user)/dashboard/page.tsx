"use client";
import Image from "next/image";
import profile from "/public/images/profile.png";
import logo from "/public/images/logo.png";
import { Table, Th, Thead, Tr, Tbody, Td } from "@/component/Table";
import {
  AcademicCapIcon,
  UsersIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
  MapPinIcon,
} from "@heroicons/react/20/solid";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import hadirpak from "/public/images/HadirPak_putih.png";
import DoughnutChart from "@/component/DoughnutChart";
import React from "react";
import Footer from "@/component/Footer";
import { Chart, ChartOptions, LegendItem } from "chart.js";
import { ChartData } from "chart.js";

const Dashboard = () => {
  const [seconds, setSeconds] = useState(59);
  const [minutes, setMinutes] = useState(24);
  const [hours, setHours] = useState(10);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else if (minutes > 0) {
        setMinutes(minutes - 1);
        setSeconds(59);
      } else if (hours > 0) {
        setHours(hours - 1);
        setMinutes(59);
        setSeconds(59);
      }
    }, 1000);

    return () => clearInterval(countdown);
  }, [seconds, minutes, hours]);

  const data: ChartData = {
    
    labels: ["Attendance", "Permisson", "Absent"],
    datasets: [
      {
    
        borderWidth: 0,
        data: [25, 50, 25],
        backgroundColor: ["#FFBC25", "#023E8A", "#0077B6"], // Warna kuning, biru, biru tua
      },
    ],
  };

  const options: ChartOptions = {
    plugins: {

      legend: {
        rtl: false,
        display: true,
        position: "bottom",
        labels: {
          usePointStyle: true, // Mengubah label menjadi lingkaran
          boxWidth: 8, // Ukuran kotak untuk legend, bisa disesuaikan
          boxHeight: 8, // Ukuran kotak untuk legend, bisa disesuaikan
          padding: 16, // Menambahkan jarak antar label secara keseluruhan
          pointStyle: "circle", // Bentuk label lingkaran
          textAlign: "left",
          font: {
            family: "sans-serif", // Ganti dengan font yang diinginkan
            size: 12,
          },
          generateLabels: function (chart: Chart): LegendItem[] {
            const data = chart.data;
            if (data.labels && data.datasets) {
              return data.labels.map((label, index) => {
                const meta = chart.getDatasetMeta(0);
                const style = meta.controller.getStyle(index, false);
                return {
                  text: `${label}  `, // Menambahkan spasi di awal label untuk jarak antara lingkaran dan teks
                  fillStyle: style.backgroundColor,
                  hidden: !chart.getDataVisibility(index),
                  lineCap: style.borderCapStyle,
                  lineDash: style.borderDash,
                  lineDashOffset: style.borderDashOffset,
                  lineJoin: style.borderJoinStyle,
                  lineWidth: style.borderWidth,
                  strokeStyle: style.borderColor,
                  pointStyle: style.pointStyle,
                  rotation: style.rotation,
                  textAlign: 'left',
                  datasetIndex: 0,
                  index: index,
                };
              });
            }
            return [];
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.raw || 0;
            return `${label}: ${value}%`;
          },
        },
      },
      datalabels: {
        color: "#fff",
        formatter: function (value) {
          return `${value}%`;
        },
        font: {
          weight: "bold",
        },
      },
    },
  };

  return (
    <main className="w-screen h-full">
      <div className="w-full px-10 py-5 border-b bg-[#023E8A] flex flex-row justify-between items-center">
        <picture>
          <Image src={hadirpak} alt="hadir" />
        </picture>
        <div className="flex gap-10">
          <a href="" className="font-quick text-[#FFBC25] text-base">
            Dashboard
          </a>
          <a href="/" className="font-quick text-white text-base">
            Attendance
          </a>
          <a href="" className="font-quick text-white text-base">
            Userdata
          </a>
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="rounded-full">
              <picture>
                <Image src={profile} alt="user" width={80} height={80} />
              </picture>
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">Profile</a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>

      {/* ---------------------------------------------- */}

      <div className="w-screen px-8">
        <div className="flex w-full justify-between my-10 items-center">
          <div className="flex flex-col gap-3">
            <h1 className="font-quick text-3xl font-medium">
              Hi, Akbar Rismawan
            </h1>
            <div className="flex flex-row gap-2">
              <picture>
                <Image src={logo} alt="user" width={35} height={35} />
              </picture>
              <h1 className="font-quick text-3xl">
                SMK Madinatul Quran | Teacher
              </h1>
            </div>
          </div>
          <div className="w-[672px] flex gap-6 items-center">
            {/* <h1 className="text-[100px]  font-quick font-light">00:10:43</h1> */}
            <span className="countdown text-[100px] font-light text-[#495057]">
              <span style={{ "--value": hours } as any}></span>:
              <span style={{ "--value": minutes } as any}></span>:
              <span style={{ "--value": seconds } as any}></span>
            </span>
            <h1 className="font-quick font-medium text-2xl text-[#495057] ">
              left before check-in to database class
            </h1>
          </div>
        </div>
        {/*  */}
        <button className="btn btn-outline w-full hover:bg-[#023E8A] h-[60px] mt-10 text-[#212529] text-3xl font-quick font-semibold py-3">
          Take an attendance before, Click me!
        </button>
        {/*  */}
        <hr className="w-full border border-[#6C757D] mt-8" />
        {/*  */}
        <div className="flex md:flex-row flex-col my-8 justify-evenly">
          <div className="border shadow-lg rounded-md h-[480px] flex flex-col justify-center items-center">
            <div className="flex w-full justify-between my-9 px-9">
              <div className="">
                <h1 className="font-quick font-medium text-2xl">Weekly</h1>
                <p className="font-quick text-[#495057] text-sm font-medium mt-2">
                  Attendace Graphic
                </p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="w-7"
              >
                <path
                  fill="#bdbdbd"
                  d="M504 256c0 137-111 248-248 248S8 393 8 256C8 119.1 119 8 256 8s248 111.1 248 248zm-248 50c-25.4 0-46 20.6-46 46s20.6 46 46 46 46-20.6 46-46-20.6-46-46-46zm-43.7-165.3l7.4 136c.3 6.4 5.6 11.3 12 11.3h48.5c6.4 0 11.6-5 12-11.3l7.4-136c.4-6.9-5.1-12.7-12-12.7h-63.4c-6.9 0-12.4 5.8-12 12.7z"
                />
              </svg>
            </div>
            <hr className="w-full border border-[#F0F0F0]" />
            <div className="my-9 mx-[72px]">
              <div className="w-[296px]">
                <DoughnutChart data={data} options={options} />
              </div>
            </div>
          </div>
          <div className="border shadow-lg rounded-md h-[480px] flex flex-col justify-center items-center">
            <div className="flex w-full justify-between my-9 px-9">
              <div className="">
                <h1 className="font-quick font-medium text-2xl">Monthly</h1>
                <p className="font-quick text-[#495057] text-sm font-medium mt-2">
                  Attendace Graphic
                </p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="w-7"
              >
                <path
                  fill="#bdbdbd"
                  d="M504 256c0 137-111 248-248 248S8 393 8 256C8 119.1 119 8 256 8s248 111.1 248 248zm-248 50c-25.4 0-46 20.6-46 46s20.6 46 46 46 46-20.6 46-46-20.6-46-46-46zm-43.7-165.3l7.4 136c.3 6.4 5.6 11.3 12 11.3h48.5c6.4 0 11.6-5 12-11.3l7.4-136c.4-6.9-5.1-12.7-12-12.7h-63.4c-6.9 0-12.4 5.8-12 12.7z"
                />
              </svg>
            </div>
            <hr className="w-full border border-[#F0F0F0]" />
            <div className="my-9 mx-[72px]">
              <div className="w-[296px]">
                <DoughnutChart data={data} options={options} />
              </div>
            </div>
          </div>
          <div className="border shadow-lg rounded-md h-[480px] flex flex-col justify-center items-center">
            <div className="flex w-full justify-between my-9 px-9">
              <div className="">
                <h1 className="font-quick font-medium text-2xl">
                  Semester Basis
                </h1>
                <p className="font-quick text-[#495057] text-sm font-medium mt-2">
                  Attendace Graphic
                </p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="w-7"
              >
                <path
                  fill="#bdbdbd"
                  d="M504 256c0 137-111 248-248 248S8 393 8 256C8 119.1 119 8 256 8s248 111.1 248 248zm-248 50c-25.4 0-46 20.6-46 46s20.6 46 46 46 46-20.6 46-46-20.6-46-46-46zm-43.7-165.3l7.4 136c.3 6.4 5.6 11.3 12 11.3h48.5c6.4 0 11.6-5 12-11.3l7.4-136c.4-6.9-5.1-12.7-12-12.7h-63.4c-6.9 0-12.4 5.8-12 12.7z"
                />
              </svg>
            </div>
            <hr className="w-full border border-[#F0F0F0]" />
            <div className="my-9 mx-[72px]">
              <div className="w-[296px]">
                <DoughnutChart data={data} options={options} />
              </div>
            </div>
          </div>
        </div>
        {/*  */}
        <div className="flex w-full justify-between mb-6">
          <h1 className="font-quick font-medium text-lg text-[#495057] w-[708px]">
            This will kindly remind you of your attendance each time you clock
            in, whether it be weekly, monthly, or per semester.
          </h1>
          <button className="btn btn-outline font-semibold text-[16px]">
            Download Recap
          </button>
        </div>
        {/*  */}
        <hr className="w-full border border-[#6C757D]" />
        {/*  */}
        <div className="flex w-full justify-between mt-12">
          <h1 className="font-quick font-semibold text-2xl text-[#212529]">
            Schedule
          </h1>
          <button className="btn btn-outline font-semibold text-[16px]">
            Download Recap
          </button>
        </div>
        {/*  */}
        <div className="mt-6 font-quick">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="py-2 px-4 bg-blue-800 text-white">Clock</th>
                <th className="py-2 px-4 bg-blue-800 text-white">X RPL</th>
                <th className="py-2 px-4 bg-blue-800 text-white">X TKJ</th>
                <th className="py-2 px-4 bg-blue-800 text-white">XI RPL</th>
                <th className="py-2 px-4 bg-blue-800 text-white">XI TKJ</th>
                <th className="py-2 px-4 bg-blue-800 text-white">XII RPL</th>
                <th className="py-2 px-4 bg-blue-800 text-white">XII TKJ</th>
              </tr>
            </thead>
            <tbody className="font-semibold text-lg">
              <tr>
                <td className="border-t py-2 px-4">07.00 - 08.30</td>
                <td className="border-t py-2 px-4">A1</td>
                <td className="border-t py-2 px-4 text-blue-600">B2</td>
                <td className="border-t py-2 px-4">C1</td>
                <td className="border-t py-2 px-4">A1</td>
                <td className="border-t py-2 px-4 text-blue-600">B2</td>
                <td className="border-t py-2 px-4">C1</td>
              </tr>
              <tr>
                <td className="border-t py-2 px-4">08.30 - 10.30</td>
                <td className="border-t py-2 px-4">A1</td>
                <td className="border-t py-2 px-4 text-blue-600">B2</td>
                <td className="border-t py-2 px-4">C1</td>
                <td className="border-t py-2 px-4">A1</td>
                <td className="border-t py-2 px-4 text-blue-600">B2</td>
                <td className="border-t py-2 px-4">C1</td>
              </tr>
              <tr>
                <td className="border-t py-2 px-4">10.30 - 11.30</td>
                <td className="border-t py-2 px-4">A1</td>
                <td className="border-t py-2 px-4 text-blue-600">B2</td>
                <td className="border-t py-2 px-4">C1</td>
                <td className="border-t py-2 px-4">A1</td>
                <td className="border-t py-2 px-4 text-blue-600">B2</td>
                <td className="border-t py-2 px-4">C1</td>
              </tr>
              <tr>
                <td className="border-t py-2 px-4">11.30 - 13.15</td>
                <td className="border-t py-2 px-4" colSpan={6}>
                  Rest
                </td>
              </tr>
              <tr>
                <td className="border-t py-2 px-4">13.15 - 14.45</td>
                <td className="border-t py-2 px-4">A1</td>
                <td className="border-t py-2 px-4 text-blue-600">B2</td>
                <td className="border-t py-2 px-4">C1</td>
                <td className="border-t py-2 px-4">A1</td>
                <td className="border-t py-2 px-4 text-blue-600">B2</td>
                <td className="border-t py-2 px-4">C1</td>
              </tr>
            </tbody>
          </table>
          <div className="flex justify-between items-center px-8 py-3 bg-[#023E8A]">
            <h1 className="text-white font-semibold text-lg">Monday schedule</h1>
            <div className="flex gap-4">
              <button className="px-4 py-2 border border-white text-white rounded">
                Prev
              </button>
              <button className="px-4 py-2 border border-white text-white rounded">
                Next
              </button>
            </div>
          </div>
        </div>
        {/*  */}
        <div className="overflow-x-auto my-8">
          <table className="min-w-full bg-white font-quick">
            <thead>
              <tr className="bg-[#023E8A] text-white">
                <th className="w-1/12 py-2 px-4">NO</th>
                <th className="w-4/12 py-2 px-4">TEACHER`S NAME</th>
                <th className="w-4/12 py-2 px-4">SUBJECT NAME</th>
                <th className="w-1/12 py-2 px-4">SUBJECT CODE</th>
              </tr>
            </thead>
            <tbody className="text-black">
              <tr>
                <td className="border border-black px-4 py-2">1</td>
                <td className="border border-black px-4 py-2">
                  Ihsan Santana Wibawa
                </td>
                <td className="border border-black px-4 py-2">
                  Fullstack Developer
                </td>
                <td className="border border-black px-4 py-2">A1</td>
              </tr>
              <tr className="">
                <td className="border border-black px-4 py-2">
                  <tbody>
                    <tr>
                      <td className="">2</td>
                    </tr>
                    <tr>{/* <td className="text-white">2</td> */}</tr>
                  </tbody>
                </td>
                <td className="border border-black px-4 py-2">
                  Akbar Rismawan Tanjung
                </td>
                <td className="px-4 py-2 w-full">
                  <tbody>
                    <tr className="border-b border-black ">
                      <td>Database</td>
                    </tr>
                    <tr className="border-t border-black px-4 py-2">
                      <td>Javascript</td>
                    </tr>
                  </tbody>
                </td>
                <td className="border border-black px-4 py-2">B1</td>
              </tr>
              <tr>
                <td className="border border-black px-4 py-2">3</td>
                <td className="border border-black px-4 py-2">
                  Dedi Hidayatullah
                </td>
                <td className="border border-black px-4 py-2">
                  Indonesian Language
                </td>
                <td className="border border-black px-4 py-2">C1</td>
              </tr>
              <tr>
                <td className="border border-black px-4 py-2">4</td>
                <td className="border border-black px-4 py-2">Zidni Ilman</td>
                <td className="border-y border-t border-b-0 border-black"></td>
                <td className="border border-black px-4 py-2">C1</td>
              </tr>
              <tr>
                <td className="border border-black px-4 py-2">5</td>
                <td className="border border-black px-4 py-2">
                  Darmansyah Yamin
                </td>
                <td className="border-y border-b border-t-0 border-black px-4 py-2">
                  P5
                </td>
                <td className="border border-black px-4 py-2">C1</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <Footer/>
    </main>
  );
};

export default Dashboard;
