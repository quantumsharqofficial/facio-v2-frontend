import React, { use, useEffect, useState } from "react";
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
import AxiosInstance from "../../utilits/axiosInstance";
import Card from "../../component/Cards/Card";
import textImage from "../../../../-facio-v2-backend/uploads/employees/photos/6981b94fd2e29e347b39032d_2026-02-03.png"

const Employee = () => {
  const navigate = useNavigate();
  const [employeeData, setEmployeeData] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  /* ------------------ Fetch API ------------------ */
  const fetchEmployees = async () => {
    try {
      const res = await AxiosInstance.get("/employees/");
      console.log("employees", res);
      setEmployeeData(res?.data?.data || []);
    } catch (error) {
      console.error(error.response?.data);
      setEmployeeData([]);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const filteredData = employeeData.filter((item) => {
    const fullName = `${item.firstName} ${item.lastName}`.toLowerCase();

    const matchesSearch =
      fullName.includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase()) ||
      item.employeeCode.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = status ? item.status === status : true;

    return matchesSearch && matchesStatus;
  });



  const countByGender = (arr) => {
    const male = arr.filter(e => e.gender === "Male").length;
    const female = arr.filter(e => e.gender === "Female").length;
    const other = arr.filter(e => e.gender === "Other").length;
    return { male, female, other };
  };

  // Total employees
  const total = employeeData;
  const totalGender = countByGender(total);

  // Full Time
  const fullTime = employeeData.filter(e => e.employeeType === "Full Time");
  const fullTimeGender = countByGender(fullTime);

  // Part Time
  const partTime = employeeData.filter(e => e.employeeType === "PART_TIME");
  const partTimeGender = countByGender(partTime);

  // Contract
  const contract = employeeData.filter(e => e.employeeType === "Contract");
  const contractGender = countByGender(contract);

  // Intern
  const intern = employeeData.filter(e => e.employeeType === "Intern");
  const internGender = countByGender(intern);




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
          onClick={() => navigate("/add-employee")}
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl shadow-sm text-sm font-medium"
        >
          <Plus size={18} /> Add Employee
        </button>
      </div>

      {/* Card */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">

        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <p className="text-sm text-slate-500">Total Employees</p>
          <h2 className="text-2xl font-bold text-slate-900 mt-1">
            {total.length}
          </h2>
          <div className="flex gap-3 text-xs mt-2">
            {totalGender.male > 0 && <span className="text-blue-600">M: {totalGender.male}</span>}
            {totalGender.female > 0 && <span className="text-pink-600">F: {totalGender.female}</span>}
            {totalGender.other > 0 && <span className="text-emerald-600">O: {totalGender.other}</span>}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <p className="text-sm text-indigo-600">Full Time</p>
          <h2 className="text-2xl font-bold text-slate-900 mt-1">
            {fullTime.length}
          </h2>
          <div className="flex gap-3 text-xs mt-2">
            {fullTimeGender.male > 0 && <span className="text-blue-600">M: {fullTimeGender.male}</span>}
            {fullTimeGender.female > 0 && <span className="text-pink-600">F: {fullTimeGender.female}</span>}
            {fullTimeGender.other > 0 && <span className="text-emerald-600">O: {fullTimeGender.other}</span>}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <p className="text-sm text-blue-600">Part Time</p>
          <h2 className="text-2xl font-bold text-slate-900 mt-1">
            {partTime.length}
          </h2>
          <div className="flex gap-3 text-xs mt-2">
            {partTimeGender.male > 0 && <span className="text-blue-600">M: {partTimeGender.male}</span>}
            {partTimeGender.female > 0 && <span className="text-pink-600">F: {partTimeGender.female}</span>}
            {partTimeGender.other > 0 && <span className="text-emerald-600">O: {partTimeGender.other}</span>}
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <p className="text-sm text-amber-600">Contract</p>
          <h2 className="text-2xl font-bold text-slate-900 mt-1">
            {contract.length}
          </h2>
          <div className="flex gap-3 text-xs mt-2">
            {contractGender.male > 0 && <span className="text-blue-600">M: {contractGender.male}</span>}
            {contractGender.female > 0 && <span className="text-pink-600">F: {contractGender.female}</span>}
            {contractGender.other > 0 && <span className="text-emerald-600">O: {contractGender.other}</span>}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <p className="text-sm text-emerald-600">Intern</p>
          <h2 className="text-2xl font-bold text-slate-900 mt-1">
            {intern.length}
          </h2>
          <div className="flex gap-3 text-xs mt-2">
            {internGender.male > 0 && <span className="text-blue-600">M: {internGender.male}</span>}
            {internGender.female > 0 && <span className="text-pink-600">F: {internGender.female}</span>}
            {internGender.other > 0 && <span className="text-emerald-600">O: {internGender.other}</span>}
          </div>
        </div>

      </div> */}




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
                  <td colSpan="8" className="text-center py-6 text-slate-500">
                    No employees found
                  </td>
                </tr>
              ) : (
                filteredData.map((employee, i) => (
                  <tr key={employee._id} className="hover:bg-slate-50">
                    <td className="px-4 py-3">{i + 1}</td>

                    {/* Name & Email */}
                    <td className="px-4 py-3 flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-indigo-100 flex items-center justify-center">

                        {employee.photo ? (
                          <>

                            <img
                              src={employee?.photo}
                              alt="Profile"
                              className="h-full w-full object-cover"
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                              }}
                            />
                            {/* <img
                            src={textImage}
                            alt="Profile"
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }} 
                              /> */}
                          </>
                        ) : (
                          <UserCircle className="text-indigo-600" size={20} />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">
                          {employee.firstName} {employee.lastName}
                        </p>
                        <div className="text-xs text-slate-500 flex items-center gap-1">
                          <Mail size={12} /> {employee.email}
                        </div>
                      </div>
                    </td>

                    {/* Designation & Department */}
                    <td className="px-4 py-3 text-slate-600">
                      <div className="font-medium text-slate-800">
                        {employee.designation}
                      </div>
                      <div className="text-xs text-slate-500">
                        {employee.department}
                      </div>
                    </td>

                    {/* Phone */}
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

                    {/* Actions */}
                    <td className="px-4 py-3">
                      <div className="flex justify-center gap-3">
                        <Eye
                          className="cursor-pointer text-slate-500 hover:text-indigo-600"
                          size={20}
                          onClick={() => navigate(`/view-employee/${employee._id}`)}
                          title="View Employee"
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