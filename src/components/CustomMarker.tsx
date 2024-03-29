import { AdvancedMarker, InfoWindow, Pin } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import { Location } from "../types/Marks";
type Props = {
  id: string;
  location: Location;
  remove: (id: string) => void;
  hendlreLocation: (e: any, id: string) => void;
  protectClick: () => void;
};
export default function CustomMarker({
  id,
  location,
  remove,
  hendlreLocation,
  protectClick,
}: Props) {
  const [open, setOpen] = useState(false);

  const hendleOpen = () => {
    setOpen((open) => !open);
  };

  return (
    <>
      <AdvancedMarker
        position={location}
        onClick={hendleOpen}
        onDragStart={() => protectClick()}
        onDragEnd={(e) => {
          hendlreLocation(e, id);
        }}
        draggable={true}
        key={id}
      >
        <Pin
          background={"blue"}
          borderColor={"blue"}
          glyphColor={"yellow"}
        ></Pin>
      </AdvancedMarker>
      {open && (
        <InfoWindow position={location} onCloseClick={hendleOpen}>
          <ul
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              marginBottom: "4px",
            }}
          >
            <li>
              <span>Lat: {location.lat}</span>
            </li>
            <li>
              <span>Long: {location.lng}</span>
            </li>
          </ul>
          <button
            style={{ margin: "auto" }}
            onClick={() => {
              remove(id);
            }}
          >
            Delete
          </button>
        </InfoWindow>
      )}
    </>
  );
}
