let firebaseConfig = {
    apiKey: "AIzaSyD1OWh4UsgmGc9lE1KbUaxkxdbhvz32xVw",
    authDomain: "guanataco-560b2.firebaseapp.com",
    databaseURL: "https://guanataco-560b2.firebaseio.com",
    projectId: "guanataco-560b2",
    storageBucket: "",
    messagingSenderId: "615265430404",
    appId: "1:615265430404:web:1d2869d029617c56"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const loginFacebook = () => {
    let provider = new firebase.auth.FacebookAuthProvider();
    //provider.addScope('user_birthday');
    firebase.auth().signInWithPopup(provider).then((result) => {
        // This gives you a Facebook Access Token.
        let token = result.credential.accessToken;
        console.log("result", result)
        // The signed-in user info.
        let user = result.user;
        console.log("Bienvenido " + user.displayName)
    });
}

let login = (email, password) => {
    var email = document.getElementById("emailLogin").value;
    var password = document.getElementById("passwordLogin").value;
    firebase.auth().signInWithEmailAndPassword(email, password).then((result) => {
        firebase.database().ref('/users/' + result.user.uid).on('value', (postsRef) => {
            const userData = postsRef.val();
            const name = userData.name
            console.log("Bienvenido " + name)
        })
    })
        .catch((error) => {
            if (error.message === 'The password is invalid or the user does not have a password.') {
                alert("Contraseña o e-mail invalidos");
            } else if (error.message === 'There is no user record corresponding to this identifier. The user may have been deleted.') {
                alert("El email ingresado no corresponde a un usuario registrado.");
            }
        });
}

const register = () => {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((result) => {
            console.log(result)
            const user = result.user;
            saveUser(user.uid, name, user.email);
        })
        .catch((error) => {
            console.log(error)
            let errorCode = error.code;
            let errorMessage = error.message;
            if (error.message === 'The email address is already in use by another account.') {
                alert("El email ya está registrado.");
            } else if (error.message === 'Password should be at least 6 characters') {
                alert("La contraseña debe tener almenos 6 caracteres");
            } else if (error.message === 'The email address is badly formatted.') {
                alert("E-mail invalido.");
            }
        })
}

const saveUser = (uid, name, email) => {
    firebase.database().ref('users/' + uid).
        set({
            id: uid,
            name: name,
            email: email
        });
}

const logout = () => {
    firebase.auth().signOut().then(() => {
    }).catch((error) => {
    });
}
