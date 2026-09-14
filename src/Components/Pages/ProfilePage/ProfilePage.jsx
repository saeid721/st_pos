import React from "react";
import { useSelector } from "react-redux";
import { useGetSuperAdminMeQuery } from "../../../store/api/app/SuperAdmin/superAdminApiSlice";
import { Link, useLocation } from "react-router-dom";
import { Loader, Mail, ShieldCheck, KeyRound } from "lucide-react";

const ProfileView = () => {
  const { isAuth, auth } = useSelector((state) => state.auth);
  const { data: userData, isLoading: isLoadingUser } = useGetSuperAdminMeQuery();
  const { pathname } = useLocation();
  const basePath = pathname.startsWith("/store") ? "/store/dashboard" : "/admin/dashboard";
  const profile = userData?.data || auth?.user || {};
  const displayName = profile.name || profile.store_role_name || profile.role_name || "User";
  const email = profile.email || "Not available";
  const role = profile.role?.name || profile.store_role_name || profile.role_name || "User";

  return (
    <div className="mx-auto max-w-3xl p-4 sm:p-8">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-8 text-white sm:px-10">
          <p className="text-sm font-medium text-indigo-100">Account profile</p>
          <h1 className="mt-1 text-2xl font-bold">{displayName}</h1>
          <p className="mt-1 text-sm text-indigo-100">Manage your account details and security</p>
        </div>

        <div className="p-6 sm:p-10">
          {isLoadingUser ? (
            <div className="flex justify-center py-8"><Loader className="animate-spin text-indigo-600" /></div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center gap-3">
                  <Mail className="text-indigo-600" size={19} />
                  <div><p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Email</p><p className="mt-1 text-sm font-medium text-slate-800">{email}</p></div>
                </div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="text-emerald-600" size={19} />
                  <div><p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Role</p><p className="mt-1 text-sm font-medium text-slate-800">{role}</p></div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 border-t border-slate-100 pt-6">
            <Link to={`${basePath}/change-password`} className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700">
              <KeyRound size={17} /> Change Password
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
