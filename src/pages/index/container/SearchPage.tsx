import { Text, View, StyleSheet } from "react-native";

interface SearchPageProps {}

const SearchPage = (props: SearchPageProps) => {
  return (
    <View style={styles.container}>
      <Text>SearchPage</Text>
    </View>
  );
};

export default SearchPage;

const styles = StyleSheet.create({
  container: {},
});
