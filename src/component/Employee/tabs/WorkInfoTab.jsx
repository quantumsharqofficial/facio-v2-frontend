const inputClass =
  "w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none";

const WorkInfoTab = ({ data, onChange, onWorkingDayToggle }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Employment Type
          </label>
          <select
            name="employmentType"
            value={data.employmentType}
            onChange={onChange}
            className={inputClass}
          >
            <option value="">Select</option>
            <option value="FULL_TIME">Full Time</option>
            <option value="PART_TIME">Part Time</option>
            <option value="CONTRACT">Contract</option>
            <option value="INTERN">Intern</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Shift
          </label>
          <select
            name="shift"
            value={data.shift}
            onChange={onChange}
            className={inputClass}
          >
            <option value="">Select</option>
            <option value="DAY">Day</option>
            <option value="NIGHT">Night</option>
            <option value="ROTATIONAL">Rotational</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Working Days
        </label>
        <div className="flex flex-wrap gap-2">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
            <button
              key={day}
              type="button"
              onClick={() => onWorkingDayToggle(day)}
              className={`px-4 py-2 rounded-lg border text-sm transition-colors ${data.workingDays.includes(day)
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white text-slate-600 border-slate-300 hover:bg-slate-50"
                }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Source of Hire
          </label>
          <input
            type="text"
            name="sourceOfHire"
            value={data.sourceOfHire}
            onChange={onChange}
            placeholder="e.g. LinkedIn, Referral"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Status
          </label>
          <select
            name="status"
            value={data.status}
            onChange={onChange}
            className={inputClass}
          >
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>
        </div>
      </div>

      <div className="border-t pt-4">
        <h4 className="font-medium text-slate-800 mb-3">Office Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Work Phone
            </label>
            <input
              type="tel"
              name="workPhone"
              value={data.workPhone}
              onChange={onChange}
              placeholder="+91 ..."
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Extension
            </label>
            <input
              type="text"
              name="extension"
              value={data.extension}
              onChange={onChange}
              placeholder="e.g. 101"
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={data.location}
              onChange={onChange}
              placeholder="Office location"
              className={inputClass}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkInfoTab;
