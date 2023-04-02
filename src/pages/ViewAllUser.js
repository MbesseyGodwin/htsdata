import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, SafeAreaView, StyleSheet, Button } from 'react-native';
import { DatabaseConnection } from '../database/database-connection';
import ExportCSV from './ExportCSV';

const db = DatabaseConnection.getConnection();

const ViewAllUser = () => {
  const [flatListItems, setFlatListItems] = useState([]);
  const [count, setCount] = useState(0);
  const [data, setData] = useState();

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM htsdata',
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setFlatListItems(temp);
          setCount(results.rows.length); // set the count of records returned
          // console.log(temp);
          setData(temp)
        }
      );
    });
  }, []);
  console.log('loging data');
  console.log(data);

  let listItemView = (item) => {
    return (
      <View
        key={item.hts_id}
        style={{ backgroundColor: '#32AEAA', marginTop: 10, padding: 30, borderRadius: 10 }}>
        <Text style={styles.textheader}>HTS ID</Text>
        <Text style={styles.textbottom}>{item.hts_id}</Text>


        <Text style={styles.textheader}>Client Code</Text>
        <Text style={styles.textbottom}>{item.client_code}</Text>

        <Text style={styles.textheader}>Full Name</Text>
        <Text style={styles.textbottom}>{`${item.firstname} ${item.lastname}`}</Text>

        <Text style={styles.textheader}>Sex/Age</Text>
        <Text style={styles.textbottom}>{`${item.gender} (${item.age} yrs)`}</Text>

        <Text style={styles.textheader}>Address1</Text>
        <Text style={styles.textbottom}>{item.address1}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, marginBottom: 10, }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <Text style={styles.countText}>Total Records: {count}</Text>
          <FlatList
            style={{ marginTop: 0 }}
            contentContainerStyle={{ paddingHorizontal: 20 }}
            data={flatListItems}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => listItemView(item)}
          />
        </View>
      </View>
      <ExportCSV />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textheader: {
    color: '#000',
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'capitalize',
    textDecorationLine: 'underline',
  },
  textbottom: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  countText: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default ViewAllUser;
