// gapi.auth2.init();

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId());
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());

    document.getElementById("userImg").src = profile.getImageUrl();

    document.querySelector(".name").innerHTML = profile.getName();
    document.querySelector(".email").innerHTML = profile.getEmail();

    afterSignIn(googleUser.getBasicProfile());
}

document.getElementById("signoutLink").addEventListener("click", function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        document.getElementById("userImg").src = "";

        document.querySelector(".name").innerHTML = "";
        document.querySelector(".email").innerHTML = "";
    });
});

// if (auth2.isSignedIn.get()) {
//     var profile = auth2.currentUser.get().getBasicProfile();
//     console.log('ID: ' + profile.getId());
//     console.log('Name: ' + profile.getName());
//     console.log('Image URL: ' + profile.getImageUrl());
//     console.log('Email: ' + profile.getEmail());

//     document.getElementById("userImg").src = profile.getImageUrl();

//     document.querySelector(".name").innerHTML = profile.getName();
//     document.querySelector(".email").innerHTML = profile.getEmail();   
// }

function afterSignIn(userProfile) {
    var profile = userProfile;
    
    var check = firebase.database().reference('users').orderByKey().equalto(profile.getId()).once("value", function (snapshot) {
        if (!snapshot.exists()) {
            writeUserData(profile.getId(), profile.getName(), profile.getEmail(), profile.getImageUrl());
        }

        document.getElementById("specialString").value = firebase.database().ref("users/" + profile.getId()).on("value", (snap) => { return snap.val() });
    });

    document.getElementById("specialString").addEventListener("change", function() {
        setSpecialString(profile.getId(), document.getElementById("specialString").value);
    });
}