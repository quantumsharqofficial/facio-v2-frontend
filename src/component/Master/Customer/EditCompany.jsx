import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AxiosInstance from "../../../utilits/axiosInstance";

function EditCompany() {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        checkInTime: "09:30",
        checkOutTime: "18:30",
        lateAfter: "10:00",
        halfDayAfter: "13:00",
        weeklyOffs: [0], // Default Sunday
    });

    const [logoFile, setLogoFile] = useState(null);
    const [logoPreview, setLogoPreview] = useState(null);
    const { id } = useParams();

    const fetchCustomer = async () => {
        try {
            const res = await AxiosInstance.get(`/companies/${id}`);
            // console.log(res?.data?.result);
            setFormData(res?.data?.result);
        } catch (error) {
            console.error(error.response?.data);
        }
    };

    useEffect(() => {
        fetchCustomer();
    }, [])


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setLogoFile(file);
            setLogoPreview(URL.createObjectURL(file));
        }
    };

    const handleWeeklyOffChange = (dayIndex) => {
        setFormData((prev) => {
            const currentOffs = prev.weeklyOffs;
            if (currentOffs.includes(dayIndex)) {
                return { ...prev, weeklyOffs: currentOffs.filter((d) => d !== dayIndex) };
            } else {
                return { ...prev, weeklyOffs: [...currentOffs, dayIndex] };
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        // Append simple fields
        Object.keys(formData).forEach((key) => {
            if (key !== 'weeklyOffs') {
                data.append(key, formData[key]);
            }
        });

        // Append complex fields
        data.append('attendancePolicy', JSON.stringify({
            lateAfter: formData.lateAfter,
            halfDayAfter: formData.halfDayAfter,
        }));

        // Append weeklyOffs array
        formData.weeklyOffs.forEach(off => data.append('weeklyOffs[]', off));

        // Append logo file
        if (logoFile) {
            data.append('logo', logoFile);
        }

        try {
            // console.log("Submitting FormData...");
            const response = await AxiosInstance.post('/companies/', data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            // console.log("Company created successfully:", response.data);
            // Optional: Show success feedback or redirect
            alert("Company created successfully!");
        } catch (error) {
            console.error("Error creating company:", error);
            alert(error.response?.data?.message || "Error creating company");
        }
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();

        Object.keys(formData).forEach((key) => {
            if (key !== "weeklyOffs") {
                data.append(key, formData[key]);
            }
        });

        data.append(
            "attendancePolicy",
            JSON.stringify({
                lateAfter: formData.lateAfter,
                halfDayAfter: formData.halfDayAfter,
            })
        );

        formData.weeklyOffs.forEach((off) =>
            data.append("weeklyOffs[]", off)
        );

        if (logoFile) {
            data.append("logo", logoFile);
        }

        try {
            const res = await AxiosInstance.put(
                `/companies/${id}`,   // ✅ NO trailing slash
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            // console.log("Company updated:", res.data);
            alert("Company updated successfully!");
        } catch (error) {
            console.error(error.response?.data);
            alert(error.response?.data?.message || "Update failed");
        }
    };


    return (
        <div className="ml-64 px-6 py-8 min-h-screen">
            {/* Page Title */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900">
                    Edit Company
                </h1>
                <p className="text-slate-600 mt-1">
                    Edit and manage company information
                </p>
            </div>

            {/* Card */}
            <form
                onSubmit={handleUpdateSubmit}
                className="bg-white rounded-xl border border-slate-200 shadow-sm p-8"
            >
                <h2 className="text-lg font-semibold text-slate-800 mb-6">
                    Company Details
                </h2>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Company Name"
                        className="w-full px-4 py-2.5 border rounded-lg"
                        required
                    />

                 

                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone"
                        className="w-full px-4 py-2.5 border rounded-lg"
                    />

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-700 mb-2">Company Logo</label>
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleLogoChange}
                                    className="hidden"
                                    id="logo-upload"
                                />
                                <label
                                    htmlFor="logo-upload"
                                    className="cursor-pointer px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 text-slate-700 text-sm font-medium transition-colors"
                                >
                                    Choose File
                                </label>
                            </div>
                            {logoPreview && (
                                <div className="relative w-16 h-16 rounded-lg border border-slate-200 overflow-hidden">
                                    <img
                                        src={logoPreview}
                                        alt="Logo preview"
                                        className="w-full h-full object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setLogoFile(null);
                                            setLogoPreview(null);
                                        }}
                                        className="absolute top-0 right-0 bg-red-500 text-white p-0.5 rounded-bl shadow-sm hover:bg-red-600"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Address */}
                <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Address"
                    className="w-full mt-6 px-4 py-2.5 border rounded-lg"
                />

                {/* Location */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="City"
                        className="w-full px-4 py-2.5 border rounded-lg"
                    />

                    <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="State"
                        className="w-full px-4 py-2.5 border rounded-lg"
                    />

                    <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        placeholder="Pincode"
                        className="w-full px-4 py-2.5 border rounded-lg"
                    />
                </div>

                {/* Settings Section */}
                <h2 className="text-lg font-semibold text-slate-800 mt-8 mb-6">
                    Settings & Policies
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Check-in Time</label>
                        <input
                            type="time"
                            name="checkInTime"
                            value={formData.checkInTime}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 border rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Check-out Time</label>
                        <input
                            type="time"
                            name="checkOutTime"
                            value={formData.checkOutTime}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 border rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Late After</label>
                        <input
                            type="time"
                            name="lateAfter"
                            value={formData.lateAfter}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 border rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Half-day After</label>
                        <input
                            type="time"
                            name="halfDayAfter"
                            value={formData.halfDayAfter}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 border rounded-lg"
                        />
                    </div>
                </div>

                {/* Weekly Offs */}
                <div className="mt-8">
                    <label className="block text-sm font-medium text-slate-700 mb-3">Weekly Offs</label>
                    <div className="flex flex-wrap gap-4">
                        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
                            <button
                                key={day}
                                type="button"
                                onClick={() => handleWeeklyOffChange(index)}
                                className={`px-4 py-2 rounded-lg border transition-colors ${formData.weeklyOffs.includes(index)
                                    ? "bg-blue-600 text-white border-blue-600"
                                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                                    }`}
                            >
                                {day}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 mt-8 pt-6 border-t">
                    <button
                        type="button"
                        className="px-6 py-2.5 border rounded-lg"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-2.5 bg-blue-600 text-white rounded-lg"
                    >
                        Update Company
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditCompany;
