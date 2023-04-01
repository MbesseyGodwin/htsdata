import React, { useState } from 'react';
import { Button, Text, View, SafeAreaView, StyleSheet } from 'react-native';
import Mytext from './components/Mytext';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { DatabaseConnection } from '../database/database-connection';

const db = DatabaseConnection.getConnection();

const ViewUser = () => {
  let [inputUserId, setInputUserId] = useState('');
  let [userData, setUserData] = useState({});

  let searchUser = () => {
    console.log(inputUserId);
    if (!inputUserId) {
      alert('enter ID');
      return;
    }
    setUserData({});
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM htsData where hts_id = ?',
        [inputUserId],
        (tx, results) => {
          var len = results.rows.length;
          console.log('len', len);
          if (len > 0) {
            setUserData(results.rows.item(0));
          } else {
            alert(`HTS ID "${inputUserId}" Not Found`);
          }
        }
      );
    });
  };

  const refreshData = () => {
    setInputUserId("");
    setUserData("");
  };


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <Mytext text="Filter By HTS ID" />
          <Mytextinput
            value={inputUserId}
            placeholder="Enter a HTS ID"
            onChangeText={
              (inputUserId) => setInputUserId(inputUserId)
            }
            style={{ padding: 10 }}
            keyboardType="numeric"
          />
          <Mybutton title="Search Record" customClick={searchUser} />
          {/* pay attention to this refresh button, use flex to group the buttons */}
          {/* <Button style={styles.button} title="Refresh" onPress={refreshData} /> */}
          <View
            style={{
              marginLeft: 35,
              marginRight: 35,
              marginTop: 10
            }}>
            <Text>HTS ID : {userData.hts_id}</Text>
            <Text>Test Date : {userData.test_date}</Text>
            <Text>Client Code : {userData.client_code}</Text>
            <Text>Age : {userData.age}</Text>
            <Text>Gender : {userData.gender}</Text>
            <Text>Address1 : {userData.address1}</Text>
            <Text>Address2 : {userData.address2}</Text>
            <Text>Contact : {userData.contact}</Text>
            <Text>First Name : {userData.firstname}</Text>
            <Text>Last Name : {userData.lastname}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};


export default ViewUser;