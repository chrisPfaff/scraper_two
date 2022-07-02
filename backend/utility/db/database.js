const { initializeApp } = require("firebase/app");
require("dotenv").config();

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  databaseURL: process.env.DB_URL,
  storageBucket: process.env.DB_BUCKET,
  messagingSenderId: process.env.DB_SENDER_ID,
  appId: process.env.DB_APP_ID,
};

const appDB = initializeApp(firebaseConfig);

const {
  getDatabase,
  ref,
  set,
  onValue,
  get,
  child,
} = require("firebase/database");

function writeUserData(userId, name) {
  const db = getDatabase();
  set(ref(db, "users/" + userId), {
    username: name,
  });
}

async function readUserData(name) {
  const dbRef = ref(getDatabase());
  let hash;
  await get(child(dbRef, `users/${name}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        hash = snapshot.val();
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
  return hash;
}

module.exports = { writeUserData, readUserData };
