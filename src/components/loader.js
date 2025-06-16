import React from 'react';
import { ActivityIndicator, View, StyleSheet,Text } from 'react-native';
const Loader = () => {
  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size={90} color='#0551EB' />
     
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    position: 'absolute', // Absolutely position the loader on top
    top: '50%',           // Vertically center it
    left: '50%',          // Horizontally center it
    transform: [
      { translateX: -45 }, // Adjust this based on loader's size to center
      { translateY: -45 }, // Adjust this based on loader's size to center
    ],
    zIndex: 1,            // Ensure it sits on top of other content
    justifyContent: 'center',
    alignItems: 'center',

  },
  waitingText: {
          // Space between the loader and the text
    fontSize: 18,           // Font size of the text
    color: 'grey',       // Color of the text (can be customized)
    fontWeight: 'bold',     // Make the text bold (optional)
  },
});

export default Loader;