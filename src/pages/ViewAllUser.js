import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, SafeAreaView, StyleSheet } from 'react-native';
import { DatabaseConnection } from '../database/database-connection';

const db = DatabaseConnection.getConnection();

const ViewAllUser = () => {
  const [flatListItems, setFlatListItems] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_user',
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setFlatListItems(temp);
          setCount(results.rows.length); // set the count of records returned
        }
      );
    });
  }, []);

  let listItemView = (item) => {
    return (
      <View
        key={item.user_id}
        style={{ backgroundColor: '#32AEAA', marginTop: 10, padding: 30, borderRadius: 10 }}>
        <Text style={styles.textheader}>User ID</Text>
        <Text style={styles.textbottom}>{item.user_id}</Text>

        <Text style={styles.textheader}>Name</Text>
        <Text style={styles.textbottom}>{item.user_name}</Text>

        <Text style={styles.textheader}>Contact</Text>
        <Text style={styles.textbottom}>{item.user_contact}</Text>

        <Text style={styles.textheader}>Address</Text>
        <Text style={styles.textbottom}>{item.user_address}</Text>
      </View>   
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, marginBottom: 10, }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <Text style={styles.countText}>Total records: {count}</Text>
          <FlatList
            style={{ marginTop: 0 }}
            contentContainerStyle={{ paddingHorizontal: 20 }}
            data={flatListItems}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => listItemView(item)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textheader: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  textbottom: {
    color: '#fff',
    fontSize: 18,
  },
  countText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default ViewAllUser;
