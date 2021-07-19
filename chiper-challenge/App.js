import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
} from "react-native";
import axios from "axios";
import Post from "./components/Post";

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  function fetchingRefresh() {
    setRefresh(true);
    axios
      .get("https://api.reddit.com/r/pics/hot.json")
      .then((e) => {
        setData(e.data.data.children);
      })
      .then((e) => setRefresh(false));
  }

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://api.reddit.com/r/pics/hot.json")
      .then((e) => {
        setData(e.data.data.children);
      })
      .then((e) => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator color="#232323" size="large"></ActivityIndicator>
      </View>
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
        <Text style={styles.title}>Chipeddit App</Text>
        {data.length > 0 &&
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
    textAlign: 'center'
  }
  ,
  loader: {
    flex: 1,
    backgroundColor: "#f1f1f1",
    justifyContent: "center",
    alignContent: "center",
  },
});
