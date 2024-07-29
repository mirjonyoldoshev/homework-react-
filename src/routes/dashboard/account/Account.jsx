import React from "react";
import moment from "moment";
import "moment/locale/uz"; // Import the uz locale
import { useFetch } from "../../../hooks/useFetch";

const Account = () => {
  const [__, loading] = useFetch("/auth/profile");
  console.log(__);

  const data = JSON.parse(localStorage.getItem("user"));
  console.log(data);

  if (loading) {
    return (
      <div className="mx-auto mt-10 max-w-lg rounded bg-white px-8 py-6 shadow-md">
        <div className="flex h-auto w-full items-center justify-center text-indigo-950 transition">
          <span className="text-3xl">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-10 flex max-w-lg flex-col gap-3 rounded bg-white px-8 py-6 shadow-md">
      <h2 className="text-2xl font-semibold">Akkauntingiz Ma'lumotlari</h2>
      <div className="flex items-center gap-3">
        <label className="block text-base font-bold text-gray-700">
          Username:
        </label>
        <p className="text-base text-gray-900">{data.username}</p>
      </div>
      <div className="flex items-center gap-3">
        <label className="block text-base font-bold text-gray-700">
          Ismingiz:
        </label>
        <p className="text-base text-gray-900">{data.first_name}</p>
      </div>
      <div className="flex items-center gap-3">
        <label className="block text-base font-bold text-gray-700">
          Rolingiz:
        </label>
        <p className="text-base capitalize text-gray-900">{data.role}</p>
      </div>
      <div className="flex items-center gap-3">
        <label className="block text-base font-bold text-gray-700">
          Ro'yxatdan o'tgan:
        </label>
        <p className="text-base text-gray-900">
          {moment(data.registeredAt).locale("uz").format("LLLL")}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <label className="block text-base font-bold text-gray-700">
          Oxirgi yangilangan:
        </label>
        <p className="text-base text-gray-900">
          {moment(data.updatedAt).locale("uz").format("LLLL")}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <label className="block text-base font-bold text-gray-700">
          Akkaunt ochilgan:
        </label>
        <p className="text-base text-gray-900">
          {moment(data.createdAt).locale("uz").format("LLLL")}
        </p>
      </div>
    </div>
  );
};

export default Account;
