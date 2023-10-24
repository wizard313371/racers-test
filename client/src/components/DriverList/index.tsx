import React, { useState } from 'react';
import { ScrollView, Text, Button } from 'react-native';
import { useDrivers } from '../../api';
import { DriverCard, DriverName, PaginationContainer } from './styles';
import { useNavigation } from '@react-navigation/native';

const Index: React.FC = () => {
  const [page, setPage] = useState(1);
  const { drivers, totalDriversCount, isLoading, isError } = useDrivers(page, 5);
  const navigation = useNavigation();

  const hasNextPage = (page * 5) < totalDriversCount;

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  if (isError) return <Text>Error loading data</Text>;
  if (isLoading || !drivers) return <Text>Loading...</Text>;

  return (
    <ScrollView>
      {drivers.map((driver) => (
        <DriverCard key={driver._id} onPress={() => navigation.navigate('EditDriverProfile', { driverId: driver._id })}>
          <DriverName>
            {driver.givenName} {driver.familyName}
          </DriverName>
        </DriverCard>
      ))}
      <PaginationContainer>
        <Button title={'Previous'} onPress={handlePreviousPage} disabled={page === 1} />
        <Button title={'Next'} onPress={handleNextPage} disabled={!hasNextPage} />
      </PaginationContainer>
    </ScrollView>
  );
};

export default Index;
