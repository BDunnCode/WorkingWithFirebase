// Watch for case sensitivities on the word Books both in here and on the cloud store.

import { initializeApp } from 'firebase/app'
import {
  getFirestore, collection, onSnapshot,
  addDoc, deleteDoc, doc,
  query, where,
  orderBy, serverTimestamp, 
  getDoc, updateDoc
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAixDAWUAmBM84Pz-4h8KGEGp1QMiYtHAI",
  authDomain: "fir-9-dojo-dc104.firebaseapp.com",
  projectId: "fir-9-dojo-dc104",
  storageBucket: "fir-9-dojo-dc104.appspot.com",
  messagingSenderId: "2722175464",
  appId: "1:2722175464:web:ed09e5fa41e195d1c76c5d"
}

// init firebase app
initializeApp(firebaseConfig)

// init services
const db = getFirestore()

// collection ref
const colRef = collection(db, 'Books')

// queries
const q = query(colRef, orderBy('createdAt'))

// real time collection data
  onSnapshot(q, (snapshot) => {
    let books = []
    snapshot.docs.forEach((doc) => {
      books.push({ ...doc.data(), id: doc.id })
    })
    console.log(books)
  })

  // adding documents
const addBookForm = document.querySelector('.add')
 addBookForm.addEventListener('submit', (e) => {
  e.preventDefault()

  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
    createdAt: serverTimestamp()
  })
  .then(() => {
    addBookForm.reset()
  })

 })
 
 // deleting documents
const deleteBookForm = document.querySelector('.delete')
 deleteBookForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const docRef = doc(db, 'Books', deleteBookForm.id.value)
  
  deleteDoc(docRef)
    .then(() => {
      deleteBookForm.reset()
    })

})

// get a single document 
const docRef = doc(db, 'Books', 'VQDqSBFCtATM67MAdhwO')

onSnapshot(docRef, (doc) => {
  console.log(doc.data(), doc.id)
})

// updating a document
const updateForm = document.querySelector('.update')
updateForm.addEventListener('submit', (e) => {
  e.preventDefault()

  let docRef = doc(db, 'Books', updateForm.id.value)

  updateDoc(docRef, {
    title: 'updated title'
  })
  .then(() => {
    updateForm.reset()
  })
})