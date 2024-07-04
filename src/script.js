
//from offical firebase tutorial
//this import statment creates a firebase app, that store firebase configuration for project
//you must initialize firebase app first before calling any service getter function
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
//import the authentication from firebase (import the getter function)
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, onAuthStateChanged} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
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

function sendVerificationEmailToUser() {
    sendEmailVerification(auth.currentUser).then(function () {
      // Email Verification sent!
      alert('Email Verification Sent!');
    });
  }

//Get all our input fields
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const password2Input = document.getElementById("password2");

const createAccountUserInterface = document.getElementById("create-account");
const cancelCreateAccount = document.getElementById("cancel-create-account")
const signUpButton = document.getElementById("sign-up");
const signInButton = document.getElementById("sign-in");
const forgotButton = document.getElementById("forgot");


/*Handles the sign up button press */
function handleSignUp(){
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
    createUserWithEmailAndPassword(auth, email, password).catch(function (error){
        //Handle these errors
        const errorCode = error.code;
        const errorMessage = error.message;
        if(errorCode == 'auth/weak-password'){
            alert('The password is too weak');
        }else{
            alert(errorMessage);
        }
        console.log(error);
    });


}

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

createAccountUserInterface.addEventListener('click', CreateAccountUI, false);
cancelCreateAccount.addEventListener('click', handleCancelCreateAccount, false );
signUpButton.addEventListener('click', handleSignUp, false);
