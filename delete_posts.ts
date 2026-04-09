import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import fs from 'fs';

const config = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf8'));
const app = initializeApp(config);
const db = getFirestore(app, config.firestoreDatabaseId);

async function run() {
  const snapshot = await getDocs(collection(db, 'posts'));
  for (const document of snapshot.docs) {
    console.log('Deleting', document.id);
    await deleteDoc(doc(db, 'posts', document.id));
  }
  process.exit(0);
}
run();
