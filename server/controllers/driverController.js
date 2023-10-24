"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDriver = exports.addDriver = exports.updateDriver = exports.getDriver = exports.getDrivers = void 0;
const driverModel_1 = require("../models/driverModel");
const joi_1 = __importDefault(require("joi"));
const handleError = (res, error) => {
    if (error instanceof joi_1.default.ValidationError) {
        console.log(error.details[0].message);
        res.status(400).json(error.details[0].message);
    }
    else if (error instanceof Error) {
        console.log(error.message);
        res.status(500).json(error.message);
    }
    else {
        console.log('An unexpected error occurred');
        res.status(500).json('An unexpected error occurred');
    }
};
const driverSchema = joi_1.default.object({
    givenName: joi_1.default.string().required(),
    familyName: joi_1.default.string().required(),
    url: joi_1.default.string().uri().required(),
    dateOfBirth: joi_1.default.date().required(),
    nationality: joi_1.default.string().required(),
});
const getDrivers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const startIndex = (page - 1) * limit;
        const drivers = yield driverModel_1.Driver.find()
            .select('givenName familyName')
            .skip(startIndex)
            .limit(limit)
            .lean();
        const totalDriversCount = yield driverModel_1.Driver.countDocuments();
        res.json({ drivers, totalDriversCount });
    }
    catch (error) {
        handleError(res, error);
    }
});
exports.getDrivers = getDrivers;
const getDriver = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const driver = yield driverModel_1.Driver.findById(req.params.id);
        if (!driver) {
            res.status(404).send('Driver not found');
            return;
        }
        res.json(driver);
    }
    catch (error) {
        handleError(res, error);
    }
});
exports.getDriver = getDriver;
const updateDriver = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = driverSchema.validate(req.body);
    if (error) {
        handleError(res, error);
        return;
    }
    try {
        const driver = yield driverModel_1.Driver.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!driver) {
            res.status(404).send('Driver not found');
            return;
        }
        res.json(driver);
    }
    catch (error) {
        handleError(res, error);
    }
});
exports.updateDriver = updateDriver;
const addDriver = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = driverSchema.validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    try {
        const driver = new driverModel_1.Driver(req.body);
        yield driver.save();
        res.json(driver);
    }
    catch (error) {
        handleError(res, error);
    }
});
exports.addDriver = addDriver;
const deleteDriver = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const driver = yield driverModel_1.Driver.findByIdAndRemove(req.params.id);
        if (!driver) {
            res.status(404).send('Driver not found');
            return;
        }
        res.json(driver);
    }
    catch (error) {
        handleError(res, error);
    }
});
exports.deleteDriver = deleteDriver;
