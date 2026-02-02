const inputClass =
  "w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none";
  
  const EducationTab = ({ data, onChange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input
        name="instituteName"
        value={data.instituteName}
        onChange={onChange}
        placeholder="Institute Name"
        className={inputClass}
      />

      <input
        name="degree"
        value={data.degree}
        onChange={onChange}
        placeholder="Degree"
        className={inputClass}
      />

      <input
        name="specialization"
        value={data.specialization}
        onChange={onChange}
        placeholder="Specialization"
        className={inputClass}
      />

      <input
        type="date"
        name="completionDate"
        value={data.completionDate}
        onChange={onChange}
        className={inputClass}
      />
    </div>
  );
};

export default EducationTab;
