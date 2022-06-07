abstract class Department {
  static fiscalYear = 2020;
  //   private name: string;
  // To make the property private, we can use the private keyword
  protected employees: string[] = [];

  constructor(protected readonly id: string, public name: string) {
    // this.name = n;
  }

  abstract describe(this: Department): void;

  addEmployee(this: Department, empName: string) {
    this.employees.push(empName);
  }

  printEmployeeInformation(this: Department) {
    console.log(this.employees.length);
    console.log(this.employees);
  }

  static createEmployee(empName: string) {
    return { name: empName };
  }
}

// create IT department from department
class ITDepartment extends Department {
  constructor(id: string, private admins: string[]) {
    super(id, "IT");
  }

  describe(): void {
    console.log("IT Department - ID: " + this.id);
  }

  addAdmin(this: ITDepartment, admin: string) {
    this.admins.push(admin);
  }
}

class AccountingDepartment extends Department {
  private lastreport: string;
  private static instance: AccountingDepartment;

  get mostRecentReport(): string {
    //has to return something
    if (this.lastreport) {
      return this.lastreport;
    }
    throw new Error("No report found");
  }

  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error("Please pass in a valid value");
    }
    this.addReport(value);
  }

  // to preven the creation of a new instance of the class, we can use the private keyword on the constructor
  private constructor(id: string, private reports: string[]) {
    super(id, "Accounting");
    this.lastreport = reports[0];
  }

  describe(): void {
    console.log("Accounting Department - ID: " + this.id);
  }

  addEmployee(empName: string): void {
    if (empName === "Max") {
      // create and throw error
      throw new Error("Max is not allowed");
    }
    this.employees.push(empName);
  }

  addReport(report: string): void {
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
