import { doc, updateDoc } from 'firebase/firestore';

import { db } from "../config";
import { Location } from '../../types/Marks';

export const updateLocation = async (id: string, location: Location) => {
    try {
        const cityRef = doc(db, 'marks', id);
        await updateDoc(cityRef, {
            location: {
                lat: location.lat, lng: location.lng
            }
        });
    } catch (error) {
        console.error(error);

    }
}