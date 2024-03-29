import { doc, updateDoc } from 'firebase/firestore';

import { db } from "../config";
import { Location } from '../../types/Marks';

export const updateLocation = async (id: string, location: Location) => {
    const cityRef = doc(db, 'marks', id);
    await updateDoc(cityRef, {
        location: {
            lat: location.lat, long: location.lng
        }
    });
}