class EmployeePayrollData {

    id;

    get name() {
        return this._name;
    }

    set name(name) {
        let nameRegex = RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$');
        if (nameRegex.test(name))
            this._name = name;
        else
            throw "Name is Incorrect";
    }

    get profileImage() {
        return this._profileImage;
    }

    set profileImage(profileImage) {
        this._profileImage = profileImage;
    }

    get gender() {
        return this._gender;
    }

    set gender(gender) {
        this._gender = gender;
    }

    get department() {
        return this._department;
    }

    set department(department) {
        this._department = department;
    }

    get salary() {
        return this._salary;
    }

    set salary(salary) {
        this._salary = salary;

    }

    get startDate() {
        return this._startDate;
    }

    set startDate(startDate) {
        var today = new Date();
        if(today < startDate )
            throw 'Start date is in the Future';
        const minDate = new Date(today.setDate(today.getDate()-30));
        today = new Date();
        if(startDate < minDate)
            throw 'Start date is Beyond 30 days';
        else {
            this._startDate = startDate;
        }
    }

    get notes() {
        return this._notes;
    }

    set notes(notes) {
        this._notes = notes;
    }

    toString() {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const employeeDate = this.startDate == undefined ? "undefined" : this.startDate.toLocaleDateString("en-us", options);
        return "Id = " + this.id + "\nName = " + this.name + "\nProfile Image = " + this.profileImage + "\nGender = " + this.gender + "\nDepartment = " + this.department + "\nSalary = " + this.salary + "\nStart Date = " + employeeDate + "\nNotes = " + this.notes;
    }
}
