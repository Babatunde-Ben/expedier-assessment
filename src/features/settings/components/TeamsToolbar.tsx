import { ChevronDown, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import ShieldPlus from "@/assets/icons/shield-plus.svg";
import FolderGrid from "@/assets/icons/folder-grid.svg";
export function TeamsToolbar() {
  return (
    <div className="flex flex-col gap-3 mb-7 md:flex-row md:items-center md:justify-between md:gap-5 lg:gap-7">
      {/* Left: Filter */}
      <Button type="button" variant="outline" className="text-sm px-5 h-12">
        Filter by
        <ChevronDown className="size-4" aria-hidden="true" />
      </Button>

      {/* Right: Actions */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3 md:gap-5 lg:gap-7">
        <Button variant="secondary" className="h-12 text-sm px-9">
          <ShieldPlus className="size-4.5" aria-hidden="true" />
          Enforce 2FA
        </Button>

        <Button variant="secondary" className="h-12 text-sm px-9">
          <FolderGrid className="size-4.5" aria-hidden="true" />
          Manage Roles
        </Button>

        <Button className="h-12 text-sm px-9">
          <Plus className="size-4.5" aria-hidden="true" />
          Invite Employee
        </Button>
      </div>
    </div>
  );
}
