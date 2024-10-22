import SearchBar from "@/app/_component/SearchBar";
import dynamic from "next/dynamic";

// import Map from "@/app/_component/Map";

export default function Home(Params) {
  const lat = Params?.searchParams.lat;
  const lng = Params?.searchParams.lng;

  const MapContainer = dynamic(() => import("@/app/_component/Map"), {
    loading: () => <p>Loading...</p>,
    ssr: false,
  });
  return (
    <>
      <SearchBar></SearchBar>
      <div className={"w-screen h-screen"}>
        <MapContainer lat={lat} lng={lng}></MapContainer>
      </div>
    </>
  );
}
