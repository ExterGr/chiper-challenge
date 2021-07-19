import React, { useCallback } from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";
import timeSince from '../js/timeSince';

const Post = ({ uri, title, permalink, author, num_comments, created_utc }) => {

  if(author.length > 15) author = author.slice(0, 15) + '...';

  let auxDate = new Date(Date.now() - (Date.now() - (created_utc * 1000))); 

  const handlePress = useCallback(async () => {
    const link = "http://www.reddit.com" + permalink;
    const supported = await Linking.canOpenURL(link);

    if (supported) {
      await Linking.openURL(link);
    } else {
      Alert.alert(`Don't know how to open this URL: ${link}`);
    }
  }, [permalink]);

  return (
    <View>
      <TouchableOpacity style={styles.card} onPress={handlePress}>
        <Image
          source={{ uri: uri }}
          style={{ width: 125, height: 125, borderRadius: 6 }}
        ></Image>
        <View style={styles.cardContent}>
          <Text style={styles.text}>{title}</Text>
          <Text>{timeSince(auxDate)} ago</Text>
          <View style={styles.detailsContainer}>
            <Text style={styles.detailsText}>{author}   </Text>
            <Text style={styles.detailsText}>{num_comments} comments</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: "row",
    borderRadius: 6,
    elevation: 3,
    backgroundColor: "#fff",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#fff",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 6,
  },
  text: {
    marginHorizontal: 3,
    marginRight: 6,
    marginVertical: 10,
  },
  cardContent: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  detailsContainer:{
    flexDirection: 'row',
    marginLeft: 3
  },
  detailsText: {
    color: '#6a6a6a',
  }

});

export default Post;
