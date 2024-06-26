import { collection, getDocs } from "firebase/firestore";
import { db } from "../config";
import { Mark } from "../../types/Marks";


export const getMarks = async () => {
    try {
        const marks: Mark[] = []

        const querySnapshot = await getDocs(collection(db, "marks"));
        querySnapshot.forEach((doc) => {
            const data = doc.data()

            const mark: Mark = {
                id: doc.id,
                timestamp: data.timestamp,
                location: {
                    lat: data.location.lat,
                    lng: data.location.lng,
                },
            };
            marks.push(mark);
        });
        return marks
    } catch (error) {
        console.error(error);

    }

    // localStorage.setItem('marks', JSON.stringify(marks))
}