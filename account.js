// checkIfLoggedIn();

// function checkIfLoggedIn() {
//     if (localStorage.getItem('myUserEntity') != null) {
//         var userEntity = {};
//         userEntity = JSON.parse(localStorage.getItem('myUserEntity'));
//         console.log(userEntity);

//         afterSignIn(userEntity);
//     }
// }

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();

    document.getElementById("userImg").src = profile.getImageUrl();

    document.querySelector(".name").innerHTML = profile.getName();
    document.querySelector(".email").innerHTML = profile.getEmail();

    var userEntity = {
        id: profile.getId(),
        username: profile.getName(),
        email: profile.getEmail(),
        profile_picture: profile.getImageUrl(),
    };

    localStorage.setItem('myUserEntity', JSON.stringify(userEntity));

    afterSignIn(userEntity);
}

document.getElementById("signoutLink").addEventListener("click", function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        localStorage.removeItem("myUserEntity");

        document.getElementById("userImg").src = "";

        document.querySelector(".name").innerHTML = "";
        document.querySelector(".email").innerHTML = "";

        document.getElementById("specialString").setAttribute("value", "");
    });
});

function afterSignIn(userProfile) {
    var googleProfile = userProfile;

    var googleId, userName, userEmail, userPicture;
    googleId = googleProfile.id;
    userName = googleProfile.name;
    userEmail = googleProfile.email;
    userPicture = googleProfile.profile_picture;

    console.log(googleId);
    console.log(userName);
    console.log(userEmail);
    console.log(userPicture);

    writeUserData(googleId, userName, userEmail, userPicture);

    let userData, userSpecialString;

    firebase.database().ref("users/" + googleProfile.id).on("value", (snap) => {
        userData = snap.val();
        userSpecialString = userData.userString;

        document.getElementById("specialString").setAttribute("value", userSpecialString);
    });

    // var check = firebase.database().ref('users').orderByKey().equalTo(googleProfile.id).once("value", function (snapshot) {
    //     console.log(snapshot)
    //     if (snapshot.exists()) {
    //         let userData, userSpecialString;

    //         firebase.database().ref("users/" + googleProfile.id).on("value", (snap) => {
    //             userData = snap.val();
    //             userSpecialString = userData.userString;

    //             document.getElementById("specialString").setAttribute("value", userSpecialString);
    //         });
    //     } else {
    //         console.log(snapshot.exists())
    //         writeUserData(googleProfile.id, googleProfile.name, googleProfile.email, googleProfile.profile_picture);

    //         document.getElementById("specialString").setAttribute("value", "new user string");
    //     }
    // });

    document.getElementById("specialString").addEventListener("change", function () {
        setSpecialString(googleProfile.id, document.getElementById("specialString").value);
    });
}