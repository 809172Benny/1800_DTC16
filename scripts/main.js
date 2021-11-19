var currentUserName = undefined;

function getCurrentUserUid() {
    currentUser = firebase.auth().currentUser;
    if (currentUser != null) {
        console.log(currentUser.uid);
        return currentUser.uid;
    }
    return null;
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
        } else {
            // No user is signed in.
        }
    });
}
insertName();

function writeStories() {
    //define a variable for the collection you want to create in Firestore to populate data
    var storiesRef = db.collection("Stories");

    storiesRef.add({
        code: "BBY01",
        title: "This is my covid story",
        story: "fsdnsfh dfsdhfkjsdhfk hhdfkshkdfhsdfhjk"
    });
    storiesRef.add({
        code: "AM01",
        title: "I recently recovered from Covid. AMA",
        story: "fsdnsfh dfsdhfkjsdhfk hhdfkshkdfhsdfhjk sdsadsadas"
    });
    storiesRef.add({
        code: "NV01",
        title: "This is my covid story 2",
        story: "fsdnsfh dfsdhfkjsdhfk hhdfkshkdfhsdfhjk"
    });
}
//writeStories();

function displayHikes() {
    let hikeCardTemplate = document.getElementById("hikeCardTemplate");
    let hikeCardGroup = document.getElementById("hikeCardGroup");
    
    db.collection("Stories").get()
        .then(allHikes => {
            allHikes.forEach(doc => {
                var hikeName = doc.data().title; //gets the name field
                var hikeID = doc.data().code; //gets the unique ID field
                var hikeStory = doc.data().story; //gets the name field
                                        var hikeLength = doc.data().length; //gets the length field
                let testHikeCard = hikeCardTemplate.content.cloneNode(true);
                testHikeCard.querySelector('.card-title').innerHTML = hikeName;
                testHikeCard.querySelector('.card-length').innerHTML = hikeLength;
                testHikeCard.querySelector('.card-text').innerHTML = hikeStory;
                testHikeCard.querySelector('a').onclick = () => setHikeData(hikeID);
                testHikeCard.querySelector('img').src = `./images/${hikeID}.jpg`;
                hikeCardGroup.appendChild(testHikeCard);
            })

        })
}
displayHikes();