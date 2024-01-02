
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAuth, signOut , updateProfile } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { getFirestore, collection, getDoc, addDoc, doc, where, query, setDoc ,serverTimestamp,getDocs } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";


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
        myProjectdataaccount();

        
    } else {
        home_user_login_succes.style.display="none";
        loaderSection.style.display="none";
        home_user_login_filed.style.display="block";
        // User is not signed in, hide the services container
        console.log('User not signed in');

    }
});






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




  // ------------------------------------------------------------my project

  document.addEventListener('DOMContentLoaded', function (event) {

    

    const number_of_membre = document.getElementById("number_of_membre");
    const bg_for_inputs_members = document.getElementById("bg_for_inputs_members");
    const submitNb_membrs = document.getElementById("submitNb_membrs");
    const selecttextNB = document.getElementById("selecttextNB");
    const content_statu_creat = document.getElementById("content_statu_creat");
    const creatProject = document.getElementById("creatProject");
    

    auth.onAuthStateChanged((user) => { 
        if(user){
            creatProject.addEventListener('click', () => {
                content_statu_creat.style.display="block";
                creatProject.style.display="none";

            });
        
            submitNb_membrs.addEventListener('click', () => {
                selecttextNB.style.display="none";
                createInputs(user);
                submitNb_membrs.style.display="none";
                number_of_membre.style.display="none";
            });
        }
    });


    function createInputs(user) {   
        const messageConsole = document.getElementById("messageConsole");     

        var nb = parseInt(number_of_membre.value);

        const nameProject = document.createElement("h2");
        nameProject.classList="input_labl_UserClass";
        nameProject.innerHTML = "Enter the name of your project";

        const input_nameProject = document.createElement("input");
        input_nameProject.id = "nameProject_content";
        input_nameProject.type = "text";
        input_nameProject.classList = "input_ID_UserClass";
        input_nameProject.style.marginLeft = "5%";
        input_nameProject.style.boxShadow = "0 0 0.5rem var(--main-color)";
        input_nameProject.placeholder = "Project Name";
    
        const discreptionProject_labl = document.createElement("h2");
        discreptionProject_labl.classList="input_labl_UserClass";
        discreptionProject_labl.innerHTML = "Enter discreption about your project";

        const Caractères_restants = document.createElement("p");
        Caractères_restants.classList="input_labl_UserClass";
        Caractères_restants.innerHTML = 'Characters remaining: <span id="charCount">100</span>';

        // Create textarea element for project description
        const input_discreptionProject = document.createElement("textarea");
        input_discreptionProject.id = "discreptionProject";
        input_discreptionProject.maxLength = "200"; // Corrected attribute name
        input_discreptionProject.classList = "input_ID_UserClass";
        input_discreptionProject.style.width = "90%";
        input_discreptionProject.style.height = "20vh";
        input_discreptionProject.style.marginLeft = "5%";
        input_discreptionProject.style.boxShadow = "0 0 0.5rem var(--main-color)";
        input_discreptionProject.placeholder = "Enter the description of your project, explaining briefly the title of your project";
    
        bg_for_inputs_members.appendChild(nameProject);
        bg_for_inputs_members.appendChild(input_nameProject);
        bg_for_inputs_members.appendChild(discreptionProject_labl);
        bg_for_inputs_members.appendChild(Caractères_restants);

        bg_for_inputs_members.appendChild(input_discreptionProject);

        const membre_labl = document.createElement("h2");
        membre_labl.classList="input_labl_UserClass";
        membre_labl.innerHTML = "members :";
        bg_for_inputs_members.appendChild(membre_labl);

        for (let i = 1; i <= nb; i++) {
            const inp_form = document.createElement("form");
            inp_form.classList="inp_formUserClass";
            inp_form.id="inp_formUserID";


            const input_labl_User = document.createElement("h2");
            input_labl_User.classList="input_labl_UserClass";
            input_labl_User.innerHTML = "Enter ID account for member " + i + " :";

            const input_ID_User = document.createElement("input");
            input_ID_User.id = "ID_user" + i;
            input_ID_User.classList="input_ID_UserClass";
            input_ID_User.placeholder = "Enter the ID account for the member";

            const role_labl_User = document.createElement("h2");
            role_labl_User.classList="input_labl_UserClass";
            role_labl_User.innerHTML = "Role of the Member " + i + " :";

            const input_selcet_typUser = document.createElement("select");
            input_selcet_typUser.id = "Type_user" + i;
            input_selcet_typUser.classList="SelectTyp_UserClass";
            input_selcet_typUser.innerHTML= `<option value="Project Holder">Project Holder</option> 
            <option value="Supervisor">Supervisor</option>`;

            inp_form.appendChild(input_labl_User);
            inp_form.appendChild(input_ID_User);
            inp_form.appendChild(role_labl_User);
            inp_form.appendChild(input_selcet_typUser);

            bg_for_inputs_members.appendChild(inp_form);
        }
 

        const submit_project_to_review = document.createElement("button");
        submit_project_to_review.id = "submit_project_to_review_f";
        submit_project_to_review.classList = "btn nav";
        submit_project_to_review.style.margin="5%";
        submit_project_to_review.innerHTML = "Submit Project";

        bg_for_inputs_members.appendChild(submit_project_to_review);

        function updateCharCount() {
            var maxLength = 200; // Remplacez par la limite de caractères souhaitée
            var textArea = document.getElementById("discreptionProject");
            var charCountSpan = document.getElementById("charCount");

            var remainingChars = maxLength - textArea.value.length;

            charCountSpan.textContent = remainingChars;
            if (remainingChars === 0) {
                charCountSpan.style.color = "red";
            } else {
                charCountSpan.style.color = "var(--main-color)";
            }   
        }
        var textarea = document.getElementById("discreptionProject");
        textarea.addEventListener("input", updateCharCount);
        updateCharCount();

        submit_project_to_review.addEventListener("click", function () {
            // Move the nameProjectID_Val assignment here


            if(nb==2){ 
                const nameProjectID = document.getElementById("nameProject_content");
                const nameProjectID_Val = nameProjectID.value;
                const discreptionProject = document.getElementById("discreptionProject");
                const discreptionProject_Val = discreptionProject.value;

                const member1 = document.getElementById("ID_user1");
                const member1_Val = member1.value;
                const member2 = document.getElementById("ID_user2");
                const member2_Val = member2.value;

                const role1 = document.getElementById("Type_user1");
                const role1_Val = role1.value;
                const role2 = document.getElementById("Type_user2");
                const role2_Val = role2.value;

                const memberData = {
                    name_project :nameProjectID_Val,
                    discreption_project : discreptionProject_Val,
                    id_member_1: member1_Val,
                    role_member_1: role1_Val,
                    id_member_2: member2_Val,
                    role_member_2: role2_Val,  
                    situation_project: "review",
                    numberofmembers: "2",
                    prototype:"P Not Yet",
                    label:"L Not Yet"
                };
                if (
                    member1_Val.trim().length === 0 ||
                    member2_Val.trim().length === 0            
                     ){
                        const inputimpty = document.createElement("h2");
                        inputimpty.innerHTML="One of your inputs is empty";
                        messageConsole.appendChild(inputimpty);
                        setTimeout(() => {
                            inputimpty.innerHTML = "";
                        }, 4000);                        
                     }
                if ( 
                    member2_Val.trim().length > 0 &&
                    member1_Val.trim().length > 0 
            
                  ){console.log('ok');
                  loader.style.display="block";
                  saveToRevwieu(event,memberData,user,nb);}

            }
            if(nb==3){
                const nameProjectID = document.getElementById("nameProject_content");
                const nameProjectID_Val = nameProjectID.value;
                const discreptionProject = document.getElementById("discreptionProject");
                const discreptionProject_Val = discreptionProject.value;

                const member1 = document.getElementById("ID_user1");
                const member1_Val = member1.value;
                const member2 = document.getElementById("ID_user2");
                const member2_Val = member2.value;
                const member3 = document.getElementById("ID_user3");
                const member3_Val = member3.value;

                const role1 = document.getElementById("Type_user1");
                const role1_Val = role1.value;
                const role2 = document.getElementById("Type_user2");
                const role2_Val = role2.value;
                const role3 = document.getElementById("Type_user3");
                const role3_Val = role3.value;

                const memberData = {
                    name_project :nameProjectID_Val,
                    discreption_project : discreptionProject_Val,
                    id_member_1: member1_Val,
                    role_member_1: role1_Val,
                    id_member_2: member2_Val,
                    role_member_2: role2_Val,
                    id_member_3: member3_Val,
                    role_member_3: role3_Val,
                    situation_project: "review",
                    numberofmembers: "3",
                    prototype:"P Not Yet",
                    label:"L Not Yet"
      
                };
                if (
                    member1_Val.trim().length === 0 ||
                    member2_Val.trim().length === 0 ||
                    member3_Val.trim().length === 0            
                     ){
                        const inputimpty1 = document.createElement("h2");
                        inputimpty1.innerHTML="One of your inputs is empty";
                        messageConsole.appendChild(inputimpty1);
                        setTimeout(() => {
                            inputimpty1.innerHTML = "";
                        }, 4000);
                        
                    }
                if ( 
                    member3_Val.trim().length > 0 &&
                    member2_Val.trim().length > 0 &&
                    member1_Val.trim().length > 0 
            
                  ){console.log('ok');
                  loader.style.display="block";
                  saveToRevwieu(event,memberData,user,nb);
                }
            }
            if(nb==4){
                const nameProjectID = document.getElementById("nameProject_content");
                const nameProjectID_Val = nameProjectID.value;
                const discreptionProject = document.getElementById("discreptionProject");
                const discreptionProject_Val = discreptionProject.value;

                const member1 = document.getElementById("ID_user1");
                const member1_Val = member1.value;
                const member2 = document.getElementById("ID_user2");
                const member2_Val = member2.value;
                const member3 = document.getElementById("ID_user3");
                const member3_Val = member3.value;
                const member4 = document.getElementById("ID_user4");
                const member4_Val = member4.value;

                const role1 = document.getElementById("Type_user1");
                const role1_Val = role1.value;
                const role2 = document.getElementById("Type_user2");
                const role2_Val = role2.value;
                const role3 = document.getElementById("Type_user3");
                const role3_Val = role3.value;
                const role4 = document.getElementById("Type_user4");
                const role4_Val = role4.value;

                const memberData = {
                    name_project :nameProjectID_Val,
                    discreption_project : discreptionProject_Val,
                    id_member_1: member1_Val,
                    role_member_1: role1_Val,
                    id_member_2: member2_Val,
                    role_member_2: role2_Val,
                    id_member_3: member3_Val,
                    role_member_3: role3_Val,
                    id_member_4: member4_Val,
                    role_member_4: role4_Val,
                    situation_project: "review",
                    numberofmembers: "4",
                    prototype:"P Not Yet",
                    label:"L Not Yet"

                };
                if (
                    member4_Val.trim().length === 0 ||
                    member1_Val.trim().length === 0 ||
                    member2_Val.trim().length === 0 ||
                    member3_Val.trim().length === 0            
                     ){
                        const inputimpty2 = document.createElement("h2");
                        inputimpty2.innerHTML="One of your inputs is empty";
                        messageConsole.appendChild(inputimpty2);
                        setTimeout(() => {
                            inputimpty2.innerHTML = "";
                        }, 4000);
                        
                     }
                if ( 
                    member4_Val.trim().length > 0 &&
                    member3_Val.trim().length > 0 &&
                    member2_Val.trim().length > 0 &&
                    member1_Val.trim().length > 0 
            
                  ){console.log('ok');
                  loader.style.display="block";
                  saveToRevwieu(event,memberData,user,nb);}           
            }
            if(nb==5){ 
                const nameProjectID = document.getElementById("nameProject_content");
                const nameProjectID_Val = nameProjectID.value;
                const discreptionProject = document.getElementById("discreptionProject");
                const discreptionProject_Val = discreptionProject.value;

                const member1 = document.getElementById("ID_user1");
                const member1_Val = member1.value;
                const member2 = document.getElementById("ID_user2");
                const member2_Val = member2.value;
                const member3 = document.getElementById("ID_user3");
                const member3_Val = member3.value;
                const member4 = document.getElementById("ID_user4");
                const member4_Val = member4.value;
                const member5 = document.getElementById("ID_user5");
                const member5_Val = member5.value;

                const role1 = document.getElementById("Type_user1");
                const role1_Val = role1.value;
                const role2 = document.getElementById("Type_user2");
                const role2_Val = role2.value;
                const role3 = document.getElementById("Type_user3");
                const role3_Val = role3.value;
                const role4 = document.getElementById("Type_user4");
                const role4_Val = role4.value;
                const role5 = document.getElementById("Type_user5");
                const role5_Val = role5.value;

                const memberData = {
                    name_project :nameProjectID_Val,
                    discreption_project : discreptionProject_Val,
                    id_member_1: member1_Val,
                    role_member_1: role1_Val,
                    id_member_2: member2_Val,
                    role_member_2: role2_Val,
                    id_member_3: member3_Val,
                    role_member_3: role3_Val,
                    id_member_4: member4_Val,
                    role_member_4: role4_Val,
                    id_member_5: member5_Val,
                    role_member_5: role5_Val,
                    situation_project: "review",
                    numberofmembers: "5",
                    prototype:"P Not Yet",
                    label:"L Not Yet"

            
                };
                if (
                    member5_Val.trim().length === 0 ||
                    member4_Val.trim().length === 0 ||
                    member1_Val.trim().length === 0 ||
                    member2_Val.trim().length === 0 ||
                    member3_Val.trim().length === 0            
                     ){
                        const inputimpty3 = document.createElement("h2");
                        inputimpty3.innerHTML="One of your inputs is empty";
                        messageConsole.appendChild(inputimpty3);   
                        setTimeout(() => {
                            inputimpty3.innerHTML = "";
                        }, 4000);
                        
                     }
                if ( 
                    member5_Val.trim().length > 0 &&
                    member4_Val.trim().length > 0 &&
                    member3_Val.trim().length > 0 &&
                    member2_Val.trim().length > 0 &&
                    member1_Val.trim().length > 0 
            
                  ){
                    console.log('ok');
                  loader.style.display="block";
                  saveToRevwieu(event,memberData,user,nb);
                } 
            }
            if(nb==6){
                const nameProjectID = document.getElementById("nameProject_content");
                const nameProjectID_Val = nameProjectID.value;
                const discreptionProject = document.getElementById("discreptionProject");
                const discreptionProject_Val = discreptionProject.value;

                const member1 = document.getElementById("ID_user1");
                const member1_Val = member1.value;
                const member2 = document.getElementById("ID_user2");
                const member2_Val = member2.value;
                const member3 = document.getElementById("ID_user3");
                const member3_Val = member3.value;
                const member4 = document.getElementById("ID_user4");
                const member4_Val = member4.value;
                const member5 = document.getElementById("ID_user5");
                const member5_Val = member5.value;
                const member6 = document.getElementById("ID_user6");
                const member6_Val = member6.value;

                const role1 = document.getElementById("Type_user1");
                const role1_Val = role1.value;
                const role2 = document.getElementById("Type_user2");
                const role2_Val = role2.value;
                const role3 = document.getElementById("Type_user3");
                const role3_Val = role3.value;
                const role4 = document.getElementById("Type_user4");
                const role4_Val = role4.value;
                const role5 = document.getElementById("Type_user5");
                const role5_Val = role5.value;
                const role6 = document.getElementById("Type_user6");
                const role6_Val = role6.value;
                 
                const memberData = {
                    name_project :nameProjectID_Val,
                    discreption_project : discreptionProject_Val,
                    id_member_1: member1_Val,
                    role_member_1: role1_Val,
                    id_member_2: member2_Val,
                    role_member_2: role2_Val,
                    id_member_3: member3_Val,
                    role_member_3: role3_Val,
                    id_member_4: member4_Val,
                    role_member_4: role4_Val,
                    id_member_5: member5_Val,
                    role_member_5: role5_Val,
                    id_member_6: member6_Val,
                    role_member_6: role6_Val,
                    situation_project: "review",
                    numberofmembers: "6",
                    prototype:"P Not Yet",
                    label:"L Not Yet"
            
                };
                if (
                    member6_Val.trim().length === 0 ||
                    member5_Val.trim().length === 0 ||
                    member4_Val.trim().length === 0 ||
                    member1_Val.trim().length === 0 ||
                    member2_Val.trim().length === 0 ||
                    member3_Val.trim().length === 0            
                     ){
                        const inputimpty4 = document.createElement("h2");
                        inputimpty4.innerHTML="One of your inputs is empty";
                        messageConsole.appendChild(inputimpty4);   
                        setTimeout(() => {
                            inputimpty4.innerHTML = "";
                        }, 4000);
                        
                     }
                if ( 
                    member6_Val.trim().length > 0 &&
                    member5_Val.trim().length > 0 &&
                    member4_Val.trim().length > 0 &&
                    member3_Val.trim().length > 0 &&
                    member2_Val.trim().length > 0 &&
                    member1_Val.trim().length > 0 
            
                  ){
                    console.log('ok');
                  loader.style.display="block";
                  saveToRevwieu(event,memberData,user,nb);
                } 
            }
  
        });
    }
});



