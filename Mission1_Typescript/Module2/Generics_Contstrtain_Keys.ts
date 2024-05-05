{
  type Vehicle = {
    bike: string;
    car: string;
    ship: string;
  };
  type Owner = "bike" | "car" | "ship";
  type Owner2 = keyof Vehicle;
  const person: Owner = "car";
  const person2: Owner2 = "ship";

  const user = {
    name: "arafat Sabbir",
    age: 19,
    address: "ctg",
  };

  const getValueByKeys =<X,Y extends keyof X> (obj: X, key: Y) => {
    return obj[key];
  };
  const person1 = getValueByKeys(user,"name");
  console.log(person1);

}
