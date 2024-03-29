import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../config";

export const deliteMark = async (id: string) => {
    await deleteDoc(doc(db, "marks", id));
}