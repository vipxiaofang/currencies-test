import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { observer } from "mobx-react-lite";
import { useNavigation } from "@react-navigation/native";
import { useStore } from "../hooks";
import { getMetrics } from "../http";

const Create = observer(() => {
  const navigation = useNavigation();
  const [coin, setCoin] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { coins, addCurrency } = useStore();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text>&lt; Back to list</Text>
        </TouchableOpacity>
      ),
      headerShadowVisible: false,
      headerStyle: { backgroundColor: "#fff" },
    });
  }, [navigation]);

  const submit = () => {
    if (!coin.trim()) return;
    let val = coin.trim().toUpperCase();
    if (coins.indexOf(val) !== -1) return setMessage(`${val} has already exists`);

    setLoading(true);
    getMetrics(val).then(res => {
      setMessage('');
      addCurrency(val, res);
      navigation.goBack();
    }).catch(err => {
      setMessage(val + ': ' + (err.response.data?.status?.error_message || err.message));
    }).finally(() => {
      setLoading(false);
    })
  };

  return (
    <SafeAreaView edges={["right", "bottom", "left"]} style={styles.container}>
      <Text style={styles.title}>Add a Crypto Currency</Text>
      {message ? <Text style={styles.error}>{message}</Text> : null}
      <TextInput
        value={coin}
        onChangeText={setCoin}
        style={styles.input}
        placeholder={"Plase enter currency..."}
        maxLength={8}
        autoFocus={true}
        clearTextOnFocus={true}
        autoCorrect={false}
        autoCapitalize={'characters'}
        onSubmitEditing={() => submit()}
      />
      <View style={styles.bot}>
        <TouchableOpacity onPress={submit} style={styles.btn} activeOpacity={0.4} disabled={loading}>
          {loading ? <ActivityIndicator color="#667799" /> : null}
          <Text style={styles.btnText}>Add</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
});

export default Create;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
    marginBottom: 30,
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#999",
    paddingHorizontal: 8,
    paddingVertical: 15,
    borderRadius: 6,
    fontSize: 16,
  },
  bot: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 18,
  },
  btn: {
    backgroundColor: "#fff100",
    width: 148,
    height: 48,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    fontSize: 16,
    color: "#666",
    marginLeft: 4,
  },
  error: {
    marginVertical: 10,
    color: 'red',
    fontSize: 14
  }
});
