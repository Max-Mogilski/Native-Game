import { StyleSheet, Text } from "react-native";

function Title({ children }) {
	return <Text style={styles.titile}>{children}</Text>;
}

const styles = StyleSheet.create({
	titile: {
		fontFamily: "open-sans-bold",
		fontSize: 24,
		color: "white",
		textAlign: "center",
		borderWidth: 2,
		borderColor: "white",
		padding: 12,
	},
});

export default Title;
