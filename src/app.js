import {db, app} from './firebase-sdk.js';
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';


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
const contactForm = document.querySelector('#contact-form');





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

// Delete list item 
if(displayCommentUI){
    displayCommentUI.addEventListener('click', (e) => {
        if (e.target.classList.contains('deleteList') || e.target.parentElement.classList.contains('deleteList')) {
            e.preventDefault();
    
            const liToDelete = e.target.closest('.userComment');
            const commentId = liToDelete.getAttribute('data-id');
            
            const docRef = doc(db, 'Comments', commentId);
    
            deleteDoc(docRef).then(() => {
                liToDelete.remove();
                alert('Comment deleted')
            }).catch(err => {
                console.log(err);
            });
        }
   
    });
}


//Contact form
if(contactForm){
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
      
        // Get the form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;
      
        try {
          // Add a new document with a generated id to the 'contacts' collection
          const docRef = await addDoc(collection(db, 'Contacts'), {
            name: name,
            email: email,
            phone: phone,
            message: message,
          });
      
          alert('Your message has been sent successfully');
          // Reset the form or give feedback to the user
          contactForm.reset();
          // Show a success message to the user
        } catch (error) {
          alert(`${error} :There was an error when submitting. Please try again later`);
          // Show an error message to the user
        }
      });
}




  
  


