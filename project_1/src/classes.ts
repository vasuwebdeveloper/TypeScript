class Department{
//   public name: string;
//   public employees: string [] = [];

//   constructor(n:string){
//    this.name = n;
//   }

  constructor(public readonly name: string, public employees: string[], public id: number){
      this.name = name;
      this.employees = employees;
      this.id = id;
  }

  describe(this:Department){
      console.log("Describe Name>>> ",this.name);
      console.log("Describe employees>>> ",this.employees);
      console.log("Describe number>>> ",this.id);
  }

  addEmployee(employee: string){
    this.employees.push(employee);
  }

  printEmployeeInformation(){
      console.log("Employees length: ", this.employees.length);
      console.log("Employees : ", this.employees);
      //Cannot assign to the name because its a readonly property.
     // this.name = "test";
  }


}

// Create an object
//const department = new Department('Mechanical');
const department = new Department("Mechanical", ["Max","Vasu"], 1233);
console.log("Department:>>>>> ", department);

// Call to Describe();
department.describe();

// Add Employees

department.addEmployee("Vasu");
department.addEmployee("Suman");

//Print employee Info

department.printEmployeeInformation();