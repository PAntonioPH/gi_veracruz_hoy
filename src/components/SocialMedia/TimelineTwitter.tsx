import {Timeline} from "react-twitter-widgets";

export const TimelineTwitter = () => {
  return (<>
    <Timeline
      dataSource={{
        sourceType: 'profile',
        screenName: 'VeracruzHoy_Mx',
      }}
      options={{
        username: 'VeracruzHoy_Mx',
        height: '500',
        width: "100%",
      }}
    />
  </>)
}