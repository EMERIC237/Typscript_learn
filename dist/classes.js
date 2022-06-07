"use strict";
class Department {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        //   private name: string;
        // To make the property private, we can use the private keyword
        this.employees = [];
        // this.name = n;
    }
    addEmployee(empName) {
        this.employees.push(empName);
    }
    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
    static createEmployee(empName) {
        return { name: empName };
    }
}
Department.fiscalYear = 2020;
// create IT department from department
class ITDepartment extends Department {
    constructor(id, admins) {
        super(id, "IT");
        this.admins = admins;
    }
    describe() {
        console.log("IT Department - ID: " + this.id);
    }
    addAdmin(admin) {
        this.admins.push(admin);
    }
}
class AccountingDepartment extends Department {
    // to preven the creation of a new instance of the class, we can use the private keyword on the constructor
    constructor(id, reports) {
        super(id, "Accounting");
        this.reports = reports;
        this.lastreport = reports[0];
    }
    get mostRecentReport() {
        //has to return something
        if (this.lastreport) {
            return this.lastreport;
        }
        throw new Error("No report found");
    }
    set mostRecentReport(value) {
        if (!value) {
            throw new Error("Please pass in a valid value");
        }
        this.addReport(value);
    }
    describe() {
        console.log("Accounting Department - ID: " + this.id);
    }
    addEmployee(empName) {
        if (empName === "Max") {
            // create and throw error
            throw new Error("Max is not allowed");
        }
        this.employees.push(empName);
    }
    addReport(report) {
        this.reports.push(report);
        this.lastreport = report;
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new AccountingDepartment("d1", []);
        return this.instance;
    }
}
//create a new employee from department using the static method
const employee1 = Department.createEmployee("Max");
console.log(employee1, Department.fiscalYear);
const iTDepartment = new ITDepartment("id2", ["Emeric"]);
iTDepartment.addEmployee("Max");
iTDepartment.addEmployee("Manu");
iTDepartment.describe();
iTDepartment.printEmployeeInformation();
// const accountingDP = new AccountingDepartment("id3", ["lIONEL"]);
const accountingDP = AccountingDepartment.getInstance();
accountingDP.mostRecentReport = "Report 1";
console.log("this is the most recent report: ", accountingDP.mostRecentReport);
accountingDP.addEmployee("ASHLEY");
accountingDP.addEmployee("FABI");
accountingDP.describe();
accountingDP.printEmployeeInformation();
