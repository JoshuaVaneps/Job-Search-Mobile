import { View, Text, TouchableOpacity, Image } from "react-native";
import { checkImageURL } from "../../../../utils";
import { icons } from "../../../../constants";
import styles from "./savedjobcard.style";

const SavedJobCard = ({ job, handleNavigate }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigate}>
      <TouchableOpacity style={styles.logoContainer}>
        <Image
          source={{
            uri: checkImageURL(job.employer_logo)
              ? job.employer_logo
              : "https://i.imgur.com/2ZlhKfC.png",
          }}
          resizeMode="contain"
          style={styles.logoImage}
        />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.jobName} numberOfLines={1}>
          {job.job_title}
        </Text>
        <Text style={styles.jobType}>{job.job_employment_type}</Text>
      </View>
      <TouchableOpacity style={styles.likeBtn}>
        <Image
          source={icons.heart}
          resizeMode="contain"
          style={styles.likeBtnImage}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default SavedJobCard;