async function saveToRevwieu(e, memberData, user, nb) {
    e.preventDefault();
    const bg_for_inputs_members= document.getElementById("bg_for_inputs_members");
    bg_for_inputs_members.style.display="none";

    function checkForDuplicates(inputs) {
        const n = inputs.length;
    
        for (let i = 0; i < n - 1; i++) {
            for (let j = i + 1; j < n; j++) {
                if (inputs[i].value === inputs[j].value) {
                    // Found a match
                    return true;
                }
            }
        }
    
        // No matches found
        return false;
    }
    
    // Example usage:
    const inputElements = document.querySelectorAll('.input_ID_UserClass'); // Replace with your actual input class
    const hasDuplicates = checkForDuplicates(inputElements);


    if (hasDuplicates) {
        const bg_for_inputs_members= document.getElementById("bg_for_inputs_members");
        const messageConsole= document.getElementById("messageConsole");
        const doubleinputValue = document.createElement("h2");
        doubleinputValue.innerHTML="Duplicate values found!";
        messageConsole.appendChild(doubleinputValue);
        setTimeout(() => {
            doubleinputValue.innerHTML = "";
        }, 4000);
        bg_for_inputs_members.style.display="block";
        loader.style.display="none";
    }
    else
    {   

    try { 
        
        const firestore = getFirestore(app);
        const collectionProjectName = "projects";
        const collectionNameUsers = "users";
        const userId = user.uid;
        const docMyProjectName = "MyProject";

        const projectsCollectionRef = collection(firestore, collectionNameUsers, userId, docMyProjectName);
        const projectsQuery = query(projectsCollectionRef);
        const projectsSnapshot = await getDocs(projectsQuery);

        
        //check if user have project
        if (projectsSnapshot.size === 0) {


        // Add id projet to all members of that project
        let userexist = 0;
        let acces = 0;

         // check if all id members is exist
         const usersCollection = collection(firestore, "users");
         const querySnapshot = await getDocs(usersCollection);
         const userIDs = [];
 
         querySnapshot.forEach((doc) => {

           // Add user ID to the array
           userIDs.push(doc.id);
         });
     
         // You can now use the userIDs array as needed
         
         for (let j = 1; j < nb + 1; j++) {
            const id_membre = document.getElementById("ID_user" + j).value;
             console.log(id_membre);
            if (userIDs.includes(id_membre)) {

                userexist++;
                console.log("userexist"+userexist);

                } else {

                    const messageConsole= document.getElementById("messageConsole");
                    const UserNotExist = document.createElement("h2");
                    UserNotExist.innerHTML=`User ID ${id_membre} does not exist.`;
                    messageConsole.appendChild(UserNotExist);
                    loader.style.display="none";
                    bg_for_inputs_members.style.display="block";
                    setTimeout(() => {
                        UserNotExist.innerHTML = "";
                    }, 4000);
                }
         }
   

         // check if all members dosnt have a project
         if(userexist === nb)
         {

            const bg_for_inputs_members = document.getElementById("bg_for_inputs_members");
            bg_for_inputs_members.style.display="none";

            for (let j = 1; j < nb + 1; j++) {
                const id_membre = document.getElementById("ID_user" + j).value;
                            console.log("id_membre/"+j+"/ :"+id_membre);

                // Assuming id_membre is an object with a uid property
                const userProjectDocRef = collection(firestore, collectionNameUsers, id_membre, docMyProjectName);
                const accesprojectsQuery = query(userProjectDocRef);
                const projectsSnapshot = await getDocs(accesprojectsQuery);
            
                if (projectsSnapshot.size === 0) {
                    acces++;
                }
                if(projectsSnapshot.size > 0){ 
                    const messageConsole= document.getElementById("messageConsole");
                    const MembreHaveProject = document.createElement("h2");
                    MembreHaveProject.innerHTML=`one of membres have a project`;
                    messageConsole.appendChild(MembreHaveProject);
                    setTimeout(() => {
                        MembreHaveProject.innerHTML = "";
                    }, 4000);
                    loader.style.display="none";
                    bg_for_inputs_members.style.display="block";
                }
                // You can add logic here for the case when projectsSnapshot.size > 0, if needed
            }
         }
        
        if (acces === nb) {

            console.log("acces ok :"+acces);

            const bg_for_inputs_members = document.getElementById("bg_for_inputs_members");
            bg_for_inputs_members.style.display = "none";
             // get membres data    
             const db = getFirestore(app);
             const MemberDataGetting_data = {}; // Move this outside the loop
             
             for (let j = 1; j <= nb; j++) {
                 const id_membre = document.getElementById("ID_user" + j).value;
                 console.log(id_membre);
             
                 const UserData_ref = doc(db, "users", id_membre);
                 const UserData_refSnapshot = await getDoc(UserData_ref);
             
                 const docSnapshot = UserData_refSnapshot.data();
                 const name = docSnapshot.name;
                 const last_name = docSnapshot.last_name;
                 const birth_day = docSnapshot.birth_day;
                 const faculte = docSnapshot.faculte;
                 const wilaya = docSnapshot.wilaya;
                 const matricule = docSnapshot.matricule;
                 const email = docSnapshot.email;
                 const lavel = docSnapshot.lavel;
                 const phone_number = docSnapshot.phone_number;
             
                 Object.assign(MemberDataGetting_data, {
                     ["name_member" + j]: name,
                     ["last_name_member" + j]: last_name,
                     ["birth_day_member" + j]: birth_day,
                     ["faculte_member" + j]: faculte,
                     ["wilaya_member" + j]: wilaya,
                     ["matricule_member" + j]: matricule,
                     ["email_member" + j]: email,
                     ["lavel_member" + j]: lavel,
                     ["phone_number_member" + j]: phone_number,
                 });
             }
             
             
             getMembresDATA();
             // SAV DATA 
             async function getMembresDATA() {
                console.log("acces getMembresDATA ok");


              
                const projectCoRef = collection(firestore, collectionProjectName);
                const newProDocRef = await addDoc(projectCoRef, {...MemberDataGetting_data,...memberData });

                const newProDocId = newProDocRef.id;
              
                
                SvaeMembresAndProjectDATA(newProDocId);
              };

              async function SvaeMembresAndProjectDATA(newProDocId){
                console.log("acces SvaeMembresAndProjectDATA ok");
                console.log("newProDocId : "+newProDocId);

                const my_project_data = {
                    id_project: newProDocId
                };
                for(let j = 1; j < nb + 1; j++){
                    const id_membre = document.getElementById("ID_user" + j).value;
    
                    const userProjectDocRef = collection(firestore, collectionNameUsers, id_membre, docMyProjectName);
                    const newUserProDocRef = await addDoc(userProjectDocRef, my_project_data);
    
                }

    
                const messageConsole= document.getElementById("messageConsole");
                const InReview = document.createElement("h2");
                InReview.innerHTML = `Thank you for choosing TECHINNOV-USTHB Incubator. Your project is currently under review. We will carefully assess your request and notify you by email. This process may take up to 2 days.`;
                InReview.style.color="rgba(38, 255, 0, 0.588)";
                messageConsole.appendChild(InReview);
                loader.style.display="none";

              }

        }
                
        } 
        if (projectsSnapshot.size > 0) {
            const messageConsole= document.getElementById("messageConsole");
            const YouHaveProjecttMessage = document.createElement("h2");
            YouHaveProjecttMessage.innerHTML="You already have projects.";
            messageConsole.appendChild(YouHaveProjecttMessage);
            loader.style.display="none";
        }



  

    } catch (error) {
        // Display an error message
        console.error('Registration failed. Error:', error.message);
    } finally {
        loader.style.display="none";   
     }
 }
}



  // -----------------------------------------------------import information project to my project tab

 

  const db = getFirestore(app);

  function myProjectdataaccount() {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userId = user.uid;
        const userRef = doc(db, "users", userId);
        const myProjectRef = collection(userRef, "MyProject");

  
        try {

          const querySnapshot = await getDocs(myProjectRef);

          if(querySnapshot.size === 0){
            const loader2 =document.getElementById("loader2");
            loader2.style.display="none";
            const YouDontHaveProject =document.getElementById("YouDontHaveProject");
            YouDontHaveProject.style.display="block";
            }
            else{
                for (const docSnap of querySnapshot.docs) {
                    const IDproject = docSnap.data().id_project;
          
                    if (IDproject) {
          
                      try {
                        const firestore = getFirestore(app);
                        const collectionProjectName = "projects";
          
                        const projectsCollectionRef = collection(
                          firestore,
                          collectionProjectName
                        );
          
                        const projectDocRef = doc(projectsCollectionRef, IDproject);
                        const projectDoc = await getDoc(projectDocRef);
        
        
          
                        if (projectDoc.exists()) {
        
                            const name_project = projectDoc.data().name_project;
                            const discreption_project = projectDoc.data().discreption_project;
                            const numberofmembers = projectDoc.data().numberofmembers;
                            const situation_project = projectDoc.data().situation_project;
                            const label = projectDoc.data().label;
                            const prototype = projectDoc.data().prototype;


                            if(situation_project === "review"){
                                const YourProjectInReview = document.getElementById("YourProjectInReview");
                                YourProjectInReview.style.display="block";
                                const loader2 = document.getElementById("loader2");
                                loader2.style.display="none";
                            }

                            else{
                                const MyProjectInfoDisplay = document.getElementById("MyProjectInfoDisplay");
        
        
                                MyProjectInfoDisplay.innerHTML = `
                                <h3 style="color: rgb(38, 255, 0)">Project Informations : </h3>
                                <p><strong>name of project : </strong> ${name_project}</p>
                                <br>
                                <p><strong>discreption of project : </strong> ${discreption_project}</p>
                                <br>
                                <p><strong>number of members: </strong> ${numberofmembers}</p>
                                <p><strong>label: </strong> ${label}</p>
                                <p><strong>prototype: </strong> ${prototype}</p>

        
                              `;
                              for (let j = 1; j <= numberofmembers; j++) {
            
                                const name_m = "name_member"+j;
                                const Lastname_m = "last_name_member"+j;
                                const Matricule_m = "matricule_member"+j;
                                const email_m = "email_member"+j;
                                const level_m = "lavel_member"+j;
                                const faculty_m = "faculte_member"+j;
                                const role_m = "role_member_"+j;
                                
            
                                const email_member = projectDoc.data()[email_m];
                                const level_member = projectDoc.data()[level_m];
                                const Lastname_member = projectDoc.data()[Lastname_m];
                                const name_member = projectDoc.data()[name_m];
                                const Matricule_member = projectDoc.data()[Matricule_m];
                                const faculty_member = projectDoc.data()[faculty_m];
                                const role_member = projectDoc.data()[role_m];
            
            
                    
                                const membreShowInformion = document.createElement("div");
            
                                membreShowInformion.innerHTML = `
                                <h3 style="color: rgb(38, 255, 0);">Informations of Membre ${j} : </h3>
                                <p><strong>name member : </strong> ${name_member}</p>
                                <p><strong>Lastname member : </strong> ${Lastname_member}</p>
                                <p><strong>Matricule member : </strong> ${Matricule_member}</p>
                                <p><strong>role member : </strong> ${role_member}</p>
                                <p><strong>email member : </strong> ${email_member}</p>
                                <p><strong>faculty member : </strong> ${faculty_member}</p>
                                <p><strong>level member : </strong> ${level_member}</p>
            
            
                              `;
                              MyProjectInfoDisplay.appendChild(membreShowInformion);
            
                              }

        
                              
                              const loader2 = document.getElementById("loader2");
                              loader2.style.display="none";

                              const btnEditAboutProject = document.getElementById('btnEditAboutProject');
                              btnEditAboutProject.style.display="block";

                              // Assuming btnEditAboutProject is a button element
                               btnEditAboutProject.addEventListener('click', function() {

                                try {
                                    // Get values from input fields
                                    const PrototypeSetuation = document.getElementById('PrototypeSetuation').value;
                                    const labelSetuation = document.getElementById('labelSetuation').value;
                            
                                    // Create a new data object with the retrieved values
                                    const newData = { label: labelSetuation, prototype: PrototypeSetuation };
                            
                                    // Fetch the latest data from the Firestore document
                                    const projectDoc =  getDoc(projectDocRef);
                            
                                        // Use set with merge option to update the document
                                         setDoc(projectDocRef, newData, { merge: true });
                            
                                        // On success, update the display and show a message
                                        const messageupdatsuccfuly = document.getElementById('messageupdatsuccfuly');
                                        messageupdatsuccfuly.style.display = 'block';

                                        setTimeout(() => {
                                            messageupdatsuccfuly.style.display = 'none';
                                        }, 4000);


                                } catch (error) {
                                    console.error('Error updating document: ', error);
                                }
                               });





                            }
    
        
                        } else {
                            console.error("project donst exist");
        
                        }
                      } catch (error) {
                        console.error("Error fetching project document:", error);
                      }
                    } else {
                      console.error("IDproject is undefined or null");
                    }
                  }
            }


        } catch (error) {
          console.error("Error fetching MyProject documents:", error);
        }
      }
    });
  }
  
  
  
           

// -----------------------------------------------------Edit information project 





























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
  