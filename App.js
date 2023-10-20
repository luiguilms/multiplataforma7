import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, FlatList } from 'react-native';
import axios from 'axios';

export default function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // URL de la API "REST Countries" para obtener la lista de países
    const apiUrl = 'https://restcountries.com/v3.1/all';

    // Hacer una solicitud GET a la API
    axios.get(apiUrl)
      .then(response => {
        setCountries(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lista de Países</Text>
      <TextInput
        style={styles.input}
        placeholder="Buscar país..."
        value={search}
        onChangeText={(text) => setSearch(text)}
      />
      <FlatList
        data={filteredCountries}
        keyExtractor={item => item.cca2}
        renderItem={({ item }) => (
          <View style={styles.countryContainer}>
            <Text style={styles.countryName}>{item.name.common}</Text>
            <Text style={styles.countryPopulation}>Población: {item.population}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 16,
    border: '1px solid #ccc',
    borderRadius: 8,
  },
  countryContainer: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  countryName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  countryPopulation: {
    fontSize: 16,
    color: 'gray',
  },
});
