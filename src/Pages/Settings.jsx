import React, { useState } from "react";
import { Sun, Moon, User, Bell, LogOut, Settings as SettingsIcon } from "lucide-react";

const Settings = () => {
  // Example: theme state (could also be in a store)
  const [theme, setTheme] = useState("light");

  // Example: user profile data (mocked)
  const [profile, setProfile] = useState({
    name: "Admin User",
    email: "admin@example.com",
    phone: "+251 911 22 33 44",
  });

  const [notifications, setNotifications] = useState({
    newBooking: true,
    cancellations: false,
    promotions: true,
  });

  // Theme toggle handler
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
        <SettingsIcon size={24} /> Settings
      </h1>

      {/* Theme Settings */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 flex justify-between items-center">
        <div>
          <h2 className="font-bold text-slate-900 dark:text-slate-100">Theme</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Toggle between light and dark mode
          </p>
        </div>
        <button
          onClick={toggleTheme}
          className="flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-700 text-indigo-600 dark:text-indigo-200 hover:bg-indigo-100 dark:hover:bg-indigo-600 transition"
        >
          {theme === "light" ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      {/* Profile Settings */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 space-y-4">
        <h2 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <User size={18} /> Profile
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Full Name"
            value={profile.name}
            onChange={(val) => setProfile({ ...profile, name: val })}
          />
          <InputField
            label="Email"
            value={profile.email}
            onChange={(val) => setProfile({ ...profile, email: val })}
          />
          <InputField
            label="Phone"
            value={profile.phone}
            onChange={(val) => setProfile({ ...profile, phone: val })}
          />
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 space-y-4">
        <h2 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Bell size={18} /> Notifications
        </h2>
        <ToggleSwitch
          label="New Bookings"
          checked={notifications.newBooking}
          onChange={(val) => setNotifications({ ...notifications, newBooking: val })}
        />
        <ToggleSwitch
          label="Cancellations"
          checked={notifications.cancellations}
          onChange={(val) => setNotifications({ ...notifications, cancellations: val })}
        />
        <ToggleSwitch
          label="Promotions / Offers"
          checked={notifications.promotions}
          onChange={(val) => setNotifications({ ...notifications, promotions: val })}
        />
      </div>

      {/* Account Actions */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 flex justify-end">
        <button className="flex items-center gap-2 px-4 py-2 bg-rose-600 text-white rounded-xl font-bold hover:bg-rose-700 transition">
          <LogOut size={16} /> Logout
        </button>
      </div>
    </div>
  );
};

// Reusable input component
const InputField = ({ label, value, onChange }) => (
  <div className="flex flex-col">
    <label className="text-xs text-slate-500 dark:text-slate-400 mb-1">{label}</label>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border border-slate-300 dark:border-slate-600 rounded-lg p-2 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition"
    />
  </div>
);

// Reusable toggle switch component
const ToggleSwitch = ({ label, checked, onChange }) => (
  <div className="flex items-center justify-between">
    <span className="text-sm text-slate-700 dark:text-slate-300">{label}</span>
    <button
      onClick={() => onChange(!checked)}
      className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
        checked ? "bg-indigo-600" : "bg-slate-300 dark:bg-slate-600"
      }`}
    >
      <span
        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
          checked ? "translate-x-6" : "translate-x-0"
        }`}
      ></span>
    </button>
  </div>
);

export default Settings;
