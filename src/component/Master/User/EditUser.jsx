import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AxiosInstance from "../../../utilits/axiosInstance";

const EditUser = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // companyId (optional)

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
    });


    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Password and Confirm Password do not match");
            return;
        }

        try {
            setLoading(true);

            await AxiosInstance.post("/auth/users", {
                email: formData.email,
                password: formData.password,
                role: formData.role,
                companyId: id,
            });

            alert("User created successfully");
            navigate(-1);
        } catch (error) {
            console.error(error.response?.data);
            alert(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="ml-64 min-h-screen bg-slate-50 flex items-center justify-center px-6">
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-md border border-slate-200 p-6">

                {/* Title */}
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-slate-900">
                        Edit User
                    </h1>
                    <p className="text-sm text-slate-600 mt-1">
                        Edit user information
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="s@qsis"
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="******"
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            required
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="******"
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                    </div>

                    {/* Role */}
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 border border-slate-300 rounded-xl"
                    >
                        <option value="" disabled>
                            Select Role
                        </option>
                        <option value="COMPANY_ADMIN">Company Admin</option>
                        <option value="MANAGER">Manager</option>
                        <option value="HR">HR</option>
                    </select>


                    {/* Buttons */}
                    <div className="flex justify-end gap-3 pt-6">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="px-4 py-2 text-sm border border-slate-300 rounded-xl hover:bg-slate-100"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="px-5 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl disabled:opacity-50"
                        >
                            {loading ? "Creating..." : "Create User"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

};

export default EditUser;
