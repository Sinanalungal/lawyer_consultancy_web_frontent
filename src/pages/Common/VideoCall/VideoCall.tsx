import React, { useEffect, useState } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState, useAppSelector } from '../../../redux/store';

const OneToOneVideoCall = () => {
  const [hasJoinedRoom, setHasJoinedRoom] = useState(false);
  const { isAuthenticated,role,value } = useSelector((state: any) => state.login);
  const { registered } = useSelector((state: any) => state.register);
  const { userDetail } = useAppSelector((state: RootState) => state.userData);

  const navigate = useNavigate()
  const { uuid } = useParams();

  const startCall = () => {
    const appID = 1885863562;  // Zego app ID from your Zego Cloud account
    const serverSecret = "1b64fc31dbcaf6ca1bfea884c5af3923";  // Zego server secret
    const roomID = `${uuid}`;  // Define a unique room ID for each call
    // const userID = 'user_' + new Date().getTime();  // Generate a unique user ID
    const userID = `user_${value}`;
    const userName = `${userDetail.full_name}`;  // Set a user name for display

    // Generate the authentication token (for testing purposes)
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, userID, userName);

    const zp = ZegoUIKitPrebuilt.create(kitToken);

    // One-to-one call scenario setup
    zp.joinRoom({
      container: document.getElementById('video-container'),  // The container where the call UI will be displayed
      sharedLinks: [],  // Leave empty as no need for joining links in one-to-one calls
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,  // One-to-One Call Mode
      },
      showLeavingView: false,  // Skip the leave page
      showPreJoinView: false,  // Skip the pre-join settings page
      
      
      onLeaveRoom:()=>{
        navigate(`../../../../../${role}/appointments`)
      }
    });
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
    
  }, [isAuthenticated, registered, userDetail,  hasJoinedRoom, navigate]);

  // // Call startCall when the component is mounted
  // useEffect(() => {
    
    
  // }, []);

  return (
    <div>
      <div id="video-container" style={{ width: '100%', height: '100vh' }}></div> {/* Set to full height for the best experience */}
    </div>
  );
};

export default OneToOneVideoCall;





// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { RootState, useAppSelector } from "../../../redux/store";
// import { useNavigate, useParams } from "react-router-dom";

// declare const ZegoUIKitPrebuilt: any; 

// const VideoCall: React.FC = () => {
//   const { registered } = useSelector((state: any) => state.register);
//   const { userDetail } = useAppSelector((state: RootState) => state.userData);
//   const { isAuthenticated } = useSelector((state: any) => state.login);
//   const [room_id, setRoomId] = useState<string | null>(null);
//   const [hasJoinedRoom, setHasJoinedRoom] = useState(false);
//   const navigate = useNavigate();
//   // const { state } = useLocation();
//   // const { uuid } = state;
//   const { uuid } = useParams();

//   console.log(uuid,'this is the id');
  

//   useEffect(() => {
//     if (!uuid) {
//       navigate(-1);
//     } else {
//       setRoomId(uuid);
//     }
//   }, [uuid, navigate]);

//   const getConnnect = () => {
//     function getUrlParams(url: string): { [key: string]: string } {
//       const urlStr = url.split("?")[1];
//       const urlSearchParams = new URLSearchParams(urlStr);
//       return Object.fromEntries(urlSearchParams.entries());
//     }

//     const roomID =
//       getUrlParams(window.location.href)["roomID"] ||
//       Math.floor(Math.random() * 10000).toString();
//       const userID = Math.floor(Math.random() * 10000).toString();
//       const userName = `${room_id}`;

//     const appID = 1885863562;
//     const serverSecret = "1b64fc31dbcaf6ca1bfea884c5af3923";

//     const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
//       appID,
//       serverSecret,
//       roomID,
//       userID,
//       userName
//     );

//     const zp = ZegoUIKitPrebuilt.create(kitToken);

//     zp.joinRoom({
//       container: document.querySelector("#videoDiv"),
//       sharedLinks: [
//         {
//           name: "Personal link",
//           url: `${window.location.protocol}//${window.location.host}${window.location.pathname}?roomID=${roomID}`,
//         },
//       ],
//       scenario: {
//         mode: ZegoUIKitPrebuilt.VideoConference,
//       },
//       turnOnMicrophoneWhenJoining: false,
//       turnOnCameraWhenJoining: false,
//       showMyCameraToggleButton: true,
//       showMyMicrophoneToggleButton: true,
//       showAudioVideoSettingsButton: true,
//       showScreenSharingButton: true,
//       showTextChat: true,
//       showUserList: true,
//       maxUsers: 50,
//       layout: "Sidebar",
//       showLayoutButton: true,
//     });
//   };

//   useEffect(() => {
//     if (registered) {
//       navigate("/register");
//     }
//     const authTokens = localStorage.getItem("authTokens");
//     if (!isAuthenticated && !authTokens) {
//       navigate(-5);
//     }
//     if (!hasJoinedRoom && room_id) {
//       getConnnect();
//       setHasJoinedRoom(true); // Set the flag after joining
//     }
    
//   }, [isAuthenticated, registered, userDetail, room_id, hasJoinedRoom, navigate]);

//   useEffect(() => {
//     return () => {
//       if (hasJoinedRoom) {
//         const zp = ZegoUIKitPrebuilt.getInstance(); // Replace with the correct method to get your instance
//         zp.leaveRoom(); // Ensure you leave the room on unmount
//         zp.destroy()
//       }
//     };
//   }, [hasJoinedRoom]);

//   return (
//     <div className="min-h-screen py-10 bg-white flex items-center justify-center" id="videoDiv"></div>
//   );
// };

// export default VideoCall;
