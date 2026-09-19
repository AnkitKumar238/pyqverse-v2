import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Settings, 
  Bell, 
  Cloud, 
  ShieldCheck, 
  Globe, 
  Trash2, 
  User, 
  LogOut, 
  CheckCircle2, 
  AlertTriangle, 
  Smartphone, 
  Database,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateUserSettings, logout, showToast } = useApp();
  const settings = user.settings || {
    dailyReminders: true,
    examAlerts: true,
    showTimerAnimations: true,
    multiDeviceCloudSync: true,
    preferredLanguage: 'English',
    soundEffects: false
  };

  const handleToggle = (key: keyof typeof settings) => {
    updateUserSettings({
      [key]: !settings[key]
    });
  };

  const handleClearCache = () => {
    sessionStorage.clear();
    showToast('Local temporary cache cleared successfully.', 'info');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eaedff] text-xs font-bold text-[#2a14b4]">
          <Settings className="w-3.5 h-3.5" />
          <span>Aspirant Settings & Preferences</span>
        </div>
        <h1 className="font-display font-extrabold text-3xl text-[#131b2e]">
          Account & Practice Preferences
        </h1>
        <p className="text-xs sm:text-sm text-[#5e6278]">
          Manage your notification preferences, multi-device cloud synchronization, and examination study settings.
        </p>
      </div>

      {/* 1. MULTI-DEVICE CLOUD SYNC STATUS */}
      <div className="bg-white rounded-3xl border border-[#dae2fd] shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-[#2a14b4] flex items-center justify-center">
              <Cloud className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-[#131b2e]">
                Multi-Device Cloud Synchronization
              </h3>
              <p className="text-xs text-[#5e6278]">
                {user.isLoggedIn
                  ? `Active account: ${user.email} (All devices synced)`
                  : 'Currently in guest mode (Stored on this browser only)'}
              </p>
            </div>
          </div>

          <span className={`text-xs font-bold px-3 py-1 rounded-full ${
            user.isLoggedIn
              ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
              : 'bg-amber-100 text-amber-900 border border-amber-200'
          }`}>
            {user.isLoggedIn ? 'Cloud Sync Enabled' : 'Local Storage Only'}
          </span>
        </div>

        {user.isLoggedIn ? (
          <div className="p-4 rounded-2xl bg-[#faf8ff] border border-[#dae2fd] text-xs text-[#475569] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Your quiz attempts, bookmarks, and target preferences sync automatically across your mobile, tablet, and desktop.</span>
            </div>
            <Link
              to="/profile"
              className="text-xs font-bold text-[#2a14b4] hover:underline whitespace-nowrap"
            >
              Manage Profile →
            </Link>
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-[#fffbeb] border border-amber-200 text-xs text-amber-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
              <span>Register a free account to back up your progress to the cloud and resume your preparation from any device.</span>
            </div>
            <Link
              to="/auth?mode=signup"
              className="px-3.5 py-1.5 bg-[#2a14b4] text-white font-bold rounded-xl text-xs whitespace-nowrap"
            >
              Create Account
            </Link>
          </div>
        )}
      </div>

      {/* 2. STUDY NOTIFICATIONS & ALERTS */}
      <div className="bg-white rounded-3xl border border-[#dae2fd] shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-bold text-base text-[#131b2e]">
              Notification & Mock Test Alerts
            </h3>
            <p className="text-xs text-[#5e6278]">
              Control daily speed sprints and upcoming national examination notification triggers.
            </p>
          </div>
        </div>

        <div className="divide-y divide-[#f1f5f9] text-xs">
          <div className="py-3.5 flex items-center justify-between">
            <div>
              <p className="font-bold text-[#131b2e]">Daily PYQ Speed Sprint Reminders</p>
              <p className="text-[#64748b]">Receive a quick reminder to solve 10 questions every morning.</p>
            </div>
            <input
              type="checkbox"
              checked={settings.dailyReminders}
              onChange={() => handleToggle('dailyReminders')}
              className="w-5 h-5 rounded text-[#2a14b4] focus:ring-[#2a14b4] cursor-pointer"
            />
          </div>

          <div className="py-3.5 flex items-center justify-between">
            <div>
              <p className="font-bold text-[#131b2e]">Official Commission Notifications</p>
              <p className="text-[#64748b]">Alerts when new official UPSC, SSC, or GATE answer keys are uploaded.</p>
            </div>
            <input
              type="checkbox"
              checked={settings.examAlerts}
              onChange={() => handleToggle('examAlerts')}
              className="w-5 h-5 rounded text-[#2a14b4] focus:ring-[#2a14b4] cursor-pointer"
            />
          </div>

          <div className="py-3.5 flex items-center justify-between">
            <div>
              <p className="font-bold text-[#131b2e]">Timer Audio & Pulse Warnings</p>
              <p className="text-[#64748b]">Highlight countdown clock in red when less than 3 minutes remain in mock test.</p>
            </div>
            <input
              type="checkbox"
              checked={settings.showTimerAnimations}
              onChange={() => handleToggle('showTimerAnimations')}
              className="w-5 h-5 rounded text-[#2a14b4] focus:ring-[#2a14b4] cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* 3. DANGER ZONE / DATA RESET */}
      <div className="bg-white rounded-3xl border border-rose-200 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <Trash2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-bold text-base text-rose-950">
              Data Management & Cache
            </h3>
            <p className="text-xs text-[#5e6278]">
              Manage local browser storage caches or sign out from your active device session.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <div>
            <p className="font-bold text-xs text-[#131b2e]">Clear Local Session Cache</p>
            <p className="text-[11px] text-[#64748b]">Resets temporary PDF viewer buffers and cached question responses.</p>
          </div>
          <button
            onClick={handleClearCache}
            className="px-4 py-2 border border-slate-300 hover:bg-slate-50 text-xs font-bold text-[#334155] rounded-xl transition-colors cursor-pointer"
          >
            Clear Cache
          </button>
        </div>

        {user.isLoggedIn && (
          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-bold text-xs text-rose-700">Sign Out of Account</p>
              <p className="text-[11px] text-[#64748b]">Switches this browser session back to Guest mode without deleting your cloud data.</p>
            </div>
            <button
              onClick={() => {
                logout();
                navigate('/');
              }}
              className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
