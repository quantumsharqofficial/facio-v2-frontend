const inputClass =
  "w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none";

  const IdentityTab = ({ data, onChange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium mb-1">PAN Number</label>
        <input
          name="pan"
          value={data.pan}
          onChange={onChange}
          placeholder="ABCDE1234F"
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Aadhaar Number</label>
        <input
          name="aadhaar"
          value={data.aadhaar}
          onChange={onChange}
          placeholder="XXXX XXXX XXXX"
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">UAN Number</label>
        <input
          name="uan"
          value={data.uan}
          onChange={onChange}
          placeholder="Universal Account Number"
          className={inputClass}
        />
      </div>
    </div>
  );
};

export default IdentityTab;
