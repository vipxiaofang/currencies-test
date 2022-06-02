import { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { observer } from "mobx-react-lite";
import { useNavigation } from "@react-navigation/native";
import { useStore } from "../hooks";

const Home = observer(() => {
  const navigation = useNavigation();
  const { loading, currencies, getCurrencies } = useStore();

  useEffect(() => {
    let timer = setInterval(getCurrencies, 30000);
    return () => timer && clearInterval(timer);
  }, []);

  return (
    <SafeAreaView edges={["right", "bottom", "left"]} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Crypto Currency</Text>
        <Image source={{ uri: "https://avatars.githubusercontent.com/u/65152313" }} style={styles.avatar} />
      </View>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollCon}>
        {loading ? <ActivityIndicator size={"large"} color="#667799" style={styles.loading} /> : null}
        {currencies.map((currency) => (
          <TouchableOpacity
            key={currency.symbol}
            activeOpacity={0.8}
            style={styles.item}
            onPress={() => navigation.navigate("Detail", currency)}
          >
            <View style={styles.itemRow}>
              <Text style={styles.itemStrong}>{currency.name}</Text>
              <Text style={styles.itemStrong}>${currency.price}</Text>
            </View>
            <View style={styles.itemRow}>
              <Text style={styles.itemCoin}>{currency.symbol}</Text>
              <Text style={styles.itemPercent}>{currency.percent}%</Text>
            </View>
          </TouchableOpacity>
        ))}
        {!loading ? (
          <View style={styles.create}>
            <TouchableOpacity onPress={() => navigation.navigate("Create")}>
              <Text style={styles.createText}>+ Add a Crypto Currency</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
});

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    height: 160,
    backgroundColor: "#667799",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "500",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  scrollView: {
    flex: 1,
  },
  scrollCon: {
    paddingHorizontal: 20,
  },
  loading: {
    marginTop: 100,
  },
  item: {
    paddingVertical: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#999",
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 2,
  },
  itemStrong: {
    fontSize: 18,
    fontWeight: "500",
    color: "#333",
  },
  itemCoin: {
    fontSize: 16,
    color: "#666",
  },
  create: {
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  createText: {
    fontSize: 16,
    color: "#666",
  }
});
