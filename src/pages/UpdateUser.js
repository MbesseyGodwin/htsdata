import React, { useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
} from 'react-native';

import Mytext from './components/Mytext';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { DatabaseConnection } from '../database/database-connection';

const db = DatabaseConnection.getConnection();

const UpdateUser = ({ navigation }) => {
  let [inputHtsId, setInputHtsId] = useState('');
  let [testDate, setTestDate] = useState('');
  let [clientCode, setClientCode] = useState('');
  let [age, setAge] = useState('');
  let [gender, setGender] = useState('');
  let [address1, setAddress1] = useState('');
  let [address2, setAddress2] = useState('');
  let [contact, setContact] = useState('');
  let [firstName, setFirstName] = useState('');
  let [lastName, setLastName] = useState('');

  let updateAllStates = (testDate, clientCode, age, gender, address1, address2, contact, firstName, lastName) => {
    setTestDate(testDate);
    setClientCode(clientCode);
    setAge(age);
    gender(gender);
    setAddress1(address1);
    setAddress2(address2);
    setContact(contact);
    setFirstName(firstName);
    setLastName(lastName);

  };

  let searchUser = () => {
    console.log(inputHtsId);
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM htsdata where hts_id = ?',
        [inputHtsId],
        (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            let res = results.rows.item(0);
            updateAllStates(
              res.test_date,
              res.client_code,
              res.age,
              res.gender,
              res.address1,
              res.address2,
              res.contact,
              res.firstname,
              res.lastname,
            );
          } else {
            alert('No User ID Found!');
            updateAllStates('', '', '', '', '', '', '', '', '');
          }
        }
      );
    });
  };
  let updateUser = () => {
    console.log(testDate, clientCode, age, gender, address1, address2, contact, firstName, lastName);

    if (!clientCode) {
      alert('enter ID');
      return;
    }
    if (!firstName) {
      alert('enter name');
      return;
    }
    if (!lastName) {
      alert('enter name');
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE htsdata set test_date=?, client_code=?, age=?, gender=?, address1=?, address2=?, contact=?, firstname=?, lastname=?',
        [testDate, clientCode, age, gender, address1, address2, contact, firstName, lastName],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Record Updated',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('Update'),
                },
              ],
              { cancelable: false }
            );
          } else alert('Error Updating Record');
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
              <Mytext text="Filter By HTS ID" />
              <Mytextinput
                placeholder="Enter a HTS ID"
                style={{ padding: 10 }}
                keyboardType="numeric"
                onChangeText={
                  (inputHtsId) => setInputHtsId(inputHtsId)
                }
              />
              <Mybutton
                title="Search HTS"
                customClick={searchUser}
              />

              <Mytextinput
                placeholder="test date"
                value={testDate}
                style={{ padding: 10 }}
                onChangeText={
                  (testDate) => setTestDate(testDate)
                }
              />
              <Mytextinput
                placeholder="Client Code"
                value={clientCode}
                style={{ padding: 10 }}
                onChangeText={
                  (clientCode) => setClientCode(clientCode)
                }
              />

              <Mytextinput
                placeholder="Age"
                value={age}
                onChangeText={
                  (age) => setAge(age)
                }
                maxLength={10}
                style={{ padding: 10 }}
                keyboardType="numeric"
              />

              <Mytextinput
                value={gender}
                placeholder="gender"
                onChangeText={
                  (gender) => setGender(gender)
                }
                style={{ padding: 10 }}
              />

              <Mytextinput
                value={address1}
                placeholder="Address 1"
                onChangeText={
                  (address1) => setAddress1(address1)
                }
                maxLength={225}
                numberOfLines={3}
                multiline={true}
                style={{ textAlignVertical: 'top', padding: 10 }}
              />

              <Mytextinput
                value={address2}
                placeholder="Address 2"
                onChangeText={
                  (address2) => setAddress2(address2)
                }
                maxLength={225}
                numberOfLines={3}
                multiline={true}
                style={{ textAlignVertical: 'top', padding: 10 }}
              />

              <Mytextinput
                value={contact}
                placeholder="contact"
                onChangeText={
                  (contact) => setContact(contact)
                }
                style={{ padding: 10 }}
              />

              <Mytextinput
                value={firstName}
                placeholder="First Name"
                onChangeText={
                  (firstName) => setFirstName(firstName)
                }
                style={{ padding: 10 }}
              />

              <Mytextinput
                value={lastName}
                placeholder="Last Name"
                onChangeText={
                  (lastName) => setLastName(lastName)
                }
                style={{ padding: 10 }}
              />

              <Mybutton
                title="Update User"
                customClick={updateUser}
              />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UpdateUser;