// Watch for case sensitivities on the word Books both in here and on the cloud store.

import { initializeApp } from 'firebase/app'
import {
  getFirestore, collection, getDocs,
  addDoc, deleteDoc, doc
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

// get collection data
getDocs(colRef)
  .then((snapshot) => {
    let books = []
    snapshot.docs.forEach((doc) => {
      books.push({ ...doc.data(), id: doc.id })
    })
    console.log(books)
  })
  .catch(err => {
    console.log(err.message)
  })

  // adding documents
const addBookForm = document.querySelector('.add')
 addBookForm.addEventListener('submit', (e) => {
  e.preventDefault()

  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
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