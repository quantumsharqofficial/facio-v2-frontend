import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  User,
  UserCircle,
  Briefcase,
  MapPin,
  CreditCard,
  ShieldCheck,
  FileText,
  GraduationCap,
  Users,
  ChevronLeft,
  ChevronRight,
  Edit2,
} from "lucide-react";
import AxiosInstance from "../../utilits/axiosInstance";

const tabs = [
  { name: "Basic Info", icon: UserCircle },
  { name: "Personal", icon: User },
  { name: "Work Info", icon: Briefcase },
  { name: "Contact", icon: MapPin },
  { name: "Bank", icon: CreditCard },
  { name: "Identity", icon: ShieldCheck },
  { name: "Experience", icon: FileText },
  { name: "Education", icon: GraduationCap },
  { name: "Dependent", icon: Users },
];

const ViewEmployee = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState(0);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, [id]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await AxiosInstance.get(`/employees/${id}/full`);
      setProfile(res?.data?.data);
    } catch (error) {
      console.error("Error fetching employee:", error);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "—";
    return new Date(date).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const val = (v) => (v != null && v !== "" ? String(v) : "—");

  if (loading) {
    return (
      <div className="ml-64 min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto" />
          <p className="mt-4 text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="ml-64 min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600">Employee not found</p>
          <button
            onClick={() => navigate("/employee")}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const { basic, personal, work, identity, contact, experience, education, dependents, bank } = profile;

  const renderBasicInfo = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-500 mb-1">First Name</label>
          <p className="text-slate-900">{val(basic?.firstName)}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-500 mb-1">Last Name</label>
          <p className="text-slate-900">{val(basic?.lastName)}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-500 mb-1">Employee Code</label>
          <p className="text-slate-900">{val(basic?.employeeCode)}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-500 mb-1">Status</label>
          <p className="text-slate-900">{val(basic?.status)}</p>
        </div>
      </div>
      <div className="border-t pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-500 mb-1">Email</label>
          <p className="text-slate-900">{val(basic?.email)}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-500 mb-1">Phone</label>
          <p className="text-slate-900">{val(basic?.phone)}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-500 mb-1">Department</label>
          <p className="text-slate-900">{val(basic?.department)}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-500 mb-1">Designation</label>
          <p className="text-slate-900">{val(basic?.designation)}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-500 mb-1">Joining Date</label>
          <p className="text-slate-900">{formatDate(basic?.joiningDate)}</p>
        </div>
        {basic?.exitDate && (
          <div>
            <label className="block text-sm font-medium text-slate-500 mb-1">Exit Date</label>
            <p className="text-slate-900">{formatDate(basic.exitDate)}</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderPersonal = () => (
    <div className="space-y-4">
      <div className="flex gap-6">
        {basic?.photo && (
          <div className="w-1/2 h-[30vh] rounded-xl p-2 overflow-hidden border-2 border-slate-200">
            <img src={basic.photo} alt="Profile" className="w-full h-full object-cover" />
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
          <div className="">
            <label className="block text-sm font-medium text-slate-500 mb-1">Date of Birth</label>
            <p className="text-slate-900">{formatDate(personal?.dateOfBirth)}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-500 mb-1">Age</label>
            <p className="text-slate-900">{val(personal?.age)}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-500 mb-1">Gender</label>
            <p className="text-slate-900">{val(personal?.gender)}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-500 mb-1">Marital Status</label>
            <p className="text-slate-900">{val(personal?.maritalStatus)}</p>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-500 mb-1">About Me</label>
            <p className="text-slate-900 whitespace-pre-wrap">{val(personal?.aboutMe)}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-500 mb-1">Expertise</label>
            <p className="text-slate-900">{val(personal?.expertise)}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderWork = () => {
    const workingDays = work?.customWorkingDays || [];

    const dayLabels = {
      1: "Monday",
      2: "Tuesday",
      3: "Wednesday",
      4: "Thursday",
      5: "Friday",
      6: "Saturday",
      7: "Sunday"

    };

    const activeDays = workingDays
      .map((d) => dayLabels[d])
      .filter(Boolean);

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-500 mb-1">
              Employment Type
            </label>
            <p className="text-slate-900">{val(work?.employmentType)}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-500 mb-1">
              Source of Hire
            </label>
            <p className="text-slate-900">{val(work?.sourceOfHire)}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-500 mb-1">
              Working Days
            </label>
            <p className="text-slate-900">
              {activeDays.length ? activeDays.join(", ") : "—"}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-500 mb-1">
              Department
            </label>
            <p className="text-slate-900">{val(work?.department)}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-500 mb-1">
              Designation
            </label>
            <p className="text-slate-900">{val(work?.designation)}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-500 mb-1">
              Location
            </label>
            <p className="text-slate-900">{val(work?.location)}</p>
          </div>
        </div>
      </div>
    );
  };


  const renderContact = () => {
    const addr = (a) => {
      if (!a || (!a.line1 && !a.city)) return "—";
      const parts = [a.line1, a.line2, a.city, a.state, a.country, a.postalCode].filter(Boolean);
      return parts.join(", ");
    };
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-500 mb-1">Personal Mobile</label>
            <p className="text-slate-900">{val(contact?.personalMobile)}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-500 mb-1">Personal Email</label>
            <p className="text-slate-900">{val(contact?.personalEmail)}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-500 mb-1">Work Phone</label>
            <p className="text-slate-900">{val(contact?.workPhone)}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-500 mb-1">Extension</label>
            <p className="text-slate-900">{val(contact?.extension)}</p>
          </div>
        </div>
        <div className="border-t pt-4">
          <label className="block text-sm font-medium text-slate-500 mb-1">Present Address</label>
          <p className="text-slate-900">{addr(contact?.presentAddress)}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-500 mb-1">Permanent Address</label>
          <p className="text-slate-900">{addr(contact?.permanentAddress)}</p>
        </div>
      </div>
    );
  };

  const renderBank = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-slate-500 mb-1">Account Holder Name</label>
        <p className="text-slate-900">{val(bank?.accountHolderName)}</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-500 mb-1">Bank Name</label>
        <p className="text-slate-900">{val(bank?.bankName)}</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-500 mb-1">Account Number</label>
        <p className="text-slate-900">{val(bank?.accountNumber)}</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-500 mb-1">IFSC Code</label>
        <p className="text-slate-900">{val(bank?.ifscCode)}</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-500 mb-1">Branch Name</label>
        <p className="text-slate-900">{val(bank?.branchName)}</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-500 mb-1">Account Type</label>
        <p className="text-slate-900">{val(bank?.accountType)}</p>
      </div>
    </div>
  );

  const renderIdentity = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-slate-500 mb-1">PAN</label>
        <p className="text-slate-900">{val(identity?.pan)}</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-500 mb-1">Aadhaar</label>
        <p className="text-slate-900">{val(identity?.aadhaar)}</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-500 mb-1">UAN</label>
        <p className="text-slate-900">{val(identity?.uan)}</p>
      </div>
    </div>
  );

  const renderExperience = () => (
    <div className="space-y-4">
      {experience?.length ? (
        experience.map((exp, i) => (
          <div key={i} className="p-4 border border-slate-200 rounded-xl">
            <p className="font-medium text-slate-900">{val(exp.companyName)}</p>
            <p className="text-sm text-slate-600">{val(exp.jobTitle)}</p>
            <p className="text-xs text-slate-500">
              {formatDate(exp.fromDate)} – {formatDate(exp.toDate)}
            </p>
            <p className="text-sm mt-2">{val(exp.jobDescription)}</p>
          </div>
        ))
      ) : (
        <p className="text-slate-500">No experience added</p>
      )}
    </div>
  );

  const renderEducation = () => (
    <div className="space-y-4">
      {education?.length ? (
        education.map((edu, i) => (
          <div key={i} className="p-4 border border-slate-200 rounded-xl">
            <p className="font-medium text-slate-900">{val(edu.instituteName)}</p>
            <p className="text-sm text-slate-600">{val(edu.degree)} – {val(edu.specialization)}</p>
            <p className="text-xs text-slate-500">{formatDate(edu.completionDate)}</p>
          </div>
        ))
      ) : (
        <p className="text-slate-500">No education added</p>
      )}
    </div>
  );

  const renderDependent = () => (
    <div className="space-y-4">
      {dependents?.length ? (
        dependents.map((dep, i) => (
          <div key={i} className="p-4 border border-slate-200 rounded-xl">
            <p className="font-medium text-slate-900">{val(dep.name)}</p>
            <p className="text-sm text-slate-600">{val(dep.relationship)}</p>
            <p className="text-xs text-slate-500">{formatDate(dep.dateOfBirth)}</p>
          </div>
        ))
      ) : (
        <p className="text-slate-500">No dependents added</p>
      )}
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 0: return renderBasicInfo();
      case 1: return renderPersonal();
      case 2: return renderWork();
      case 3: return renderContact();
      case 4: return renderBank();
      case 5: return renderIdentity();
      case 6: return renderExperience();
      case 7: return renderEducation();
      case 8: return renderDependent();
      default: return null;
    }
  };

  return (
    <div className="ml-64 min-h-screen bg-slate-50 flex items-center justify-center px-6 py-8">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-md border border-slate-200 p-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-slate-900">View Employee</h1>
          <p className="text-sm text-slate-600 mt-1">
            {basic?.firstName} {basic?.lastName}
          </p>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab, i) => {
            const Icon = tab.icon;
            return (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={`flex items-center gap-2 text-nowrap px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeTab === i
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
              >
                <Icon size={16} />
                {tab.name}
              </button>
            );
          })}
        </div>

        <div className="min-h-[300px]">{renderTabContent()}</div>

        <div className="flex justify-between gap-3 mt-8 pt-6 border-t border-slate-200">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 text-sm border border-slate-300 rounded-xl hover:bg-slate-100"
          >
            <ChevronLeft size={16} /> Back
          </button>
          <button
            onClick={() => navigate(`/edit-employee/${id}`)}
            className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl"
          >
            <Edit2 size={16} /> Edit Employee
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewEmployee;
