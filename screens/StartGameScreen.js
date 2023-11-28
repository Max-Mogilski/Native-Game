import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import { useState } from "react";
import Colors from "../constants/colors";
import Title from "../components/ui/Title";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";

function StartGameScreen({ onConfirm }) {
	const [enteredNumber, setEnteredNumber] = useState("");

	const numberInputHandler = (enteredText) => {
		setEnteredNumber(enteredText);
	};

	const resetInputHandler = () => {
		setEnteredNumber("");
	};

	const confirmInputHandler = () => {
		const chosenNumber = parseInt(enteredNumber);
		if (chosenNumber <= 0 || isNaN(chosenNumber) || chosenNumber > 99) {
			Alert.alert(
				"Invalid number",
				"Value has to be a number between 1 and 99.",
				[{ text: "Okay", style: "destructive", onPress: resetInputHandler }]
			);
			return;
		}
		onConfirm(chosenNumber);
	};

	return (
		<View style={styles.rootContainer}>
			<Title>Guess my number</Title>
			<Card>
				<InstructionText>Enter a Number</InstructionText>
				<TextInput
					onChangeText={numberInputHandler}
					style={styles.numberInput}
					maxLength={2}
					keyboardType={"number-pad"}
					value={enteredNumber}
				/>
				<View style={styles.buttonsContainter}>
					<PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
					<PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
				</View>
			</Card>
		</View>
	);
}

const styles = StyleSheet.create({
	rootContainer: {
		flex: 1,
		marginTop: 100,
		alignItems: "center",
	},
	numberInput: {
		height: 50,
		width: 50,
		fontSize: 32,
		borderBottomColor: Colors.accent500,
		borderBottomWidth: 2,
		color: Colors.accent500,
		marginVertical: 8,
		textAlign: "center",
		fontWeight: "bold",
	},
	buttonsContainter: {
		flexDirection: "row",
	},
});

export default StartGameScreen;
