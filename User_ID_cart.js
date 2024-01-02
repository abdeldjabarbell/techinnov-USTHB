









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






const loader = document.getElementById("loader")



auth.onAuthStateChanged((user) => {

    if (user) {
        const app = document.getElementById("app")
        const information_user = document.getElementById("information_user")
        const home_user_login_filed = document.getElementById("home_user_login_filed")
        const loaderSection = document.getElementById("loaderSection")


        information_user.style.display="block";
        app.style.display="block";
        home_user_login_filed.style.display="none";
        loaderSection.style.display="none";

        mydataaccount()


        
    } else {
        const home_user_login_filed = document.getElementById("home_user_login_filed")
        const loaderSection = document.getElementById("loaderSection")

        // User is not signed in, hide the services container
        console.log('User not signed in');
        home_user_login_filed.style.display="block";
        loaderSection.style.display="none";




    }
});



// Get a Firestore instance
const db = getFirestore(app);

  // ------------------------------------------------------------inport user data 

  function mydataaccount() {
    auth.onAuthStateChanged(async (user) => {
        if (user) {
            console.log("ello");

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
                const lavel = docSnapshot.data().lavel;


                const userInfoDisplay = document.getElementById('userInfoDisplay');

                userInfoDisplay.innerHTML = `
                  <h3><strong>Name : </strong> ${name} ${last_name}</h3>
                  <h3><strong>Birthday : </strong> ${birth_day}</h3>
                  <h3><strong>Wilaya of Birth : </strong> ${wilaya}</h3>
                  <h3><strong>ID Number : </strong> ${matricule}</h3>
                  <h3><strong>Faculty : </strong> ${faculte}</h3>
                  <h3><strong>Level : </strong> ${lavel}</h3>
                `;
                loader.style.display ="none";



                // Directly update the DOM or perform any other actions with the email data
                console.log(birth_day);
            } else {
                console.log("Document does not exist");
            }
        }
    });
}



