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
const axios_1 = __importDefault(require("axios"));
const driverModel_1 = require("./models/driverModel");
const demoDataURL = 'https://ergast.com/api/f1/drivers.json?limit=20&offset=1';
const loadDemoData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield driverModel_1.Driver.deleteMany();
        console.log('Existing data cleared');
        const response = yield axios_1.default.get(demoDataURL);
        const driversData = response.data.MRData.DriverTable.Drivers;
        const drivers = driversData.map((driver) => ({
            givenName: driver.givenName,
            familyName: driver.familyName,
            url: driver.url,
            dateOfBirth: driver.dateOfBirth,
            nationality: driver.nationality,
        }));
        yield driverModel_1.Driver.insertMany(drivers);
        console.log('Demo data loaded successfully');
    }
    catch (error) {
        console.error('Error loading demo data:', error);
    }
});
exports.default = loadDemoData;
