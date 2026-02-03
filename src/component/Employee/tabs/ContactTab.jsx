const inputClass =
  "w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none";

const ContactTab = ({ data, onChange, onAddressChange, onSameAsPresent }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Personal Mobile
          </label>
          <input
            type="tel"
            name="personalMobile"
            value={data.personalMobile}
            onChange={onChange}
            placeholder="+91 9876543210"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Personal Email
          </label>
          <input
            type="email"
            name="personalEmail"
            value={data.personalEmail}
            onChange={onChange}
            placeholder="personal@email.com"
            className={inputClass}
          />
        </div>
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
      </div>

      <div className="border-t pt-4">
        <h4 className="font-medium text-slate-800 mb-3">Present Address</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <input
              type="text"
              value={data.presentAddress.line1}
              onChange={(e) => onAddressChange("presentAddress", "line1", e.target.value)}
              placeholder="Address Line 1"
              className={inputClass}
            />
          </div>
          <div className="md:col-span-2">
            <input
              type="text"
              value={data.presentAddress.line2}
              onChange={(e) => onAddressChange("presentAddress", "line2", e.target.value)}
              placeholder="Address Line 2"
              className={inputClass}
            />
          </div>
          <input
            type="text"
            value={data.presentAddress.city}
            onChange={(e) => onAddressChange("presentAddress", "city", e.target.value)}
            placeholder="City"
            className={inputClass}
          />
          <input
            type="text"
            value={data.presentAddress.state}
            onChange={(e) => onAddressChange("presentAddress", "state", e.target.value)}
            placeholder="State"
            className={inputClass}
          />
          <input
            type="text"
            value={data.presentAddress.country}
            onChange={(e) => onAddressChange("presentAddress", "country", e.target.value)}
            placeholder="Country"
            className={inputClass}
          />
          <input
            type="text"
            value={data.presentAddress.postalCode}
            onChange={(e) => onAddressChange("presentAddress", "postalCode", e.target.value)}
            placeholder="Postal Code"
            className={inputClass}
          />
        </div>
      </div>

      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={data.sameAsPresent}
          onChange={(e) => onSameAsPresent(e.target.checked)}
          className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
        />
        <span className="text-sm text-slate-700">Permanent address same as present</span>
      </label>

      {!data.sameAsPresent && (
        <div className="border-t pt-4">
          <h4 className="font-medium text-slate-800 mb-3">Permanent Address</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <input
                type="text"
                value={data.permanentAddress.line1}
                onChange={(e) => onAddressChange("permanentAddress", "line1", e.target.value)}
                placeholder="Address Line 1"
                className={inputClass}
              />
            </div>
            <div className="md:col-span-2">
              <input
                type="text"
                value={data.permanentAddress.line2}
                onChange={(e) => onAddressChange("permanentAddress", "line2", e.target.value)}
                placeholder="Address Line 2"
                className={inputClass}
              />
            </div>
            <input
              type="text"
              value={data.permanentAddress.city}
              onChange={(e) => onAddressChange("permanentAddress", "city", e.target.value)}
              placeholder="City"
              className={inputClass}
            />
            <input
              type="text"
              value={data.permanentAddress.state}
              onChange={(e) => onAddressChange("permanentAddress", "state", e.target.value)}
              placeholder="State"
              className={inputClass}
            />
            <input
              type="text"
              value={data.permanentAddress.country}
              onChange={(e) => onAddressChange("permanentAddress", "country", e.target.value)}
              placeholder="Country"
              className={inputClass}
            />
            <input
              type="text"
              value={data.permanentAddress.postalCode}
              onChange={(e) => onAddressChange("permanentAddress", "postalCode", e.target.value)}
              placeholder="Postal Code"
              className={inputClass}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactTab;
