import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  RefreshControl,
  SafeAreaView
} from "react-native";
import axios from "axios";
import Post from "./components/Post";
import Navbar from './components/Navbar';
import Loader from './components/Loader';

const URLS=[
  "https://api.reddit.com/r/pics/hot.json",
  "https://api.reddit.com/r/pics/top.json",
  "https://api.reddit.com/r/pics/new.json",
  "https://api.reddit.com/r/pics/controversial.json"
]

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [buttonSelected, setButtonSelected] = useState(1);
  const [enabled, setEnabled] = useState(false);

  function fetchingRefresh() {
    setRefresh(true);
    axios
      .get(URLS[buttonSelected - 1])
      .then((e) => {
        setData(e.data.data.children);
      })
      .then((e) => setRefresh(false));
  }

  useEffect(() => {
    setLoading(true);
    axios
      .get(URLS[buttonSelected - 1])
      .then((e) => {
        setData(e.data.data.children);
      })
      .then((e) => setLoading(false))
      .then((e) => {if(!enabled) setEnabled(true)})
  }, [buttonSelected]);

  if (loading && !enabled) {
    return (
      <Loader></Loader>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        xmlnsAndroid="http://schemas.android.com/apk/res/android"
        androidLayout_width="match_parent"
        androidLayout_height="match_parent"
        androidFillViewport="true"
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={fetchingRefresh} />
        }
      >
        <Text style={styles.title}>Chipeddit <Text style={{color:'#232323'}}>App</Text></Text>
        <Navbar buttonSelected={buttonSelected} setButtonSelected={setButtonSelected}></Navbar>
        {(loading && <Loader></Loader>) || data.length > 0 &&
          data.map((e, i) => {
            return (
              <Post
                key={i}
                uri={`${e.data.preview.images[0]?.source.url}`.replace(
                  "amp;s",
                  "s"
                )}
                title={`${e.data.title}`}
                permalink={`${e.data.permalink}`}
                author={`${e.data.author}`}
                num_comments={`${e.data.num_comments}`}
                created_utc={`${e.data.created_utc}`}
                score={`${e.data.score}`}
              ></Post>
            );
          })}
        <StatusBar style="auto" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f1f1",
    paddingTop: '10%'
  },
  title:{
    color: '#232323',
    fontSize: 25,
    textAlign: 'center',
    letterSpacing: 7,
    fontSize: 30,
    color: '#f50024',
    fontWeight:'bold'
  }
});
