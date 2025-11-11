// App.js  (React Native – plain JavaScript)
import { useReducer } from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import { useSelector } from 'react-redux';

const initialState = [
  { name: "ac service", price: "0" },  // Use string for TextInput
  { name: "gas fill", price: "0" }
];

function formReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_FIELD':
      const newState = [...state];
      newState[action.index] = {
        ...newState[action.index],
        [action.field]: action.value
      };
      return newState;
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export default function SetPrice() {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const works = useSelector((state) => state);
  console.log('allworks*******:', works);

  const handleChange = (index, field, value) => {
    dispatch({ type: 'UPDATE_FIELD', index, field, value });
  };

  const handleSubmit = () => {
    console.log('Submitted Prices:', state);
    // Add your submit logic here
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Set Your Own Price</Text>

      {state.map((item, index) => (
        <View key={index} style={styles.inputContainer}>
          <Text style={styles.label}>{item.name}</Text>
          <TextInput
            style={styles.input}
            placeholder={item.name}
            keyboardType="numeric"
            value={item.price.toString()}  // Ensure it's a string
            onChangeText={(text) => handleChange(index, 'price', text)}
          />
        </View>
      ))}

      <Button title="Submit" onPress={handleSubmit} color="#007AFF" />

      <View style={styles.spacer} />

      <Button
        title="Reset"
        onPress={() => dispatch({ type: 'RESET' })}
        color="#FF3B30"
      />
    </ScrollView>
  );
}

// ---- Styles ----
const styles = StyleSheet.create({
  container: {
    padding: 20,
   
   
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  spacer: {
    height: 10,
  },
});