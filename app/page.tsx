import dynamic from "next/dynamic";

import Updater from "@/components/Updater";
import SearchBar from "@/components/SearchBar";
import SideBox from "@/components/SideBox";
import MapLoading from "@/components/MapLoading";

export default async function Home() {
  const MapContainer = dynamic(() => import("@/components/MapContainer"), {
    loading: () => <MapLoading />,
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
