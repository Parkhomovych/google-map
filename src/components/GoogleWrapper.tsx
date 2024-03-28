import { Status, Wrapper } from "@googlemaps/react-wrapper";
import GoogleMaps from "./GoogleMaps";
import { ColorRing } from "react-loader-spinner";


function GoogleWrapper() {
  const render = (status: Status) => {
    switch (status) {
      case "LOADING":
        return (
          <ColorRing
            visible={true}
            height="200"
            width="200"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={["#4285f4", "#34a853", "#fbbc05", "#ea4335", "#4285f4"]}
          />
        );
      case "FAILURE":
        return <p>Error</p>;

      case "SUCCESS":
        return <p>SUCCESS</p>;
      default:
        return <p>Error</p>;
    }
  };

  return (
    <div>
      <Wrapper
        apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
        render={render}
      >
        <GoogleMaps />
      </Wrapper>
    </div>
  );
}

export default GoogleWrapper;
