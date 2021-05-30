/*
  Ako kome bude trebao datum da vadi iz nekog utc timestampa nek ovo koristi,

  Ulazni parametar je samo taj utcTimestamp, ne znam sto sam ga nazvao utcString ispod

  Formatira u formatu pr. Monday, 24. May 13:42
*/

export const formatDate = (utcString: number) => {
  const utcDate = new Date(utcString * 1000);

  const dayNo = utcDate.getDay();
  const monthNo = utcDate.getMonth();

  //console.log("UTC DATE: " + utcDate);
  let day = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
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

  //console.log(`HOUR: ${hour} MINUTE: ${minute}`);

  return `${day[dayNo]}, ${date}. ${month[monthNo]} ${hour}:${minute}`;
};
