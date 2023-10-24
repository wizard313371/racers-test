import axios from 'axios';
import { Driver } from './models/driverModel';

const demoDataURL = 'https://ergast.com/api/f1/drivers.json?limit=20&offset=1';

const loadDemoData = async () => {
  try {
    await Driver.deleteMany();
    console.log('Existing data cleared');

    const response = await axios.get(demoDataURL);
    const driversData = response.data.MRData.DriverTable.Drivers;

    const drivers = driversData.map((driver: any) => ({
      givenName: driver.givenName,
      familyName: driver.familyName,
      url: driver.url,
      dateOfBirth: driver.dateOfBirth,
      nationality: driver.nationality,
    }));
    await Driver.insertMany(drivers);
    console.log('Demo data loaded successfully');
  } catch (error) {
    console.error('Error loading demo data:', error);
  }
};

export default loadDemoData;
