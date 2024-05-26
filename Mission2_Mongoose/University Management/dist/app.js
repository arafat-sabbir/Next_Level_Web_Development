"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const index_1 = __importDefault(require("./app/routes/index"));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// use All The Routes From Routes
app.use('/api/v1', index_1.default);
app.get('/', (req, res) => {
    res.send('Hello NewBie!');
});
app.use(globalErrorHandler_1.default);
app.all('*', (req, res) => {
    res.status(404).json({ success: false, message: `Route Is Not Found ${req.url}` });
});
exports.default = app;
