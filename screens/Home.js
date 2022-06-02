import { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SwipeListView } from 'react-native-swipe-list-view';
import { observer } from "mobx-react-lite";
import { useNavigation } from "@react-navigation/native";
import { useStore } from "../hooks";

const Home = observer(() => {
  const navigation = useNavigation();
  const { loading, message, currencies, getCurrencies, removeCoin } = useStore();

  useEffect(() => {
    let timer = setInterval(getCurrencies, 60000);
    return () => timer && clearInterval(timer);
  }, []);

  return (
    <SafeAreaView edges={["right", "bottom", "left"]} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Crypto Currency</Text>
        <Image source={{ uri: "https://avatars.githubusercontent.com/u/65152313" }} style={styles.avatar} />
      </View>
      {loading ? <ActivityIndicator size={"large"} color="#667799" style={styles.loading} /> : null}
      {message ? <Text style={styles.error}>{message}</Text> : null}
      <SwipeListView 
        data={currencies}
        rightOpenValue={-80}
        keyExtractor={(currency) => currency.symbol}
        renderItem={({item: currency}) => (
          <TouchableOpacity style={styles.item} onPress={() => navigation.navigate("Detail", currency)} activeOpacity={1}>
            <View style={styles.itemCon}>
              <View style={styles.itemRow}>
                <Text style={styles.itemStrong}>{currency.name}</Text>
                <Text style={styles.itemStrong}>${currency.price}</Text>
              </View>
              <View style={styles.itemRow}>
                <Text style={styles.itemCoin}>{currency.symbol}</Text>
                <Text style={styles.itemPercent}>{currency.percent}%</Text>
              </View>
            </View>
          </TouchableOpacity>
        )} 
        renderHiddenItem={({item: currency}) => (
          <View style={styles.itemHidden}>
            <TouchableOpacity style={styles.itemBtn} onPress={() => removeCoin(currency.symbol)}>
              <Text style={styles.itemText}>delete</Text>
            </TouchableOpacity>
          </View>
        )} 
        ListFooterComponent={() => {
          if (loading) return null;
          return (
            <View style={styles.create}>
              <TouchableOpacity onPress={() => navigation.navigate("Create")}>
                <Text style={styles.createText}>+ Add a Crypto Currency</Text>
              </TouchableOpacity>
            </View>
          )
        }}
      />
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
  loading: {
    marginTop: 100,
  },
  item: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  itemCon: {
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
  itemHidden: {
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'flex-end'
  },
  itemBtn: {
    bottom: 0, 
    top: 0, 
    right:0, 
    position: 'absolute', 
    width: 80, 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: 'red'
  },
  itemText: {
    fontSize: 16,
    color: '#fff'
  },
  create: {
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  createText: {
    fontSize: 16,
    color: "#666",
  },
  error: {
    marginVertical: 10,
    paddingHorizontal: 20,
    color: 'red',
    fontSize: 14
  }
});
