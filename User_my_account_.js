
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { getFirestore, collection, getDoc, deleteDoc, doc, where, query } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";


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
// Initialize Auth and Firestore
const auth = getAuth(app);

const logoutBtn = document.getElementById('logoutBtn');


const firestore = getFirestore(app);


const home_user_login_filed = document.getElementById("home_user_login_filed")
const loaderSection = document.getElementById("loaderSection")


const home_user_login_succes = document.getElementById("home_user_login_succes")

const loaderIDcopy =document.getElementById("loaderIDcopy");
const copyButton =document.getElementById("copyButton");

const copiedtext =document.getElementById("copiedtext");

  // ---------------------------------------------------User is signed in


  const loader = document.getElementById("loader")


auth.onAuthStateChanged((user) => {

    if (user) {
        home_user_login_succes.style.display="block";
        loaderSection.style.display="none";
        home_user_login_filed.style.display="none";
        copyButton.style.display="block";

        mydataaccount()


        
    } else {
        copyButton.style.display="none";
        home_user_login_succes.style.display="none";
        loaderSection.style.display="none";
        home_user_login_filed.style.display="block";
        // User is not signed in, hide the services container
        console.log('User not signed in');


    }
});







const userId_code_for_copy = document.getElementById("userId_code_for_copy");
// Get a Firestore instance
const db = getFirestore(app);

  // ------------------------------------------------------------inport user data 

  function mydataaccount() {
    auth.onAuthStateChanged(async (user) => {
        if (user) {

            const userId = user.uid;
            const userRef = doc(db, "users", userId);
            const docSnapshot = await getDoc(userRef);

            if (docSnapshot.exists()) {
                const name = docSnapshot.data().name;
                const last_name = docSnapshot.data().last_name;
                const birth_day = docSnapshot.data().birth_day;
                const faculte = docSnapshot.data().faculte;
                const wilaya = docSnapshot.data().wilaya;
                const matricule = docSnapshot.data().matricule;
                const email = docSnapshot.data().email;
                const lavel = docSnapshot.data().lavel;
                const phone_number = docSnapshot.data().phone_number;


                const userInfoDisplay = document.getElementById('userInfoDisplay');

                userInfoDisplay.innerHTML = `
                  <h3>My Informations : </h3>
                  <p><strong>Name : </strong> ${name} ${last_name}</p>
                  <p><strong>Birthday : </strong> ${birth_day}</p>
                  <p><strong>Wilaya of Birth : </strong> ${wilaya}</p>
                  <p><strong>ID Number : </strong> ${matricule}</p>
                  <p><strong>Email : </strong> ${email}</p>
                  <p><strong>Phone Number : </strong> ${phone_number}</p>
                  <p><strong>Faculty : </strong> ${faculte}</p>
                  <p><strong>Level : </strong> ${lavel}</p>
                `;
                loader.style.display ="none";

                userId_code_for_copy.innerHTML =user.uid;
                // Directly update the DOM or perform any other actions with the email data
                console.log(user.uid);
            } else {
                copyButton.style.display="none";
                home_user_login_succes.style.display="none";
                loaderSection.style.display="none";
                home_user_login_filed.style.display="block";
                console.log("Document does not exist");
            }
        }
    });
}



  
  // ...
  
  


  // ------------------------------------------------------------Sign out the user$

logoutBtn.addEventListener('click', () => {
  // Sign out the user$
  console.log("Before calling signOut");

  signOut(auth).then(() => {
    window.location.replace("login.html");


    console.log('User signed out');
  }).catch((error) => {
    console.error('Error signing out:', error);
  });
});


  // ------------------------------------------------------------copy user ID 

  

copyButton.addEventListener('click',()=>{
    loaderIDcopy.style.display="block";
    copyIdToClipboard()

});
function copyIdToClipboard() {
    // Get the text content of the ID span
    var userIdText = document.getElementById('userId_code_for_copy').innerText;

    // Create a temporary textarea element
    var textarea = document.createElement('textarea');
    textarea.value = userIdText;

    // Append the textarea to the document
    document.body.appendChild(textarea);

    // Select the text in the textarea
    textarea.select();
    textarea.setSelectionRange(0, 99999); /* For mobile devices */

    // Copy the text to the clipboard
    document.execCommand('copy');

    // Remove the temporary textarea
    document.body.removeChild(textarea);

    // Provide some feedback to the user (you can customize this)
    copiedtext.style.display="block";
    loaderIDcopy.style.display="none";
    copyButton.innerHTML="copied"
    setTimeout(() => {
        copyButton.innerHTML="copy"
        
    }, 1000);
    setTimeout(() => {
        copiedtext.style.display="none";
    }, 3000);
    

  }






  // ------------------------------------------------------------navbar
  let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () =>{
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};
//nav bar scroll 




  // ------------------------------------------------------------my project


































    // carte incubation

  const speed = 4.5;
  const r = gsap.timeline({ repeat: -1 });
  const o = gsap.timeline({ repeat: -1 });
  const h = gsap.timeline({ repeat: -1 });
  
  r.to("#app", {
      "--r": "180deg",
      "--p": "0%",
      duration: speed,
      ease: "sine.in"
  });
  r.to("#app", {
      "--r": "360deg",
      "--p": "100%",
      duration: speed,
      ease: "sine.out"
  });
  o.to("#app", {
      "--o": 1,
      duration: speed/2,
      ease: "power1.in"
  });
  o.to("#app", {
      "--o": 0,
      duration: speed/2,
      ease: "power1.out"
  });
  
  h.to("#app", {
      "--h": "100%",
      duration: speed/2,
      ease: "sine.in"
  });
  h.to("#app", {
      "--h": "50%",
      duration: speed/2,
      ease: "sine.out"
  });
  h.to("#app", {
      "--h": "0%",
      duration: speed/2,
      ease: "sine.in"
  });
  h.to("#app", {
      "--h": "50%",
      duration: speed/2,
      ease: "sine.out"
  });
  