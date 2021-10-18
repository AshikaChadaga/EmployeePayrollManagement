const stringifyDate = (date) => {
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  const newDate = !date ? "undefined" : new Date(Date.parse(date)).toLocaleDateString('en-GB', options);
  return newDate;
}

const checkName = (name) => {
  let nameRegex = RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$');
  if (!nameRegex.test(name))
    throw "Name is Incorrect";
}

const checkStartDate = (startDate) => {
  var today = new Date();
  if (today < startDate)
    throw 'Start date is in the Future';
  const minDate = new Date(today.setDate(today.getDate() - 30));
  today = new Date();
  if (startDate < minDate)
    throw 'Start date is Beyond 30 days';
}