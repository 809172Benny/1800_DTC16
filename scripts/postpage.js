var currentUserName = undefined;

function getCurrentUserUid() {
    currentUser = firebase.auth().currentUser;
    if (currentUser != null) {
        console.log(currentUser.uid);
        return currentUser.uid;
    }
    return null;
}

function populateInfoComments() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid)
            currentUser.get()
                .then(userDoc => {

                    var userComment = userDoc.data().comment;

                    if (userComment !== null) {
                        document.getElementById('commentInput').value = userComment;
                    }
                })
        } else {
            console.log("No user is signed in");
        }
    });
}
populateInfoComments();


function saveCommentInfo() {
    userComment = document.getElementById("commentInput").value;
    console.log(userComment);
    firebase.auth().onAuthStateChanged(user => {
            if (user) {
                var currentUser = db.collection("users").doc(user.uid);
                var userID = user.uid;
                //get the document for current user.
                currentUser.get()
                .then(userDoc => {
                    //get user Email
                    var userName = userDoc.data().name
                db.collection("Comments").add({
                        comment: userComment,
                        UserName: userName,
                        UserID: userID,
                        Time: firebase.firestore.FieldValue.serverTimestamp()
                    })
                })
                    .then(() => {
                        console.log("Comment successfully updated.")
                    });
            }
        });
    }
            // No user is signed in.
            console.log("no user signed in");
    //populating the comment post
console.log('loaded')
    // function insertComment() {
    //     firebase.auth().onAuthStateChanged(user => {
    //         // Check if user is signed in:
    //         if (user) {
    //             // Do something for the current logged-in user here: 
    //             console.log(user.uid);
    //             //go to the correct user document by referencing to the user uid
    //             currentUser = db.collection("Comments").doc(user.uid);
    //             //get the document for current user.
    //             currentUser.get()
    //                 .then(userDoc => {
    //                     var user_Comment = userDoc.data().comment;
    //                     console.log(user_Comment);
    //                     //method #1:  insert with html only
    //                     //document.getElementById("name-goes-here").innerText = n;    //using javascript
    //                     //method #2:  insert using jquery
    //                     $("#comment-goes-here").text(
    //                         user_Comment); //using jquery
    //                 })
    //         } else {
    //             // No user is signed in.
    //         }
    //     });
    // }
    // insertComment();


    //Reply button functionality

    function replybutton(btn) {
        btn.nextElementSibling.style.display = "block";
        btn.style.display = "none"
    }

    function populateReplyComments() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {

                currentUser = db.collection("users").doc(user.uid)

                currentUser.get()
                    .then(userDoc => {

                        var userReply = userDoc.data().reply;

                        if (userReply != null) {
                            document.getElementById('replyInput').value =
                                userReply;
                        }
                    })
            } else {
                console.log("No user is signed in");
            }
        });
    }
    populateReplyComments();

    var currentUser

    function savereplyinfo() {
        userReply = document.getElementById("replyInput").value;
        console.log(userReply);

        db.collection("replies").add({
                reply: userReply
            })
            .then(() => {
                console.log("Reply successfully updated.")
            })
    }

    function displayHikes() {
        let hikeCardTemplate = document.getElementById("hikeCardTemplate");
        let hikeCardGroup = document.getElementById("hikeCardGroup");
    
        db.collection("Comments").get()
            .then(snap => {
                snap.forEach(doc => {
                    var userComment = doc.data().comment; //gets the name field
                    // var hikeID = doc.data().code; //gets the unique ID field
                    // var hikeStory = doc.data().Story; //gets the name field
                    var hikeUser = doc.data().UserName; //gets the length field
                    // var hikeTime = doc.data().Time; //gets the time
                    let testHikeCard = hikeCardTemplate.content.cloneNode(true);
                    testHikeCard.querySelector('.card-title').innerHTML = userComment;
                    testHikeCard.querySelector('.card-user').innerHTML = "Posted by: " + hikeUser;
                    // testHikeCard.querySelector('.card-text').innerHTML = hikeStory;
                    // testHikeCard.querySelector('.card-time').innerHTML = hikeTime;
                    // testHikeCard.querySelector('a').onclick = () => setHikeData(hikeID);
                    // testHikeCard.querySelector('img').src = `./images/${hikeID}.jpg`;
                    hikeCardGroup.appendChild(testHikeCard);
                })
    
            })
    }
    displayHikes();