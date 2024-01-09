import sqlite3 from "sqlite3"

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE IF NOT EXISTS stickers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            source TEXT NOT NULL,
            dateAcquired TEXT NOT NULL,
            amt INTEGER NOT NULL,
            eventAcquired TEXT,
            imgURL TEXT
            )`,
        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                const insert = 'INSERT INTO stickers (source, dateAcquired, amt, eventAcquired, imgURL) VALUES (?,?,?,?,?)'
                db.run(insert, ["sunhacks", '1/1/2024', 7, "sunhacks", "sunny.jpg"])
            }
        });
    }
});

export default db