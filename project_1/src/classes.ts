class Department{
//   public name: string;
//   public employees: string [] = [];

//   constructor(n:string){
//    this.name = n;
//   }
  
    static fiscalyear = 2020;
    static createEmployee(employee: string){
      return { "employee": employee};
    }

  constructor(public readonly name: string, protected employees: string[], public id: number){
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





// Inheritance


class ITDepartment extends Department{
    admins: string [];
    constructor(id: number, admins: string[]){
      super("child class",["Madhu","Sudheer"],id);
      this.admins = admins;
    }


    addEmployees(name: string){
        if(name == "Max"){
            return;
        }

        this.employees.push(name);
        
    }

}

const itDeparment = new ITDepartment(2222,["Adam"]);

console.log("itDeparment>>>",itDeparment);
itDeparment.addEmployees("Max");
itDeparment.addEmployees("Destructor");

itDeparment.printEmployeeInformation();


itDeparment.describe();


// Static Properties

const emp1 = Department.createEmployee("Yashhhhh");


console.log("emp1",emp1);
console.log("fiscalyear",Department.fiscalyear);

// We cannot access the static member properties inside non-static members like constructor etc. If you want to call them inside non static you can call it using class name.
// Department.fiscalyear; but not this.fiscalyear





// const names: Array<string> = []; // string[]
// // names[0].split(' ');

// const promise: Promise<number> = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(10);
//   }, 2000);
// });

// promise.then(data => {
//   // data.split(' ');
// })

function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

const mergedObj = merge({ name: 'Max', hobbies: ['Sports'] }, { age: 30 });
console.log(mergedObj);

interface Lengthy {
  length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let descriptionText = 'Got no value.';
  if (element.length === 1) {
    descriptionText = 'Got 1 element.';
  } else if (element.length > 1) {
    descriptionText = 'Got ' + element.length + ' elements.';
  }
  return [element, descriptionText];
}

console.log(countAndDescribe(['Sports', 'Cooking']));

function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return 'Value: ' + obj[key];
}

extractAndConvert({ name: 'Max' }, 'name');

class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    if (this.data.indexOf(item) === -1) {
      return;
    }
    this.data.splice(this.data.indexOf(item), 1); // -1
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem('Max');
textStorage.addItem('Manu');
textStorage.removeItem('Max');
console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();

// const objStorage = new DataStorage<object>();
// const maxObj = {name: 'Max'};
// objStorage.addItem(maxObj);
// objStorage.addItem({name: 'Manu'});
// // ...
// objStorage.removeItem(maxObj);
// console.log(objStorage.getItems());


interface CourseGoal {
  title: string,
  description: string,
  completeUntil: Date,
}


function createCourseGoal( title: string, description: string, date: Date) : CourseGoal {
  let courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = date;

  return courseGoal as CourseGoal;
}



const names: Readonly<string[]> = ['Max', 'Anna'];


// Utilities docs
// https://www.typescriptlang.org/docs/handbook/utility-types.html