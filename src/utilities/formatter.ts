import dayjs from 'dayjs';
import 'dayjs/locale/id'; // Import Indonesian locale

/**
 * Format date to Indonesian format (e.g., "31 Desember 2023")
 * @param {string} date - Date in YYYY-MM-DD format
 * @returns {string} Formatted date
 */
export const formatIndonesianDate = (date: string): string => {
  if (!date || date === "0000-00-00") return "-";
  
  return dayjs(date).locale('id').format('D MMMM YYYY');
};

/**
 * Format date string to various formats
 * @param {string} date - Date string
 * @param {boolean} indonesian - Use Indonesian format if true
 * @returns {string} Formatted date
 */
export const formatDate = (date: string, indonesian: boolean = true): string => {
  if (!date) return date;
  
  const dayjsDate = dayjs(date);
  
  if (!dayjsDate.isValid()) return date;
  
  // Check if we're dealing with date+time format
  const hasTime = date.length > 10;
  
  if (indonesian) {
    return hasTime 
      ? dayjsDate.locale('id').format('D MMMM YYYY, h:mm A')
      : dayjsDate.locale('id').format('D MMMM YYYY');
  } else {
    return dayjsDate.format('DD-MM-YYYY');
  }
};

/**
 * Convert time to 12-hour format with AM/PM
 * @param {string} time - Time in HH:MM:SS format
 * @returns {string} Formatted time
 */
export const formatTime = (time: string): string => {
  if (!time) return time;
  
  // Create a valid date-time string for parsing
  const dateTime = `2000-01-01T${time}`;
  return dayjs(dateTime).format('h:mm A');
};

/**
 * Get Indonesian day name from day number (0-6)
 * @param {number|string} day - Day number (0-Sunday, 6-Saturday)
 * @returns {string} Day name in Indonesian
 */
export const getDayName = (day: number | string): string => {
  const dayNum = typeof day === 'string' ? parseInt(day) : day;
  
  if (isNaN(dayNum) || dayNum < 0 || dayNum > 6) {
    return String(day);
  }
  
  const days = [
    "Ahad", "Senin", "Selasa", "Rabu", 
    "Kamis", "Jumat", "Sabtu"
  ];
  
  return days[dayNum];
};

/**
 * Get Indonesian month name from month number
 * @param {number|string} month - Month number (1-12)
 * @returns {string} Month name in Indonesian
 */
export const getMonthName = (month: number | string): string => {
  const monthNum = typeof month === 'string' ? parseInt(month) : month;
  
  if (isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
    return String(month);
  }
  
  const date = dayjs().month(monthNum - 1);
  return date.locale('id').format('MMMM');
};

/**
 * Format number to Indonesian currency (Rupiah)
 * @param {number|string} amount - The amount to format
 * @param {string} currency - Currency symbol
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount: number | string, currency: string = ""): string => {
  const value = typeof amount === 'string' ? parseInt(amount) : amount;
  
  if (isNaN(value)) return String(amount);
  
  const formatter = new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  
  if (currency) {
    return `${currency} ${formatter.format(value)}`;
  }
  
  return `Rp${formatter.format(value)},-`;
};

/**
 * Format number with thousand separator (Indonesian style)
 * @param {number|string} number - Number to format
 * @returns {string} Formatted number
 */
export const formatNumber = (number: number | string): string => {
  const value = typeof number === 'string' ? parseFloat(number) : number;
  
  if (isNaN(value)) return String(number);
  
  return new Intl.NumberFormat('id-ID').format(value);
};