import { useEffect, useState } from "react";
import { Mark } from "../types/Marks";
import { nanoid } from "nanoid";
import { addMark } from "../firebase/db/addMarker";
import { deleteMarkFromFirebase } from "../firebase/db/deleteMarkFromFirebase";
import { updateLocation } from "../firebase/db/updateLocation";
import { MapMouseEvent } from "@vis.gl/react-google-maps";
import { getMarks } from "../firebase/db/getMarks";


export function useMarker() {
    const [dataMarkers, setDataMarkers] = useState<Mark[]>([]);
    const addMarkers = (e: MapMouseEvent) => {
        if (!e.detail.latLng) return

        const data: Mark = {
            location: { lat: e.detail.latLng.lat, lng: e.detail.latLng.lng },
            id: nanoid(),
            timestamp: new Date(),
        };
        setDataMarkers(prevDataMarkers => [...prevDataMarkers, data]);
        addMark(data);
    };

    const deleteMarker = (id: string) => {

        setDataMarkers(prevDataMarkers => prevDataMarkers.filter(el => el.id !== id));
        deleteMarkFromFirebase(id);
    };
    const deleteAllMarker = () => {
        dataMarkers.forEach((el => {
            deleteMarkFromFirebase(el.id);
            
        }))
        setDataMarkers([])

    };
    const handlerLocation = (e: any, id: string): void => {
        const location = {
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
        };
        updateLocation(id, location);
    };

    useEffect(() => {
        const getAllMarkers = async () => {
            try {
                const data = await getMarks();
                if (data) {
                    setDataMarkers(data);
                }
            } catch (error) {
                console.error('Error fetching marks:', error);
            }
        };
        getAllMarkers();
    }, [setDataMarkers]);

    return { dataMarkers, setDataMarkers, addMarkers, deleteMarker, deleteAllMarker, handlerLocation }
}