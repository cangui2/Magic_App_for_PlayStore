import SQLite from 'react-native-sqlite-storage';
SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = 'AllPrintings.sqlite3';
const database_version = '1.0';
const database_displayname = 'SQLite React Offline Database';
const database_size = 200000000000000000000000;

export default class Database {
  initDB() {
    let db;
    return new Promise(resolve => {
      console.log('Plugin integrity check ...');
      SQLite.echoTest()
        .then(() => {
          console.log('Integrity check passed ...');
          console.log('Opening database ...');
          SQLite.openDatabase({
            name: 'AllPrintings',
            createFromLocation: '~/AllPrintings.sqlite3',
          })
            .then(DB => {
              db = DB;
              console.log('Database OPEN');
              db.executeSql('SELECT id from `cards` limit 1')
                .then(() => {
                  console.log('Database is ready ... executing query ...');
                })
                .catch(error => {
                  console.log('Received error: ', error);
                  console.log('Database not yet ready ... populating data');
                });

              resolve(db);
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log('echoTest failed - plugin not functional');
        });
    });
  }

  closeDatabase(db) {
    if (db) {
      console.log('Closing DB');
      db.close()
        .then(status => {
          console.log('Database CLOSED');
        })
        .catch(error => {
          this.errorCB(error);
        });
    } else {
      console.log('Database was not OPENED');
    }
  }

  listProduct() {
    return new Promise(resolve => {
      const products = [];
      this.initDB()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql(
              'SELECT p.prodId, p.prodName, p.prodImage FROM Product p',
              [],
            ).then(([tx, results]) => {
              console.log('Query completed');
              var len = results.rows.length;
              for (let i = 0; i < len; i++) {
                let row = results.rows.item(i);
                console.log(
                  `Prod ID: ${row.prodId}, Prod Name: ${row.prodName}`,
                );
                const {prodId, prodName, prodImage} = row;
                products.push({
                  prodId,
                  prodName,
                  prodImage,
                });
              }
              console.log(products);
              resolve(products);
            });
          })
            .then(result => {
              this.closeDatabase(db);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  productById(id) {
    console.log(id);
    return new Promise(resolve => {
      this.initDB()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql('SELECT * FROM Product WHERE prodId = (?)', [
              id,
            ]).then(([tx, results]) => {
              console.log(results);
              if (results.rows.length > 0) {
                let row = results.rows.item(0);
                resolve(row);
              }
            });
          })
            .then(result => {
              this.closeDatabase(db);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  addProduct(prod) {
    return new Promise(resolve => {
      this.initDB()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql('INSERT INTO Product VALUES (?, ?, ?, ?, ?)', [
              prod.prodId,
              prod.prodName,
              prod.prodDesc,
              prod.prodImage,
              prod.prodPrice,
            ]).then(([tx, results]) => {
              resolve(results);
            });
          })
            .then(result => {
              this.closeDatabase(db);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  updateProduct(id, prod) {
    return new Promise(resolve => {
      this.initDB()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql(
              'UPDATE Product SET prodName = ?, prodDesc = ?, prodImage = ?, prodPrice = ? WHERE prodId = ?',
              [
                prod.prodName,
                prod.prodDesc,
                prod.prodImage,
                prod.prodPrice,
                id,
              ],
            ).then(([tx, results]) => {
              resolve(results);
            });
          })
            .then(result => {
              this.closeDatabase(db);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  deleteProduct(id) {
    return new Promise(resolve => {
      this.initDB()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql('DELETE FROM Product WHERE prodId = ?', [id]).then(
              ([tx, results]) => {
                console.log(results);
                resolve(results);
              },
            );
          })
            .then(result => {
              this.closeDatabase(db);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }
  listCard() {
    return new Promise(resolve => {
      const products = [];
      this.initDB()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql('select * FROM cards LIMIT 20;', []).then(
              ([tx, results]) => {
                console.log('Query completed');
                var len = results.rows.length;
                for (let i = 0; i < len; i++) {
                  let row = results.rows.item(i);
                  // console.log(
                  //   `ID: ${row.id}, name: ${row.name}, Text: ${row.originalText}`,
                  // );
                  const {id, name, originalText, multiverseId} = row;
                  products.push({
                    id,
                    name,
                    originalText,
                    multiverseId,
                  });
                }
                // console.log(products);
                resolve(products);
              },
            );
          })
            .then(result => {
              this.closeDatabase(db);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }
  listCardByLanguage(language, page, color) {
    return new Promise(resolve => {
      const products = [];
      this.initDB()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql(
              'SELECT foreign_data.id,foreign_data.name,foreign_data.text,foreign_data.multiverseid,foreign_data.flavorText from foreign_data join cards ON foreign_data.uuid = cards.uuid WHERE language = (?) AND colors IN (?) LIMIT 4 offset (?)',
              [language, color, page],
            ).then(([tx, results]) => {
              console.log('Query completed');
              var len = results.rows.length;
              console.log(len + '********** nombre ****************');

              for (let i = 0; i < len; i++) {
                let row = results.rows.item(i);
                // console.log(
                //   `ID: ${row.id}, name: ${row.name}, Text: ${row.originalText}`,
                // );
                const {id, name, text, flavorText, multiverseid} = row;
                products.push({
                  id,
                  name,
                  text,
                  flavorText,
                  multiverseid,
                });
              }
              console.log(products);
              resolve(products);
            });
          })
            .then(result => {
              this.closeDatabase(db);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }
  setCore(language, number, page) {
    return new Promise(resolve => {
      const products = [];
      this.initDB()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql(
              'SELECT foreign_data.id,foreign_data.multiverseid from foreign_data join cards ON foreign_data.uuid = cards.uuid WHERE language = (?) AND setCode =(?) LIMIT 3 OFFSET (?)',
              [language, number, page],
            ).then(([tx, results]) => {
              console.log('Query completed');
              var len = results.rows.length;
              console.log(len + '********** nombre ****************');

              for (let i = 0; i < len; i++) {
                let row = results.rows.item(i);
                // console.log(
                //   `ID: ${row.id}, name: ${row.name}, Text: ${row.originalText}`,
                // );
                const {id, multiverseid} = row;
                products.push({
                  id,
                  multiverseid,
                });
              }
              console.log(products);
              resolve(products);
            });
          })
            .then(result => {
              this.closeDatabase(db);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }
  searchSetCoreLabel(language, letter) {
    return new Promise(resolve => {
      const products = [];
      this.initDB()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql(
              'SELECT * FROM set_translations WHERE language = (?) AND translation like (?)',
              [language, `%${letter}`],
            ).then(([tx, results]) => {
              console.log('Query completed');
              var len = results.rows.length;
              console.log(len + '********** nombre ****************');

              for (let i = 0; i < len; i++) {
                let row = results.rows.item(i);
                // console.log(
                //   `ID: ${row.id}, name: ${row.name}, Text: ${row.originalText}`,
                // );
                const {translation} = row;
                products.push({
                  translation,
                });
              }
              console.log(products);
              resolve(products);
            });
          })
            .then(result => {
              this.closeDatabase(db);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }
}
