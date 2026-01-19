import React, { useState } from "react";
import {
  Users,
  UserCheck,
  UserX,
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

  const stats = [
    { label: "Total Customers", value: "1,234", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
  
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-[1400px] mx-auto px-4 py-6 md:px-6 md:py-8 ">

        {/* Header Section */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
                Customer Management
              </h1>
              <p className="text-slate-600 text-sm mt-1">
                Manage and track your customer database
              </p>
            </div>
            <button className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm">
              <Plus size={18} />
              Add Customer
            </button>
          </div>

          {/* Stats Grid */}
          {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white p-5 rounded-lg border border-slate-200 hover:shadow-sm transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`${stat.bg} p-2.5 rounded-lg`}>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                    +2.5%
                  </span>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-600 uppercase tracking-wide">{stat.label}</p>
                  <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
                </div>
              </div>
            ))}
          </div> */}
        </div>

        {/* Main Content Card */}
        <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">

          {/* Table Controls */}
          <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center bg-slate-50/50">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search customers..."
                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-slate-900 placeholder:text-slate-400"
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                <Filter size={16} />
                Filters
              </button>
              <button className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                Sort By
                <ChevronDown size={16} />
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="py-3 px-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">S.no</th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Customer</th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Email</th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Joined Date</th>
                  <th className="py-3 px-4 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {customerData.map((customer, index) => (
                  <tr
                    key={customer.id}
                    className="group hover:bg-slate-50 transition-colors"
                  >
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">

                        <div>
                          <p className="font-medium text-slate-900 text-sm">{customer.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Mail size={14} className="text-slate-400" />
                        {customer.email}
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Calendar size={14} className="text-slate-400" />
                        {customer.joined}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center gap-1">
                        <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors" title="Edit">
                          <Edit2 size={16} />
                        </button>
                        <button className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors" title="Delete">
                          <Trash2 size={16} />
                        </button>
                        <button className="p-1.5 text-slate-400 hover:bg-slate-100 rounded transition-colors" title="More">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
            <p className="text-slate-600">
              Showing <span className="font-medium text-slate-900">1-5</span> of <span className="font-medium text-slate-900">124</span> customers
            </p>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 text-slate-700 font-medium transition-colors">
                Previous
              </button>
              <button className="px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-900 font-medium transition-colors">
                Next
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Customer;