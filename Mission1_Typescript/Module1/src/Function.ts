function sum(a: number, b: number = 10): number {
  return a + b;
}
const addValue = (a: number = 10, b: number): number => a + b;

const user = {
  name: "Arafat Sabbir",
  balance: 20,
  addBalance: function (newBalance: number): number {
    return this.balance + newBalance;
  },
};

const arr = [10, 20, 30];
const doubleArray: number[] = arr.map((item: number): number => item * item);
