export function checkApiStatus(response) {
  console.log(response.data)
  return (
    response && response.data && response.data.statusOk ? true : false
  );
}
export function decimalParser(value) {
  if (Number.isInteger(value)) {
    return parseInt(value);
  } else {
    return parseFloat(value).toFixed(2);
  }
}
export function getLocalStore(key) {
  return JSON.parse(localStorage.getItem(key));
}
export const removeEmptyKey = (obj) => {
  for (let keyParam in obj) {
    if (obj[keyParam] === null || obj[keyParam] === undefined || obj[keyParam] === '' || obj[keyParam].length === 0) {
      delete obj[keyParam];
    }
  }
  return obj;
}

export function formatDateForQuery(date, isStart) {
  let d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  const monthname = date.toLocaleString('default', { month: 'short' });
  console.log("monthname is");
  console.log(monthname);
  if (month.length < 2) {
    month = '0' + month;
  }
  if (day.length < 2) {
    day = '0' + day;
  }
  if (isStart) {
    var time = '12:01AM'
    return [monthname, day, year, time].join(' ');
  } else {
    var time = '11:59PM'
    return [monthname, day, year, time].join(' ');
  }
  // Jun 1 2005  1:33PM

}

export const getLocalStorageInfo = (value) => {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem(value);
    if (data) {
      return JSON.parse(data);
    }
  }
};

export const setGlobalCookie = (name, value, days) => {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

export const getGlobalCookie = (name) => {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return JSON.parse(c.substring(nameEQ.length, c.length));
  }
  return null;
}

