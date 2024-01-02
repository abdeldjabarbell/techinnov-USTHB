              // Import the functions you need from the SDKs you need
              import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
              import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile ,sendPasswordResetEmail} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
              import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";
             
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




              const email_login = document.getElementById("email_login");
              const password_login = document.getElementById("password_login");
              
              const loginForm  = document.getElementById("login-form");
              
              const messagelogin = document.getElementById("messagelogin");
              const messagelogin2 = document.getElementById("messagelogin2");

              const submit_register = document.getElementById("submit_login");


              const original = document.getElementById("original");
              const loader = document.getElementById("loader");
              const Done = document.getElementById("Done");

              const original1 = document.getElementById("original1");
              const loader1 = document.getElementById("loader1");
              const Done1 = document.getElementById("Done1");

              const messageRegister11 = document.getElementById("messageRegister11");
              const messageRegister22 = document.getElementById("messageRegister22");

// ------------------------------------------------ <login---------------------------------------


loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();


    const email = email_login.value;
    const password = password_login.value;

    submit_register.classList.add("registering");

 

    try {
        // Sign in with email and password
        await signInWithEmailAndPassword(auth, email, password);
        
        original.style.display = "none";
        loader.style.display = "block"; 


        messagelogin.textContent = "Registration was successful!";
        setTimeout(() => {   
                    window.location.replace("user_account.html");
                   messagelogin.textContent = "";
                 }, 3500);




            } catch (error) {
                submit_register.classList.remove("registering");

                messagelogin2.textContent = "login failed. Error: " + error.message;
                setTimeout(() => {   
                   messagelogin2.textContent = "";
                }, 4000);



            } finally {

             // Hide the spinner when the registration process is completed (success or failure)
            Done.style.display = "block";
            loader.style.display = "none";
            original.style.display = "none"; 

            setTimeout(() => {
                Done.style.display = "none";
                original.style.display = "block"; 
                submit_register.classList.remove("registering");

            }, 2700);

            }
});

// ------------------------------------------------ <login---------------------------------------



// ------------------------------------------------ <recover password---------------------------------------



const passwordForget_btn = document.getElementById("passwordForget_btn");
const passwordForget_Cansel_btn = document.getElementById("passwordForget_Cansel_btn");

const password_reset_form = document.getElementById("password-reset-form");
const login_form = document.getElementById("login-form");

passwordForget_btn.addEventListener("click", async (e) => {
    e.preventDefault();

    password_reset_form.style.display ="block";
    login_form.style.display = "none";
});

passwordForget_Cansel_btn.addEventListener("click", async (e) => {
    e.preventDefault();

    password_reset_form.style.display = "none";
    login_form.style.display = "block";
});



const recoverNow = document.getElementById("recoverNow");

recoverNow.addEventListener("click", async (e) => {
  e.preventDefault();

  submit_register.classList.add("registering");

  const emailReset = document.getElementById("Email_reser").value;




  try {
    await sendPasswordResetEmail(auth, emailReset);

    original1.style.display = "none";
    loader1.style.display = "block"; 

    recoverNow.classList.add("registering");


    messageRegister22.textContent = "Password reset email sent. Check your inbox.";
    setTimeout(() => {   
        messageRegister22.textContent = "";
     }, 5000);

  } catch (error) {
    console.error("Error sending password reset email:", error.message);

    messageRegister11.textContent = "Password reset failed. Check the email address and try again.";
    setTimeout(() => {   
        messageRegister11.textContent = "";
     }, 5000);

  }

  finally {

    // Hide the spinner when the registration process is completed (success or failure)
   Done1.style.display = "block";
   loader1.style.display = "none";
   original1.style.display = "none"; 

   setTimeout(() => {
       Done1.style.display = "none";
       original1.style.display = "block"; 
       recoverNow.classList.remove("registering");

   }, 2700);

   }

});

  