import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CheckBox from 'react-native-check-box';

const Profession = () => {
  const services = [
    { department: 'Ac & Home Appliance' },
    { department: 'Plumbing' },
  ];

  const [selectedItems, setSelectedItems] = useState({});
 
  const toggleCheckbox = (dept) => {
  
    setSelectedItems((prev) => {
      const updated = { ...prev };

      updated[dept] = !updated[dept]; 
      console.log(updated) 
      return updated;
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.head}>Select Your Profession</Text>

     
      {services.map((item, itemIndex) => {
          const dept = item.department; // Accessing department name
          return (
            <CheckBox
              key={itemIndex}
              style={{ padding: 10 }}
              onClick={() => toggleCheckbox(dept)}
              isChecked={!!selectedItems[dept]} // Check if selected
              leftText={dept}
              leftTextStyle={{ fontSize: 20 }}
            />
          );
        })}

           <TouchableOpacity
     
             style={styles.button}
             onPress={()=>router.push('(serviceprovider)')}
           >
             <Text style={{ fontSize: 23, color: "white" }}>Submit</Text>
           </TouchableOpacity>

     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  button: {
    backgroundColor: "#ffe003",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    marginTop:20
   
  },
  head: {
    fontSize: 22,
    fontWeight: '500',
    marginBottom: 20,
    marginTop:30
  },
 
 
  itemText: {
    fontSize: 14,
    marginLeft: 10,
    marginTop: 5,
  },
});

export default Profession;
