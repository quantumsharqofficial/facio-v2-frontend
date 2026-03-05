import React from "react";

function Organization() {
    const orgItems = [
        { id: 1, name: "Shift", desc: "Manage work shifts" },
        { id: 2, name: "Department", desc: "Manage company departments" },
        { id: 3, name: "Designation", desc: "Manage employee roles" },
        { id: 4, name: "Employment Type", desc: "Full-time, Part-time, Contract" },
    ];

    return (
        <div className="ml-64 px-6 py-8 min-h-screen">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">
                        Organization Setup
                    </h1>
                    <p className="text-slate-600 mt-1 text-sm">
                        View, manage and organize your organization structure
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {orgItems.map((item) => (
                    <div
                        key={item.id}
                        className="border rounded-lg p-4 hover:shadow-md cursor-pointer"
                    >
                        <h3 className="text-lg font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Organization;
