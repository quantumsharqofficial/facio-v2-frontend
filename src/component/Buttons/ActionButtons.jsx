import React from "react";

const ActionButtons = () => {
    return (
        <div className="w-full px-6 py-4 flex justify-end items-center gap-2 bg-slate-100 sticky top-0 z-30">
            {/* Edit */}
            <button
                className="p-2 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 shadow"
                title="Edit"
            >
                <Edit2 size={18} />
            </button>

            {/* Delete */}
            <button
                className="p-2 rounded-lg bg-red-600 text-white hover:bg-red-700 shadow"
                title="Delete"
            >
                <Trash2 size={18} />
            </button>
        </div>
    );
};

export default ActionButtons;