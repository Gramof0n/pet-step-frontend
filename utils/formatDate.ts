export const formatDate = (utcString: number) => {
  const utcDate = new Date(utcString * 1000);

  const dayNo = utcDate.getDay();
  const monthNo = utcDate.getMonth();

  console.log("UTC DATE: " + utcDate);
  let day = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = utcDate.getDate();

  const hour =
    utcDate.getHours() < 10 ? `0${utcDate.getHours()}` : utcDate.getHours();
  const minute =
    utcDate.getMinutes() < 10
      ? `0${utcDate.getMinutes()}`
      : utcDate.getMinutes();

  console.log(`HOUR: ${hour} MINUTE: ${minute}`);

  return `${day[dayNo]}, ${date}. ${month[monthNo]} ${hour}:${minute}`;
};