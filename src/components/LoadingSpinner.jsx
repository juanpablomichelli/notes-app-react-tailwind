export default function LoadingSpinner() {
  return (
    <>
      <div className="w-full flex flex-col items-center gap-2 justify-center">
        <div className="spinner animate-spin border-8 border-orange-200 border-t-orange-400 w-[40px] h-[40px]"></div>
        <p className="text-orange-400">Loading notes...</p>
      </div>
    </>
  );
}
