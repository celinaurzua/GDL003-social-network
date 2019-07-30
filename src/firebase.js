
// Initialize Firebase
const loginFacebook = () => {
    let provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result) => {
        // This gives you a Facebook Access Token.
        let token = result.credential.accessToken;
        mostrarMuroFb();
        // The signed-in user info.
        let user = result.user;
        let bienvenida = document.getElementById("nombreBienvenida")
        bienvenida.innerHTML = user.displayName
        document.getElementById("fotoPerfil").innerHTML = `<img src="${user.photoURL}">`
        let nombrePost = document.getElementById("nombrePost")
        //nombrePost.innerHTML = user.displayName
        //document.getElementById("fotoPost").innerHTML = `<img src="${user.photoURL}">`

        let datos = {
            nombre: user.displayName,
            imagen: user.photoURL,
            email: user.email
        };
        write("users", datos, firebase.auth().currentUser.uid)
        return result;
    }, (error) => {
        console.log(error)
    });
    return provider;
}

const loginGoogle = () => {
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result) => {
        mostrarMuroGoogle();
        let token = result.credential.accessToken;
        let user = result.user;
        console.log(user);
        console.log(user.displayName);
        console.log(user.photoURL);
        console.log(user.email);
        let bienvenida = document.getElementById("nombreBienvenida")
        bienvenida.innerHTML = user.displayName
        document.getElementById("fotoPerfil").innerHTML = `<img src="${user.photoURL}">`
        let nombrePost = document.getElementById("nombrePost")
        nombrePost.innerHTML = user.displayName
        document.getElementById("fotoPost").innerHTML = `<img src="${user.photoURL}">`
        let datos = {
            nombre: user.displayName,
            imagen: user.photoURL,
            email: user.email
        };
        write("users", datos, "")
    }).catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        let errorEmail = error.email;
        let credential = error.credential;

        if (errorCode === 'aut/account-exists-with-different-credential') {
            alert('Es el mismo usuario')
        }
    })
}

document.getElementById("google").addEventListener('click', loginGoogle, false);

const posts = () => {
    let establecimiento = document.getElementById("fname").value;
    let ubicacion = document.getElementById("lname").value;
    let comentario = document.getElementById("subject").value;

    let datos = {
        userID: firebase.auth().currentUser.uid,
        establecimiento: establecimiento,
        ubicacion: ubicacion,
        comentario: comentario,
        likes: 0
    }
    write("post", datos, "")
}

//Fun para escribir en la base de datos
const write = (collection, json, id) => {
    db.collection(collection).doc(id).set(json)
        .then(function (docRef) {
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
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
    let name = document.getElementById("fnombre").value;
    let email = document.getElementById("fcorreo").value;
    let password = document.getElementById("fpassword").value;
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((result) => {
            const user = result.user;
            saveUser(user.uid, name, user.email);
        })
        .catch((error) => {
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
    let llenado = {
        name: name,
        email: email,
        password: password
    };
    console.log(llenado);
    write("users", llenado, "")

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
        console.log("hola")
    }).catch((error) => {
    });
}

window.guanataco = {
    loginFacebook
};