import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Linking,
  Alert,
} from "react-native";
import { icons } from "../../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from "./footer.style";

const Footer = ({ url }) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikePress = async () => {
    try {
      const likedJobs = await AsyncStorage.getItem("likedJobs");
      const likedJobsArray = likedJobs ? JSON.parse(likedJobs) : [];

      if (isLiked) {
        const index = likedJobsArray.indexOf(url);
        if (index > -1) {
          likedJobsArray.splice(index, 1);
        }
        Alert.alert("Job removed from saved jobs.");
      } else {
        likedJobsArray.push(url);
        Alert.alert("Job saved.");
      }

      await AsyncStorage.setItem("likedJobs", JSON.stringify(likedJobsArray));
      setIsLiked(!isLiked);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const checkIfLiked = async () => {
      const likedJobs = await AsyncStorage.getItem("likedJobs");
      const likedJobsArray = likedJobs ? JSON.parse(likedJobs) : [];
      setIsLiked(likedJobsArray.includes(url));
    };

    checkIfLiked();
  }, []);
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.likeBtn} onPress={handleLikePress}>
        <Image
          source={isLiked ? icons.heart : icons.heartOutline}
          resizeMode="contain"
          style={styles.likeBtnImage}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.applyBtn}
        onPress={() => Linking.openURL(url)}
      >
        <Text style={styles.applyBtnText}>Apply for jobs</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
