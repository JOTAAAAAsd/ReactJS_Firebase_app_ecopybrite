import { GET_AUTH } from "./UserFirebase";
import { appConfigFirebase } from "../appConfigFirebase";
import { collection, addDoc, getFirestore, getDoc, getDocs, doc, deleteDoc, setDoc } from "firebase/firestore";

const GET_DB = getFirestore(appConfigFirebase);

export const FIREBASE_getEvents = async (TYPE_GET = "", useFirebaseData, setFirebaseData, id_event = "", isPrivate = false) => {

    const querySnapshot = await getDocs(collection(GET_DB, "events"));

    let arr_docs = [];
    let new_obj = {};

    if (TYPE_GET === "ALL") {
        querySnapshot.forEach((doc) => {
            new_obj = {
                id: doc.id,
                user_id: isPrivate ? GET_AUTH.currentUser.uid : "",
                ...doc.data()
            };
            arr_docs.push(new_obj);

            setFirebaseData({
                ...useFirebaseData,
                isLoading: false
            });
        });

        let new_arr = [];

        if (isPrivate) {
            if (new_arr.length === 0) {
                for (let i = 0; i < arr_docs.length; i++) {
                    if (arr_docs[i].user_id === GET_AUTH.currentUser.uid) {
                        new_arr.push(arr_docs[i]);
                    }
                }
            }
        }
        setFirebaseData({
            isLoading: false,
            data: isPrivate ? new_arr : arr_docs
        });

    } else if (TYPE_GET === "BY_ID") {

        const docRef = doc(GET_DB, "events", id_event);

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            new_obj = {
                id: docSnap.id,
                ...docSnap.data()
            };

            setFirebaseData({
                isLoading: false,
                data: new_obj
            });
        } else {
            setFirebaseData({
                isLoading: false,
                data: {}
            });
        }
    }
}

export const FIREBASE_createEvent = async (values) => {

    try {
        await addDoc(collection(
            GET_DB,
            "events"
        ), {
            user_id: GET_AUTH.currentUser.uid,
            title: values.title,
            organizer: values.organizer,
            entity: values.entity,
            type: values.type,
            category: values.category,
            event_starts: values.event_starts,
            event_ends: values.event_ends,
            start_time: values.start_time,
            end_time: values.end_time,
            description: values.description,
            isItsFree: true,
            price: values.price
        });
    } catch (error) {
        alert(error.message)
    }
}

export const FIREBASE_editEvent = async (values = {}) => {

    if (values.user_id === GET_AUTH.currentUser.uid) {
        await setDoc(doc(GET_DB, "events", values.id), {
            user_id: GET_AUTH.currentUser.uid,
            title: values.title,
            organizer: values.organizer,
            entity: values.entity,
            type: values.type,
            category: values.category,
            event_starts: values.event_starts,
            event_ends: values.event_ends,
            start_time: values.start_time,
            end_time: values.end_time,
            description: values.description,
            isItsFree: true,
            price: values.price
        });
    }
}



export const FIREBASE_deleteEvent = async (id_event) => {

    if (id_event.user_id === GET_AUTH.currentUser.uid) {
        return deleteDoc(doc(GET_DB, "events", id_event.id));
    }
}