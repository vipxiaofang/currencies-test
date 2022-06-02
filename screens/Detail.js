import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from "react-native-safe-area-context";

export default function Detail() {
  const { params } = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerTitle: params.symbol });
  }, [navigation]);

  return (
    <SafeAreaView edges={["right", "bottom", "left"]} style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>symbol: </Text>
        <Text style={styles.value}>{params.symbol}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>name: </Text>
        <Text style={styles.value}>{params.name}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>{params.symbol}/USD: </Text>
        <Text style={styles.value}>{params.price}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Last 24 Change Percent: </Text>
        <Text style={styles.value}>{params.percent}%</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    color: '#666',
    marginRight: 10,
  },
  value: {
    fontSize: 20,
    color: '#333',
  },
})