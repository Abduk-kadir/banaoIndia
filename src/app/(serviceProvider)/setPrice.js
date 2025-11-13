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
  { category: "ac&home", name: "ac service", price: "0" },
  { category: "ac&home", name: "gas fill", price: "0" },
  { category: "inverter", name: "repair", price: "0" },
  { category: "inverter", name: "heating", price: "0" }
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
    // keep only numbers
    const cleaned = value.replace(/[^0-9]/g, '');
    dispatch({ type: 'UPDATE_FIELD', index, field, value: cleaned });
  };

  const handleSubmit = () => {
    console.log('Submitted Prices:', state);
  };

  let prevCat = '';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.mainTitle}>Set Your Own Price</Text>

      {state.map((item, index) => {
        const showCategory = item.category !== prevCat;
        prevCat = item.category;

        return (
          <View key={index}>
            {showCategory && (
              <Text style={styles.categoryTitle}>
                {item.category.toUpperCase()}
              </Text>
            )}

            <View style={styles.inputContainer}>
              <Text style={styles.label}>{item.name}</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter price"
                keyboardType="numeric"
                value={item.price ? `₹${item.price}` : ''}
                onChangeText={(text) => handleChange(index, 'price', text)}
              />
            </View>
          </View>
        );
      })}

      <Button title="Submit" onPress={handleSubmit} color="#007AFF" />
   
    </ScrollView>
  );
}

// ---- Styles ----
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '700',
     color: '#f56d82ff',
    marginTop: 5,
   
    textTransform: 'capitalize',
  },
  inputContainer: {
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    backgroundColor: '#fff',
    width: 100,
    textAlign: 'center',
  },
 
});
