import  { useEffect, useState } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState, useAppSelector } from "../../../redux/store";
import { useToast } from "../../../components/Toast/ToastManager";

const OneToOneVideoCall = () => {
  const [hasJoinedRoom, setHasJoinedRoom] = useState(false);
  const { isAuthenticated, role, value } = useSelector(
    (state: any) => state.login
  );
  const { registered } = useSelector((state: any) => state.register);
  const { userDetail } = useAppSelector((state: RootState) => state.userData);
  const {addToast} = useToast()
  const navigate = useNavigate();
  const { uuid } = useParams();

  const startCall = () => {
    if (!import.meta.env.VITE_SERVER_SECRET_FOR_ZEGO_CLOUD || !import.meta.env.VITE_APP_ID) {
      addToast('danger','something wrong with the credentials')
    }else{
      const appID = Number(import.meta.env.VITE_APP_ID);
      const serverSecret = import.meta.env.VITE_SERVER_SECRET_FOR_ZEGO_CLOUD;
      const roomID = `${uuid}`;
      const userID = `user_${value}`;
      const userName = `${userDetail.full_name}`;

      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomID,
        userID,
        userName
      );

      const zp = ZegoUIKitPrebuilt.create(kitToken);

      zp.joinRoom({
        container: document.getElementById("video-container"),
        sharedLinks: [],
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall,
        },
        showLeavingView: false,
        showPreJoinView: false,

        onLeaveRoom: () => {
          navigate(`../../../../../${role}/appointments`);
        },
      });
    }
    
  };

  useEffect(() => {
    if (registered) {
      navigate("../../../../register");
    }
    const authTokens = localStorage.getItem("authTokens");
    if (!isAuthenticated && !authTokens) {
      navigate(-5);
    }
    if (!hasJoinedRoom) {
      startCall();
      setHasJoinedRoom(true);
    }
  }, [isAuthenticated, registered, userDetail, hasJoinedRoom, navigate]);

  return (
    <div>
      <div
        id="video-container"
        style={{ width: "100%", height: "100vh" }}
      ></div>{" "}
    </div>
  );
};

export default OneToOneVideoCall;
