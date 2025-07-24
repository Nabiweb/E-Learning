import React from 'react'
import { useParams } from 'react-router-dom'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'

function randomID(len) {
  let result = '';
  if (result) return result;
  var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

const Call = () => {

  const { roomId } = useParams();
  
  const myMeeting = async (element) => {
    const r1 = randomID(5);
    const r2 = randomID(5);
    const appID = Number(import.meta.env.VITE_ZEGO_APP_ID); // Access from .env
    const serverSecret = import.meta.env.VITE_ZEGO_SERVER_SECRET;  // Access from .env
    console.log("appID : ",appID);
    console.log("serverSecret : ",serverSecret);
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomId, r1, r2);
    const zc = ZegoUIKitPrebuilt.create(kitToken);
    console.log('Zego Object:', zc);
    zc.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
      showScreenSharingButton: true,
      showCameraButton: true,
      showMyMicrophoneToggleButton: true,
      showParticipantsVideo: true,
      showChatButton: true,
      showLeaveButton: true,
    });
  }
  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-4">
        <div className="text-2xl font-semibold text-[#10b461] mb-4">
            Video Doubt Session
        </div>

        <div
            ref={myMeeting}
            className="w-full max-w-4xl h-[80vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh] bg-white rounded-lg shadow-lg"
        />

        <div className="text-red-600 text-sm mt-6 text-center">
            Note: If you do not see the video call panel, please refresh the page.
        </div>
    </div>
  )
}

export default Call
