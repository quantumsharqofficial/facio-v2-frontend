import React, { useState } from "react";
import {
  Search,
  Filter,
  Plus,

  Mail,
  Calendar,
  UserCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Edit2, Trash2, Eye } from "lucide-react";

interface CustomerData {
  id: number;
  name: string;
  email: string;
  status: "Active" | "Inactive";
  joined: string;
}

const Customer: React.FC = () => {
  const [customerData] = useState<CustomerData[]>([
    { id: 1, name: "Arun Kumar", email: "arun.k@example.com", status: "Active", joined: "Jan 12, 2024" },
    { id: 2, name: "Siva Prakash", email: "siva.p@example.com", status: "Active", joined: "Jan 15, 2024" },
    { id: 3, name: "Ramesh", email: "ramesh@example.com", status: "Inactive", joined: "Feb 02, 2024" },
    { id: 4, name: "Priya", email: "priya@example.com", status: "Active", joined: "Feb 10, 2024" },
    { id: 5, name: "Anita Raj", email: "anita.r@example.com", status: "Active", joined: "Feb 18, 2024" },
  ]);

  const navigate = useNavigate();

  return (
    <div className="ml-64 px-6 py-8 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Customer Management</h1>
          <p className="text-slate-600 mt-1 text-sm">
            View, manage and organize your customers
          </p>
        </div>

        <button
          onClick={() => navigate("/add-company")}
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl shadow-sm text-sm font-medium"
        >
          <Plus size={18} /> Add Customer
        </button>
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
        {/* Controls */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 border-b bg-slate-50">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              placeholder="Search customers"
              className="w-full pl-9 pr-4 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 text-sm border rounded-xl hover:bg-slate-100">
              <Filter size={16} /> Filter
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-3 text-left">#</th>
                <th className="px-4 py-3 text-left">Customer</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Joined</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {customerData.map((c, i) => (
                <tr key={c.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">{i + 1}</td>

                  <td className="px-4 py-3 flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-indigo-100 flex items-center justify-center">
                      <UserCircle className="text-indigo-600" size={20} />
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">{c.name}</p>
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full inline-block mt-0.5
                          ${c.status === "Active"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-red-100 text-red-700"}`}
                      >
                        {c.status}
                      </span>
                    </div>
                  </td>

                  <td className="px-4 py-3 text-slate-600">
                    <Mail size={14} className="inline mr-2" />
                    {c.email}
                  </td>

                  <td className="px-4 py-3 text-slate-600">
                    <Calendar size={14} className="inline mr-2" />
                    {c.joined}
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-3">
                      <Eye
                        size={16}
                        className="text-slate-600 cursor-pointer hover:text-indigo-600 transition"
                      />
                      <Edit2
                        size={16}
                        className="text-indigo-600 cursor-pointer hover:scale-105 transition"
                      />
                      <Trash2
                        size={16}
                        className="text-red-600 cursor-pointer hover:scale-105 transition"
                      />
                    </div>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Customer;