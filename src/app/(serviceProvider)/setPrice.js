import { useReducer } from 'react';
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';

function formReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_FIELD':
      const newState = [...state];
      newState[action.index] = {
        ...newState[action.index],
        price: action.value
      };
      return newState;
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

const initialState = [];

export default function SetPrice() {
  const works = useSelector((state) => state?.serviceProviders?.getServiceProvider?.data?.works) || [];
  const [state, dispatch] = useReducer(formReducer, works);

  const handleChange = (index, value) => {
    const cleaned = value.replace(/[^0-9]/g, '');
    dispatch({ type: 'UPDATE_FIELD', index, value: cleaned });
  };

  const handleSubmit = () => {
    Keyboard.dismiss();
    console.log('Submitted Prices:', state);
    // Add your API call here
  };

  let prevCat = '';

  return (
    <ScrollView 
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.mainTitle}>Set Your Service Prices</Text>
      <Text style={styles.subtitle}>Update pricing for each service you offer</Text>

      {works.map((item, index) => {
        const showCategory = item.category !== prevCat;
        if (showCategory) prevCat = item.category;

        return (
          <View key={index}>
            {showCategory && (
              <View style={styles.categoryHeader}>
                <Text style={styles.categoryTitle}>{item.category}</Text>
                <View style={styles.categoryLine} />
              </View>
            )}

            <View style={styles.row}>
              <Text style={styles.serviceName}>{item.name}</Text>
              
              <View style={styles.inputWrapper}>
                <Text style={styles.currency}>₹</Text>
                <TextInput
                  style={styles.input}
                  placeholder="0"
                  keyboardType="numeric"
                  value={state[index]?.price || ''}
                  onChangeText={(text) => handleChange(index, text)}
                  maxLength={6}
                />
              </View>
            </View>
          </View>
        );
      })}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>
          Save All Prices
        </Text>
      </TouchableOpacity>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#f8fafc',
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
   marginBottom: 20,        // ← reduced from 32 → 20 (or even 16 if you want super tight)
    lineHeight: 22,
  },

  // Category Header
  categoryHeader: {
    marginTop: 10,
    marginBottom: 16,
  },
  categoryTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: '#e11d48', // rose-600
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  categoryLine: {
    height: 3,
    width: 50,
    backgroundColor: '#fbcfe8',
    borderRadius: 2,
  },

  // Service Row
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 18,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  serviceName: {
    fontSize: 16.5,
    fontWeight: '600',
    color: '#1e293b',
    flex: 1,
    marginRight: 16,
  },

  // Input with ₹ symbol
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    overflow: 'hidden',
  },
  currency: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#64748b',
    paddingHorizontal: 12,
  },
  input: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    paddingVertical: 12,
    paddingRight: 16,
    minWidth: 100,
    textAlign: 'right',
  },

  // Submit Button
  submitButton: {
    marginTop: 32,
    backgroundColor: '#dc2626', // red-600
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#dc2626',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});