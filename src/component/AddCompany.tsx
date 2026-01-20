import React, { useState, type ChangeEvent, type FormEvent } from "react";

interface CompanyFormData {
    companyName: string;
    email: string;
    phone: string;
    password: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
}

function AddCompany(): React.ReactElement {
    const [formData, setFormData] = useState<CompanyFormData>({
        companyName: "",
        email: "",
        phone: "",
        password: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
    });

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ): void => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        console.log("calling submit");
        console.log(formData);
    };

    return (
        <div className="max-w-[1200px] mx-auto px-4 py-8">
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        placeholder="Company Name"
                        className="w-full px-4 py-2.5 border rounded-lg"
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
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

                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        className="w-full px-4 py-2.5 border rounded-lg"
                        required
                    />
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
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        placeholder="Zip Code"
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
