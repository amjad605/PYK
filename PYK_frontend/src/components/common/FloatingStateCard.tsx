import CountUp from "react-countup";
function FloatingStateCard() {
  return (
    <div className="absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20">
      <div className="flex items-center space-x-4">
        <div className="text-center ">
          <div className="text-2xl font-bold text-blue-600 flex flex-row items-center">
            <CountUp start={0} end={500} duration={2.5} /> <p>+</p>
          </div>

          <div className="text-xs text-gray-600">Properties</div>
        </div>
        <div className="w-px h-8 bg-gray-300"></div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">98%</div>
          <div className="text-xs text-gray-600">Satisfied</div>
        </div>
      </div>
    </div>
  );
}

export default FloatingStateCard;
