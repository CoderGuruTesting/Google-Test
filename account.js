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

gapi.auth2.init();

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

import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-database.js";

const database = getDatabase(app);

function writeUserData(userId, name, email, imageUrl) {
  const db = getDatabase();
  set(ref(db, 'users/' + userId), {
    username: name,
    email: email,
    profile_picture : imageUrl
  });
}