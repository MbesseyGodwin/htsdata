import React, { useState } from 'react';
import { View, Alert, SafeAreaView } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { DatabaseConnection } from '../database/database-connection';

const db = DatabaseConnection.getConnection();

const DeleteUser = ({ navigation }) => {
  let [inputUserId, setInputUserId] = useState('');

  let deleteUser = () => {
    if (!inputUserId) {
      alert('enter ID');
      return;
    }
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM  htsdata where hts_id=?',
        [inputUserId],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              `User ID "${inputUserId}" Deleted`,
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('Delete'),
                },
              ],
              { cancelable: false }
            );
          } else {
            alert(`User ID "${inputUserId}" does not exist`);
            setInputUserId("");
          }
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <Mytextinput
            value={inputUserId}
            placeholder="Enter a HTS ID"
            onChangeText={
              (inputUserId) => setInputUserId(inputUserId)
            }
            style={{ padding: 10 }}
            keyboardType="numeric"
          />
          <Mybutton title="Delete Record" customClick={deleteUser} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DeleteUser;