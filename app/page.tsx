import dynamic from "next/dynamic";
import { SessionProvider } from "next-auth/react";

import URLUpdater from "@/components/URLUpdater";
import SearchBar from "@/components/SearchBar";
import DrawerBox from "@/components/DrawerBox";
import MapLoading from "@/components/MapComponents/MapLoading";

export default async function Home() {
  const MapContainer = dynamic(() => import("@/components/MapContainer"), {
    loading: () => <MapLoading />,
    ssr: false,
  });

  return (
    <SessionProvider>
      <URLUpdater />
      <SearchBar />
      <DrawerBox />
      <div className="absolute top-0 left-0">
        <MapContainer />
      </div>
    </SessionProvider>
  );
}
