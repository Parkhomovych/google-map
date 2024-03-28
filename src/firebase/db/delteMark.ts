import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../config";

export const deleteMark = async (id: string) => {
    const data = await deleteDoc(doc(db, "marks", id));
    console.log(data);


}