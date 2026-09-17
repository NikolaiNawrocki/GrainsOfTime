export function formatDate(dateString: string, includeTime = false): string {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;

    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
      year: "numeric",
    };

    if (includeTime) {
      options.hour = "numeric";
      options.minute = "2-digit";
      options.timeZoneName = "short";
    }

    return new Intl.DateTimeFormat("en-US", options).format(date);
  } catch {
    return dateString;
  }
}

export function formatEventTime(startDate: string, endDate?: string): string {
  try {
    const start = new Date(startDate);
    const timeStr = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
    }).format(start);

    if (!endDate) return timeStr;

    const end = new Date(endDate);
    const endStr = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      timeZoneName: "short",
    }).format(end);

    return `${timeStr} – ${endStr}`;
  } catch {
    return "";
  }
}
