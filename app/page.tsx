import Updater from "@/components/Updater";
import dynamic from "next/dynamic";
export default function Home() {
  const MapContainer = dynamic(() => import("@/components/MapContainer"), {
    loading: () => <p>Loading...</p>,
    ssr: false,
  });
  return (
    <>
      <Updater />
      <div className="absolute top-0 left-0 w-full h-full">
        <MapContainer />
      </div>
    </>
  );
}
