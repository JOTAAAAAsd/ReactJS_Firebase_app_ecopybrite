

import { appConfigFirebase } from "../FIREBASE/appConfigFirebase";

import {
    getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged,
    signOut, updateProfile
} from "firebase/auth";

export const db_appConfig = (appConfigFirebase);


const GET_AUTH = getAuth();


export const FIREBASE_userIsLogged = (setUserLoggedData) => {
    return onAuthStateChanged(GET_AUTH, (user_data) => {
        if (user_data) {
            setUserLoggedData({
                isLoading: false,
                data: user_data
            });
        } else {
            setUserLoggedData({
                isLoading: false,
                data: {}
            })
        }
    });
}


export const FIREBASE_userLogout = () => {

    signOut(GET_AUTH).then(() => {
        localStorage.removeItem("ACCESS_TOKEN");
        window.location.replace("/");
    }).catch((error) => {

    })

}


export const FIREBASE_register = (email, password) => {

    createUserWithEmailAndPassword(GET_AUTH, email, password)
        .then((user_credential) => {

            const { user } = user_credential;

            localStorage.setItem("ACCESS_TOKEN", user.accessToken);
            window.location.replace("/admin");

        }).catch((error) => {
            console.log(error);
        });
}


export const FIREBASE_login = (email, password) => {

    signInWithEmailAndPassword(GET_AUTH, email, password)
        .then((user_credential) => {

            const { user } = user_credential;

            localStorage.setItem("ACCESS_TOKEN", user.accessToken);
            window.location.replace("/admin");

        }).catch((error) => {
            console.log(error);
        });
}


export const FIREBASE_updateUser = (email, password) => {

    console.log(GET_AUTH);

}


// import { getAuth, updateProfile } from "firebase/auth";
// const auth = getAuth();
// updateProfile(auth.currentUser, {
//   displayName: "Jane Q. User", photoURL: "https://example.com/jane-q-user/profile.jpg"
// }).then(() => {
//   // Profile updated!
//   // ...
// }).catch((error) => {
//   // An error occurred
//   // ...
// });


