// Define a TypeScript class Person
class Person {
    // Define public properties for name (string), gender (string), and isMarried (boolean)
    constructor(public name: string, public gender: string, public isMarried: boolean) {
        // Properties are automatically initialized with the provided constructor parameters
    }

    // Define a method getName() to log information about the person
    getName() {
        console.log(
            `My Name Is ${this.name} I am A ${this.gender}  Am I Married ${this.isMarried}`
        );
    }
}

// Create an instance of Person class with name "Arafat Sabbir", gender "Male", and marital status false
const Person1 = new Person("Arafat Sabbir", "Male", false);

// Create another instance of Person class with name "Jesicca", gender "Female", and marital status false
const Person2 = new Person("Jesicca", "Female", false);

// Call the getName() method on Person2 instance to log information about this person
Person2.getName();

// Log the value of isMarried property of Person1 instance to the console
console.log(Person1.isMarried);
