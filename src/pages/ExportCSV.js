import React from 'react';
import { Button } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { DatabaseConnection } from '../database/database-connection';
const getAllData = () => {
    const db = DatabaseConnection.getConnection();
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM htsdata',
                [],
                (tx, results) => {
                    var data = results.rows.raw(); // get the data as an array of objects
                    resolve(data);
                },
                (error) => {
                    reject(error);
                }
            );
        });
    });
};
const convertToCSV = (data) => {
    const header = Object.keys(data[0]).join(',') + '\n'; // create the header row
    const rows = data.map((item) => Object.values(item).join(',') + '\n'); // create the data rows
    return header + rows.join('');
};
const ExportCSV = () => {
    const handleExport = async () => {
        try {
            const data = await getAllData(); // retrieve all the data
            const csv = convertToCSV(data); // convert the data to CSV format
            const path = FileSystem.documentDirectory + 'htsdata.csv'; // specify the file path
            await FileSystem.writeAsStringAsync(path, csv); // write the CSV string to the file
            alert('CSV file exported successfully!');
        } catch (error) {
            console.error(error);
            alert('Failed to export CSV file.');
        }
    };

    return (
        <Button
            title="Export CSV"
            onPress={handleExport}
        />
    );
};
export default ExportCSV;
