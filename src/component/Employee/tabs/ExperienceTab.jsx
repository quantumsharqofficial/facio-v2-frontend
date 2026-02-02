const inputClass =
  "w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none";
const ExperienceTab = ({ data, onChange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input
        name="companyName"
        value={data.companyName}
        onChange={onChange}
        placeholder="Company Name"
        className={inputClass}
      />

      <input
        name="jobTitle"
        value={data.jobTitle}
        onChange={onChange}
        placeholder="Job Title"
        className={inputClass}
      />

      <input
        type="date"
        name="fromDate"
        value={data.fromDate}
        onChange={onChange}
        className={inputClass}
      />

      <input
        type="date"
        name="toDate"
        value={data.toDate}
        onChange={onChange}
        className={inputClass}
      />

      <textarea
        name="jobDescription"
        value={data.jobDescription}
        onChange={onChange}
        placeholder="Job Description"
        className={`${inputClass} md:col-span-2`}
      />

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          name="relevant"
          checked={data.relevant}
          onChange={(e) =>
            onChange({
              target: { name: "relevant", value: e.target.checked },
            })
          }
        />
        Relevant Experience
      </label>
    </div>
  );
};

export default ExperienceTab;
