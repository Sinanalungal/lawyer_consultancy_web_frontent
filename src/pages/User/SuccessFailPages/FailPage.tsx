import { Link, useNavigate } from "react-router-dom";

const FailPage = () => {
    const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <img src="/payment-reject.png" alt="" className="h-[200px] object-cover" />
      <h1 className="text-3xl font-bold max-[400px]:text-xl text-red-800">Payment Failed!</h1>
      <p className="mt-4 text-sm  max-[400px]:text-xs text-red-700">
        Unfortunately, your operation could not be completed.
      </p>
      <div
        // onClick={()=>navigate(-3)}
        onClick={()=>{navigate('../../../../../../user')}}
        className="mt-6 px-4 py-2 bg-slate-800 text-white rounded text-xs hover:bg-slate-900"
      >
        Go Back to Home
      </div>
    </div>
  );
};

export default FailPage;
