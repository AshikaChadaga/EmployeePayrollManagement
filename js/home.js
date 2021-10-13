window.addEventListener('DOMContentLoaded', (event) => {
  createInnerHtml();
});

const createInnerHtml = () => {

  const headerHtml = `
    <th></th>
    <th>Name</th>
    <th>Gender</th>
    <th>Department</th>
    <th>Salary</th>
    <th>Start Date</th>
    <th>Actions</th>`;
  
  let innerHtml = `${headerHtml}`;
  let employeePayrollDataList = createEmployeePayrollJSON();

  for(const employeePayrollData of employeePayrollDataList){
    
    innerHtml = `${innerHtml}
      <tr>
        <td><img class="profile" src="${employeePayrollData._profileImage}" alt="profile_img-1"></td>
        <td>${employeePayrollData._name}</td>
        <td>${employeePayrollData._gender}</td>
        <td>${getDepartmentHtml(employeePayrollData._department)}</td>
        
        <td>${employeePayrollData._salary}</td>
        <td>${employeePayrollData._startDate}</td>
        <td>
          <img src="../assets/icons/delete.svg" alt="delete" id="1" onclick="remove(this)">
          <img src="../assets/icons/edit.svg" alt="edit" id="1" onclick="update(this)">
        </td>
      </tr>`;
    
  }
  document.querySelector('#table-display').innerHTML = innerHtml;
}

const createEmployeePayrollJSON = () => {
  let employeePayrollListLocal = [
    {
      _name: 'Killua',
      _gender: 'Male',
      _department: [
        'HR',
        'Sales',
        'Finance'
      ],
      _salary: 10000000,
      _startDate: '18 Sept 2021',
      _note: 'Killua lives in Kukoro Mountain.',
      _id: new Date().getTime(),
      _profileImage: '../assets/profile-images/profile_img-4.png'
    },
    {
      _name: 'Jugemu Jugemu GoKono Surikire',
      _gender: 'Male',
      _department: [
        'Finance'
      ],
      _salary: 5000000,
      _startDate: '30 Sept 2021',
      _note: 'I have a very long name',
      _id: new Date().getTime(),
      _profileImage: '../assets/profile-images/profile_img-2.png'
    }
  ];
  return employeePayrollListLocal;
}
const getDepartmentHtml = (departmentList) => {
  let departmentHtml = '';
  for(const department of departmentList){
    departmentHtml = `${departmentHtml} <div class='dept-label'>${department}</div>`
  }
  return departmentHtml
}