              // Import the functions you need from the SDKs you need
              import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
              import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
              import { getFirestore, doc, setDoc ,serverTimestamp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";
             
                            // Import the necessary Firebase modules
              import { getDatabase } from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js';
             
             
              // Your web app's Firebase configuration
              const firebaseConfig = {
                apiKey: "AIzaSyAYg-YrUR7wyGJwOkbJQw8112CdYNkq0oU",
                authDomain: "ssp-website-586d2.firebaseapp.com",
                projectId: "ssp-website-586d2",
                storageBucket: "ssp-website-586d2.appspot.com",
                messagingSenderId: "374411443744",
                appId: "1:374411443744:web:c9685e3085e6377903c645"
              };
      
              // Initialize Firebase
              const app = initializeApp(firebaseConfig);
              const auth = getAuth(app);
              const firestore = getFirestore(app);




              const registerForm = document.getElementById("register-form");

              const Name = document.getElementById("Name");
              const LastName = document.getElementById("LastName");
              const Birthday = document.getElementById("Birthday");
              const Wilaya = document.getElementById("Wilaya");
              const phoneNumber = document.getElementById("phoneNumber");

              const faculte = document.getElementById("faculte");
              const lavel = document.getElementById("lavel");

              const matricule = document.getElementById("matricule");
              const email = document.getElementById("email");
              const password_register = document.getElementById("passwordregister");
              const confirmPassword = document.getElementById("confirmPassword");

              const rule = document.getElementById("rule");

              const messageRegister = document.getElementById("messageRegister");
              const messageRegister1 = document.getElementById("messageRegister1");
              const messageRegister2 = document.getElementById("messageRegister2");
              const messageRegister3 = document.getElementById("messageRegister3");
              const messageRegister4 = document.getElementById("messageRegister4");


              
              const original = document.getElementById("original");
              const loader = document.getElementById("loader");
              const Done = document.getElementById("Done");

              const submit_register = document.getElementById("submit_register");





              



              

// ------------------------------------------------ REGISTER ---------------------------------------
// traitement de mot de passe 



// registration --------------------------------------------------------------- 



registerForm.addEventListener("submit", async (e) => {

    // Get the values of password fields
    const passwordValue = password_register.value;
    const confirmPasswordValue = confirmPassword.value;
  
    if (passwordValue.length < 8) {
      messageRegister.textContent = '● The password must be at least 8 characters long.';
      e.preventDefault();
      setTimeout(() => {
        messageRegister.textContent = '';
      }, 3000);
    } 
    if (!/[a-z]/.test(passwordValue) || !/[A-Z]/.test(passwordValue)) {
      messageRegister1.textContent = '● The password must contain at least one uppercase and one lowercase letter [A-Z] & [a-z].';
      e.preventDefault();
      setTimeout(() => {
        messageRegister1.textContent = '';
      }, 3000);
    }
  
    if (passwordValue !== confirmPasswordValue) {
      messageRegister2.textContent = '● Passwords do not match.';
      e.preventDefault();
      setTimeout(() => {
        messageRegister2.textContent = '';
      }, 3000);
    }
    if (
        passwordValue === confirmPasswordValue &&
        /[a-z]/.test(passwordValue) &&
        /[A-Z]/.test(passwordValue) &&
        passwordValue.length > 7
      ){


        e.preventDefault();

        original.style.display = "none";
        loader.style.display = "block"; 

        submit_register.classList.add("registering");

 
        const Email = email.value;
        const password = password_register.value;

        const Birth_day = Birthday.value;
        const Name_ = Name.value;
        const Last_Name = LastName.value;
        const Wilaya_ = Wilaya.value;
        const phone_Number = phoneNumber.value;
        const faculte_ = faculte.value;
        const lavel_ = lavel.value;
        const matricule_ = matricule.value;
        



        
        try {
    // Register the user with Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, Email, password);
    const user = userCredential.user;

    // Update the user's profile with additional data
    await updateProfile(user, {
        displayName: Name_
    });

    // Save user data to Firestore
    const firestore = getFirestore(app);
    const collectionName = "users"; // Specify the Firestore collection name

    const userData = {
        name: Name_,
        last_name: Last_Name,
        birth_day: Birth_day,
        wilaya: Wilaya_,
        phone_number: phone_Number,
        lavel: lavel_,
        faculte: faculte_,
        matricule: matricule_,
        email: Email,
        password: password,
        registration_time: serverTimestamp("Date"), // Add registration time

    };

    const userDocRef = doc(firestore, collectionName, user.uid);

    await setDoc(userDocRef, userData);
          // Create an object with user data
          

            // Display a success message
            messageRegister4.textContent = "Registration was successful!";
           
             setTimeout(() => {
                messageRegister4.textContent = "";
            }, 7000);




        } catch (error) {
            // Display an error message

            messageRegister3.textContent = "Registration failed. Error: " + error.message;

            original.style.display = "block";
            Done.style.display = "none";
            loader.style.display = "none"; 
            submit_register.classList.remove("registering");

            
            setTimeout(() => {
                messageRegister3.textContent = "";
            }, 3000);



        } finally {
            // Hide the spinner when the registration process is completed (success or failure)
            Done.style.display = "block";
            loader.style.display = "none";
            original.style.display = "none"; 

            setTimeout(() => {
                Done.style.display = "none";
                original.style.display = "block"; 
                submit_register.classList.remove("registering");
            }, 7000);

 
        }





}



    




           
});

