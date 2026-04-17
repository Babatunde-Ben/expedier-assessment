"use client";

import { useMemo, useState } from "react";
import { ArrowRight, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { TEAM_MEMBERS } from "@/mocks/team";

const MEMBERS_PER_PAGE = 10;
const TOTAL_ENTRIES = TEAM_MEMBERS.length;
const TOTAL_PAGES = Math.max(1, Math.ceil(TOTAL_ENTRIES / MEMBERS_PER_PAGE));

function NameCell({
  name,
  hasAvatar,
  selected,
  onToggle,
}: {
  name: string;
  hasAvatar?: boolean;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <Checkbox
        checked={selected}
        onCheckedChange={onToggle}
        aria-label={`Select ${name}`}
        className="shrink-0"
      />
      {hasAvatar ? (
        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-tertiary text-muted-foreground">
          <UserRound className="size-4" aria-hidden="true" />
        </div>
      ) : (
        <div className="size-8 shrink-0" aria-hidden="true" />
      )}
      <span className="truncate text-base">{name}</span>
    </div>
  );
}

function ActionButton({ variant }: { variant: "edit" | "remove" }) {
  if (variant === "edit") {
    return (
      <Button
        variant="outline"
        type="button"
        className="text-xs px-4 rounded-[4px] h-8 w-22"
      >
        Edit Limits
      </Button>
    );
  }
  return (
    <Button type="button" className="text-xs px-4 rounded-[4px] h-8 w-22">
      Remove
    </Button>
  );
}

function buildVisiblePages(current: number, total: number): (number | "…")[] {
  if (total <= 4) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | "…")[] = [1, 2, 3];
  if (current > 3 && current < total - 1) pages.push(current);
  pages.push("…");
  pages.push(total);
  return pages;
}

export function TeamsTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const pageMembers = useMemo(() => {
    const start = (currentPage - 1) * MEMBERS_PER_PAGE;
    return TEAM_MEMBERS.slice(start, start + MEMBERS_PER_PAGE);
  }, [currentPage]);

  const rangeStart = (currentPage - 1) * MEMBERS_PER_PAGE + 1;
  const rangeEnd = Math.min(
    currentPage * MEMBERS_PER_PAGE,
    TOTAL_ENTRIES,
  );

  const toggleRow = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="flex flex-col">
      {/* Desktop / tablet table */}
      <div className="hidden md:block">
        <Table aria-label="Team members">
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Name</TableHead>
              <TableHead>Email Address</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Employee Role</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pageMembers.map((member, idx) => (
              <TableRow
                key={member.id}
                data-state={selected.has(member.id) ? "selected" : undefined}
              >
                <TableCell className="min-w-0">
                  <NameCell
                    name={member.name}
                    hasAvatar={member.hasAvatar}
                    selected={selected.has(member.id)}
                    onToggle={() => toggleRow(member.id)}
                  />
                </TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>{member.phone}</TableCell>
                <TableCell>{member.role}</TableCell>
                <TableCell>
                  <ActionButton
                    variant={
                      currentPage === 1 && idx === 0 ? "edit" : "remove"
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile card list */}
      <ul className="flex flex-col divide-y divide-border md:hidden">
        {pageMembers.map((member, idx) => (
          <li key={member.id} className="flex flex-col gap-3 px-4 py-4">
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <div className="flex min-w-0 items-center justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <NameCell
                    name={member.name}
                    hasAvatar={member.hasAvatar}
                    selected={selected.has(member.id)}
                    onToggle={() => toggleRow(member.id)}
                  />
                </div>
                <ActionButton
                  variant={
                    currentPage === 1 && idx === 0 ? "edit" : "remove"
                  }
                />
              </div>
              <p className="text-xs text-muted-foreground truncate">
                {member.email}
              </p>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span>{member.phone}</span>
                <span aria-hidden="true">•</span>
                <span>{member.role}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div className="flex flex-col gap-3 border-t border-border py-10 md:flex-row md:items-center md:justify-between">
        <p className="text-sm font-medium text-black">
          Showing {rangeStart} to {rangeEnd} of {TOTAL_ENTRIES} Entries
        </p>

        <nav
          aria-label="Pagination"
          className="flex items-center gap-1 overflow-x-auto"
        >
          {buildVisiblePages(currentPage, TOTAL_PAGES).map((page, idx) =>
            page === "…" ? (
              <span
                key={`ellipsis-${idx}`}
                className="flex size-8 items-center justify-center text-sm text-muted-foreground"
                aria-hidden="true"
              >
                …
              </span>
            ) : (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page as number)}
                aria-label={`Go to page ${page}`}
                aria-current={currentPage === page ? "page" : undefined}
                className={cn(
                  "flex size-12 shrink-0 items-center justify-center rounded-md text-sm font-medium transition-colors",
                  currentPage === page
                    ? "border border-primary text-primary"
                    : "bg-muted text-muted-foreground hover:bg-border",
                )}
              >
                {page}
              </button>
            ),
          )}

          <Button
            type="button"
            onClick={() => setCurrentPage((p) => Math.min(p + 1, TOTAL_PAGES))}
            disabled={currentPage === TOTAL_PAGES}
            className="h-12 px-4 gap-1 text-sm"
          >
            Next
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </Button>
        </nav>
      </div>
    </div>
  );
}
