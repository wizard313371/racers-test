import React, { useState, useEffect } from 'react';
import { Button, Text, TextInput } from 'react-native';
import { useDriver, useUpdateDriver } from '../../api';
import { Container, ErrorText, Label, StyledInput, StyledText } from './styles';

interface EditDriverProfileProps {
  route: {
    params: {
      driverId: string;
    };
  };
}

const formatDateToDisplay = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
};

const formatDateToDB = (dateString: string) => {
  const [day, month, year] = dateString.split('.');
  return `${year}-${month}-${day}`;
};

const EditDriverProfile: React.FC<EditDriverProfileProps> = ({ route }) => {
  const { driverId } = route.params;
  const { driver, isLoading, isError } = useDriver(driverId);
  const { updateDriver } = useUpdateDriver(driverId);
  const [updateError, setUpdateError] = useState<string | null>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [url, setUrl] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [nationality, setNationality] = useState('');

  useEffect(() => {
    if (driver) {
      setUrl(driver.url);
      setDateOfBirth(formatDateToDisplay(driver.dateOfBirth));
      setNationality(driver.nationality);
    }
  }, [driver]);

  const handleUpdate = async () => {
    try {
      const updateData = {
        givenName: driver.givenName,
        familyName: driver.familyName,
        url,
        dateOfBirth: formatDateToDB(dateOfBirth),
        nationality
      };

      await updateDriver(updateData);
      setIsEditing(false);
      setUpdateError(null);
    } catch (error) {
      console.error('Error updating driver:', error);
      setUpdateError(error.message);
    }
  };

  if (isError) return <Container><Text>Error loading data</Text></Container>;
  if (isLoading || !driver) return <Container><Text>Loading...</Text></Container>;

  return (
    <Container>
      <Label>Given Name</Label>
      <StyledText>{driver.givenName}</StyledText>
      <Label>Family Name</Label>
      <StyledText>{driver.familyName}</StyledText>
      <Label>URL</Label>
      {isEditing ? (
        <StyledInput
          value={url}
          onChangeText={setUrl}
          placeholder="URL"
        />
      ) : (
        <StyledText>{url}</StyledText>
      )}
      <Label>Date of Birth</Label>
      {isEditing ? (
        <StyledInput
          value={dateOfBirth}
          onChangeText={setDateOfBirth}
          placeholder="Date of Birth"
        />
      ) : (
        <StyledText>{dateOfBirth}</StyledText>
      )}
      <Label>Nationality</Label>
      {isEditing ? (
        <StyledInput
          value={nationality}
          onChangeText={setNationality}
          placeholder="Nationality"
        />
      ) : (
        <StyledText>{nationality}</StyledText>
      )}
      {updateError ? <ErrorText>{updateError}</ErrorText> : null}
      {isEditing ? (
        <Button title="Save" onPress={handleUpdate} />
      ) : (
        <Button title="Edit" onPress={() => setIsEditing(true)} />
      )}
    </Container>
  );
};

export default EditDriverProfile;
