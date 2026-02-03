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
  Save,
} from "lucide-react";
import AxiosInstance from "../../utilits/axiosInstance";

import BasicInfoTab from "./tabs/BasicInfoTab";
import PersonalTab from "./tabs/PersonalTab";
import WorkInfoTab from "./tabs/WorkInfoTab";
import ContactTab from "./tabs/ContactTab";
import BankTab from "./tabs/BankTab";
import IdentityTab from "./tabs/IdentityTab";
import ExperienceTab from "./tabs/ExperienceTab";
import EducationTab from "./tabs/EducationTab";
import DependentTab from "./tabs/DependentTab";

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

const parseDate = (d) => (d ? (d.split?.("T")?.[0] || d) : "");
const emptyAddr = () => ({ line1: "", line2: "", city: "", state: "", country: "", postalCode: "" });

const EditEmployee = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [basic, setBasic] = useState({
    firstName: "",
    lastName: "",
    employeeCode: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
    joiningDate: "",
    exitDate: "",
    status: "ACTIVE",
  });

  const [personal, setPersonal] = useState({
    dateOfBirth: "",
    age: "",
    gender: "",
    maritalStatus: "",
    aboutMe: "",
    expertise: "",
    photo: null,
  });

  const [work, setWork] = useState({
    employmentType: "",
    sourceOfHire: "",
    location: "",
    department: "",
    designation: "",
    customWorkingDays: {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
    },
  });

  const [contact, setContact] = useState({
    personalMobile: "",
    personalEmail: "",
    workPhone: "",
    extension: "",
    presentAddress: emptyAddr(),
    permanentAddress: emptyAddr(),
    sameAsPresent: false,
  });

  const [bank, setBank] = useState({
    accountHolderName: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    branchName: "",
    accountType: "SALARY",
  });

  const [identity, setIdentity] = useState({ pan: "", aadhaar: "", uan: "" });

  const [experience, setExperience] = useState({
    companyName: "",
    jobTitle: "",
    fromDate: "",
    toDate: "",
    jobDescription: "",
    relevant: false,
  });

  const [education, setEducation] = useState({
    instituteName: "",
    degree: "",
    specialization: "",
    completionDate: "",
  });

  const [dependent, setDependent] = useState({
    name: "",
    relationship: "",
    dateOfBirth: "",
  });

  const calculateAge = (dob) => {
    if (!dob) return "";
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    return age;
  };

  useEffect(() => {
    fetchProfile();
  }, [id]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await AxiosInstance.get(`/employees/${id}/full`);
      const p = res?.data?.data;
      if (!p) return;

      const b = p.basic || {};
      setBasic({
        firstName: b.firstName || "",
        lastName: b.lastName || "",
        employeeCode: b.employeeCode || "",
        email: b.email || "",
        phone: b.phone || "",
        department: b.department || "",
        designation: b.designation || "",
        joiningDate: parseDate(b.joiningDate),
        exitDate: parseDate(b.exitDate),
        status: b.status || "ACTIVE",
      });

      const per = p.personal || {};
      setPersonal({
        dateOfBirth: parseDate(per.dateOfBirth),
        age: per.age ? String(per.age) : "",
        gender: per.gender || "",
        maritalStatus: per.maritalStatus || "",
        aboutMe: per.aboutMe || "",
        expertise: per.expertise || "",
        photo: null,
      });

      const w = p.work || {};
      const days = w.customWorkingDays || {};
      setWork({
        employmentType: w.employmentType || "",
        sourceOfHire: w.sourceOfHire || "",
        location: w.location || "",
        department: w.department || "",
        designation: w.designation || "",
        customWorkingDays: {
          monday: !!days.monday,
          tuesday: !!days.tuesday,
          wednesday: !!days.wednesday,
          thursday: !!days.thursday,
          friday: !!days.friday,
          saturday: !!days.saturday,
          sunday: !!days.sunday,
        },
      });

      const c = p.contact || {};
      const pa = c.presentAddress || {};
      const perm = c.permanentAddress || {};
      setContact({
        personalMobile: c.personalMobile || "",
        personalEmail: c.personalEmail || "",
        workPhone: c.workPhone || "",
        extension: c.extension || "",
        presentAddress: {
          line1: pa.line1 || "",
          line2: pa.line2 || "",
          city: pa.city || "",
          state: pa.state || "",
          country: pa.country || "",
          postalCode: pa.postalCode || "",
        },
        permanentAddress: {
          line1: perm.line1 || "",
          line2: perm.line2 || "",
          city: perm.city || "",
          state: perm.state || "",
          country: perm.country || "",
          postalCode: perm.postalCode || "",
        },
        sameAsPresent: false,
      });

      const bn = p.bank || {};
      setBank({
        accountHolderName: bn.accountHolderName || "",
        bankName: bn.bankName || "",
        accountNumber: bn.accountNumber || "",
        ifscCode: bn.ifscCode || "",
        branchName: bn.branchName || "",
        accountType: bn.accountType || "SALARY",
      });

      const idn = p.identity || {};
      setIdentity({
        pan: idn.pan || "",
        aadhaar: idn.aadhaar || "",
        uan: idn.uan || "",
      });

      if (p.experience?.[0]) {
        const e = p.experience[0];
        setExperience({
          companyName: e.companyName || "",
          jobTitle: e.jobTitle || "",
          fromDate: parseDate(e.fromDate),
          toDate: parseDate(e.toDate),
          jobDescription: e.jobDescription || "",
          relevant: e.relevant || false,
        });
      }

      if (p.education?.[0]) {
        const e = p.education[0];
        setEducation({
          instituteName: e.instituteName || "",
          degree: e.degree || "",
          specialization: e.specialization || "",
          completionDate: parseDate(e.completionDate),
        });
      }

      if (p.dependents?.[0]) {
        const d = p.dependents[0];
        setDependent({
          name: d.name || "",
          relationship: d.relationship || "",
          dateOfBirth: parseDate(d.dateOfBirth),
        });
      }
    } catch (error) {
      console.error("Error fetching employee:", error);
      alert("Failed to load employee");
    } finally {
      setLoading(false);
    }
  };

  const handleBasicChange = (e) => {
    const { name, value } = e.target;
    setBasic((prev) => ({ ...prev, [name]: value }));
  };

  const handlePersonalChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setPersonal((prev) => ({ ...prev, [name]: files?.[0] }));
      return;
    }
    if (name === "dateOfBirth") {
      setPersonal((prev) => ({
        ...prev,
        dateOfBirth: value,
        age: calculateAge(value),
      }));
    } else {
      setPersonal((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleWorkChange = (e) => {
    const { name, value } = e.target;
    setWork((prev) => ({ ...prev, [name]: value }));
  };

  const handleWorkingDayToggle = (dayKey) => {
    setWork((prev) => ({
      ...prev,
      customWorkingDays: {
        ...prev.customWorkingDays,
        [dayKey]: !prev.customWorkingDays?.[dayKey],
      },
    }));
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContact((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (type, field, value) => {
    setContact((prev) => ({
      ...prev,
      [type]: { ...prev[type], [field]: value },
    }));
  };

  const handleSameAsPresent = (checked) => {
    setContact((prev) => ({
      ...prev,
      sameAsPresent: checked,
      permanentAddress: checked ? { ...prev.presentAddress } : prev.permanentAddress,
    }));
  };

  const handleBankChange = (e) => {
    const { name, value } = e.target;
    setBank((prev) => ({ ...prev, [name]: value }));
  };

  const handleIdentityChange = (e) => {
    const { name, value } = e.target;
    setIdentity((p) => ({ ...p, [name]: value }));
  };

  const handleExperienceChange = (e) => {
    const { name, value, type, checked } = e.target;
    setExperience((p) => ({
      ...p,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleEducationChange = (e) => {
    const { name, value } = e.target;
    setEducation((p) => ({ ...p, [name]: value }));
  };

  const handleDependentChange = (e) => {
    const { name, value } = e.target;
    setDependent((p) => ({ ...p, [name]: value }));
  };

  const saveTab = async () => {
    setSaving(true);
    try {
      let endpoint = "";
      let payload = {};
      let method = "put";

      switch (activeTab) {
        case 0: {
          payload = {
            firstName: basic.firstName.trim(),
            lastName: basic.lastName.trim(),
            employeeCode: basic.employeeCode.trim(),
            email: basic.email.trim() || undefined,
            phone: basic.phone.trim() || undefined,
            department: basic.department.trim() || undefined,
            designation: basic.designation.trim() || undefined,
            joiningDate: basic.joiningDate || undefined,
            exitDate: basic.exitDate || undefined,
            status: basic.status,
          };
          const res = await AxiosInstance.put(`/employees/${id}`, payload);
          if (res?.data?.success) return true;
          return false;
        }
        case 1: {
          const pPayload = {
            dateOfBirth: personal.dateOfBirth || null,
            age: personal.age || null,
            gender: personal.gender || null,
            maritalStatus: personal.maritalStatus || null,
            aboutMe: personal.aboutMe || null,
            expertise: personal.expertise || null,
          };
          await AxiosInstance.put(`/employees/${id}/personal`, pPayload);
          if (personal.photo) {
            const fd = new FormData();
            fd.append("photo", personal.photo);
            await AxiosInstance.post(`/employees/${id}/photo`, fd, {
              headers: { "Content-Type": "multipart/form-data" },
            });
          }
          return true;
        }
        case 2:
          endpoint = `/employees/${id}/work`;
          payload = work;
          break;
        case 3:
          endpoint = `/employees/${id}/contact`;
          payload = contact;
          break;
        case 4:
          endpoint = `/employees/${id}/bank`;
          payload = bank;
          break;
        case 5:
          endpoint = `/employees/${id}/identity`;
          payload = identity;
          break;
        case 6:
          endpoint = `/employees/${id}/experience`;
          payload = experience;
          method = "post";
          break;
        case 7:
          endpoint = `/employees/${id}/education`;
          payload = education;
          method = "post";
          break;
        case 8:
          endpoint = `/employees/${id}/dependent`;
          payload = dependent;
          method = "post";
          break;
        default:
          return false;
      }

      if (endpoint) {
        await AxiosInstance[method](endpoint, payload);
        return true;
      }
    } catch (error) {
      console.error("Error saving:", error);
      alert(error.response?.data?.message || "Failed to save");
      return false;
    } finally {
      setSaving(false);
    }
  };

  const handleSave = async () => {
    const ok = await saveTab();
    if (ok) {
      alert("Saved successfully!");
      if (activeTab === 0) navigate(`/view-employee/${id}`);
    }
  };

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

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <BasicInfoTab data={basic} onChange={handleBasicChange} />;
      case 1:
        return <PersonalTab data={personal} onChange={handlePersonalChange} />;
      case 2:
        return (
          <WorkInfoTab
            data={work}
            onChange={handleWorkChange}
            onWorkingDayToggle={handleWorkingDayToggle}
          />
        );
      case 3:
        return (
          <ContactTab
            data={contact}
            onChange={handleContactChange}
            onAddressChange={handleAddressChange}
            onSameAsPresent={handleSameAsPresent}
          />
        );
      case 4:
        return <BankTab data={bank} onChange={handleBankChange} />;
      case 5:
        return <IdentityTab data={identity} onChange={handleIdentityChange} />;
      case 6:
        return <ExperienceTab data={experience} onChange={handleExperienceChange} />;
      case 7:
        return <EducationTab data={education} onChange={handleEducationChange} />;
      case 8:
        return <DependentTab data={dependent} onChange={handleDependentChange} />;
      default:
        return null;
    }
  };

  return (
    <div className="ml-64 min-h-screen bg-slate-50 flex items-center justify-center px-6 py-8">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-md border border-slate-200 p-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Edit Employee</h1>
          <p className="text-sm text-slate-600 mt-1">
            Update employee information
          </p>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab, i) => {
            const Icon = tab.icon;
            return (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeTab === i
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
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => navigate(`/view-employee/${id}`)}
              className="px-4 py-2 text-sm border border-slate-300 rounded-xl hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save"} <Save size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEmployee;
