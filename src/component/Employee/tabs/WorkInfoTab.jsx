import { Briefcase } from "lucide-react";

const inputClass =
  "w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none";

const DAYS = [
  { key: "monday", label: "Mon" },
  { key: "tuesday", label: "Tue" },
  { key: "wednesday", label: "Wed" },
  { key: "thursday", label: "Thu" },
  { key: "friday", label: "Fri" },
  { key: "saturday", label: "Sat" },
  { key: "sunday", label: "Sun" },
];

const WorkInfoTab = ({ data, onChange, onWorkingDayToggle }) => {
  const customWorkingDays = data.customWorkingDays || {};

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Employment Type
          </label>
          <select
            name="employmentType"
            value={data.employmentType || ""}
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
            Source of Hire
          </label>
          <input
            type="text"
            name="sourceOfHire"
            value={data.sourceOfHire || ""}
            onChange={onChange}
            placeholder="e.g. LinkedIn, Referral"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Working Days
        </label>
        <div className="flex flex-wrap gap-2">
          {DAYS.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => onWorkingDayToggle(key)}
              className={`px-4 py-2 rounded-lg border text-sm transition-colors ${customWorkingDays[key]
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white text-slate-600 border-slate-300 hover:bg-slate-50"
                }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t pt-4">
        <h4 className="font-medium text-slate-800 mb-3 flex items-center gap-2">
          <Briefcase size={16} /> Office Details
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Department
            </label>
            <input
              type="text"
              name="department"
              value={data.department || ""}
              onChange={onChange}
              placeholder="e.g. Engineering"
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Designation
            </label>
            <input
              type="text"
              name="designation"
              value={data.designation || ""}
              onChange={onChange}
              placeholder="e.g. Software Engineer"
              className={inputClass}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={data.location || ""}
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
