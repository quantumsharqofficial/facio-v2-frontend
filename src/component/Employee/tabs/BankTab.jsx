const inputClass =
  "w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none";

const BankTab = ({ data, onChange }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Account Holder Name
          </label>
          <input
            type="text"
            name="accountHolderName"
            value={data.accountHolderName}
            onChange={onChange}
            placeholder="Full name as per bank"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Bank Name
          </label>
          <input
            type="text"
            name="bankName"
            value={data.bankName}
            onChange={onChange}
            placeholder="e.g. State Bank of India"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Account Number
          </label>
          <input
            type="text"
            name="accountNumber"
            value={data.accountNumber}
            onChange={onChange}
            placeholder="Account number"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            IFSC Code
          </label>
          <input
            type="text"
            name="ifscCode"
            value={data.ifscCode}
            onChange={onChange}
            placeholder="e.g. SBIN0001234"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Branch Name
          </label>
          <input
            type="text"
            name="branchName"
            value={data.branchName}
            onChange={onChange}
            placeholder="Branch name"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Account Type
          </label>
          <select
            name="accountType"
            value={data.accountType}
            onChange={onChange}
            className={inputClass}
          >
            <option value="SALARY">Salary</option>
            <option value="SAVINGS">Savings</option>
            <option value="CURRENT">Current</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default BankTab;
