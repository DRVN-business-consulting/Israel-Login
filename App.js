import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (loggedIn) {
      console.log("User successfully logged in!");
    }
  }, [loggedIn]);

  useEffect(() => {
    if (username && username.length < 6) {
      setError("Username must be at least 6 characters long");
    } else if (username && username.length > 20) {
      setError("Username must not exceed 20 characters");
    } else {
      setError("");
    }
  }, [username]);

  useEffect(() => {
    const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/;
    const numberPattern = /[0-9]/;
    const uppercasePattern = /[A-Z]/;
    const lowercasePattern = /[a-z]/;

    if (
      password &&
      (!specialCharPattern.test(password) ||
        !numberPattern.test(password) ||
        !uppercasePattern.test(password) ||
        !lowercasePattern.test(password))
    ) {
      setError(
        "Password must include a special character, a number, an uppercase letter, and a lowercase letter."
      );
    } else {
      setError("");
    }
  }, [password]);

  const handleLogin = () => {
    if (username === "testuser" && password === "Testpass1!") {
      setLoggedIn(true);
      setError("");
    } else {
      setError("Invalid credentials, please try again.");
    }
  };

  return (
    <SafeAreaView
      style={isDarkMode ? styles.safeAreaDark : styles.safeAreaLight}
    >
      <ScrollView
        contentContainerStyle={
          isDarkMode ? styles.scrollContainerDark : styles.scrollContainerLight
        }
      >
        <View style={isDarkMode ? styles.containerDark : styles.containerLight}>
          <TouchableOpacity onPress={() => setIsDarkMode(!isDarkMode)}>
            <Text style={styles.themeToggle}>{isDarkMode ? "🙈" : "🙉"}</Text>
          </TouchableOpacity>
          {!loggedIn ? (
            <View style={isDarkMode ? styles.formDark : styles.formLight}>
              <Text
                style={isDarkMode ? styles.headingDark : styles.headingLight}
              >
                Login
              </Text>
              {error ? <Text style={styles.error}>{error}</Text> : null}
              <View style={styles.inputContainer}>
                <Text style={isDarkMode ? styles.textDark : styles.textLight}>
                  Username:
                </Text>
                <TextInput
                  value={username}
                  onChangeText={setUsername}
                  style={isDarkMode ? styles.inputDark : styles.inputLight}
                  placeholder="Enter username"
                />
                <Text
                  style={isDarkMode ? styles.counterDark : styles.counterLight}
                >
                  Counter: {username.length}
                </Text>
              </View>
              <View style={styles.inputContainer}>
                <Text style={isDarkMode ? styles.textDark : styles.textLight}>
                  Password:
                </Text>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  style={isDarkMode ? styles.inputDark : styles.inputLight}
                  placeholder="Enter password"
                />
              </View>
              <Button title="Login" onPress={handleLogin} />
            </View>
          ) : (
            <View
              style={{
                width: 350,
              }}
            >
              <Text
                style={isDarkMode ? styles.welcomeDark : styles.welcomeLight}
              >
                Welcome!
              </Text>
              <Text style={isDarkMode ? styles.textDark : styles.textLight}>
                You are logged in.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaLight: {
    flex: 1,
    backgroundColor: "#f7f7f7",
  },
  safeAreaDark: {
    flex: 1,
    backgroundColor: "#333",
  },
  scrollContainerLight: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContainerDark: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#333",
  },
  containerLight: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  containerDark: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#444",
  },
  formLight: {
    width: 300,
    maxWidth: 300,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  formDark: {
    width: 300,
    maxWidth: 300,
    backgroundColor: "#555",
    padding: 20,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  headingDark: {
    fontSize: 24,
    marginBottom: 15,
    textAlign: "center",
    color: "white",
  },
  headingLight: {
    fontSize: 24,
    marginBottom: 15,
    textAlign: "center",
    color: "black",
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLight: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    marginTop: 5,
  },
  inputDark: {
    borderColor: "#666",
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    marginTop: 5,
    backgroundColor: "#666",
    color: "#fff",
  },
  error: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
  welcomeLight: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: "center",
    color: "#000",
  },
  welcomeDark: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: "center",
    color: "#fff",
  },
  counterLight: {
    marginTop: 5,
    fontSize: 12,
    color: "#666",
    textAlign: "right",
  },
  counterDark: {
    marginTop: 5,
    fontSize: 12,
    color: "#aaa",
    textAlign: "right",
  },
  textLight: {
    color: "#000",
    textAlign: "center",
  },
  textDark: {
    color: "#fff",
    textAlign: "center",
  },
  themeToggle: {
    fontSize: 64,
    marginBottom: 15,
  },
});

export default App;
