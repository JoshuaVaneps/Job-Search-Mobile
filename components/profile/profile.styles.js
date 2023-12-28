import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../constants";

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.xLarge,
  },
  userName: {
    fontFamily: FONT.regular,
    fontSize: SIZES.large,
    color: COLORS.secondary,
  },
  infoMessage: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xLarge,
    color: COLORS.primary,
    marginTop: 2,
  },
  imageMessage: {
    fontSize: SIZES.large,
    color: COLORS.primary,
  },
  profileContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    margin: SIZES.large,
    height: 150,
    gap: 10,
  },
  infoContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: SIZES.xLarge,
    marginTop: SIZES.xLarge,
    height: 150,
    borderColor: "primary",
    borderWidth: 1,
    borderRadius: 20,
  },
  profileWrapper: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginRight: SIZES.small,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.medium,
    height: "100%",
  },
  profileInput: {
    fontFamily: FONT.regular,
    width: "100%",
    height: "100%",
    paddingHorizontal: SIZES.medium,
  },
  profileBtn: {
    width: "60%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  profileBtnImage: {
    width: "80%",
    height: "100%",
    borderRadius: 90, // Adjust this value as needed
    overflow: "hidden", // Add this line
  },
  tabsContainer: {
    width: "100%",
    marginTop: SIZES.medium,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: SIZES.small,
  },
  headerTitle: {
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
    color: COLORS.primary,
  },
  headerBtn: {
    fontSize: SIZES.medium,
    fontFamily: FONT.medium,
    color: COLORS.gray,
  },
  cardsContainer: {
    marginTop: SIZES.medium,
    gap: SIZES.small,
  },
});

export default styles;
