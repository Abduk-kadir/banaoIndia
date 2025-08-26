import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';

const Profession = () => {
  const services = [
    { id: '1', label: 'Ac & Home Appliance', value: 'Ac & Home Appliance' },
    { id: '2', label: 'Plumbing', value: 'Plumbing' },
  ];

  const [selectedId, setSelectedId] = useState();
  
  const handleSubmit=()=>{
    console.log('value is:',selectedId)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.head}>Select Your Profession</Text>
      <RadioGroup
        radioButtons={services}
        onPress={setSelectedId}
        selectedId={selectedId}
        containerStyle={styles.radioGroup}
        labelStyle={styles.radioLabel}
      
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  head: {
    fontSize: 22,
    fontWeight: '500',
    marginBottom: 20,
    marginTop: 30,
  },
  radioGroup: {
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 20,
  },
  radioLabel: {
    fontSize: 18,
    color: '#333',
  },
  button: {
    backgroundColor: '#ffe003',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  buttonText: {
    fontSize: 23,
    color: 'white',
    fontWeight: '500',
  },
});

export default Profession;