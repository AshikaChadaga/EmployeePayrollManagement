let isUpdate = false;
let employeePayrollDataObject = {};

window.addEventListener('DOMContentLoaded', (event) => {
  const name = document.querySelector('#name');
  const nameError = document.querySelector('.text-error');
  name.addEventListener('input', function () {
    if (name.value.length == 0) {
      nameError.textContent = "";
      return;
    }
    try {
      (new EmployeePayrollData()).name = name.value;
      nameError.textContent = "";
    }
    catch (e) {
      nameError.textContent = e;
    }
  });

  const salary = document.querySelector('#salary');
  const output = document.querySelector('.salary-output');
  output.textContent = salary.value;
  salary.addEventListener('input', function () {
    output.textContent = salary.value;
  });

  var date = document.getElementById("day");
  var month = document.getElementById("month");
  var year = document.getElementById("year");
  const dateError = document.querySelector(".date-error");
  date.addEventListener("input", validateDate);
  month.addEventListener("input", validateDate);
  year.addEventListener("input", validateDate);

  function validateDate() {
    let startDate = Date.parse(
      year.value + "-" + month.value + "-" + date.value
    );
    try {
      new EmployeePayrollData().startDate = startDate;
      dateError.textContent = "";
    } catch (e) {
      dateError.textContent = e;
    }
  }
  checkForUpdate();
});

const save = () => {
  try {
    let employeePayrollData = createEmployeePayroll();
    createAndUpdateStorage(employeePayrollData);
  }
  catch (e) {
    return;
  }
};

const createEmployeePayroll = () => {
  let employeePayrollData = new EmployeePayrollData();
  try {
    employeePayrollData.name = getInputValueById('#name');
  }
  catch (e) {
    setTextValue('text-error', e);
    throw e;
  }

  employeePayrollData.profileImage = getSelectedValues('[name=profile]').pop();
  employeePayrollData.gender = getSelectedValues('[name=gender]').pop();
  employeePayrollData.department = getSelectedValues('[name=department]');
  employeePayrollData.salary = getInputValueById("#salary");
  employeePayrollData.notes = getInputValueById("#notes");

  let date = getInputValueById("#year") + "-" + getInputValueById("#month") + "-" + getInputValueById("#day");
  employeePayrollData.startDate = new Date(Date.parse(date));

  alert(employeePayrollData.toString());
  return employeePayrollData;
};

const getSelectedValues = (propertyValue) => {
  let allItems = document.querySelectorAll(propertyValue);
  let selItems = [];
  allItems.forEach((item) => {
    if (item.checked) selItems.push(item.value);
  });
  return selItems;
};

const getInputValueById = (id) => {
  let value = document.querySelector(id).value;
  return value;
};

const getInputElementValue = (id) => {
  let value = document.getElementById(id).value;
  return value;
};

function createAndUpdateStorage(employeePayrollData) {
  let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
  if (employeePayrollList != undefined) {
      if(employeePayrollList.length == 0)
        employeePayrollData._id = 1;
      else
        employeePayrollData._id = employeePayrollList[employeePayrollList.length -1 ]._id + 1;
      employeePayrollList.push(employeePayrollData);
  } else {
      employeePayrollData._id = 1;
      employeePayrollList = [employeePayrollData];
  }
  alert(employeePayrollList.toString());
  localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
}

const setForm = () => {
  setValue('#name', employeePayrollDataObject._name);
  setSelectedValues('[name=profile]', employeePayrollDataObject._profileImage);
  setSelectedValues('[name=gender]', employeePayrollDataObject._gender);
  setSelectedValues('[name=department]', employeePayrollDataObject._department);
  setValue('#salary', employeePayrollDataObject._salary);
  setTextValue('.salary-output', employeePayrollDataObject._salary);
  setValue('#notes', employeePayrollDataObject._notes);
  let date = new Date(employeePayrollDataObject._startDate);
  setValue('#day', date.getDate());
  setValue('#month', date.getMonth()+1);
  setValue('#year', date.getFullYear());
};

const resetForm = () => {
  setValue('#name', '');
  unsetSelectedValues('[name=profile]');
  unsetSelectedValues('[name=gender]');
  unsetSelectedValues('[name=department]');
  setValue('#salary', '');
  setTextValue('.salary-output', 400000);
  setValue('#notes', '');
  setSelectedIndex('#day',0);
  setSelectedIndex('#month',0);
  setSelectedIndex('#year',0);
};

const checkForUpdate = () => {
  const employeePayrollDataJson = localStorage.getItem('editEmp');
  isUpdate = employeePayrollDataJson ? true : false;
  if(!isUpdate)
    return;
  employeePayrollDataObject = JSON.parse(employeePayrollDataJson);
  setForm();
};

const unsetSelectedValues = (propertyValue) => {
  let allItems = document.querySelectorAll(propertyValue);
  allItems.forEach(item => {
      item.checked = false;
  });
};

const setTextValue = (id, value) => {
  const element = document.querySelector(id);
  element.textContent = value;
};

const setValue = (id, value) => {
  const element = document.querySelector(id);
  element.value = value;
};

const setSelectedValues = (propertyValue, value) => {
  let allItems = document.querySelectorAll(propertyValue);
  allItems.forEach(item => {
      if(Array.isArray(value)){
        if(value.includes(item.value)){
          item.checked = true;
        }
      }
      else if(item.value == value)
      item.checked = true;
  });
};

const setSelectedIndex = (id, index) => {
  const element = document.querySelector(id);
  element.selectedIndex = index;
};