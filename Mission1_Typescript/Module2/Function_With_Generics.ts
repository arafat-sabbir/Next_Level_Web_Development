// Function that creates an array with a single string element
const createArray = (param: string): string[] => {
    return [param];
  };
  
  // Function that creates an array with a generic type
  const createArrayWithGenerics = <T>(param: T): T[] => {
    return [param];
  };
  
  // Function that creates a tuple with two generic types
  const CreateArrayWithTuple = <X, Y>(param1: X, param2: Y): [X, Y] => {
    return [param1, param2];
  };
  
  // Example usage of createArray function
  const res1 = createArray("Arafat Sabbir");
  
  // Example usage of createArrayWithGenerics function with string type
  const resGenerics = createArrayWithGenerics<string>("Sabbir Hossen");
  
  // Example usage of createArrayWithGenerics function with object type
  const resGenericsObj = createArrayWithGenerics<{ id: number; name: string }>({
    id: 786349,
    name: "Sabbir",
  });
  
  // Example usage of CreateArrayWithTuple function with string types
  const createArrayWithTuple = CreateArrayWithTuple<string, string>(
    "Singapore",
    "Afghanistan"
  );
  
  // Function that adds a food item to a food list
  const addFoodToList = (foodList) => {
    const food = "JackFruit";
    return {
      ...foodList,
      food,
    };
  };
  
  // Example usage of addFoodToList function
  const foodList1 = addFoodToList({ name: "mango", condition: "fresh" });
  const foodList2 = addFoodToList({ name: "banana", condition: "Semi Fresh" });
  