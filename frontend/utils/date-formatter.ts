import { Ticket } from '@/types';

/**
 * Formats a date string from 'YYYY-MM-DD' format to 'MMM DD, YYYY' format
 * @param dateString - Date string in format 'YYYY-MM-DD' (e.g., '2025-12-18')
 * @returns Formatted date string (e.g., 'Dec 18, 2025')
 */
export const formatDateString = (dateString: string): string => {
  try {
    const date = new Date(dateString);

    // Check if date is valid
    if (isNaN(date.getTime())) {
      return dateString; // Return original string if invalid
    }

    return date.toLocaleDateString('en-US', {
      month: 'short', // Dec
      day: 'numeric', // 18
      year: 'numeric', // 2025
    });
  } catch (error) {
    return '-'; // Return original string if error occurs
  }
};

/**
 * Splits a datetime string into separate date and time strings
 * @param dateTimeString - DateTime string (e.g., '2025-12-18T03:32:52.754Z')
 * @returns Object with formatted date and time strings
 */
export const splitDateTime = (
  dateTimeString: string,
): { date: string; time: string } => {
  try {
    const date = new Date(dateTimeString);

    if (isNaN(date.getTime())) {
      return { date: '-', time: '-' };
    }

    const formattedDate = date.toLocaleDateString('en-US', {
      month: 'short', // Dec
      day: 'numeric', // 19
      year: 'numeric', // 2025
    });

    const formattedTime = date.toLocaleTimeString('en-US', {
      hour: 'numeric', // 7
      minute: '2-digit', // 30
      hour12: true, // PM/AM
    });

    return {
      date: formattedDate, // 'Dec 19, 2025'
      time: formattedTime, // '7:30 PM'
    };
  } catch (error) {
    return { date: '-', time: '-' };
  }
};

export const getTicketStatus = (ticket: Ticket): 'Pending' | 'Finished' => {
  const now = new Date();

  const [time, period] = ticket.hour.toLowerCase().split(' ');
  const splitTime = time.split(':').map(Number);

  let hours = splitTime[0];
  const minutes = splitTime[1];

  if (period === 'pm' && hours < 12) hours += 12;
  if (period === 'am' && hours === 12) hours = 0;

  const ticketDate = new Date(ticket.day);
  ticketDate.setHours(hours, minutes, 0, 0);

  return ticketDate > now ? 'Pending' : 'Finished';
};
