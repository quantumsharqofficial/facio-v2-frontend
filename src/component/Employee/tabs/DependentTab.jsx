const inputClass =
  "w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none";
  
const DependentTab = ({ data, onChange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input
        name="name"
        value={data.name}
        onChange={onChange}
        placeholder="Dependent Name"
        className={inputClass}
      />

      <input
        name="relationship"
        value={data.relationship}
        onChange={onChange}
        placeholder="Relationship"
        className={inputClass}
      />

      <input
        type="date"
        name="dateOfBirth"
        value={data.dateOfBirth}
        onChange={onChange}
        className={inputClass}
      />
    </div>
  );
};

export default DependentTab;

