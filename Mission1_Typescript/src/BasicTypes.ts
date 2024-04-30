// Primitive
let myName: string = "Arafat Sabbir"; // string
let myRoll: number = 786349; // number
let isMarried: boolean = false; // boolean
let isSingle: undefined = undefined; // undefined
let marriageDate: null = null; // null
// Non Primitive
let favoriteLanguage: string[] = [
  // array of strings
  "c",
  "c++",
  "python",
  "javascript",
  "typescript",
];
let numberOfAnime: number[] = [10, 20, 30, 40, 50]; // array of numbers
let myBiodata: [string, number, boolean] = ["Sabbir", 19, false]; // tuple with string, number, boolean types
let myList: {
  readonly first: string; //Readonly Types
  second?: string; //optional Types
  third: "milk"; //literal Types
} = { first: "fish", third: "milk" }; // object
