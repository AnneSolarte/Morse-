const firebase = require("firebase/app");
const { getFirestore, collection, setDoc, doc, addDoc, updateDoc, getDocs, query, orderBy } = require("firebase/firestore");

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDirmSw1ZPQIdi6WH8DQYDUjZR06axEfxY",
  authDomain: "bop-it-ea393.firebaseapp.com",
  projectId: "bop-it-ea393",
  storageBucket: "bop-it-ea393.appspot.com",
  messagingSenderId: "826106732628",
  appId: "1:826106732628:web:08c00540ff046616b84dc1"
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = getFirestore(app);


const createUserDB = async (user) => {
    try {
      // Referencia a la colección 'users'
      const usersRef = collection(db, "users");
      const newUserRef = doc(usersRef);
  
      // Generar el ID del usuario (si es necesario)
      const userId = newUserRef.id;
  
      // Obtener la fecha actual como una cadena de texto en formato ISO
      const createdAt = new Date().toISOString();
  
      // Guardar el usuario en la base de datos con el ID generado
      await setDoc(newUserRef, { ...user, id: userId, createdAt });

      console.log("User added successfull: ", user)
  
      return { ...user, id: newUserRef.id, createdAt };
    } catch (error) {
      console.error("Error adding user: ", error);
      return false;
    }
};
  
const EditUserDB = async (user) => {
    try {
    const userRef = doc(db, "users", user.id); 
    await updateDoc(userRef, user); // Actualiza el documento con los nuevos datos

    console.log("User edited successfully");
    return true;
    } catch (error) {
    console.error("Error editing document: ", error);
    return false;
    }
};

const getUsersDB = async () => {
    try {
      // Crear una consulta para ordenar los usuarios por 'score' de mayor a menor
      const q = query(collection(db, "users"), orderBy("score", "desc"));
  
      const querySnapshot = await getDocs(q);
      const transformed = [];
  
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        transformed.push({ id: doc.id, ...data });
      });
  
      return transformed;
    } catch (error) {
      console.error("Error getting users: ", error);
      return [];
    }
};

module.exports.db = db;
module.exports = {
    createUserDB,
    EditUserDB,
    getUsersDB,
};