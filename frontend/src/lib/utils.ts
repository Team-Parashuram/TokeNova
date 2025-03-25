import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getStageText = (stageIndex: number): string => {
  const stageNames = [
    "Upcoming",
    "Active",
    "Check-in Open",
    "Cancelled",
    "Closed",
  ];
  return stageNames[stageIndex] ?? "Unknown Stage";
};