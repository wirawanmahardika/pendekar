import { loadingDotsColors } from "../utils/themeSetting";

const LoadingDots = () => {
  return (
    <div className="flex w-full justify-center h-full">
      <span className="loading loading-dots w-16" style={loadingDotsColors}></span>
    </div>
  );
};

export default LoadingDots;
