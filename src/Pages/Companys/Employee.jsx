import React, { useState } from "react";
import {
  Search,
  Filter,
  Plus,
  Mail,
  Calendar,
  UserCircle,
  Edit2,
  Trash2,
  Eye,
  Briefcase,
  Phone,
  CalendarOff,
  Clock,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Employee = () => {
  const navigate = useNavigate();

  // Dummy Data
  const [employeeData] = useState([
    {
      _id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "Software Engineer",
      department: "Engineering",
      joined: "2023-01-15",
      phone: "+91 98765 43210",
      status: "Active",
    },
    {
      _id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Product Manager",
      department: "Product",
      joined: "2023-03-10", phone: "+91 98765 43210",
      status: "Active",
    },
    {
      _id: "3",
      name: "Mike Johnson",
      email: "mike@example.com",
      role: "Designer",
      department: "Design",
      joined: "2023-06-20", phone: "+91 98765 43210",
      status: "Inactive",
    },
    {
      _id: "4",
      name: "Sarah Williams",
      email: "sarah@example.com",
      role: "HR Manager",
      department: "HR",
      joined: "2022-11-05", phone: "+91 98765 43210",
      status: "Active",
    },
    {
      _id: "5",
      name: "Robert Brown",
      email: "robert@example.com",
      role: "QA Engineer",
      department: "Engineering",
      joined: "2023-02-01", phone: "+91 98765 43210",
      status: "Active",
    },
  ]);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const filteredData = employeeData.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = status ? item.status === status : true;
    return matchesSearch && matchesStatus;
  });


  return (
    <div className="ml-64 px-6 py-8 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Employee Management
          </h1>
          <p className="text-slate-600 mt-1 text-sm">
            View, manage and organize your employees
          </p>
        </div>

        <button
          onClick={() => { }}
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl shadow-sm text-sm font-medium"
        >
          <Plus size={18} /> Add Employee
        </button>
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
              placeholder="Search employees..."
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
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-3 text-left">#</th>

                <th className="px-4 py-3 text-left">
                  <div className="flex items-center gap-1">
                    <UserCircle size={14} /> Employee
                  </div>
                </th>

                <th className="px-4 py-3 text-left">
                  <div className="flex items-center gap-1">
                    <Briefcase size={14} /> Role / Dept
                  </div>
                </th>

                <th className="px-4 py-3 text-left">
                  <div className="flex items-center gap-1">
                    <Phone size={14} /> Phone
                  </div>
                </th>

                <th className="px-4 py-3 text-left">
                  <div className="flex items-center gap-1">
                    <Clock size={14} /> Attendance
                  </div>
                </th>

                <th className="px-4 py-3 text-left">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} /> Leave

                  </div>
                </th>

                <th className="px-4 py-3 text-left">
                  <div className="flex items-center gap-1">
                    <Briefcase size={14} /> Payslip
                  </div>
                </th>

                <th className="px-4 py-3 text-center">
                  <div className="flex justify-center items-center gap-1">
                    <Eye size={14} /> Actions
                  </div>
                </th>
              </tr>
            </thead>



            <tbody className="divide-y">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-slate-500">
                    No employees found
                  </td>
                </tr>
              ) : (
                filteredData.map((employee, i) => (
                  <tr key={employee._id} className="hover:bg-slate-50">
                    <td className="px-4 py-3">{i + 1}</td>

                    <td className="px-4 py-3 flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-indigo-100 flex items-center justify-center">
                        <UserCircle className="text-indigo-600" size={20} />
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">{employee.name}</p>
                        <div className="text-xs text-slate-500 flex items-center gap-1">
                          <Mail size={12} /> {employee.email}
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3 text-slate-600">
                      <div className="font-medium text-slate-800">{employee.role}</div>
                      <div className="text-xs text-slate-500">{employee.department}</div>
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      <div className="text-xs text-slate-500 flex items-center gap-1">
                        <Phone size={12} /> {employee.phone}
                      </div>
                    </td>

                    {/* Attendance */}
                    <td className="px-4 py-3">
                      <button
                        onClick={() => navigate(`/attendance/${employee._id}`)}
                        className="flex items-center gap-1 px-3 py-1 text-xs rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200"
                      >
                        <Clock size={14} /> View
                      </button>
                    </td>


                    {/* Leave */}
                    <td className="px-4 py-3">
                      <button
                        onClick={() => navigate(`/leave/${employee._id}`)}
                        className="flex items-center gap-1 px-3 py-1 text-xs rounded-lg bg-amber-100 text-amber-700 hover:bg-amber-200"
                      >
                        <Calendar size={14} /> View
                      </button>
                    </td>


                    {/* Payslip */}
                    <td className="px-4 py-3">
                      <button
                        onClick={() => navigate(`/payslip/${employee._id}`)}
                        className="flex items-center gap-1 px-3 py-1 text-xs rounded-lg bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                      >
                        <Briefcase size={14} /> View
                      </button>
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex justify-center gap-3">
                        <Eye
                          className="cursor-pointer text-slate-500 hover:text-indigo-600"
                          size={16}
                          onClick={() => { }}
                        />
                        <Edit2
                          className="cursor-pointer text-indigo-600 hover:text-indigo-800"
                          size={16}
                          onClick={() => { }}
                        />
                        <Trash2
                          className="cursor-pointer text-red-600 hover:text-red-800"
                          size={16}
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
};

export default Employee;