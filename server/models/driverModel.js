"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Driver = void 0;
const mongoose_1 = require("mongoose");
const driverSchema = new mongoose_1.Schema({
    givenName: String,
    familyName: String,
    url: String,
    dateOfBirth: Date,
    nationality: String,
});
exports.Driver = (0, mongoose_1.model)('Driver', driverSchema);
