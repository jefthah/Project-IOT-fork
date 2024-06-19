// Import the necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, getDocs, query, orderBy, limit } = require('firebase/firestore');

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAqt5LTSh22Z1IPvqpJKYYYGDKsAUghXGw",
    authDomain: "uas-iot-25b4f.firebaseapp.com",
    projectId: "uas-iot-25b4f",
    storageBucket: "uas-iot-25b4f.appspot.com",
    messagingSenderId: "575428707880",
    appId: "1:575428707880:web:001fdde7624fbba6d1d71d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Create an instance of Express
const server = express();

// Middleware to parse JSON bodies
server.use(bodyParser.json());

// Define a route to add data to Firestore
server.get('/add-data', async (req, res) => {
    const { col } = req.query;
    const { humidity } = req.query;
    const { temp } = req.query;
    const { ldr } = req.query;
    const waktu = new Date().toISOString(); // Set the current time

    try {
        const docRef = await addDoc(collection(db, col), {
            waktu: waktu,
            humidity: parseFloat(humidity),
            temp: parseFloat(temp),
            ldr: ldr
        });
        res.status(200).send(`Document written with ID: ${docRef.id}`);
    } catch (e) {
        res.status(500).send("Error adding document: " + e);
    }
});
server.get('/get-data-waktu/:col', async (req, res) => {
    const col = req.params.col;
    try {
        const sawah1Collection = collection(db, col);
        const q = query(sawah1Collection, orderBy("waktu", "desc"), limit(12));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => {
            const docData = doc.data();
            const waktu = new Date(docData.waktu);
            return waktu.getHours().toString().padStart(2, '0') + ':' + waktu.getMinutes().toString().padStart(2, '0');
        });
        res.status(200).json(data);
    } catch (e) {
        res.status(500).send("Error retrieving documents: " + e);
    }
});

server.get('/get-data-humidity/:col', async (req, res) => {
    const col = req.params.col;
    try {
        const sawah1Collection = collection(db, col);
        const q = query(sawah1Collection, orderBy("waktu", "desc"), limit(12));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => {
            const docData = doc.data();
            const humidity = docData.humidity;
            return humidity;
        });
        res.status(200).json(data);
    } catch (e) {
        res.status(500).send("Error retrieving documents: " + e);
    }
});
server.get('/get-data-temp/:col', async (req, res) => {
    const col = req.params.col;
    try {
        const sawah1Collection = collection(db, col);
        const q = query(sawah1Collection, orderBy("waktu", "desc"), limit(12));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => {
            const docData = doc.data();
            const temp = docData.temp;
            return temp;
        });
        res.status(200).json(data);
    } catch (e) {
        res.status(500).send("Error retrieving documents: " + e);
    }
});

server.get('/get-data-detail-temp/:col', async (req, res) => {
    const col = req.params.col;
    try {
        const sawah1Collection = collection(db, col);
        const q = query(sawah1Collection, orderBy("waktu", "desc"), limit(1));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => {
            const docData = doc.data();
            const temp = docData.temp;
            return temp;
        });
        res.status(200).json(data);
    } catch (e) {
        res.status(500).send("Error retrieving documents: " + e);
    }
});

server.get('/get-data-detail-ldr/:col', async (req, res) => {
    const col = req.params.col;
    try {
        const sawah1Collection = collection(db, col);
        const q = query(sawah1Collection, orderBy("waktu", "desc"), limit(1));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => {
            const docData = doc.data();
            const ldr = docData.ldr;
            return ldr;
        });
        res.status(200).json(data);
    } catch (e) {
        res.status(500).send("Error retrieving documents: " + e);
    }
});
module.exports = server;