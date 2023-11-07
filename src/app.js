import {db, auth} from './firebase-sdk.js';
import { collection, getDocs, addDoc, deleteDoc, doc, serverTimestamp, getDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";



const displayCommentUI = document.querySelector('#display-comment');


const addComment = document.getElementById('formSubmit');
const contactForm = document.querySelector('#contact-form');

//sign up page 
const signupForm = document.getElementById('signup');
//log in page
const loginForm = document.getElementById('login-form');

const signUpBtn = document.getElementById('btn-signup');
const logInBtn = document.getElementById('btn-login');




// Auth state changes listener
//check if user is currently sign up or log in
onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, so change the button to Log Out

      if(logInBtn){
        logInBtn.style.display = 'none';
        signUpBtn.textContent = 'Log Out';
      }
      
      signUpBtn.onclick = () => {
        signOut(auth).then(() => {
          alert('logging out');

          // after logging out, direct to home
          window.location.assign('../apps/index.html');

        }).catch((error) => {
          alert(error);
        });
      };
    } else {

        // if No user is signed in, change the button to Sign Up again
        if(signUpBtn){
            signUpBtn.textContent = 'Sign Up';
            signUpBtn.onclick = () => {
            window.location.href = '../apps/signup.html';

            }
        }
     
    }

});


//direct to log in page
if(logInBtn){
    logInBtn.addEventListener('click', () => {
        // Redirect to the log in page for user who have already sign up
        window.location.href = '../apps/login.html';
        
    })
    
}




// Function to render a comment to the UI 
function renderComment(commentData) {

    const li = document.createElement('li');

    const nameSpan = document.createElement('span'); 
    const commentSpan = document.createElement('span');
    const timeSpan = document.createElement('span');

    const btn = document.createElement('button');
    const i = document.createElement('i');

    const commentId = commentData.id;
    li.setAttribute('data-id', commentId);

    btn.classList.add('deleteList');
    i.className = "fa-solid fa-trash-can";
    btn.appendChild(i);

    li.classList.add('userComment');

    nameSpan.classList.add('comment-name'); 
    nameSpan.textContent = commentData.name; 
    

    commentSpan.textContent = commentData.comment; 
    commentSpan.classList.add('comment-text');

    timeSpan.classList.add('text-Time');
    

    li.appendChild(nameSpan);
    li.appendChild(commentSpan);
    li.appendChild(timeSpan);
    li.appendChild(btn);


    displayCommentUI.appendChild(li);
    

    // If the timestamp is available, convert and display it
    if (commentData.time) {
        const date = commentData.time.toDate().toLocaleString();
        timeSpan.textContent = date; 
    } else {
        timeSpan.textContent = 'A moment ago';
    }
   
}




if(displayCommentUI){
    // Retrieve existing comments and render them
    const colRef = collection(db, 'Comments');

    getDocs(colRef)
        .then((snapshot) => {
            let comments = [];
            snapshot.docs.forEach((doc) => {
                comments.push({ ...doc.data(), id: doc.id });
                renderComment({ ...doc.data(), id: doc.id });
            });
        })
        .catch((err) => {
            console.error(err.message);
        });



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

            
            // Existing code to append comments
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



//create new user and store credential in firebase.
//those who have signup can not sign up again using same sign up info
if(signupForm){
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
     
        const email = signupForm.email.value;
        const password = signupForm.password.value;

    //async
    //take two parameters
        createUserWithEmailAndPassword(auth, email, password)
        .then((cred) => {
            //user create
            alert('Successfully Sign Up');

            window.location.assign('../apps/index.html');
        })
        .catch((err)=> {
            alert(err);
            signupForm.reset();
        })
    
    })
}



if(loginForm){
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = loginForm.email.value;
        const password = loginForm.password.value;

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // log in 
            alert('User Logged in')
            window.location.assign('../apps/index.html')
            
          
        })
        .catch((error) => {
            // const errorCode = error.code;
            // const errorMessage = error.message;

            alert(error);
            loginForm.reset();
        });

    })
}


