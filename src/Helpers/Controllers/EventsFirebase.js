import { collection, addDoc, getFirestore, getDocs, doc, deleteDoc, setDoc} from "firebase/firestore";
import { appConfigFirebase } from "../FIREBASE/appConfigFirebase";


const GET_DB = getFirestore(appConfigFirebase);

export const FIREBASE_createEvent = async (values = {}) => {

    try {
        const docRef = await addDoc(collection(
            GET_DB,
            "events"
        ), {
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

        console.log("Document written with ID: ", docRef.id);

    } catch (error) {
        console.log(error.message)
    }
}


export const FIREBASE_getEvents = async (useArrData, setArrData) => {

    const querySnapshot = await getDocs(collection(GET_DB, "events"));

    const arr_docs = [];
    let new_obj = {};

    // console.log(querySnapshot);
    querySnapshot.forEach((doc) => {
        new_obj = {
            id: doc.id,
            ...doc.data()
        };
        arr_docs.push(new_obj);

        setArrData({
            ...useArrData,
            isLoading: false
        });

    });
    setArrData({
        isLoading: false,
        data: arr_docs
    });


}


export const FIREBASE_editEvent= async(values={})=>{

    await setDoc(doc(GET_DB, "events", values.id), {
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



export const FIREBASE_deleteEvent = async (id_event) => {
    return deleteDoc(doc(GET_DB, "events", id_event));
}