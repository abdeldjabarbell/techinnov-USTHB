
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { getFirestore, collection, getDoc, deleteDoc, doc, where, query ,getDocs} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";


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

  // ---------------------------------------------------User is signed in


  const loader = document.getElementById("loader")


auth.onAuthStateChanged((user) => {

    if (user) {
        home_user_login_succes.style.display="flex";
        home_user_login_succes.style.flexDirection="column-reverse";

        loaderSection.style.display="none";
        home_user_login_filed.style.display="none";

        displayUserInformation();
        
    } else {
        home_user_login_succes.style.display="none";
        loaderSection.style.display="none";
        home_user_login_filed.style.display="block";
        // User is not signed in, hide the services container
        console.log('User not signed in');

    }
});









  // ------------------------------------------------------------inport user data 





// Function to fetch and display user information in a table
async function displayUserInformation() {
  const usersCollection = collection(firestore, "text");
  const querySnapshot = await getDocs(usersCollection);


  querySnapshot.forEach((doc) => {
    const newsData = doc.data();
    const newsTextShared = newsData.news;

    // Retrieve timestamp field from Firestore
    const timestampSeconds = newsData.time.seconds;
    const timestampNanoseconds = newsData.time.nanoseconds;

    // Combine seconds and nanoseconds
    const timestampCombined = timestampSeconds + timestampNanoseconds / 1e9;

    // Create a Date object from the timestamp
    const dateObject = new Date(timestampCombined * 1000);

    // Format the date as "00:00 dd/mm/yyyy"
    const formattedDateTime = `${("0" + dateObject.getUTCHours()).slice(-2)}:${("0" + dateObject.getUTCMinutes()).slice(-2)} ${("0" + dateObject.getUTCDate()).slice(-2)}/${("0" + (dateObject.getUTCMonth() + 1)).slice(-2)}/${dateObject.getUTCFullYear()}`;

    const home_user_login_succes = document.getElementById("home_user_login_succes");

    const home_content_user_home = document.createElement("div");
    home_content_user_home.classList = "home-content_user_home";

    home_user_login_succes.appendChild(home_content_user_home);

    const name_daete_statu = document.createElement("div");
    name_daete_statu.classList = "name_daete_statu";
    
    const content_statu = document.createElement("div");
    content_statu.classList = "content_statu";
    
    const content = document.createElement("h3");
    content.innerHTML = newsTextShared;
    content_statu.appendChild(content);

    home_content_user_home.appendChild(name_daete_statu);
    home_content_user_home.appendChild(content_statu);

    const tire = document.createElement("div");
    tire.classList = "tire";
    name_daete_statu.appendChild(tire);

    const techinnov = document.createElement("h1");
    techinnov.innerHTML = "TECHINNOV-USTHB";

    const TimeStatut = document.createElement("h3");
    TimeStatut.innerHTML = formattedDateTime;

    tire.appendChild(techinnov);
    tire.appendChild(TimeStatut);
});




}



















  


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




  // ------------------------------------------------------------navbar
  let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () =>{
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};
//nav bar scroll 






































//background dots animation and number
for (let i = 1; i <= 75; i++) {
    const dotWrapper = document.createElement("div");
    dotWrapper.className = `dotWrapper_user_home dotWrapper_user_home-${i}`;
    const dot = document.createElement("div");
    dot.className = `dot_userhome dot_userhome-${i}`;
    dotWrapper.appendChild(dot);
    document.querySelector(".bg").appendChild(dotWrapper);

    // Apply dynamic styles
    dotWrapper.style.top = `${Math.random() * 100}%`;
    dotWrapper.style.left = `${Math.random() * 100}%`;

    // Apply individual animation delays
    dot.style.animationDelay = `${Math.random() * 5}s`;
  }










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
  