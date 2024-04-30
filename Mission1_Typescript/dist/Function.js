"use strict";
function sum(a, b = 10) {
    return a + b;
}
const addValue = (a = 10, b) => a + b;
const user = {
    name: "Arafat Sabbir",
    balance: 20,
    addBalance: function (newBalance) {
        return this.balance + newBalance;
    }
};
