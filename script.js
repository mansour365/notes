// Your web app's Firebase configuration

var firebaseConfig = {
    apiKey: "AIzaSyB8kRHHYwx_cEPAeH_sNTG-HboIR-w5-Zw",
    authDomain: "login-notes-app-99970.firebaseapp.com",
    projectId: "login-notes-app-99970",
    storageBucket: "login-notes-app-99970.appspot.com",
    messagingSenderId: "615796291555",
    appId: "1:615796291555:web:66cddf4e870beb52cad2d6"
  };
  // Initialize Firebase
  firebaseConfig.initializeApp(firebaseConfig);

  //Initialize variables
  const auth = firebase.auth();
  const database = firebase.database();

  //Set up our register function (to register new users)
  function register(){
    //Get all our input fields
    email = document.getElementById("email").value;
    password = document.getElementById("password").value;

    //Validate input fields
    if(validate_email(email) == false || validate_password(password) == false){
        alert("Recheck your email and password. Password needs to be at least 6 characters long.");
        return;
        //Don't continue running code
    }

    //Move on with Auth
    auth.createUserWithEmailAndPassword(email, password)
    .then(function(){
        //Declare user variable
        var user = auth.currentUser;
        //Add this user to Firebase Database
        var database_ref = database.ref();
        //Create User data
        var user_data = {
            email : email, 
            last_login : Date.now()
        }
        //Save user data to database
        database_ref.child('users/' + user.uid).set(user_data);
        alert("User Created!");

    })
    .catch(function(error){
        // Firebase will use this to alert of its errors
        var error_code = error.code;
        var error_message = error.message;

        alert(error_message);
    })

  }

  function validate_email(email){
    expression = /^[^@]+@\w+(\.\w+)+\w$/
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

  //checks if something is written in those fields (fileds other than email or password)
  function validate_fields(fields){
    if(field == null){
        return false;
    }
    if(field.length == 0){
        return false;
    }
    else{
        return true;
    }

  }









const newNoteBtn = document.getElementById("newNote")

newNoteBtn.addEventListener("click", function(){
    console.log("it works")
})