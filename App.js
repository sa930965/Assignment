import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const getTravelRoute = (tickets, startCity) => {
  const route = [];
  const ticketMap = new Map();

  tickets.forEach(([from, to]) => {
    if (!ticketMap.has(from)) {
      ticketMap.set(from, []);
    }
    ticketMap.get(from).push(to);
  });

  const findRoute = (currentCity) => {
    route.push(currentCity);

    if (ticketMap.has(currentCity)) {
      const destinations = ticketMap.get(currentCity);

      destinations.sort();

      for (const destination of destinations) {
        ticketMap.set(
          currentCity,
          destinations.filter((d) => d !== destination)
        );

        findRoute(destination);
      }
    }
  };

  findRoute(startCity);
  return route;
};

const App = () => {
  const tickets = [
    ["Paris", "Skopje"],
    ["Zurich", "Amsterdam"],
    ["Prague", "Zurich"],
    ["Barcelona", "Berlin"],
    ["Kiev", "Prague"],
    ["Skopje", "Paris"],
    ["Amsterdam", "Barcelona"],
    ["Berlin", "Kiev"],
    ["Berlin", "Amsterdam"],
  ];

  const startCity = "Kiev";
  const travelRoute = getTravelRoute(tickets, startCity);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Your Travel Route</Text>
      {travelRoute.map((city, index) => (
        <View key={index} style={styles.routeItem}>
          <View style={styles.iconContainer}>
            <Icon name="map-marker" size={24} color="#FF6F61" />
            {index < travelRoute.length - 1 && (
              <View style={styles.line}></View>
            )}
          </View>
          <View style={styles.cityContainer}>
            <Text style={styles.cityText}>{city}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f7f9fc",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  routeItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  iconContainer: {
    alignItems: "center",
    marginRight: 15,
  },
  line: {
    width: 2,
    height: 40,
    backgroundColor: "#FF6F61",
    marginTop: 5,
  },
  cityContainer: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    elevation: 5,
  },
  cityText: {
    fontSize: 20,
    color: "#555",
  },
});

export default App;
