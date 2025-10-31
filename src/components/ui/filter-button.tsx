
import React from 'react';

interface FilterButtonProps {
  label: string;
  filterValue: string;
  activeFilter: string;
  onClick: (filter: string) => void;
}

export function FilterButton({ label, filterValue, activeFilter, onClick }: FilterButtonProps) {
  const isActive = activeFilter === filterValue;
  const className = `px-4 py-1.5 text-sm font-medium rounded-lg transition-colors ${
    isActive
      ? "bg-gray-900 text-white"
      : "bg-gray-200 text-gray-600 hover:bg-gray-300"
  }`;

  return (
    <button onClick={() => onClick(filterValue)} className={className}>
      {label}
    </button>
  );
}
