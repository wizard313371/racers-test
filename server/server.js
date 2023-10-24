"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const driverRoutes_1 = __importDefault(require("./routes/driverRoutes"));
const demoData_1 = __importDefault(require("./demoData"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
if (process.env.NODE_ENV !== 'test') {
    mongoose_1.default.connect('mongodb://admin:password@mongo:27017').then(() => {
        console.log('Connected to MongoDB');
        (0, demoData_1.default)();
    }).catch(error => {
        console.error('Error connecting to MongoDB:', error.message);
    });
}
app.use('/drivers', driverRoutes_1.default);
app.listen(process.env.PORT || 8080, () => {
    console.log(`Server is running on port ${process.env.PORT || 8080}`);
});
module.exports = app;
