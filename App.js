import { ImageBackground, SafeAreaView, StyleSheet } from "react-native";
import StartGameScreen from "./screens/StartGameScreen";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import GameScreen from "./screens/GameScreen";
import Colors from "./constants/colors";
import GameOverScreen from "./screens/GameOverScreen";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

export default function App() {
	const [userNumber, setUserNumber] = useState(null);
	const [isGameOver, setIsGameOver] = useState(false);
	const [guessRounds, setGuessRounds] = useState(0);

	const [fontsLoaded] = useFonts({
		"open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
		"open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
	});

	if (!fontsLoaded) return <AppLoading />;

	const pickedNumberHandler = (pickedNumber) => {
		setUserNumber(pickedNumber);
	};

	const gameOverHandler = (numberOfRounds) => {
		setIsGameOver(true);
		setGuessRounds(numberOfRounds);
	};

	const startNewGameHandler = () => {
		setUserNumber(null);
		setGuessRounds(0);
		setIsGameOver(false);
	};

	return (
		<LinearGradient
			colors={[Colors.primary700, Colors.accent500]}
			style={styles.rootScreen}>
			<ImageBackground
				source={require("./assets/images/background.png")}
				resizeMode="cover"
				style={styles.rootScreen}
				imageStyle={styles.backgroundImage}>
				<SafeAreaView style={styles.rootScreen}>
					{!isGameOver && (
						<>
							{userNumber ? (
								<GameScreen
									pickedNumber={userNumber}
									gameOverHandler={gameOverHandler}
								/>
							) : (
								<StartGameScreen onConfirm={pickedNumberHandler} />
							)}
						</>
					)}
					{isGameOver && (
						<GameOverScreen
							roundsNumber={guessRounds}
							userNumber={userNumber}
							onStartNewGame={startNewGameHandler}
						/>
					)}
				</SafeAreaView>
			</ImageBackground>
		</LinearGradient>
	);
}

const styles = StyleSheet.create({
	rootScreen: {
		flex: 1,
	},
	backgroundImage: {
		opacity: 0.15,
	},
});
