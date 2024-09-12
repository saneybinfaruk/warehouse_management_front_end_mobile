export const formateDate = (timestamp: string) => {
  const date = new Date(parseInt(timestamp));

  // Extract the day, month, and year from the date
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are zero-indexed in JavaScript, so add 1
  const year = date.getFullYear();

  // Format the date as DD-MM-YYYY
  const formattedDate = `${day}-${month}-${year}`;

  return formattedDate;
};
