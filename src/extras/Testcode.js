import React, { useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
  StyleSheet
} from 'react-native';

import SelectDropdown from 'react-native-select-dropdown'
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { DatabaseConnection } from '../database/database-connection';
import moment from 'moment';

let date = moment().format('D-MM-YYYY');
const db = DatabaseConnection.getConnection();

const RegisterUser = ({ navigation }) => {
  let [testDate, setTestDate] = useState('');
  let [clientCode, setClientCode] = useState('');
  let [age, setAge] = useState('');
  let [gender, setGender] = useState('');
  let [address1, setAddress1] = useState('');
  let [address2, setAddress2] = useState('');
  let [contact, setContact] = useState('');
  let [firstName, setFirstName] = useState('');
  let [lastName, setLastName] = useState('');

  const options = ["male", "female"];

  let register_user = () => {

    db.transaction(tx => {
      tx.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table';",
        [],
        (tx, results) => {
          console.log("Tables in database:");
          for (let i = 0; i < results.rows.length; i++) {
            console.log(results.rows.item(i).name);
          }
        },
        error => {
          console.log("Error on retrieving tables: " + error.message);
        },
      );
    });
    console.log(testDate, clientCode, age, gender, address1, address2, contact, firstName, lastName);

    if (!age) {
      alert('enter age');
      return;
    }
    if (!firstName) {
      alert('enter first Name');
      return;
    }
    if (!lastName) {
      alert('enter last name');
      return;
    }

    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO htsdata (test_date, client_code, age, gender, address1, address2, contact, firstname, lastname) VALUES (?,?,?,?,?,?,?,?,?)',
        [testDate, clientCode, age, gender, address1, address2, contact, firstName, lastName],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Record Added',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false }
            );
          } else alert('Error Adding Record');
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{ flex: 1, justifyContent: 'space-between' }}>

              <Text style={styles.text}>Test Date</Text>
              <Mytextinput
                // value={date}
                placeholder="Test Date"
                onChangeText={
                  (testDate) => setTestDate(testDate)
                }
                style={{ padding: 10 }}
              />

              <Text style={styles.text}>client Code</Text>
              <Mytextinput
                placeholder="client Code"
                onChangeText={
                  (clientCode) => setClientCode(clientCode)
                }
                style={{ padding: 10 }}
              />

              <Text style={styles.text}>First Name</Text>
              <Mytextinput
                placeholder="First Name"
                onChangeText={
                  (firstName) => setFirstName(firstName)
                }
                style={{ padding: 10 }}
              />

              <Text style={styles.text}>Last Name</Text>
              <Mytextinput
                placeholder="Last Name"
                onChangeText={
                  (lastName) => setLastName(lastName)
                }
                style={{ padding: 10 }}
              />

              <Text style={styles.text}>Age</Text>
              <Mytextinput
                placeholder="Age"
                onChangeText={
                  (age) => setAge(age)
                }
                style={{ padding: 10 }}
                keyboardType="numeric"
              />

              <View style={styles.container}>
                <Text style={styles.label}>Gender:</Text>
                <SelectDropdown
                  style={styles.dropdown}
                  data={options}
                  onSelect={(selectedItem, index) => {
                  }}
                  onChangeText={
                    (gender) => setGender(gender)
                  }
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem;
                  }}
                  rowTextForSelection={(item, index) => {
                    return item;
                  }}
                />
              </View>

              <Text style={styles.text}>Address 1: </Text>
              <Mytextinput
                placeholder="Address 1"
                onChangeText={
                  (address1) => setAddress1(address1)
                }
                maxLength={225}
                numberOfLines={3}
                multiline={true}
                style={{ textAlignVertical: 'top', padding: 10 }}
              />

              <Text style={styles.text}>Address 2: </Text>
              <Mytextinput
                placeholder="Address 2"
                onChangeText={
                  (address2) => setAddress2(address2)
                }
                maxLength={225}
                numberOfLines={3}
                multiline={true}
                style={{ textAlignVertical: 'top', padding: 10 }}
              />

              <Text style={styles.text}>Phone Number</Text>
              <Mytextinput
                placeholder="Contact"
                onChangeText={
                  (contact) => setContact(contact)
                }
                maxLength={10}
                keyboardType="numeric"
                style={{ padding: 10 }}
              />

              <Mybutton title="Register User" customClick={register_user} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  text: {
    color: 'red',
    fontWeight: 'bold',
    textTransform: 'capitalize',
    marginLeft: 33,
    marginBottom: -10,
    marginTop: 15
  },
  container: {
    // flexDirection: 'row',
    // alignItems: 'center',
    marginVertical: 10,
    marginLeft: 32
  },
  label: {
    fontSize: 16,
    color: 'red',
    fontWeight: 'bold',
  },
  dropdown: {
    width: 300,
  },
});

export default RegisterUser;