import React, { useEffect } from 'react';
import { View, SafeAreaView } from 'react-native';
import MyImageButton from './components/MyImageButton';
import { DatabaseConnection } from '../database/database-connection';

const db = DatabaseConnection.getConnection();

const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_user', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS htsdata (hts_id INTEGER PRIMARY KEY AUTOINCREMENT, test_date VARCHAR(10), client_code VARCHAR(10), age INTEGER, gender VARCHAR(10), address1 VARCHAR(50), address2 VARCHAR(50), contact VARCHAR(20), firstname VARCHAR(20), lastname VARCHAR(20))',
              []
            );
          }
        }
      );
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>

            <MyImageButton
              title="Register"
              btnColor='#2992C4'
              btnIcon="user-plus"
              customClick={() => navigation.navigate('Register')}
            />

            <MyImageButton
              title="Update"
              btnColor='#A45BB9'
              btnIcon="edit"
              customClick={() => navigation.navigate('Update')}
            />

            <MyImageButton
              title="Search"
              btnColor='#F9AD29'
              btnIcon="user"
              customClick={() => navigation.navigate('View')}
            />
            <MyImageButton
              title="View all"
              btnColor='#384F62'
              btnIcon="users"
              customClick={() => navigation.navigate('ViewAll')}
            />
            <MyImageButton
              title="Delete"
              btnColor='#D1503A'
              btnIcon="user-times"
              customClick={() => navigation.navigate('Delete')}
            />

            <MyImageButton
              title="Export"
              btnColor='#0ece61'
              btnIcon="car"
              customClick={() => navigation.navigate('ExportData')}
            />
          </View>
        </View>


      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;