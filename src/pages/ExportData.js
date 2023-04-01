import React, { useState } from 'react';
import { Button, Text, View, SafeAreaView, StyleSheet } from 'react-native';
import Mytext from './components/Mytext';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { DatabaseConnection } from '../database/database-connection';

const db = DatabaseConnection.getConnection();

const ExportData = () => {
 
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <Mybutton title="Export to CSV" />
          <Mybutton title="Export to XML" />
          <Mybutton title="Export to JSON" />
          <Mybutton title="Export to PDF" />
        </View>
      </View>
    </SafeAreaView>
  );
};


export default ExportData;