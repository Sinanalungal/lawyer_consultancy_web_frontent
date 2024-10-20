import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";

const SuccessPage: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const end = Date.now() + 3 * 1000;
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

    const frame = () => {
      if (Date.now() > end) return;

      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      });

      requestAnimationFrame(frame);
    };

    frame();
  }, []);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <img src="/success-image.png" alt="" className="h-[200px] object-cover" />
      <h1 className="text-3xl font-bold max-[400px]:text-xl text-green-800">
        Payment Success!
      </h1>
      <p className="mt-4 text-sm  max-[400px]:text-xs text-green-700">
        Your operation was completed successfully.
      </p>
      <div
        onClick={() => {
          navigate("../../../../../../user");
        }}
        className="mt-6 px-4 py-2 bg-slate-800 text-white rounded text-xs hover:bg-slate-900"
      >
        Go Back to Home
      </div>
    </div>
  );
};

export default SuccessPage;
