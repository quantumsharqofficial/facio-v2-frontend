import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import AxiosInstance from "../../utilits/axiosInstance";
import { getUser } from "../../utilits/auth";

// Tab Components
import BasicInfoTab from "./tabs/BasicInfoTab";
import PersonalTab from "./tabs/PersonalTab";
import WorkInfoTab from "./tabs/WorkInfoTab";
import ContactTab from "./tabs/ContactTab";
import BankTab from "./tabs/BankTab";
import IdentityTab from "./tabs/IdentityTab";
import ExperienceTab from "./tabs/ExperienceTab";
import EducationTab from "./tabs/EducationTab";
import DependentTab from "./tabs/DependentTab";


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
  Check,
} from "lucide-react";

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


const AddEmployee = () => {
  const navigate = useNavigate();
  const user = getUser();
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [completedTabs, setCompletedTabs] = useState([]);
  const [employeeId, setEmployeeId] = useState(null);

  // Basic Info State
  const [basic, setBasic] = useState({
    firstName: "",
    lastName: "",
    employeeCode: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
    joiningDate: "",
    createLogin: true,
    password: "",
    status: "INACTIVE",
  });

  // Personal Info State
  const [personal, setPersonal] = useState({
    dateOfBirth: "",
    age: "",
    gender: "",
    maritalStatus: "",
    aboutMe: "",
    expertise: "",
    photo: null, // ✅ add this
  });

  // Work Info State
  const [work, setWork] = useState({
    employmentType: "",
    shift: "",
    workingDays: [],
    sourceOfHire: "",
    status: "ACTIVE",
    workPhone: "",
    extension: "",
    location: "",
  });

  // Contact State
  const [contact, setContact] = useState({
    personalMobile: "",
    personalEmail: "",
    presentAddress: {
      line1: "",
      line2: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",
    },
    permanentAddress: {
      line1: "",
      line2: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",
    },
    sameAsPresent: false,
  });

  // Bank State
  const [bank, setBank] = useState({
    accountHolderName: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    branchName: "",
    accountType: "SALARY",
  });

  // Identity
  const [identity, setIdentity] = useState({
    pan: "",
    aadhaar: "",
    uan: "",
  });

  // Experience
  const [experience, setExperience] = useState({
    companyName: "",
    jobTitle: "",
    fromDate: "",
    toDate: "",
    jobDescription: "",
    relevant: false,
  });

  // Education
  const [education, setEducation] = useState({
    instituteName: "",
    degree: "",
    specialization: "",
    completionDate: "",
  });

  // Dependent
  const [dependent, setDependent] = useState({
    name: "",
    relationship: "",
    dateOfBirth: "",
  });


  // Helper function to calculate age
  const calculateAge = (dob) => {
    if (!dob) return "";
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Handlers
  const handleBasicChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBasic((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePersonalChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setPersonal((prev) => ({
        ...prev,
        [name]: files[0],
      }));
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

  const handleWorkingDayToggle = (day) => {
    setWork((prev) => ({
      ...prev,
      workingDays: prev.workingDays.includes(day)
        ? prev.workingDays.filter((d) => d !== day)
        : [...prev.workingDays, day],
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


  // Save current tab data
  const saveCurrentTab = async () => {
    setLoading(true);
    try {
      let endpoint = "";
      let payload = {};
      let protocol = "post";

      switch (activeTab) {
        case 0: // Basic Info - Create Employee
          payload = {
            employeeCode: basic.employeeCode.trim() || `EMP${Date.now()}`,
            firstName: basic.firstName.trim(),
            lastName: basic.lastName.trim(),
            email: basic.email.trim() || undefined,
            phone: basic.phone.trim() || undefined,
            department: basic.department.trim() || undefined,
            designation: basic.designation.trim() || undefined,
            joiningDate: basic.joiningDate || undefined,
            companyId: user.companyId,
            password: basic.password || undefined,
            status: basic.password ? "ACTIVE" : "INACTIVE",
          };
          const res = await AxiosInstance.post("/employees/", payload);
          if (res?.data?.success) {
            setEmployeeId(res.data.data._id);
            setCompletedTabs((prev) => [...new Set([...prev, activeTab])]);
            return true;
          }
          return false;

        case 1: // Personal
          // 1️⃣ Save personal details
          endpoint = `/employees/${employeeId}/personal`;
          payload = {
            dateOfBirth: personal.dateOfBirth || null,
            age: personal.age || null,
            gender: personal.gender || null,
            maritalStatus: personal.maritalStatus || null,
            aboutMe: personal.aboutMe || null,
            expertise: personal.expertise || null,
          };
          protocol = "put";

          await AxiosInstance.put(endpoint, payload);

          // 2️⃣ Upload photo (if exists)
          if (personal.photo) {
            const formData = new FormData();
            formData.append("photo", personal.photo);

            await AxiosInstance.post(
              `/employees/${employeeId}/photo`,
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );
          }

          setCompletedTabs((prev) => [...new Set([...prev, activeTab])]);
          return true;

        case 2: // Work
          endpoint = `/employees/${employeeId}/work`;
          payload = work;
          protocol = "put";
          break;
        case 3: // Contact
          endpoint = `/employees/${employeeId}/contact`;
          payload = contact;
          protocol = "put";
          break;
        case 4: // Bank
          endpoint = `/employees/${employeeId}/bank`;
          payload = bank;
          protocol = "put";
          break;
        case 5: // Identity
          endpoint = `/employees/${employeeId}/identity`;
          payload = identity;
          protocol = "put";
          break;

        case 6: // Experience
          endpoint = `/employees/${employeeId}/experience`;
          payload = experience;
          protocol = "post";
          break;

        case 7: // Education
          endpoint = `/employees/${employeeId}/education`;
          payload = education;
          protocol = "post";
          break;

        case 8: // Dependent
          endpoint = `/employees/${employeeId}/dependent`;
          payload = dependent;
          protocol = "post";
          break;

        default:
          return false;
      }

      if (endpoint) {
        await AxiosInstance[protocol](endpoint, payload);

        setCompletedTabs((prev) => [...new Set([...prev, activeTab])]);
        return true;
      }
    } catch (error) {
      console.error("Error saving:", error);
      const msg = error.response?.data?.message || "Failed to save";
      alert(typeof msg === "string" ? msg : JSON.stringify(msg));
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleNext = async () => {
    const saved = await saveCurrentTab();
    if (saved && activeTab < tabs.length - 1) {
      setActiveTab(activeTab + 1);
    }
  };

  const handlePrev = () => {
    if (activeTab > 0) {
      setActiveTab(activeTab - 1);
    }
  };

  const handleFinish = async () => {
    const saved = await saveCurrentTab();
    if (saved) {
      alert("Employee created successfully!");
      navigate("/employee");
    }
  };

  // Render tab content
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
      default:
        return null;

      case 5:
        return <IdentityTab data={identity} onChange={handleIdentityChange} />;
      case 6:
        return <ExperienceTab data={experience} onChange={handleExperienceChange} />;
      case 7:
        return <EducationTab data={education} onChange={handleEducationChange} />;
      case 8:
        return <DependentTab data={dependent} onChange={handleDependentChange} />;

    }
  };

  return (
    <div className="ml-64 min-h-screen bg-slate-50 flex items-center justify-center px-6 py-8">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-md border border-slate-200 p-6">
        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Add Employee</h1>
          <p className="text-sm text-slate-600 mt-1">
            Create a new employee record with complete details
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab, i) => {
            const Icon = tab.icon;
            const isCompleted = completedTabs.includes(i);
            const isDisabled = i > 0 && !employeeId;
            return (
              <button
                key={i}
                onClick={() => !isDisabled && setActiveTab(i)}
                disabled={isDisabled}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeTab === i
                  ? "bg-indigo-600 text-white"
                  : isCompleted
                    ? "bg-green-100 text-green-700 border border-green-300"
                    : isDisabled
                      ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
              >
                {isCompleted && activeTab !== i ? (
                  <Check size={16} />
                ) : (
                  <Icon size={16} />
                )}
                {tab.name}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="min-h-[300px]">{renderTabContent()}</div>

        {/* Navigation Buttons */}
        <div className="flex justify-between gap-3 mt-8 pt-6 border-t border-slate-200">
          <button
            type="button"
            onClick={handlePrev}
            disabled={activeTab === 0}
            className="flex items-center gap-2 px-4 py-2 text-sm border border-slate-300 rounded-xl hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={16} /> Previous
          </button>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => navigate("/employee")}
              className="px-4 py-2 text-sm border border-slate-300 rounded-xl hover:bg-slate-100"
            >
              {employeeId ? "Skip & Finish" : "Cancel"}
            </button>

            {activeTab < tabs.length - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={loading}
                className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl disabled:opacity-50"
              >
                {loading ? "Saving..." : activeTab === 0 ? "Create & Next" : "Save & Next"}{" "}
                <ChevronRight size={16} />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinish}
                disabled={loading}
                className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-xl disabled:opacity-50"
              >
                {loading ? "Saving..." : "Finish"} <Check size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
