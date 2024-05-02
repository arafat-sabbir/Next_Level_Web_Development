{
  // Union types
  type favoriteFood = "biryani" | "kacchi" | "lacchi";
  type favoriteDrinks = "lacchi" | "milk" | "biryani";
  type foodList = favoriteDrinks | favoriteFood;

  //   Example
  type gender = "male" | "female" | "other";
  const myFavoriteFood: foodList = "lacchi";
  const myGender: gender = "male";

  // intersection Types
// Intersection Types
type frontEndDeveloper = {
    skill: string[];
    goal: "frontEndDeveloper"; // Corrected value
};

type backEndDeveloper = {
    skill: string[];
    goal: "backendDeveloper"; // Corrected value
};


  type FullStackDeveloper = frontEndDeveloper & backEndDeveloper;

  //   Example

  const fullStackDeveloper: FullStackDeveloper = {
    skill: ["express", "node", "react js"],
    goal: "frontEndDeveloper" 
  }

}
