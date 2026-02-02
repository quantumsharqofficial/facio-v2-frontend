const inputClass =
  "w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none";

const PersonalTab = ({ data, onChange }) => {
  return (
    <div className="space-y-6">
      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left – Personal Details */}
        <div className="md:col-span-2 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* DOB */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={data.dateOfBirth || ""}
                onChange={onChange}
                className={inputClass}
              />
            </div>

            {/* Age */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Age
              </label>
              <input
                type="text"
                name="age"
                value={data.age || ""}
                readOnly
                placeholder="Auto calculated"
                className={`${inputClass} bg-slate-50`}
              />
            </div>
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Gender
            </label>
            <div className="flex gap-6">
              {["MALE", "FEMALE", "OTHER"].map((g) => (
                <label
                  key={g}
                  className="flex items-center gap-2 cursor-pointer text-sm"
                >
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    checked={data.gender === g}
                    onChange={onChange}
                    className="text-indigo-600 focus:ring-indigo-500"
                  />
                  {g.charAt(0) + g.slice(1).toLowerCase()}
                </label>
              ))}
            </div>
          </div>

          {/* Marital Status */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Marital Status
            </label>
            <select
              name="maritalStatus"
              value={data.maritalStatus || ""}
              onChange={onChange}
              className={inputClass}
            >
              <option value="">Select</option>
              <option value="SINGLE">Single</option>
              <option value="MARRIED">Married</option>
            </select>
          </div>
        </div>

        {/* Right – Profile Image */}
        <div className="flex flex-col items-center justify-start gap-3">
          <div className="w-32 h-32 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden bg-slate-50">
            {data.photo ? (
              <img
                src={typeof data.photo === "string" ? data.photo : URL.createObjectURL(data.photo)}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-sm text-slate-400">No Image</span>
            )}
          </div>

          <label className="text-sm text-indigo-600 cursor-pointer font-medium">
            Upload Photo
            <input
              type="file"
              accept="image/*"
              name="photo"
              onChange={onChange}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* About Me */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          About Me
        </label>
        <textarea
          name="aboutMe"
          value={data.aboutMe || ""}
          onChange={onChange}
          rows={3}
          placeholder="Brief description..."
          className={inputClass}
        />
      </div>

      {/* Expertise */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Expertise
        </label>
        <input
          type="text"
          name="expertise"
          value={data.expertise || ""}
          onChange={onChange}
          placeholder="e.g. Node.js, React, Python"
          className={inputClass}
        />
      </div>
    </div>
  );
};

export default PersonalTab;
