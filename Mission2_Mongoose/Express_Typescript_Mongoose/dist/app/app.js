"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.text());
const userRouter = express_1.default.Router();
app.use("/users", userRouter);
userRouter.post("/create-user", (req, res) => {
    const userData = req.body;
    console.log(userData);
    res.json({ success: true, userData });
});
app.get("/", (req, res, next) => {
    try {
        res.send(something);
    }
    catch (error) {
        next(error);
    }
});
app.post("/", (req, res) => {
    console.log(req.body);
    res.json("Hello there");
});
app.use((error, req, res, next) => {
    if (error) {
        res.status(400).json({ message: false, error });
    }
});
app.all("*", (req, res) => {
    res.status(404).json({ success: false, message: `Route Is Not Found ${req.url}` });
});
exports.default = app;
