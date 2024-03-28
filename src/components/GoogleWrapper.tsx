import { Status, Wrapper } from "@googlemaps/react-wrapper";
import GoogleMaps from "./GoogleMaps";
import { ColorRing } from "react-loader-spinner";
import toast, { Toaster } from "react-hot-toast";

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
        toast.error("something went wrong");
        return <p>Error</p>;

      case "SUCCESS":
        toast.success("Successfully ");
        return <p>SUCCESS</p>;
      default:
        toast.error("something went wrong");
        return <p>Error</p>;
    }
  };

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
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
