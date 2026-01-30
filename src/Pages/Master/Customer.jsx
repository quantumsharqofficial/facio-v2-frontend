import React, { useEffect, useState } from "react";
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
  Phone,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../../utilits/axiosInstance";

/* ------------------ Debounce Hook ------------------ */
const useDebounce = (value, delay = 500) => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
};

const Customer = () => {

  const navigate = useNavigate();

  /* ------------------ States ------------------ */
  const [customerData, setCustomerData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const debouncedSearch = useDebounce(search);

  const formatDateTime = (dateString) => {
    if (!dateString) return "-";

    const date = new Date(dateString);

    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };


  /* ------------------ Fetch API ------------------ */
  const fetchCustomer = async (isMounted) => {
    try {
      if (!isMounted) return;

      setLoading(true);

      const res = await AxiosInstance.get("/companies", {
        params: {
          page,
          limit,
          search: debouncedSearch,
          status,
        },
      });

      if (!isMounted) return; // 🚨 guard before setState

      setCustomerData(res.data.result.data);
      setTotalPages(res.data.result.pagination.totalPages);
    } catch (error) {
      if (!isMounted) return;
      console.error(error.response?.data);
    } finally {
      if (!isMounted) return;
      setLoading(false);
    }
  };

  /* ------------------ Effects ------------------ */
  useEffect(() => {
    setPage(1); // reset page on search/filter
  }, [debouncedSearch, status]);

  useEffect(() => {
    let isMounted = true; // ✅ flag

    fetchCustomer(isMounted);

    return () => {
      isMounted = false; // 🧹 cleanup
    };
  }, [page, debouncedSearch, status]);




  /* ------------------ UI ------------------ */
  return (
    <div className="ml-64 px-6 py-8 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Customer Management
          </h1>
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
          {/* Search */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search customers..."
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
              <option value="">All</option>
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
                <th className="px-4 py-3 text-left">Customer</th>
                <th className="px-4 py-3 text-left">Phone</th>
                <th className="px-4 py-3 text-left">Joined</th>
                <th className="px-4 py-3 text-left">User Details</th>
                <th className="px-4 py-3 text-center">View</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center py-6">
                    Loading...
                  </td>
                </tr>
              ) : customerData.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-slate-500">
                    No customers found
                  </td>
                </tr>
              ) : (
                customerData.map((c, i) => (
                  <tr key={c._id} className="hover:bg-slate-50">
                    <td className="px-4 py-3">{(page - 1) * limit + i + 1}</td>

                    <td className="px-4 py-3 flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-indigo-100 flex items-center justify-center">
                        <UserCircle className="text-indigo-600" size={20} />
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">{c.name}</p>
                        <span
                          className={`text-xs font-medium px-2 py-0.5 rounded-full inline-block mt-0.5 ${c.status === "Active"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-red-100 text-red-700"
                            }`}
                        >
                          {c.status}
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-3 text-slate-600">
                      <Phone size={14} className="inline mr-2" />
                      {c.phone}
                    </td>

                    <td className="px-4 py-3 text-slate-600">
                      <Calendar size={14} className="inline mr-2" />
                      {formatDateTime(c.createdAt)}
                    </td>
                    <td className="px-4 py-3 ">
                      <button
                        onClick={() => navigate(`/user/${c._id}`)}
                        className="px-3 py-1 text-xs font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg"
                      >
                        Users
                      </button>
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex justify-center gap-3">
                        <Eye
                          className="cursor-pointer"
                          size={20}
                          onClick={() => navigate(`/view-company/${c._id}`)} />
                        {/* <Edit2
                          className="cursor-pointer text-indigo-600"
                          size={16}
                          onClick={() => navigate(`/edit-company/${c._id}`)}
                        /> */}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-end gap-2 p-4">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          <span className="px-3 py-1 text-sm">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Customer;
