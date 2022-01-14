gapi.auth2.init();

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId());
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());

    document.getElementById("userImg").src = profile.getImageUrl();

    document.querySelector(".name").innerHTML = profile.getName();
    document.querySelector(".email").innerHTML = profile.getEmail();
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        document.getElementById("userImg").src = "";

        document.querySelector(".name").innerHTML = "";
        document.querySelector(".email").innerHTML = "";
    });
}

if (auth2.isSignedIn.get()) {
    var profile = auth2.currentUser.get().getBasicProfile();
    console.log('ID: ' + profile.getId());
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());

    document.getElementById("userImg").src = profile.getImageUrl();

    document.querySelector(".name").innerHTML = profile.getName();
    document.querySelector(".email").innerHTML = profile.getEmail();

    document.getElementById("dataTest").onclick = function() {
        writeUserData(profile.getId(), profile.getName(), profile.getEmail(), profile.getImageUrl());
    }
}

const firebaseConfig = {
    apiKey: "AIzaSyDGyliCvD8UjUOAphjguLLuH55E-Y4r9Uo",
    authDomain: "turnkey-agility-338113.firebaseapp.com",
    databaseURL: "https://turnkey-agility-338113-default-rtdb.firebaseio.com",
    projectId: "turnkey-agility-338113",
    storageBucket: "turnkey-agility-338113.appspot.com",
    messagingSenderId: "796393754460",
    appId: "1:796393754460:web:ab34cf0f23a5bda3acbb99",
    measurementId: "G-R75G7P7N72"
};

firebase.initializeApp(firebaseConfig);

function writeUserData(userId, name, email, imageUrl) {
    firebase.database().ref('users/' + userId).set({
        username: name,
        email: email,
        profile_picture: imageUrl
    });
}

document.getElementById("dataTest").onclick = function () {
    if(auth2.isSignedIn.get()) {
        var profile = auth2.currentUser.get().getBasicProfile();

        writeUserData(profile.getId(), profile.getName(), profile.getEmail(), profile.getImageUrl);
    } else {
        alert("Please Log In");
    }
};