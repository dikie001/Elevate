import { School, Shield, Trash2, User, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import DesktopSidebar from "../../components/DesktopSidebar";
import Navbar from "../../components/Navbar";
import toast from "react-hot-toast";

interface ProfileTypes {
  email: string;
  grade: string;
  nickName: string;
  passcode: string;
  school: string;
}

interface UserDataTypes {
  user_id: string;
  email: string;
  grade: string;
  nickName: string;
  passcode: string;
  school: string;
}

const AccountModal = () => {
  const [showMyInfo, setShowMyInfo] = useState(false);
  const [showSchool, setShowSchool] = useState(false);
  const [showSecurity, setShowSecurity] = useState(false);
  const [isSecured, setIsSecured] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const userDataRef = useRef<UserDataTypes>({
    user_id: "",
    email: "",
    grade: "",
    nickName: "",
    passcode: "",
    school: "",
  });
  const [currentPassword, setCurrentPassword] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [profileSettings, setProfileSettings] = useState<ProfileTypes>({
    email: "",
    grade: "",
    nickName: "",
    passcode: "",
    school: "",
  });

  useEffect(() => {
    const LoadSettingsData = () => {
      try {
        const rawData = localStorage.getItem("elevate-settings");
        const parsedData = rawData && JSON.parse(rawData);
        setProfileSettings(parsedData.profileSettings);

        // USer DATA
        const rawUserData = localStorage.getItem("userData");
        userDataRef.current = rawUserData && JSON.parse(rawUserData);
        if (parsedData && parsedData.profileSettings.passcode !== "") {
          setIsSecured(true);
        } else {
          setIsSecured(false);
        }
      } catch (err) {
        console.error(err);
      }
    };
    LoadSettingsData();
  }, []);

  //   Upldate the profile settings object
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileSettings((prev) => ({ ...prev, [name]: value }));
  };

  // Save changes made
  const HandleSaveChanges = async (params: string) => {
    const formData = new FormData();
    //1. Creating password Validation
    if (params === "createPassword") {
      if (profileSettings.passcode !== confirmPassword) {
        toast.error("Make sure the passwords match", { id: "password-error1" });
        return;
      }
      formData.append("create_passcode", profileSettings.passcode);
      try {
        const response = await fetch(
          `http://localhost:4000/api/update_user/create_passcode/${userDataRef.current.user_id}`,
          {
            method: "POST",
            body: formData,
          }
        );
        const res = await response.json();
        console.log(res);
      } catch (err) {
        console.error(err);
      }

      // Changing password Validation
    } else if (params === "changePassword") {
      if (currentPassword !== profileSettings.passcode) {
        toast.error("You have entered the wrong password", {
          id: "password-error2",
        });
        return;
      }
      // SEND TO BACKEND
      console.log("Correct! moving on....");
      formData.append("change_passcode", profileSettings.passcode);
      try {
        const response = await fetch("http://localhost:4000/api/update_user", {
          method: "POST",
          body: formData,
        });
        const res = await response.json();
        console.log(res);
      } catch (err) {
        console.error(err);
      }
    }
    // My Info inputs validation
    else if (params === "myInfo") {
      // Email validation
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValid = regex.test(profileSettings.email);

      if (profileSettings.nickName.trim() === "") {
        toast.error("Please enter your nick name", { id: "nickname-error" });
        return;
      } else if (profileSettings.email.trim() === "") {
        toast.error("Please enter your email", { id: "email-error" });
        return;
      }
      if (!isValid) {
        toast.error("The email is incorrect, try again", { id: "email-error" });
        return;
      }
    }

    // School inputs validation
    else if (params === "school") {
      if (profileSettings.school.trim() === "") {
        toast.error("Enter your school's name", { id: "school-error" });
        return;
      } else if (profileSettings.grade.trim() === "") {
        toast.error("Enter your current grade", { id: "grade-error" });
        return;
      }
    }

    console.log(profileSettings);
    console.log(confirmPassword);
  };
  return (
    <div className="min-h-screen lg:ml-70 bg-gray-50 text-gray-900">
      <DesktopSidebar />
      <Navbar />

      <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Account Settings
        </h1>

        <div className="max-w-4xl space-y-6">
          {/* My Info Section */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
            <button
              onClick={() => setShowMyInfo(!showMyInfo)}
              className="w-full flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white transition-all duration-300 hover:shadow-xl"
            >
              <div className="flex items-center gap-3">
                <User size={24} />
                <span className="text-lg font-semibold">My Info</span>
              </div>
              <ChevronDown
                size={20}
                className={`transition-transform duration-200 ${
                  showMyInfo ? "rotate-180" : ""
                }`}
              />
            </button>

            {showMyInfo && (
              <div className="p-6 space-y-4 bg-gray-50 shadow-lg rounded-2xl">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nickname
                  </label>
                  <input
                    type="text"
                    name="nickName"
                    onChange={handleInputChange}
                    placeholder="Enter your nickname"
                    className="w-full px-4 py-3 border focus:outline-0 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border  focus:outline-0 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <div className="flex justify-end pt-4">
                  <button
                    onClick={() => HandleSaveChanges("myInfo")}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* School Section */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
            <button
              onClick={() => setShowSchool(!showSchool)}
              className="w-full flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white transition-all duration-300 hover:shadow-xl"
            >
              <div className="flex items-center gap-3">
                <School size={24} />
                <span className="text-lg font-semibold">School</span>
              </div>
              <ChevronDown
                size={20}
                className={`transition-transform duration-200 ${
                  showSchool ? "rotate-180" : ""
                }`}
              />
            </button>

            {showSchool && (
              <div className="p-6 space-y-4 bg-gray-50 shadow-lg rounded-2xl">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    School Name
                  </label>
                  <input
                    type="text"
                    name="school"
                    value={profileSettings.school}
                    onChange={handleInputChange}
                    placeholder="Enter your school"
                    className="w-full px-4 py-3 focus:outline-0 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Grade Level
                  </label>
                  <input
                    type="text"
                    value={profileSettings.grade}
                    placeholder="Enter your grade"
                    className="w-full px-4 py-3 border focus:outline-0 border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  />
                </div>
                <div className="flex justify-end pt-4">
                  <button
                    onClick={() => HandleSaveChanges("school")}
                    className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Security Section */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
            <button
              onClick={() => setShowSecurity(!showSecurity)}
              className="w-full flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white transition-all duration-300 hover:shadow-xl"
            >
              <div className="flex items-center gap-3">
                <Shield size={24} />
                <span className="text-lg font-semibold">Security</span>
              </div>
              <ChevronDown
                size={20}
                className={`transition-transform duration-200 ${
                  showSecurity ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* If user has password protection */}
            {showSecurity && isSecured && (
              <div className="p-6 space-y-4 bg-gray-50 shadow-lg rounded-2xl">
                <h3 className="text-lg font-medium text-center">
                  Change your password
                </h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter Current Password
                  </label>
                  <input
                    name="passcode"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    type="password"
                    placeholder="Enter current password"
                    className="w-full px-4 py-3 border focus:outline-0 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full px-4 py-3 border focus:outline-0 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                </div>
                <div className="flex justify-end pt-4">
                  <button
                    onClick={() => HandleSaveChanges("changePassword")}
                    className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {/* If user lacks password protection */}

            {showSecurity && !isSecured && (
              <div className="p-6 space-y-4 bg-gray-50 shadow-lg rounded-2xl">
                <h3 className="text-lg font-medium text-center">
                  Secure your account
                </h3>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Create a Password
                  </label>
                  <input
                    name="passcode"
                    onChange={handleInputChange}
                    value={profileSettings.passcode}
                    type="password"
                    placeholder="Enter current password"
                    className="w-full px-4 py-3 border focus:outline-0 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm your password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full px-4 py-3 border focus:outline-0 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                </div>
                <div className="flex justify-end pt-4">
                  <button
                    onClick={() => HandleSaveChanges("createPassword")}
                    className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Delete Account Section */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 ">
            <button
              onClick={() => setShowDeleteModal(!showDeleteModal)}
              className="w-full flex items-center justify-between p-4 rounded-2xl bg-red-600/90 hover:bg-red-700/90 text-white transition-all duration-300 hover:shadow-xl"
            >
              <div className="flex items-center  gap-3">
                <Trash2 size={24} />
                <span className="text-lg font-semibold">Delete Account</span>
              </div>

              <ChevronDown
                size={20}
                className={`transition-transform duration-200 ${
                  showDeleteModal ? "rotate-180" : ""
                }`}
              />
            </button>
            {showDeleteModal && (
              <div className="p-6 bg-red-50 shadow-lg rounded-2xl">
                <p className="text-red-700 text-sm mb-4">
                  This action cannot be undone. This will permanently delete
                  your account.
                </p>
                <div className="flex justify-between">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="px-6 py-2 bg-gray-600/80 text-white rounded-lg hover:bg-gray-700/80 transition-colors shadow-lg font-medium"
                  >
                    Cancel
                  </button>
                  <button className="px-6 py-2 bg-red-600/80 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
                    Delete Account
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MODALS */}
    </div>
  );
};

export default AccountModal;
