"use client";

import React, { createContext, useContext, useState } from "react";

interface DashboardFilterContextType {
  statusFilter: string | null;
  typeFilter: string | null;
  tagFilter: string | null;
  setStatusFilter: (status: string | null) => void;
  setTypeFilter: (typeId: string | null) => void;
  setTagFilter: (tagId: string | null) => void;
  clearAllFilters: () => void;
}

const DashboardFilterContext = createContext<
  DashboardFilterContextType | undefined
>(undefined);

export function DashboardFilterProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [tagFilter, setTagFilter] = useState<string | null>(null);

  const clearAllFilters = () => {
    setStatusFilter(null);
    setTypeFilter(null);
    setTagFilter(null);
  };

  const value = {
    statusFilter,
    typeFilter,
    tagFilter,
    setStatusFilter,
    setTypeFilter,
    setTagFilter,
    clearAllFilters,
  };

  return (
    <DashboardFilterContext.Provider value={value}>
      {children}
    </DashboardFilterContext.Provider>
  );
}

export function useDashboardFilters() {
  const context = useContext(DashboardFilterContext);
  if (context === undefined) {
    throw new Error(
      "useDashboardFilters must be used within a DashboardFilterProvider"
    );
  }
  return context;
}
