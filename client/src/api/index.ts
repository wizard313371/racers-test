import { useEffect } from 'react';
import useSWR from 'swr';
import { useDispatch, useSelector } from 'react-redux';
import { setDrivers, updateDriverState } from '../redux/drivers/driversSlice';

const fetcher = (url) => fetch(url).then(res => res.json());

export interface IDriver {
  _id?: string,
  givenName: string;
  familyName: string;
  url: string;
  dateOfBirth: string;
  nationality: string;
}

export const useDrivers = (page, limit) => {
  const dispatch = useDispatch();
  const { data, error, mutate } = useSWR(`http://localhost:8080/drivers?page=${page}&limit=${limit}`, fetcher);

  useEffect(() => {
    if (data) {
      dispatch(setDrivers(data.drivers));
    }
  }, [data, dispatch]);

  const drivers = useSelector(state => state.drivers.drivers);
  const totalDriversCount = data?.totalDriversCount;

  return {
    drivers,
    totalDriversCount,
    isLoading: !error && !data,
    isError: error,
    mutate
  };
};

export const useDriver = (driverId: string) => {
  const { data, error, mutate } = useSWR(`http://localhost:8080/drivers/${driverId}`, fetcher);

  return {
    driver: data,
    isLoading: !error && !data,
    isError: error,
    mutate
  };
};

export const useUpdateDriver = (driverId: string) => {
  const dispatch = useDispatch();

  const updateDriver = async (updateData: IDriver) => {
    try {
      const response = await fetch(`http://localhost:8080/drivers/${driverId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData);
      }
      const updatedDriverData = await response.json();
      dispatch(updateDriverState(updatedDriverData));
      return updatedDriverData;
    } catch (error) {
      console.error('Error updating driver:', error);
      throw error;
    }
  };

  return {
    updateDriver
  };
};
