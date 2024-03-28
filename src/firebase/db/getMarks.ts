import { collection, getDocs } from "firebase/firestore";
import { db } from "../config";

type Mark = {
    id: string
    next: string
    timestamp: Date
    location: {
        lat: string
        long: string
    }
}
export const getMarks = async () => {
    const querySnapshot = await getDocs(collection(db, "marks"));
    const marks: Mark[] = []
    querySnapshot.forEach((doc) => {
        const data = doc.data()

        const mark: Mark = {
            id: doc.id,
            next: data.next,
            timestamp: data.timestamp,
            location: {
                lat: data.location.lat,
                long: data.location.long,
            },
        };
        marks.push(mark);
    });

    localStorage.setItem('marks', JSON.stringify(marks))
}