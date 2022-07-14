import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-auth.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const google_button = document.getElementById('google_button');

window.addEventListener('load', () => {
    get_login_data();
});

google_button.addEventListener('click', () => {
    const auth = getAuth();
    const providerGoogle = new GoogleAuthProvider();

    signInWithPopup(auth, providerGoogle)
    .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const email = result.user.email;
        console.log("result", result);
        console.log("credential", credential);
        send_login_data(`{"email":"${email}","token":"${token}"}`);
        window.location.href = `${window.location.origin}/login`;
        
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log("error", error);
        console.log("credential", credential);
    });
});

function send_login_data(data) {
    let request = new XMLHttpRequest();
    request.open("POST", `${window.location.origin}/login/set`, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.send(data);
}

function get_login_data() {
    console.log("Get login data");
    let request = new XMLHttpRequest();
    request.open("POST", `${window.location.origin}/login/get`, true);
    // request.setRequestHeader("Content-Type", "application/json");
    request.send();
    request.addEventListener("load", () => {
        let text = request.responseText;
        console.log(`data: ${text}`);
        if(text == "OK") {
            if(window.location.pathname != '/home')
                window.location.href = `${window.location.origin}/home`;
        } else {
            if(window.location.pathname != '/login')
                window.location.href = `${window.location.origin}/login`;
        }
    });
}
