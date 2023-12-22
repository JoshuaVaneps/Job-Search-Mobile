import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  View,
} from "react-native";
import { Stack, useRouter, useSearchParams } from "expo-router";
import { Text, SafeAreaView } from "react-native";
import axios from "axios";

import { ScreenHeaderBtn, NearbyJobCard } from "../../components";
import { COLORS, icons, SIZES } from "../../constants";
import styles from "../../styles/search";

const JobSearch = () => {
  const params = useSearchParams();
  const router = useRouter();

  const [searchResult, setSearchResult] = useState([]);
  const [searchLoader, setSearchLoader] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [page, setPage] = useState(1);

  const handleSearch = async () => {
    setSearchLoader(true);
    setSearchResult([]);

    try {
      // Try to get data from AsyncStorage
      const cachedData = await AsyncStorage.getItem(
        `search-${params.id}-${page}`
      );

      if (cachedData !== null) {
        const { data, timestamp } = JSON.parse(cachedData);

        // Check if the timestamp is more than a day old
        const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
        if (Date.now() - timestamp < oneDay) {
          // If the cached data is less than a day old, use it
          setSearchResult(data);
          setSearchLoader(false);
          return;
        }
      }

      // If there is no cached data or it's more than a day old, fetch from the API
      const options = {
        method: "GET",
        url: `https://jsearch.p.rapidapi.com/search`,
        headers: {
          "X-RapidAPI-Key":
            "66bb145f18msh034d64a6615fbadp15de7fjsn0a5a7aec3499",
          "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
        },
        params: {
          query: params.id,
          page: page.toString(),
        },
      };

      const response = await axios.request(options);
      const apiData = response.data.data;
      setSearchResult(apiData);

      // Cache the API response with a timestamp
      await AsyncStorage.setItem(
        `search-${params.id}-${page}`,
        JSON.stringify({ data: apiData, timestamp: Date.now() })
      );
    } catch (error) {
      setSearchError(error);
      console.log(error);
    } finally {
      setSearchLoader(false);
    }
  };

  const handlePagination = (direction) => {
    if (direction === "left" && page > 1) {
      setPage(page - 1);
      handleSearch();
    } else if (direction === "right") {
      setPage(page + 1);
      handleSearch();
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
          headerTitle: "",
        }}
      />

      <FlatList
        data={searchResult}
        renderItem={({ item }) => (
          <NearbyJobCard
            job={item}
            handleNavigate={() => router.push(`/job-details/${item.job_id}`)}
          />
        )}
        keyExtractor={(item) => item.job_id}
        contentContainerStyle={{ padding: SIZES.medium, rowGap: SIZES.medium }}
        ListHeaderComponent={() => (
          <>
            <View style={styles.container}>
              <Text style={styles.searchTitle}>{params.id}</Text>
              <Text style={styles.noOfSearchedJobs}>Job Opportunities</Text>
            </View>
            <View style={styles.loaderContainer}>
              {searchLoader ? (
                <ActivityIndicator size="large" color={COLORS.primary} />
              ) : (
                searchError && <Text>Oops something went wrong</Text>
              )}
            </View>
          </>
        )}
        ListFooterComponent={() => (
          <View style={styles.footerContainer}>
            <TouchableOpacity
              style={styles.paginationButton}
              onPress={() => handlePagination("left")}
            >
              <Image
                source={icons.chevronLeft}
                style={styles.paginationImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View style={styles.paginationTextBox}>
              <Text style={styles.paginationText}>{page}</Text>
            </View>
            <TouchableOpacity
              style={styles.paginationButton}
              onPress={() => handlePagination("right")}
            >
              <Image
                source={icons.chevronRight}
                style={styles.paginationImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default JobSearch;
