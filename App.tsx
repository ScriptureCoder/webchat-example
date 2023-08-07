import React, {useState,useEffect} from 'react';
import WebView from "react-native-webview";
import {Text, TouchableOpacity, View, SafeAreaView, Image} from "react-native";

export type AppProps = {}

const App: React.FC<AppProps> = () => {
    const [open,setOpen] = useState(false);

    return (
        <View style={{flex:1}}>
            {open&&(
                <SafeAreaView style={{flex:1}}>
                    <TouchableOpacity onPress={()=>{setOpen(false)}}>
                        <View style={{paddingHorizontal:25, paddingVertical:5}}>
                            <Text style={{fontSize:15, color:"red"}}>Close</Text>
                        </View>
                    </TouchableOpacity>
                    <WebView
                        source={{ uri: "https://webchat.ebanqo.io/demobank/?fullname=Toyosi%20Oyesola&email=toyosio@ebanqo.com&form_id=email&source=appchat&os=ios"}}
                        startInLoadingState
                    />
                </SafeAreaView>
            )}

            <View
                style={{
                    position:"absolute",
                    right:20,
                    bottom:60,
                    display:open?"none":"flex"
                }}
            >
                <TouchableOpacity onPress={()=>{setOpen(true)}}>
                    <Image source={require("./src/logo.png")}/>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default App;
