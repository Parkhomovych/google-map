import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../config";

export const deleteMarkFromFirebase = async (id: string) => {
    try {
        await deleteDoc(doc(db, "marks", id));
    } catch (error) {
        console.error(error);

    }
}