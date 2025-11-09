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

// ---- Reducer (pure JS) ----
const initialState = {
  price1: '',
  price2: '',
  price3: '',
  price4: '',
  price5: '',
};

function formReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        [action.field]: action.value,
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

// ---- Component ----
export default function SetPrice() {
  const [state, dispatch] = useReducer(formReducer, initialState);

  // Allow only numbers (including decimals) or empty string
  const handleChange = (field, value) => {
  
      dispatch({ type: 'UPDATE_FIELD', field, value });
    
  };

  const handleSubmit = () => {
    
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Set Your Own Price</Text>

      {['price1', 'price2', 'price3', 'price4', 'price5','price1', 'price2', 'price3', 'price4', 'price5'].map(field => (
        <View key={field} style={styles.inputContainer}>
          <Text style={styles.label}>{field.toUpperCase()}</Text>
          <TextInput
            style={styles.input}
            placeholder="$0.00"
            keyboardType="numeric"
            value={state[field]}
            onChangeText={text => handleChange(field, text)}
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
    flexGrow: 1,
    justifyContent: 'center',
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