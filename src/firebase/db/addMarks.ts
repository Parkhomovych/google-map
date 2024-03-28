import { addDoc, collection } from "firebase/firestore";
import { db } from "../config";

export const addMarks = async () => {
    try {
        const docRef = await addDoc(collection(db, "marks"), {
            location: { lat: "", long: "" },
            timestamp: new Date().toUTCString(),
            next: "?",
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
};