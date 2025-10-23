export default function Skeleton({ height }: { height?: string }) {
  return (
    <div
      className="animate-pulse bg-gray-200 rounded-lg w-full"
      style={{ height: height || "100px" }}
    ></div>
  );
}
