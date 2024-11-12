import dynamic from "next/dynamic";

import Updater from "@/components/Updater";

export default function Home() {
  const MapContainer = dynamic(() => import("@/components/MapContainer"), {
    loading: () => <p>Loading...</p>,
    ssr: false,
  });

  return (
    <>
      <Updater />
      <div className="absolute top-0 left-0">
        <MapContainer />
      </div>
    </>
  );
}
