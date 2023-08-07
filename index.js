/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { ios } from "./src/constants/layout";
import notifee, { AndroidStyle, EventType } from "@notifee/react-native";
import messaging from '@react-native-firebase/messaging';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import TrackPlayer from "react-native-track-player"

GoogleSignin.configure();

async function onMessageReceived(message) {
  const { notification, data, messageId } = message;
  console.log({ notification, data, messageId });
  await notifee.displayNotification({
    id:messageId,
    title: notification.title,
    body: notification.body,
    data,
    android:{
      channelId:"default"
    }
  });
}

messaging().onMessage(onMessageReceived);
messaging().setBackgroundMessageHandler(onMessageReceived);

notifee.onBackgroundEvent(async ({ type, detail }) => {
  const { notification, pressAction } = detail;
  // console.log(JSON.stringify(detail));
  if (type === EventType.ACTION_PRESS && pressAction.id === 'reply') {
    // Update external API
    /*await fetch(`https://my-api.com/chat/${notification.data.chatId}/read`, {
      method: 'POST',
    });

    // Remove the notification
    await notifee.cancelNotification(notification.id);*/
    await notifee.displayNotification({
      title: "name",
      body: "notification.body",
      data:{},
      android: {
        channelId: 'alarmers',
      }
    });
    console.log(notification.data);
    console.log('User pressed an action with the id: ', pressAction.id);
    console.log('input', detail.input);

  }
});

AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => require('./src/utils/player'));
