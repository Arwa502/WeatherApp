import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native'; //importing stylesheet, image background, stylesheet and View
import { Button, Card, DataTable, Paragraph, TextInput ,Text} from 'react-native-paper'; //importing Button, Card, DataTabe, Paragraph, TextInput, Text 


const WeatherApp = () => {
  const [city, setCity] = useState(''); //city is initially set as empty, it will change once user enters the city name
  const [loading, setLoading] = useState(false); //keep track of whether the weather data is currently being fetched or not
  const [weatherData, setWeatherData] = useState(null); //to store the fetched data
  const [errorMessage, setErrorMessage] = useState(null); //to store error mesage in case of server error or city name error

  const fetchWeatherData = async () => {
  try {
    setLoading(true);
    setErrorMessage(null);//initially or after every submit button click, the error message is null
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=c82ecd3e007093935242a3f760a78053`
    );
    if (!response.ok) { //if server error then this error is thrown
      throw new Error('Error fetching weather data. Please check the city name or check for server error.');
    }
    const data = await response.json();
    setWeatherData(data); //weaterhData is set to the fetched data
  } catch (error) {
  console.error('Error fetching weather data:', error);
  setWeatherData(null); //after every fetch results, weatherData is again set to null to accomodate for new requests
  setErrorMessage('Error fetching weather data. Please check the city name.');
  } finally {
    setLoading(false); //when data is fetched, loading is set to false
  }
};
  const handleClear = () => { //this code is for clear button 
    setCity(''); //city value is set to null
    setWeatherData(null); //weather data is set to null
    setErrorMessage(null); //error message is set to null
  };
  return (
    <View style={styles.container}> 
      <ImageBackground //background image is set.
        source={require('./background.jpg')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <Text style={styles.title}>Welcome to Weathery!</Text>
        <View style={styles.inputContainer}>
          <TextInput //textinput will allow user to enter city name
            label="Enter City"
            value={city}
            onChangeText={(text) => setCity(text)} 
            style={styles.input}
          />
          <Button
            mode="contained"
            loading={loading}
            disabled={loading || !city} //initally Get Weather button is disabled. once user enters city name, then this button is activated
            onPress={fetchWeatherData}
            style={styles.button}
          >
            Get Weather
          </Button>
          <Button
            mode="contained"
            onPress={handleClear}
            style={styles.buttonclear}
            labelStyle={{ fontSize: 12, textTransform: 'lowercase', color: 'purple' }}
          >
            Clear
          </Button>
        </View>
        {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
        {weatherData && (
          <Card style={styles.card}>
            <Card.Title title="Weather Information" />
            <Card.Content>
              <DataTable> 
                <DataTable.Row>
                  <DataTable.Cell>Temperature</DataTable.Cell>
                  <DataTable.Cell>{weatherData.main.temp} C</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>Feels Like</DataTable.Cell>
                  <DataTable.Cell>{weatherData.main.feels_like} C</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>Min Temperature</DataTable.Cell>
                  <DataTable.Cell>{weatherData.main.temp_min} C</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>Max Temperature</DataTable.Cell>
                  <DataTable.Cell>{weatherData.main.temp_max} C</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>Pressure</DataTable.Cell>
                  <DataTable.Cell>{weatherData.main.pressure} Pa</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>Humidity</DataTable.Cell>
                  <DataTable.Cell>{weatherData.main.humidity} %</DataTable.Cell>
                </DataTable.Row>
              </DataTable>
            </Card.Content>
          </Card>
        )}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginRight: 10,
    padding: 2,
  },
  button: {
    borderRadius: 10,
    marginTop: 20,
    backgroundColor: 'rgb(216, 191, 216)',
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonclear: {
  borderRadius: 10,
  marginTop: 10,
  backgroundColor: 'null',
  paddingHorizontal: 5,
  justifyContent: 'center',
  alignItems: 'center',
  height: 25,
  width: 50,
},
  card: {
    borderRadius: 10,
    elevation: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  error: {
  color: 'red',
  marginTop: 10,
  textAlign: 'center',
},
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: "rgb(173, 153, 173)",
  },
});



export default WeatherApp
