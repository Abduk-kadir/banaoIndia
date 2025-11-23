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
 
  const works = useSelector((state) => state?.serviceProviders?.getServiceProvider?.data?.works);
  const [state, dispatch] = useReducer(formReducer, works);
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
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
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
    fontSize: 20,
    fontWeight: '700',
    color: '#f56d82ff',
    marginBottom: 5,
   
    textTransform: 'capitalize',
  },
  inputContainer: {
    marginBottom: 5,
    flexDirection: 'row',
   
   
  },
  label: {
   fontSize: 16,
    fontWeight: '600',
    textTransform: 'capitalize',
    flex: 1,                   
           
    
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
