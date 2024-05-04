{
  // Type Alias
  type Student = {
    name: string;
    age: number;
    gender: string;
    contact?: string;
  };
  const student1: Student = {
    name: "arafat",
    age: 50,
    gender: "male",
    contact: "01632029032",
  };

  type name = string;
  const myName: name = "arafat";

  type Add = (x: number, y: number) => number;
  const add:Add = (num1, num2) => num1 + num2;
}
