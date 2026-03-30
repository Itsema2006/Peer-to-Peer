import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Dimensions,
  Platform,
  StatusBar,
} from 'react-native';

const { width } = Dimensions.get('window');

const questions = [
  {
    id: 1,
    question: "What is the main building block of React Native?",
    options: ["Components", "Modules", "Classes", "Packages"],
    correctAnswer: 0,
  },
  {
    id: 2,
    question: "Which hook is used to manage state in functional components?",
    options: ["useContext", "useReducer", "useState", "useEffect"],
    correctAnswer: 2,
  },
  {
    id: 3,
    question: "How do you style elements in React Native?",
    options: ["CSS files", "StyleSheet API", "Inline HTML tags", "SCSS modules"],
    correctAnswer: 1,
  },
];

export default function QuizScreen({ navigation }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const progressAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // Initial progress update
  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: ((currentQuestionIndex) / questions.length) * 100,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, []);

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: ((currentQuestionIndex) / questions.length) * 100,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [currentQuestionIndex]);

  const handleOptionSelect = (index) => {
    if (isAnswerChecked) return;
    setSelectedOption(index);
  };

  const handleNext = () => {
    if (selectedOption !== null && !isAnswerChecked) {
      // Check answer
      if (selectedOption === questions[currentQuestionIndex].correctAnswer) {
        setScore(score + 1);
      }
      setIsAnswerChecked(true);
    } else if (isAnswerChecked) {
      // Move to next question or show result
      if (currentQuestionIndex < questions.length - 1) {
        Animated.sequence([
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start(() => {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setSelectedOption(null);
          setIsAnswerChecked(false);
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }).start();
        });
      } else {
        // Quiz completed
        Animated.timing(progressAnim, {
          toValue: 100,
          duration: 500,
          useNativeDriver: false,
        }).start();
        setShowResult(true);
      }
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  const renderProgressBar = () => {
    return (
      <View style={styles.progressBarContainer}>
        <Animated.View
          style={[
            styles.progressBar,
            {
              width: progressAnim.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        />
      </View>
    );
  };

  const renderResult = () => {
    return (
      <View style={styles.resultContainer}>
        <Text style={styles.resultTitle}>Quiz Completed!</Text>
        <View style={styles.scoreCircle}>
          <Text style={styles.scoreText}>
            {score} / {questions.length}
          </Text>
        </View>
        <Text style={styles.resultMessage}>
          {score === questions.length ? "Perfect Score! 🎉" : "Good effort! Keep learning. 👍"}
        </Text>
        <View style={{ width: '100%' }}>
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.primaryButtonText}>Go Back</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() => {
              setCurrentQuestionIndex(0);
              setScore(0);
              setSelectedOption(null);
              setIsAnswerChecked(false);
              setShowResult(false);
              Animated.timing(progressAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: false,
              }).start();
            }}
          >
            <Text style={styles.secondaryButtonText}>Retake Quiz</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (showResult) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        {renderResult()}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Daily Quiz</Text>
        <Text style={styles.questionCounter}>
          {currentQuestionIndex + 1}/{questions.length}
        </Text>
      </View>

      {renderProgressBar()}

      <Animated.View style={[styles.questionContainer, { opacity: fadeAnim }]}>
        <Text style={styles.questionText}>{currentQuestion.question}</Text>

        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedOption === index;
            const isCorrect = isAnswerChecked && index === currentQuestion.correctAnswer;
            const isWrong = isAnswerChecked && isSelected && index !== currentQuestion.correctAnswer;

            let optionStyle = styles.option;
            let optionTextStyle = styles.optionText;

            if (isSelected) {
              optionStyle = [styles.option, styles.optionSelected];
            }
            if (isCorrect) {
              optionStyle = [styles.option, styles.optionCorrect];
              optionTextStyle = [styles.optionText, styles.optionTextCorrect];
            } else if (isWrong) {
              optionStyle = [styles.option, styles.optionWrong];
              optionTextStyle = [styles.optionText, styles.optionTextWrong];
            }

            return (
              <TouchableOpacity
                key={index}
                style={optionStyle}
                onPress={() => handleOptionSelect(index)}
                activeOpacity={0.7}
                disabled={isAnswerChecked}
              >
                <View style={styles.optionContent}>
                  <View style={[
                    styles.checkbox, 
                    isSelected && styles.checkboxSelected,
                    isCorrect && styles.checkboxCorrect,
                    isWrong && styles.checkboxWrong
                  ]}>
                    {isSelected && !isAnswerChecked && <View style={styles.checkboxInner} />}
                    {isCorrect && <Text style={styles.checkIcon}>✓</Text>}
                    {isWrong && <Text style={styles.crossIcon}>✕</Text>}
                  </View>
                  <Text style={optionTextStyle}>{option}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </Animated.View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.primaryButton,
            selectedOption === null && !isAnswerChecked && styles.primaryButtonDisabled,
          ]}
          onPress={handleNext}
          disabled={selectedOption === null && !isAnswerChecked}
        >
          <Text style={styles.primaryButtonText}>
            {!isAnswerChecked ? "Check Answer" : (currentQuestionIndex < questions.length - 1 ? "Next Question" : "Finish Quiz")}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 40 : 20,
    paddingBottom: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1E293B',
  },
  questionCounter: {
    fontSize: 16,
    fontWeight: '600',
    color: '#64748B',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    overflow: 'hidden',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
    marginHorizontal: 20,
    marginBottom: 30,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#3B82F6',
    borderRadius: 4,
  },
  questionContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  questionText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 30,
    lineHeight: 32,
  },
  optionsContainer: {
    gap: 16,
  },
  option: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  optionSelected: {
    borderColor: '#3B82F6',
    backgroundColor: '#EFF6FF',
  },
  optionCorrect: {
    borderColor: '#10B981',
    backgroundColor: '#ECFDF5',
  },
  optionWrong: {
    borderColor: '#EF4444',
    backgroundColor: '#FEF2F2',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#334155',
    flex: 1,
  },
  optionTextCorrect: {
    color: '#047857',
  },
  optionTextWrong: {
    color: '#B91C1C',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    borderColor: '#3B82F6',
  },
  checkboxInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#3B82F6',
  },
  checkboxCorrect: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  checkboxWrong: {
    backgroundColor: '#EF4444',
    borderColor: '#EF4444',
  },
  checkIcon: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  crossIcon: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  footer: {
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 20 : 20,
    backgroundColor: '#F8FAFC',
  },
  primaryButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  primaryButtonDisabled: {
    backgroundColor: '#94A3B8',
    shadowOpacity: 0,
    elevation: 0,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  secondaryButton: {
    backgroundColor: '#F1F5F9',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 15,
  },
  secondaryButtonText: {
    color: '#475569',
    fontSize: 18,
    fontWeight: '700',
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    width: '100%',
  },
  resultTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 40,
  },
  scoreCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    borderWidth: 8,
    borderColor: '#3B82F6',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 10,
  },
  scoreText: {
    fontSize: 36,
    fontWeight: '800',
    color: '#3B82F6',
  },
  resultMessage: {
    fontSize: 20,
    fontWeight: '600',
    color: '#475569',
    textAlign: 'center',
    marginBottom: 50,
  },
});
