import dynamic from "next/dynamic";

import Updater from "@/components/Updater";
import SearchBar from "@/components/SearchBar";
import SideBox from "@/components/SideBox";

export default function Home() {
  const MapContainer = dynamic(() => import("@/components/MapContainer"), {
    loading: () => <p>Loading...</p>,
    ssr: false,
  });

  return (
    <>
      <Updater />
      <SearchBar />
      <SideBox />
      <div className="absolute top-0 left-0">
        <MapContainer />
      </div>
    </>
  );
}
