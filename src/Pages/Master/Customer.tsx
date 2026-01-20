import React, { useState } from "react";
import {
  Users,
  Search,
  Filter,
  MoreVertical,
  Plus,
  Trash2,
  Edit2,
  ChevronDown,
  Mail,
  Calendar,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CustomerData {
  id: number;
  name: string;
  email: string;
  status: "Active" | "Inactive";
  joined: string;
}

function Customer() {
  const [customerData] = useState<CustomerData[]>([
    { id: 1, name: "Arun Kumar", email: "arun.k@example.com", status: "Active", joined: "Jan 12, 2024" },
    { id: 2, name: "Siva Prakash", email: "siva.p@example.com", status: "Active", joined: "Jan 15, 2024" },
    { id: 3, name: "Ramesh", email: "ramesh@example.com", status: "Inactive", joined: "Feb 02, 2024" },
    { id: 4, name: "Priya", email: "priya@example.com", status: "Active", joined: "Feb 10, 2024" },
    { id: 5, name: "Anita Raj", email: "anita.r@example.com", status: "Active", joined: "Feb 18, 2024" },
  ]);

  const navigate = useNavigate();

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-6 md:px-6 md:py-8">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
            Customer Management
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Manage and track your customer database
          </p>
        </div>

        <button
          onClick={() => navigate("/add-company")}
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus size={18} />
          Add Customer
        </button>
      </div>

      {/* Main Card */}
      <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">

        {/* Controls */}
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center bg-slate-50/50">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search customers..."
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 px-3 py-2 text-sm border rounded-lg hover:bg-slate-50">
              <Filter size={16} /> Filters
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 text-sm border rounded-lg hover:bg-slate-50">
              Sort By <ChevronDown size={16} />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="py-3 px-4 text-left text-xs font-semibold">S.no</th>
                <th className="py-3 px-4 text-left text-xs font-semibold">Customer</th>
                <th className="py-3 px-4 text-left text-xs font-semibold">Email</th>
                <th className="py-3 px-4 text-left text-xs font-semibold">Joined Date</th>
                <th className="py-3 px-4 text-center text-xs font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {customerData.map((customer, index) => (
                <tr key={customer.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4 font-medium">{customer.name}</td>
                  <td className="py-3 px-4 text-sm text-slate-600">
                    <Mail size={14} className="inline mr-2" />
                    {customer.email}
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-600">
                    <Calendar size={14} className="inline mr-2" />
                    {customer.joined}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex justify-center gap-1">
                      <Edit2 size={16} className="text-blue-600 cursor-pointer" />
                      <Trash2 size={16} className="text-red-600 cursor-pointer" />
                      <MoreVertical size={16} className="text-slate-400 cursor-pointer" />
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
}

export default Customer;
