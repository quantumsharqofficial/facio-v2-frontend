import React, { useState } from "react";
import { Plus, Edit2, Trash2, Eye, Mail, Lock, UserCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const User = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    // demo data (later API replace pannalaam)
    const [users] = useState([
        {
            _id: "1",
            email: "admin@test.com",
            password: "********",
            role: "Admin",
        },
        {
            _id: "2",
            email: "user@test.com",
            password: "********",
            role: "User",
        },
    ]);

    return (
        <div className="ml-64 px-6 py-8 min-h-screen">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">
                        User Management
                    </h1>
                    <p className="text-slate-600 mt-1 text-sm">
                        Manage users, roles and access
                    </p>
                </div>

                <button
                    onClick={() => navigate(`/add-user/${id}`)}
                    className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl shadow-sm text-sm font-medium"
                >
                    <Plus size={18} /> Add User
                </button>
            </div>

            {/* Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-slate-50 text-slate-600">
                            <tr>
                                <th className="px-4 py-3 text-left">#</th>
                                <th className="px-4 py-3 text-left">Email</th>
                                <th className="px-4 py-3 text-left">Password</th>
                                <th className="px-4 py-3 text-left">Role</th>
                                <th className="px-4 py-3 text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y">
                            {users.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="text-center py-6 text-slate-500"
                                    >
                                        No users found
                                    </td>
                                </tr>
                            ) : (
                                users.map((u, i) => (
                                    <tr key={u._id} className="hover:bg-slate-50">
                                        <td className="px-4 py-3">{i + 1}</td>

                                        <td className="px-4 py-3 text-slate-700">
                                            <Mail size={14} className="inline mr-2" />
                                            {u.email}
                                        </td>

                                        <td className="px-4 py-3 text-slate-600">
                                            <Lock size={14} className="inline mr-2" />
                                            {u.password}
                                        </td>

                                        <td className="px-4 py-3">
                                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-700">
                                                {u.role}
                                            </span>
                                        </td>

                                        <td className="px-4 py-3">
                                            <div className="flex justify-center gap-3">
                                                <Eye
                                                    size={16}
                                                    className="cursor-pointer text-slate-600"
                                                />
                                                <Edit2
                                                    size={16}
                                                    className="cursor-pointer text-indigo-600"
                                                />
                                                <Trash2
                                                    size={16}
                                                    className="cursor-pointer text-red-600"
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default User;
