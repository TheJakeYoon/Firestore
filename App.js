import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { collection, getDocs, query, where } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDXc9JbUAYoMKFPrGkJhxQr8KNhdCtE5BI",
  authDomain: "mars-b7c0f.firebaseapp.com",
  projectId: "mars-b7c0f",
  storageBucket: "mars-b7c0f.appspot.com",
  messagingSenderId: "357315583008",
  appId: "1:357315583008:web:2b56d4894bf917c9083045",
  measurementId: "G-FPGW1Y4NC2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();
const drug = collection(db, "drug");

export default function App() {

  const [name, setName] = useState();
  const [dosage, setDosage] = useState();

  async function getData(){
    const querySnapshot = await getDocs(collection(db, "drug"));
    querySnapshot.forEach((doc) => {
    alert(`${doc.id} => ${doc.data().name}`);
    });
  }

  async function queryData(){
    const q = query(drug, where("name", "==", "arcabose"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      //alert(doc.data().name)
      setName(doc.data().name);
      setDosage(doc.data().dosage);
    });
  }

  //getData();
  //alert(queryData().toString());
  queryData();

  return (
    <View style={styles.container}>
      <TextInput></TextInput>
      <Text>{name}</Text>
      <Text>{dosage}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
