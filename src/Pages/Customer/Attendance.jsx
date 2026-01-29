import React, { useState } from "react";
import {
  Search,
  Filter,
  Plus,
  Mail,
  Calendar,
  UserCircle,
  Eye,
  Clock
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Attendance = () => {
  const navigate = useNavigate();

  // Dummy Data
  const [attendanceData] = useState([
    {
      _id: "1",
      employee: "John Doe",
      date: "2024-03-25",
      checkIn: "09:00 AM",
      checkOut: "06:00 PM",
      status: "Present",
    },
    {
      _id: "2",
      employee: "Jane Smith",
      date: "2024-03-25",
      checkIn: "09:15 AM",
      checkOut: "06:15 PM",
      status: "Present",
    },
    {
      _id: "3",
      employee: "Mike Johnson",
      date: "2024-03-25",
      checkIn: "10:00 AM",
      checkOut: "07:00 PM",
      status: "Late",
    },
    {
      _id: "4",
      employee: "Sarah Williams",
      date: "2024-03-25",
      checkIn: "-",
      checkOut: "-",
      status: "Absent",
    },
    {
      _id: "5",
      employee: "Robert Brown",
      date: "2024-03-25",
      checkIn: "08:45 AM",
      checkOut: "05:45 PM",
      status: "Present",
    },
  ]);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const filteredData = attendanceData.filter((item) => {
    const matchesSearch = item.employee.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = status ? item.status === status : true;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="ml-64 px-6 py-8 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Attendance
          </h1>
          <p className="text-slate-600 mt-1 text-sm">
            Track employee attendance and work hours
          </p>
        </div>

      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
        {/* Controls */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 border-b bg-slate-50">
          {/* Search */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search employee..."
              className="w-full pl-9 pr-4 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Filter */}
          <div className="flex gap-2">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="px-4 py-2 text-sm border rounded-xl"
            >
              <option value="">All Status</option>
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
              <option value="Late">Late</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-3 text-left">#</th>
                <th className="px-4 py-3 text-left">Employee</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Check In</th>
                <th className="px-4 py-3 text-left">Check Out</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-6 text-slate-500">
                    No records found
                  </td>
                </tr>
              ) : (
                filteredData.map((record, i) => (
                  <tr key={record._id} className="hover:bg-slate-50">
                    <td className="px-4 py-3">{i + 1}</td>

                    <td className="px-4 py-3 flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center">
                        <UserCircle className="text-slate-500" size={18} />
                      </div>
                      <span className="font-medium text-slate-800">{record.employee}</span>
                    </td>

                    <td className="px-4 py-3 text-slate-600">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} />
                        {record.date}
                      </div>
                    </td>

                    <td className="px-4 py-3 text-slate-600">
                      <div className="flex items-center gap-2">
                        <Clock size={14} className="text-emerald-500" />
                        {record.checkIn}
                      </div>
                    </td>

                    <td className="px-4 py-3 text-slate-600">
                      <div className="flex items-center gap-2">
                        <Clock size={14} className="text-red-500" />
                        {record.checkOut}
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full inline-block ${record.status === "Present"
                            ? "bg-emerald-100 text-emerald-700"
                            : record.status === "Absent"
                              ? "bg-red-100 text-red-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                      >
                        {record.status}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex justify-center gap-3">
                        <Eye
                          className="cursor-pointer text-slate-500 hover:text-indigo-600"
                          size={16}
                          onClick={() => { }}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Dummy */}
        <div className="flex justify-end gap-2 p-4">
          <button
            disabled
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          <span className="px-3 py-1 text-sm">
            Page 1 of 1
          </span>

          <button
            disabled
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Attendance;