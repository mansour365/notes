
//from offical firebase tutorial
//this import statment creates a firebase app, that store firebase configuration for project
//you must initialize firebase app first before calling any service getter function
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
//import the authentication from firebase (import the getter function)
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, signOut, onAuthStateChanged} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import { getDatabase, ref } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js'

//It is not a security risk to include this, this is just needed to comunicate with firebase servers
const firebaseApp = initializeApp({
  apiKey: "AIzaSyB8kRHHYwx_cEPAeH_sNTG-HboIR-w5-Zw",
  authDomain: "login-notes-app-99970.firebaseapp.com",
  databaseURL: "https://login-notes-app-99970-default-rtdb.firebaseio.com",
  projectId: "login-notes-app-99970",
  storageBucket: "login-notes-app-99970.appspot.com",
  messagingSenderId: "615796291555",
  appId: "1:615796291555:web:66cddf4e870beb52cad2d6"
});

const auth = getAuth(firebaseApp);

//Get all our input fields
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const password2Input = document.getElementById("password2");


const createAccountUserInterface = document.getElementById("create-account");
const cancelCreateAccount = document.getElementById("cancel-create-account")
const signUpButton = document.getElementById("sign-up");
const signInButton = document.getElementById("sign-in");
const signInStatus = document.getElementById("sign-in-status");
const accountDetails = document.getElementById("account-details");
const forgotButton = document.getElementById("forgot");


/*Handles the sign up button press */
function handleSignUp(){    //async function always return a promise
    const email = emailInput.value;
    const password = passwordInput.value;
    const password2 =password2Input.value;

    //validate these inputs
    if(validate_email(email) == false){
        alert("Please enter a vaild email address");
        return;
        //Don't continue running code
    }
    if (password.length < 6) {
        alert('Please enter a password 6 characters or longer.');
        return;
    }
    if(password != password2){
        alert("Error: Passwords need to match");
        return;
    }
    //If reach here then email and password are acceptable

    //Create the user using email and password
    //this function will return user credentials if successful, so we use a ".then()"
    //if unsuccessful it will throw an error, we catch with ".catch()"
    createUserWithEmailAndPassword(auth, email, password)
    .then(function(userCredential){
        //Signed up
        const user = userCredential.user;
        //Send email verification
        sendEmailVerification(user);
        console.log("successfully sent email verification");
        console.log("Here are the user credentials:")
        console.log(userCredential);
        alert("Please check your email for a verification.\n" +
            "We've sent an email to "+email+".\n" +
            "Click on the link of that email to complete your sign up.\n"+
            "If you don't see it, you may need to to check you spam folder.");
    })
    .catch(function (error){
        const errorMessage = error.message;
        alert(errorMessage);
        console.log(error);
    });
    
}

function handleSignIn(){
    //if anyone is already signed in, then sign out
    if(auth.currentUser){
        signOut(auth);
    }
    //No one signed in, start sign-in process
    else{
        const email = emailInput.value;
        const password = passwordInput.value;
        //Make sure inputs are not empty
        if (email.length < 4) {
            alert('Please enter an email address.');
            return;
        }
        if (password.length < 4) {
            alert('Please enter a password.');
            return;
        }
        //sign in using firebase method
        signInWithEmailAndPassword(auth, email, password)
        .then(function(userCredential){
            //check if email is actually verified
            if(userCredential.user.emailVerified == true){
                alert("login successful, now moving to the notes app");
            }
            //remove the login card
            removeLoginCard();
            //show the notes section
            showNotes();
        })
        .catch(function(error){
            //Handle errors
            const errorCode = error.code;
            const errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
                alert('Wrong password.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
        });
    }

}

// Listening for auth state changes. (this function is called automatically when state changes)
onAuthStateChanged(auth, function (user) {
    //verifyEmailButton.disabled = true;
    if (user) {
      // User is signed in.
      const displayName = user.displayName;
      const email = user.email;
      const emailVerified = user.emailVerified;
      const photoURL = user.photoURL;
      const isAnonymous = user.isAnonymous;
      const uid = user.uid;
      const providerData = user.providerData;
      signInStatus.textContent = 'Signed in';
      //signInButton.textContent = 'Sign out';
      accountDetails.textContent = JSON.stringify(user, null, '  ');
      if (!emailVerified) {
        //verifyEmailButton.disabled = false;
        console.log("email is not verified");
      }
    } else {
      // User is signed out.
      signInStatus.textContent = 'Signed out';
      //signInButton.textContent = 'Sign in';
      accountDetails.textContent = 'null';
    }
    //signInButton.disabled = false;
  });
  

//Change the interface to include 2 password boxes, remove sign-in button, remove forget password button
function CreateAccountUI(){
    //Change title
    document.getElementById("login-title").innerHTML="Sign Up";
    //Hide these elements
    document.getElementById("sign-in").style.display="none";
    document.getElementById("forgot").style.display="none";
    document.getElementById("create-account").style.display="none";
    //Show these elements
    document.getElementById("password2").style.display="block";
    document.getElementById("sign-up").style.display="block";
    document.getElementById("cancel-create-account").style.display="block";
    //empty anything written in the boxes
    document.getElementById("email").value='';
    document.getElementById("password").value='';
}

function handleCancelCreateAccount(){
    //Change title
    document.getElementById("login-title").innerHTML="Sign In";
    //Show these elements
    document.getElementById("sign-in").style.display="block";
    document.getElementById("forgot").style.display="block";
    document.getElementById("create-account").style.display="block";
    //Hide these elements
    document.getElementById("password2").style.display="none";
    document.getElementById("sign-up").style.display="none";
    document.getElementById("cancel-create-account").style.display="none";
    //empty anything written in the boxes
    document.getElementById("email").value='';
    document.getElementById("password").value='';
    document.getElementById("password2").value='';
}

function removeLoginCard(){
    //remove entire login card
    //So it turns out that making a container hidden will also hide everything inside container
    document.getElementById("loginCard").style.display="none";
}

function showNotes(){
    document.getElementById("navbar-area").style.display="flex";
    document.getElementById("notearea").style.display="flex";
}

/*
//Detect auth state (tells me if a user is logged in)
onAuthStateChanged(auth, user => {
    if(user != null){
        console.log('logged in!');
    } else{
        console.log('no user');
    }
});
*/

function validate_email(email){
    var expression = new RegExp(/^[^@]+@\w+(\.\w+)+\w$/);
    if(expression.test(email) == true){
        return true;  //Email is good
    }
    else{
        return false;  //Email is not good
    }
}

//only show registration fields
createAccountUserInterface.addEventListener('click', CreateAccountUI, false);
//only show sign in fields
cancelCreateAccount.addEventListener('click', handleCancelCreateAccount, false );


signUpButton.addEventListener('click', handleSignUp, false);
signInButton.addEventListener('click', handleSignIn, false);

