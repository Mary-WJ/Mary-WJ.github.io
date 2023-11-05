import {db, auth} from './firebase-sdk.js';
import { collection, getDocs, addDoc, deleteDoc, doc, serverTimestamp, getDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword} from "firebase/auth";



const displayCommentUI = document.getElementById('display-comment');
const addComment = document.getElementById('formSubmit');
const contactForm = document.querySelector('#contact-form');

//sign up page 
const signupForm = document.getElementById('signup');

const signUpBtn = document.querySelector('#btn-signup');
const logInBtn = document.querySelector('#btn-login');




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


if (addComment) {
    addComment.addEventListener('submit', (e) => {
        e.preventDefault();

        let textComment = addComment.comment.value;
        let textName = addComment.name.value;
       

        const li = document.createElement('li');
        const nameSpan = document.createElement('span'); // Span for name
        const commentSpan = document.createElement('span');
        const timeSpan = document.createElement('span');
        const btn = document.createElement('button');
        const i = document.createElement('i');

        addDoc(colRef, {
            name: textName,
            comment: textComment,
            time: serverTimestamp()
        })
        .then((docRef) => {
            const commentId = docRef.id;
            li.setAttribute('data-id', commentId);

            btn.classList.add('deleteList');
            i.className = "fa-solid fa-trash-can";
            btn.appendChild(i);

            li.classList.add('userComment');
            nameSpan.textContent = textName; 
            nameSpan.classList.add('comment-name'); 

            commentSpan.textContent = textComment; 
            commentSpan.classList.add('comment-text');

            //current date and time
            timeSpan.classList.add('text-Time');
            timeSpan.textContent = 'Loading...'; 

            
            li.appendChild(nameSpan);
            li.appendChild(commentSpan);
            li.appendChild(timeSpan);
            li.appendChild(btn);

            displayCommentUI.appendChild(li);
            //clear textarea input
            addComment.reset();



            getDoc(docRef).then((doc) => {
                if (doc.exists()) {
                    const data = doc.data();
                    if (data.time) {
                        // Convert the timestamp to a readable date string
                        const date = data.time.toDate().toLocaleString();
                        timeSpan.textContent = date; // Update the text content with the date
                    }
                }
            });


        })
        .catch(err => {
            console.log(err);
        });
    });
}





if(displayCommentUI){
    displayCommentUI.addEventListener('click', (e) => {
        if (e.target.classList.contains('deleteList') || e.target.parentElement.classList.contains('deleteList')) {
            e.preventDefault();
    
            // Confirm 
            const confirmDeletion = confirm("Are you sure you want to delete this comment?");
    
            if (confirmDeletion) {
                // User clicked OK
                const liToDelete = e.target.closest('.userComment');
                const commentId = liToDelete.getAttribute('data-id');
                
                const docRef = doc(db, 'Comments', commentId);
        
                deleteDoc(docRef).then(() => {
                    liToDelete.remove();
                }).catch(error => {
                    console.error(error);
                    alert('There was a problem deleting the comment.');
                });
            } else {
                // User clicked Cancel, do nothing
            }
        }
    });
    
}



//Contact form
if(contactForm){
    //automatically create collection from here
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
      
        // Get values from html code name=""
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

          // Reset form
          contactForm.reset();

        } catch (error) {
          alert(`${error} :There was an error when submitting. Please try again later`);
          // Show an error message to the user
        }
      });
}



//redirect to sign up page
if(signUpBtn){
    signUpBtn.addEventListener('click', () => {
        // Redirect to the sign-up page
        window.location.href = '../apps/signup.html';
        
    
    })
    
}


if(logInBtn){
    logInBtn.addEventListener('click', () => {
        // Redirect to the sign-up page
        window.location.href = '../apps/login.html';
        
    
    })
    
}


if(signupForm){
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
     
        const email = signupForm.email.value;
        const password = signupForm.password.value;

    //async
        createUserWithEmailAndPassword(auth, email, password)
        .then((cred) => {
            //user create
            console.log('user created', cred.user)
          
            signupForm.reset();
        })
        .catch((err)=> {
            alert(err);
            signupForm.reset();
        })
    
    })
}

