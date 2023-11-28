import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import Title from "../components/ui/Title";
import { useEffect, useState } from "react";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import { Ionicons } from "@expo/vector-icons";
import GuessLogItem from "../components/game/GuessLogItem";

function generateRandomBetween(min, max, exclude) {
	const rndNum = Math.floor(Math.random() * (max - min)) + min;

	if (rndNum === exclude) {
		return generateRandomBetween(min, max, exclude);
	} else {
		return rndNum;
	}
}

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({ pickedNumber, gameOverHandler }) {
	const initialGuessNumber = generateRandomBetween(1, 100, pickedNumber);
	const [currentGuess, setCurrentGuess] = useState(initialGuessNumber);
	const [guessRounds, setGuessRounds] = useState([initialGuessNumber]);

	useEffect(() => {
		if (pickedNumber === currentGuess) {
			gameOverHandler(guessRounds.length);
		}
	}, [pickedNumber, currentGuess, gameOverHandler]);

	useEffect(() => {
		minBoundary = 1;
		maxBoundary = 100;
	}, []);

	const nextGuessHandler = (direction) => {
		if (
			(direction === "lower" && currentGuess < pickedNumber) ||
			(direction === "greater" && currentGuess > pickedNumber)
		) {
			Alert.alert("Don't lie!", "You know that this is wrong...", [
				{ text: "Sorry", style: "cancel" },
			]);
			return;
		}

		if (direction === "lower") {
			maxBoundary = currentGuess;
		} else {
			minBoundary = currentGuess + 1;
		}

		const newRndNumber = generateRandomBetween(
			minBoundary,
			maxBoundary,
			currentGuess
		);
		setCurrentGuess(newRndNumber);
		setGuessRounds((prev) => [...prev, newRndNumber]);
	};

	return (
		<View style={styles.screen}>
			<Title>Oponent's Guess</Title>
			<NumberContainer>{currentGuess}</NumberContainer>
			<Card>
				<InstructionText style={styles.instructionText}>
					Higher or lower?
				</InstructionText>
				<View style={styles.buttonsContainer}>
					<View style={styles.button}>
						<PrimaryButton onPress={() => nextGuessHandler("lower")}>
							<Ionicons name="md-remove" size={24} color={"white"} />
						</PrimaryButton>
					</View>
					<View style={styles.button}>
						<PrimaryButton onPress={() => nextGuessHandler("greater")}>
							<Ionicons name="md-add" size={24} color={"white"} />
						</PrimaryButton>
					</View>
				</View>
			</Card>
			<View style={styles.listContainer}>
				<FlatList
					data={guessRounds}
					renderItem={(itemData) => (
						<GuessLogItem
							roundNumber={itemData.index + 1}
							guess={itemData.item}
						/>
					)}
					keyExtractor={(item) => item}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 24,
	},
	instructionText: {
		marginBottom: 12,
	},
	buttonsContainer: {
		flexDirection: "row",
	},
	button: {
		flex: 1,
	},
	listContainer: {
		flex: 1,
		padding: 16,
	},
});

export default GameScreen;
