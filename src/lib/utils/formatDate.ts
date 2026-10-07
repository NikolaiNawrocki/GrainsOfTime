// All Grains of Time performances are anchored to North Carolina / US Eastern Time
const EVENT_TIMEZONE = "America/New_York";

export function formatDate(dateString: string, includeTime = false): string {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;

    const options: Intl.DateTimeFormatOptions = {
      timeZone: EVENT_TIMEZONE,
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
      timeZone: EVENT_TIMEZONE,
      hour: "numeric",
      minute: "2-digit",
    }).format(start);

    if (!endDate) return timeStr;

    const end = new Date(endDate);
    const endStr = new Intl.DateTimeFormat("en-US", {
      timeZone: EVENT_TIMEZONE,
      hour: "numeric",
      minute: "2-digit",
      timeZoneName: "short",
    }).format(end);

    return `${timeStr} – ${endStr}`;
  } catch {
    return "";
  }
}

