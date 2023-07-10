
const Loading = () => {
    return (
        <div className="flex justify-center items-center h-16">
          <div className="w-3 h-3 bg-black rounded-full m-1 animate-loading-dot"></div>
          <div className="w-3 h-3 bg-black rounded-full m-1 animate-loading-dot animation-delay-200"></div>
          <div className="w-3 h-3 bg-black rounded-full m-1 animate-loading-dot animation-delay-400"></div>
        </div>
      );
    };


export default Loading;