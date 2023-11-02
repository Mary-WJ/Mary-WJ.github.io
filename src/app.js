import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import {db, app} from './firebase-sdk.js'



const colRef = collection(db, 'Comments');

    getDocs(colRef).then((snapshot) => {
        let comments = [];
        //docs represent all of the document
        snapshot.docs.forEach((doc) => {
        comments.push({...doc.data(), id: doc.id})
        })
        // console.log(comments)
    })
    .catch(err => {
        console.log(err);
    })


const displayCommentUI = document.getElementById('display-comment');
const addComment = document.getElementById('formSubmit');

if (addComment) {
    addComment.addEventListener('submit', (e) => {
        e.preventDefault();

        let textComment = addComment.comment.value;

        const li = document.createElement('li');
        const btn = document.createElement('button');
        const i = document.createElement('i');

        addDoc(colRef, {
            comment: textComment,
        })
        .then((docRef) => {
            const commentId = docRef.id;
            li.setAttribute('data-id', commentId);

            btn.classList.add('deleteList');
            i.className = "fa-solid fa-trash-can";
            btn.appendChild(i);

            li.classList.add('userComment');
            li.textContent = textComment;
            li.appendChild(btn);

            displayCommentUI.appendChild(li);

            //clear input of textarea
            addComment.reset();
        })
        .catch(err => {
            console.log(err);
        });
    });
}

// Delete list item using event delegation
displayCommentUI.addEventListener('click', (e) => {
    if (e.target.classList.contains('deleteList') || e.target.parentElement.classList.contains('deleteList')) {
        e.preventDefault();

        const liToDelete = e.target.closest('.userComment');
        const commentId = liToDelete.getAttribute('data-id');
        
        const docRef = doc(db, 'Comments', commentId);

        deleteDoc(docRef).then(() => {
            liToDelete.remove();
        }).catch(err => {
            console.log(err);
        });
    }
});



 



  
  


