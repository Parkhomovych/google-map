import { doc, setDoc } from "firebase/firestore";
import { db } from "../config";
import { Mark } from "../../types/Marks";


export const addMark = async (mark: Mark) => {
    try {
        await setDoc(doc(db, "marks", mark.id), {
            location: { lat: mark.location.lat, lng: mark.location.lng },
            timestamp: mark.timestamp,
        })

    } catch (e) {
        console.error("Error adding document: ", e);
    }
};
