db.transaction(tx => {
  tx.executeSql(
    "SELECT name FROM sqlite_master WHERE type='table';",
    [],
    (tx, results) => {
      console.log("Tables in database:");
      for (let i = 0; i < results.rows.length; i++) {
        console.log(results.rows.item(i).name);
      }
    },
    error => {
      console.log("Error on retrieving tables: " + error.message);
    },
  );
});

db.transaction(tx => {
  tx.executeSql(
    'CREATE TABLE IF NOT EXISTS htsdata (hts_id INTEGER PRIMARY KEY AUTOINCREMENT, test_date VARCHAR(10), client_code VARCHAR(10), age INTEGER, gender VARCHAR(10), address1 VARCHAR(50), address2 VARCHAR(50), contact VARCHAR(20), firstname VARCHAR(20), lastname VARCHAR(20))',
    [],
    (tx, results) => {
      console.log(results);
      console.log("htsdata table created successfully");
    },
    error => {
      console.log("error on creating htsdata table " + error.message);
    },
  );
});