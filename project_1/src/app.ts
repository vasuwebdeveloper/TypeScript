const number1 = 5.9;
const number2 = 9;


/**   ENUM   **/

enum Role { ADMIN, READ_ONLY, AUTHOR};

enum Powers {PW1 = 2, PW2 = 3, PW3 = 'fire'};

/**   ENUM   **/

function add(number1: number,number2: number){
    return number1+number2;
}

var result = add(number1,number2);
console.log(result);



let sentence: string;
sentence = "stringval";


// Object, Array, Tupple

const person : {
    name: string;
    age: number;
    hobbies: string[];
    role: [number, string]; // Tupple
   } = {
   name: 'Vasu',
   age: 26,
   hobbies: ['Sports', 'Cooking'],
   role: [2, 'author']
   };
   


  //** UNION TYPE */ 
   
   function combine(input1: number | string | boolean, input2: number | string | boolean){
       
   }

   combine("vasu",26);

  //** UNION TYPE */ 



/**
 * TYPE ALIAS or CUSTOM TYPES.......
 */

type combinable = number | string | boolean;


function typeAliasExample(input1: combinable, input2: number | string | boolean){
    // use type alias for shortcut defined for unions
}

/**
 * TYPE ALIAS or CUSTOM TYPES
 */


// ARROW FUNCTIONS

const sum =   (a: number, b: number) => {
  return a + b;
}

console.log(sum (2, 9));


const oneLine = (a: number, b: number) => a + b;

console.log("oneLine: "+ oneLine(2, 100));

// Function default function parameters

const defaultValue = (a: number, b: number = 1) => a + b;



// ARROW FUNCTIONS





// Spread Operators

const hobbies = ['Sports', 'Cooking'];
const activeHobbies = ['Hiking'];

activeHobbies.push(...hobbies);

const person2 = {
  name: 'Max',
  age: 30
};

const copiedPerson = { ...person2 };

debugger;

// Spread Operators


// Rest Operator

const addRest = (...numbers: number[]) => {
    return numbers.reduce((curResult, curValue) => {
      return curResult + curValue;
    }, 0);
  };
  
  const addedNumbers = addRest(5, 10, 2, 3.7);
  console.log(addedNumbers);

  // Rest Operator


  // Array and Object destructuring

const [hobby1, hobby2, ...remainingHobbies] = hobbies;

console.log(hobbies, hobby1, hobby2);

const { name: userName, age } = person2;

console.log(userName, age, person2);

// Array and Object destructuring