// Define a generic type GenericsArray that wraps around Array<T>
type GenericsArray<T> = Array<T>;

// Declare arrays with specific element types using the GenericsArray type
const genericsArrayNumber: GenericsArray<number> = [10, 20, 30, 40, 50]; // Array of numbers
const genericsArrayString: GenericsArray<string> = ["arafat", "sabbir is my name"]; // Array of strings
const genericsArrayBoolean: GenericsArray<boolean> = [true, false, true]; // Array of booleans

// Array of objects with specific structure using GenericsArray
const genericsArrayObjects: GenericsArray<{ name: string; roll: number }> = [
  { name: "arafatSabbir", roll: 20 },
];

// Define a generic tuple type genericsTuple that holds two values
type genericsTuple<x, y> = [x, y];

// Declare tuples with specific element types using genericsTuple
const people: genericsTuple<string, string> = ["sabbir", "wife"]; // Tuple of strings
const myId: genericsTuple<number, { name: string; isMarried: boolean }> = [
  786349,
  { name: "sabbir", isMarried: false },
]; // Tuple with a number and an object
