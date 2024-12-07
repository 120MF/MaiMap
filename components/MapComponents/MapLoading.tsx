import Image from "next/image";
function MapLoading() {
  return (
    <div className="h-screen w-screen flex items-center backdrop-blur">
      <Image
        alt="loading"
        className="animate-bounce"
        height={500}
        quality={60}
        src="/loading-1.png"
        width={230}
      />
      <h2 className="text-xl antialiased font-bold text-stone-600 animate-pulse">
        加载地图中......
      </h2>
    </div>
  );
}
export default MapLoading;
