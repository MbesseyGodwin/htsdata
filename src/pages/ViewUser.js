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
        'SELECT * FROM table_user where user_id = ?',
        [inputUserId],
        (tx, results) => {
          var len = results.rows.length;
          console.log('len', len);
          if (len > 0) {
            setUserData(results.rows.item(0));
          } else {
            alert(`User ID "${inputUserId}" Not Found`);
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
          <Mytext text="Filter By User ID" />
          <Mytextinput
            value={inputUserId}
            placeholder="Enter a User ID"
            onChangeText={
              (inputUserId) => setInputUserId(inputUserId)
            }
            style={{ padding: 10 }}
            keyboardType="numeric"
          />
          <Mybutton title="Search User" customClick={searchUser} />
          {/* pay attention to this refresh button, use flex to group the buttons */}
          {/* <Button style={styles.button} title="Refresh" onPress={refreshData} /> */}
          <View
            style={{
              marginLeft: 35,
              marginRight: 35,
              marginTop: 10
            }}>
            <Text>User ID : {userData.user_id}</Text>
            <Text>Name : {userData.user_name}</Text>
            <Text>Contact : {userData.user_contact}</Text>
            <Text>Address : {userData.user_address}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};


export default ViewUser;