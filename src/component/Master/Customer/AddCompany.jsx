import React, { useState } from "react";
import AxiosInstance from "../../../utilits/axiosInstance";

function AddCompany() {
    const [formData, setFormData] = useState({
        name: "",
        logo: null,
        phone: "",
        address: "",
        industryType: "",
        city: "",
        state: "",
        pincode: "",
    });
    const industryOptions = [
        "Restaurent/Food Service",
        "Retail",
        "IT/Software",
        "Manufacturing",
        "Healthcare",
        "Education",
        "Finance",
        "Real Estate",
        "Hospitality",
        "Transportation/Logistics",
        "Construction",
        "Entertainment/Media",
        "Telecommunications",
        "Energy/Utilities",
        "Government/Public Sector",
        "Non-Profit/NGO",
        "Other",
    ];


    const [logoFile, setLogoFile] = useState(null);
    const [logoPreview, setLogoPreview] = useState(null);

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



    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();

        Object.keys(formData).forEach((key) => {
            data.append(key, formData[key]);
        });

        if (logoFile) {
            data.append("logo", logoFile);
        }

        try {
            await AxiosInstance.post("/companies/", data, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert("Company created successfully!");
        } catch (error) {
            alert(error.response?.data?.message || "Error creating company");
        }
    };


    return (
        <div className="ml-64 px-6 py-8 min-h-screen">
            {/* Page Title */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900">
                    Add Company
                </h1>
                <p className="text-slate-600 mt-1">
                    Create and manage company information
                </p>
            </div>

            {/* Card */}
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-xl border border-slate-200 shadow-sm p-8"
            >
                <h2 className="text-lg font-semibold text-slate-800 mb-6">
                    Company Details
                </h2>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                    <select
                        name="industryType"
                        value={formData.industryType}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border rounded-lg text-slate-700"
                        required
                    >
                        <option value="">Select Industry Type</option>
                        {industryOptions.map((industry) => (
                            <option key={industry} value={industry}>
                                {industry}
                            </option>
                        ))}
                    </select>



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
                                <div className="relative w-20 h-20 rounded-lg border border-slate-200 overflow-hidden">
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
                        Save Company
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddCompany;
