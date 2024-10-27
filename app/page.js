import SearchBar from "@/app/_component/SearchBar";
import dynamic from "next/dynamic";
import SideBox from "@/app/_component/SideBox";
import { Providers } from "@/app/providers";

export default function Home() {
  const MapContainer = dynamic(() => import("@/app/_component/Map"), {
    loading: () => <p>Loading...</p>,
    ssr: false,
  });
  return (
    <Providers>
      <SearchBar className="flex-1 z-10"></SearchBar>
      <SideBox />

      <div className="absolute top-0 left-0 w-full h-full">
        <MapContainer></MapContainer>
      </div>
    </Providers>
  );
}
