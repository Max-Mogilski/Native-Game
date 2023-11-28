import { StyleSheet, View } from "react-native";
import Colors from "../../constants/colors";

function Card({ children }) {
	return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
	card: {
		width: "90%",
		alignItems: "center",
		marginHorizontal: 24,
		marginTop: 36,
		padding: 16,
		borderRadius: 8,
		backgroundColor: Colors.primary800,
		elevation: 4,
		shadowColor: "black",
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 6,
		shadowOpacity: 0.25,
	},
});

export default Card;
