import { Text, View, StyleSheet } from "react-native";

interface CaculateProps {}

const Caculate = (props: CaculateProps) => {
  return (
    <View style={styles.container}>
      <Text>Caculate</Text>
    </View>
  );
};

export default Caculate;

const styles = StyleSheet.create({
  container: {},
});
