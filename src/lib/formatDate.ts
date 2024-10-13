import { format } from "date-fns";

export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return format(date, "MMMM dd, yyyy, h:mm a");
};
