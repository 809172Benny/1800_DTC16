var currentUserName = undefined;

function getCurrentUserUid() {
    currentUser = firebase.auth().currentUser;
    if (currentUser != null) {
        console.log(currentUser.uid);
        return currentUser.uid;
    }
    return null;
}

function writeUserStory() {
    
    let Title = document.getElementById("TitleInput").value;
    let Story = document.getElementById("StoryInput").value;

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid);
            var userID = user.uid;
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                                                //get user Email
                    var userEmail = userDoc.data().email;
                    var userName = userDoc.data().name
                                                // Start a new collection and add all data in it.
                    db.collection("Stories").add({
                        UserID: userID,
                        UserEmail: userEmail,
                        UserName: userName,
                        Title: Title,
                        Story: Story
                    });
                })
        } else {
            // No user is signed in.
                                console.log("no user signed in");
        }
    });
}

function writeStories() {
    //define a variable for the collection you want to create in Firestore to populate data
    var storiesRef = db.collection("Stories");

    // storiesRef.add({
    //     code: "BBY01",
    //     title: "This is my covid story",
    //     story: "placeholder"
    // });
    // storiesRef.add({
    //     code: "AM01",
    //     title: "I recently recovered from Covid. AMA",
    //     story: "placeholder"
    // });
    // storiesRef.add({
    //     code: "NV01",
    //     title: "This is my covid story 2",
    //     story: "placeholder"
    // });
}

function insertName() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {
            // Do something for the current logged-in user here: 
            //console.log(user.uid);
            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid)
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    var user_Name = userDoc.data().name;
                    //console.log(user_Name);
                    //document.getElementById("username").innerText = n;                     //using javascript
                    $("#name-goes-here").text(user_Name); //using jquery
                })
                writeStories();
        } else {
            // No user is signed in.
        }
    });
}
insertName();

function displayHikes() {
    let hikeCardTemplate = document.getElementById("hikeCardTemplate");
    let hikeCardGroup = document.getElementById("hikeCardGroup");

    db.collection("Stories").get()
        .then(snap => {
            snap.forEach(doc => {
                var hikeName = doc.data().Title; //gets the name field
                var hikeID = doc.data().code; //gets the unique ID field
                var hikeStory = doc.data().Story; //gets the name field
                var hikeUser = doc.data().UserName; //gets the length field
                let testHikeCard = hikeCardTemplate.content.cloneNode(true);
                testHikeCard.querySelector('.card-title').innerHTML = hikeName;
                testHikeCard.querySelector('.card-user').innerHTML = hikeUser;
                testHikeCard.querySelector('.card-text').innerHTML = hikeStory;
                testHikeCard.querySelector('a').onclick = () => setHikeData(hikeID);
                testHikeCard.querySelector('img').src = `./images/${hikeID}.jpg`;
                hikeCardGroup.appendChild(testHikeCard);
            })

        })
}
displayHikes();


// function displayCards(collection) {
//     let CardTemplate = document.getElementById("CardTemplate");

//     db.collection(collection).get()
//         .then(snap => {
//             var i = 1;
//             snap.forEach(doc => { //iterate thru each doc
//                 var title = doc.data().title;
//                 var details = doc.data().story;
//                 let newcard = CardTemplate.content.cloneNode(true);

//                 //update title and text and image
//                 newcard.querySelector('.card-title').innerHTML = title;
//                 newcard.querySelector('.card-text').innerHTML = details;
//                 newcard.querySelector('.card-image').src = "./images/" + collection + ".jpg";

//                 //give unique ids to all elements for future use
//                 newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
//                 newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
//                 newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

//                 //attach to gallery
//                 document.getElementById(collection + "-go-here").appendChild(newcard);
//                 i++;

//                 newcard.querySelector('.card-href').href = "details.html?collection=" + collection + "?id=" + doc.id; //firestore doc ID
//             })
//         })
// }

// displayCards("Stories");
// //displayCards("heros");
// //displayCards("countries);
// //displayCards("bikes");

// function showDetails() {
//     // create a URL object
//     let params = new URL(window.location.href);
//     let id = params.searchParams.get("id");                   //parse "id"
//     let collection = params.searchParams.get("collection");   //parse "collection"

//     let message = "Collection is: " + collection;        //build message to display
//     message += "Document id is:  " + id;    
//     document.getElementById("details-go-here").innerHTML = message;   

//     // you have collection name, and id; 
//     // you can now read from db if you want
// }
// showDetails();