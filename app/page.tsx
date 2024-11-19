import dynamic from "next/dynamic";

import Updater from "@/components/Updater";
import SearchBar from "@/components/SearchBar";
import SideBox from "@/components/SideBox";
import MapLoading from "@/components/MapLoading";
import LoginButton from "@/components/LoginButton";
import { SessionProvider } from "next-auth/react";

export default function Home() {
  const MapContainer = dynamic(() => import("@/components/MapContainer"), {
    loading: () => <MapLoading />,
    ssr: false,
  });

  return (
    <SessionProvider>
      <Updater />
      <SearchBar />
      <SideBox />
      <div className="absolute top-0 left-0">
        <MapContainer />
        <LoginButton />
      </div>
    </SessionProvider>
  );
}
