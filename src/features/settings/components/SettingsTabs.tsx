import { cn } from "@/lib/utils";
import type { SettingsTab } from "../types";

const TABS: { id: SettingsTab; label: string }[] = [
  { id: "profile", label: "Profile" },
  { id: "contacts", label: "Contacts" },
  { id: "teams", label: "Teams" },
  { id: "preference", label: "Preference" },
];

interface SettingsTabsProps {
  active: SettingsTab;
  onChange: (tab: SettingsTab) => void;
}

export function SettingsTabs({ active, onChange }: SettingsTabsProps) {
  return (
    <nav
      className="flex items-center gap-1 overflow-x-auto px-1 scrollbar-none lg:justify-center"
      role="tablist"
      aria-label="Settings sections"
    >
      {TABS.map((tab) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          aria-selected={active === tab.id}
          aria-controls={`settings-panel-${tab.id}`}
          onClick={() => onChange(tab.id)}
          className={cn(
            "shrink-0 rounded-sm h-10 w-28 px-4 md:px-5 py-2 font-medium transition-colors whitespace-nowrap md:w-32 lg:w-38",
            active === tab.id
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}
