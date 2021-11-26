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


var currentUser

function saveCommentInfo() {
    if (user) {
        var currentUser = db.collection("users").doc(user.uid)
        userComment = document.getElementById("commentInput").value;
        console.log(userComment);


        db.collection("Comments").doc().update({
                comment: userComment
            })
            .then(() => {
                console.log("Comment successfully updated.")
            })
    }

    //populating the comment post

    function insertComment() {
        firebase.auth().onAuthStateChanged(user => {
            // Check if user is signed in:
            if (user) {
                // Do something for the current logged-in user here: 
                console.log(user.uid);
                //go to the correct user document by referencing to the user uid
                currentUser = db.collection("Stories").doc(user.uid);
                //get the document for current user.
                currentUser.get()
                    .then(userDoc => {
                        var user_Comment = userDoc.data().comment;
                        console.log(user_Comment);
                        //method #1:  insert with html only
                        //document.getElementById("name-goes-here").innerText = n;    //using javascript
                        //method #2:  insert using jquery
                        $("#comment-goes-here").text(user_Comment); //using jquery
                    })
            } else {
                // No user is signed in.
            }
        });
    }
    insertComment();


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
                            document.getElementById('replyInput').value = userReply;
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
