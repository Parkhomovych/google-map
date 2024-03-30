import { useState } from "react";
import { Mark } from "../types/Marks";
import { nanoid } from "nanoid";
import { addMark } from "../firebase/db/addMarker";
import { deleteMarkFromFirebase } from "../firebase/db/deleteMarkFromFirebase";
import { updateLocation } from "../firebase/db/updateLocation";

export default function useMarker() {
    const [dataMarkers, setDataMarkers] = useState<Mark[]>([]);

    const addMarkers = (e: any) => {
        const data: Mark = {
            location: { lat: e.detail.latLng.lat, lng: e.detail.latLng.lng },
            id: nanoid(),
            timestamp: new Date(),
        };
        setDataMarkers([...dataMarkers, data]);
        addMark(data);
    };
    const deleteMarker = (id: string) => {
        const data = dataMarkers.filter((el) => el.id !== id);
        setDataMarkers(data);
        deleteMarkFromFirebase(id);
    };

    const handlerLocation = (e: any, id: string) => {
        const location = {
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
        };
        updateLocation(id, location);
    };


    return { dataMarkers, setDataMarkers, addMarkers, deleteMarker, handlerLocation }
}