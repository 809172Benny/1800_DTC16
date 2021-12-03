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
                        Story: Story,
                        Time: firebase.firestore.FieldValue.serverTimestamp()
                    });
                })
        } else {
            // No user is signed in.
            console.log("no user signed in");
        }
    });
}

function writeStories() {
    var storiesRef = db.collection("Stories");
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

function displayStories() {
    let storyCardTemplate = document.getElementById("storyCardTemplate");
    let storyCardGroup = document.getElementById("storyCardGroup");

    db.collection("Stories").get()
        .then(snap => {
            snap.forEach(doc => {
                var storyName = doc.data().Title; //gets the name field
                var storyID = doc.data().code; //gets the unique ID field
                var Story = doc.data().Story; //gets the name field
                var storyUser = doc.data().UserName; //gets the length field
                // var storyTime = doc.data().Time; //gets the time
                let testStoryCard = storyCardTemplate.content.cloneNode(true);
                testStoryCard.querySelector('.card-title').innerHTML = storyName;
                testStoryCard.querySelector('.card-user').innerHTML = "Posted by: " + storyUser;
                testStoryCard.querySelector('.card-text').innerHTML = Story;
                // testStoryCard.querySelector('.card-time').innerHTML = storyTime;
                testStoryCard.querySelector('a').onclick = () => setStoryData(storyID);
                testStoryCard.querySelector('img').src = `./images/AM01.jpg`;
                storyCardGroup.appendChild(testStoryCard);
            })

        })
}
displayStories();

function deleteCard() {
    const db = getFirestore(app);
    const docRef = doc(db, 'Stories');
    docRef.delete(); 
}