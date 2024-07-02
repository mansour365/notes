
//from offical firebase tutorial
//this import statment creates a firebase app, that store firebase configuration for project
//you must initialize firebase app first before calling any service getter function
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
//import the authentication from firebase (import the getter function)
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
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

const signUpButton = document.getElementById("sign-up");

function validate_email(email){
    var expression = new RegExp(/^[^@]+@\w+(\.\w+)+\w$/);
    if(expression.test(email) == true){
        //Email is good
        return true;
    }
    else{
        //Email is not good
        return false;
    }
}

function validate_password(password){
    //Firebase only accepts password lengths greater than or equal to 6
    if(password.length < 6){
        return false;
    }
    else{
        return true;
    }
}

/*Handles the sign up button press */
function handleSignUp(){
    const email = emailInput.value;
    const password = passwordInput.value;

    if (email.length < 4) {
        alert('Please enter an email address.');
        return;
    }
    if (password.length < 4) {
        alert('Please enter a password 6 characters or longer.');
        return;
    }

    //validate these inputs
    if(validate_email(email) == false || validate_password(password) == false){
        alert("Recheck your email and password. Password needs to be at least 6 characters long.");
        return;
        //Don't continue running code
    }

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

signUpButton.addEventListener('click', handleSignUp, false);