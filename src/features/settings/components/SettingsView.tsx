"use client";

import { useState } from "react";
import { SettingsTabs } from "./SettingsTabs";
import { TeamsToolbar } from "./TeamsToolbar";
import { TeamsTable } from "./TeamsTable";
import { ComingSoonPanel } from "@/components/molecules/ComingSoonPanel";
import type { SettingsTab } from "../types";

export function SettingsView() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("teams");

  return (
    <div className=" p-4 md:py-8 md:pl-10 md:pr-9 ">
      {/* Page heading + tabs */}
      <div className="grid grid-cols-1 gap-4 mb-10 md:gap-6 lg:grid-cols-[auto_1fr] xl:grid-cols-[auto_1fr_100px] lg:items-center lg:justify-between">
        <h1 className="font-medium text-lg sm:text-xl text-black lg:text-2xl">
          Settings
        </h1>
        <SettingsTabs active={activeTab} onChange={setActiveTab} />
      </div>

      {/* Content card */}
      <div
        className=" overflow-hidden"
        role="tabpanel"
        id={`settings-panel-${activeTab}`}
        aria-label={activeTab}
      >
        {activeTab === "teams" && (
          <>
            <TeamsToolbar />
            <TeamsTable />
          </>
        )}
        {activeTab === "profile" && <ComingSoonPanel label="Profile" />}
        {activeTab === "contacts" && <ComingSoonPanel label="Contacts" />}
        {activeTab === "preference" && <ComingSoonPanel label="Preference" />}
      </div>
    </div>
  );
}
