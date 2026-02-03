import { Mail, Briefcase, Calendar, Key } from "lucide-react";

const inputClass =
  "w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none";

const BasicInfoTab = ({ data, onChange }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="firstName"
            required
            value={data.firstName}
            onChange={onChange}
            placeholder="John"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="lastName"
            required
            value={data.lastName}
            onChange={onChange}
            placeholder="Doe"
            className={inputClass}
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Employee Code
          </label>
          <input
            type="text"
            name="employeeCode"
            value={data.employeeCode}
            onChange={onChange}
            placeholder="Employee Code"
            className={inputClass}
          />
        </div>
      </div>

      <div className="border-t pt-4">
        <h3 className="text-sm font-medium text-slate-800 mb-3 flex items-center gap-2">
          <Mail size={14} /> Contact
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={onChange}
              placeholder="john@company.com"
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={data.phone}
              onChange={onChange}
              placeholder="+91 9876543210"
              className={inputClass}
            />
          </div>
        </div>
      </div>

      <div className="border-t pt-4">
        <h3 className="text-sm font-medium text-slate-800 mb-3 flex items-center gap-2">
          <Briefcase size={14} /> Work
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Department
            </label>
            <input
              type="text"
              name="department"
              value={data.department}
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
              value={data.designation}
              onChange={onChange}
              placeholder="e.g. Software Engineer"
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              <Calendar size={14} className="inline mr-1" /> Joining Date
            </label>
            <input
              type="date"
              name="joiningDate"
              value={data.joiningDate || ""}
              onChange={onChange}
              className={inputClass}
            />
          </div>
          {data.exitDate !== undefined && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                <Calendar size={14} className="inline mr-1" /> Exit Date
              </label>
              <input
                type="date"
                name="exitDate"
                value={data.exitDate || ""}
                onChange={onChange}
                className={inputClass}
              />
            </div>
          )}

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Status
            </label>
            <select
              name="status"
              value={data.status || "ACTIVE"}
              onChange={onChange}
              className={inputClass}
            >
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
              <option value="TERMINATED">Terminated</option>
            </select>
          </div>
        </div>
      </div>

      {data.createLogin !== undefined && (
        <div className="border-t pt-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="createLogin"
              checked={data.createLogin || false}
              onChange={onChange}
              className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="text-sm font-medium text-slate-700 flex items-center gap-1">
              <Key size={14} /> Create login credentials
            </span>
          </label>
          {data.createLogin && (
            <div className="mt-3">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Initial Password
              </label>
              <input
                type="password"
                name="password"
                value={data.password}
                onChange={onChange}
                placeholder="Set password for employee login"
                className={inputClass}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BasicInfoTab;
