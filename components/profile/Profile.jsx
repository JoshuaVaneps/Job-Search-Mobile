import { useRouter } from "expo-router";
import useFetch from "../../hook/useFetch";
import React from "react";
import {
  Image,
  TouchableOpacity,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import { COLORS, images } from "../../constants";
import styles from "./profile.styles";
import SavedJobCard from "../common/cards/saved/savedJobCard";

const Profile = () => {
  const router = useRouter();
  const { data, isLoading, error } = useFetch("search", {
    query: "React developer",
    num_pages: "1",
  });
  return (
    <View>
      <View style={styles.profileContainer}>
        <TouchableOpacity style={styles.profileBtn}>
          <Image
            source={images.profile}
            resizeMode="cover"
            style={styles.profileBtnImage}
          />
        </TouchableOpacity>
        <Text style={styles.imageMessage}>Saved Jobs: 15</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoMessage}>First Name: Joshua</Text>
        <Text style={styles.infoMessage}>Last Name: Vaneps</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Saved Jobs:</Text>

          <Text style={styles.headerBtn}>Remove Job</Text>
        </View>
        <View style={styles.cardsContainer}>
          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : (
            data?.map((job) => (
              <SavedJobCard
                job={job}
                key={`nearby-job-${job?.job_id}`}
                handleNavigate={() =>
                  router.push(`/job-details/${job?.job_id}`)
                }
              />
            ))
          )}
        </View>
      </View>
    </View>
  );
};

export default Profile;
