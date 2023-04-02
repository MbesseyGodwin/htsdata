import React from 'react';
import { Button } from 'react-native';
import * as FileSystem from 'expo-file-system';

const data = [
    {
        "address1": "Umuahia ",
        "address2": "Abuja",
        "age": 21,
        "client_code": "12345",
        "contact": "09038337102",
        "firstname": "Mbessey",
        "gender": "Male ",
        "hts_id": 1,
        "lastname": "Godwin",
        "test_date": "",
    },
    {
        "address1": "Gboko",
        "address2": "Makurdi",
        "age": 31,
        "client_code": "12121",
        "contact": "0812211221",
        "firstname": "Felix",
        "gender": "Male",
        "hts_id": 2,
        "lastname": "Hom",
        "test_date": "",
    },
];

const exportData = async () => {
    const csv = data.map(row => Object.values(row).join(',')).join('\n');
    const pathToWrite = `${FileSystem.documentDirectory}/data.csv`;

    try {
        await FileSystem.writeAsStringAsync(pathToWrite, csv, { encoding: FileSystem.EncodingType.UTF8 });
        console.log('File written successfully!');
        console.log(pathToWrite);
    } catch (error) {
        console.log('Error writing file:', error);
    }
};

const ExportCSV = () => {
    return <Button title="Export" onPress={exportData} />;
};

export default ExportCSV;
