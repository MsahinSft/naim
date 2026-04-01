import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from 'react-native';

const { width } = Dimensions.get('window');

const GOLD   = '#F5C518';
const ORANGE = '#FF6B35';
const BG     = '#0A0A0F';
const WHITE  = '#FFFFFF';
const MUTED  = '#8A8A9A';

export default function InspirationScreen({ navigation }) {
  const quoteAnim  = useRef(new Animated.Value(0)).current;
  const lineAnim   = useRef(new Animated.Value(0)).current;
  const buttonAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim  = useRef(new Animated.Value(0.85)).current;
  const glowAnim   = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.stagger(200, [
      Animated.parallel([
        Animated.timing(quoteAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.spring(scaleAnim, { toValue: 1, friction: 5, useNativeDriver: true }),
      ]),
      Animated.timing(lineAnim,   { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(buttonAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, { toValue: 1, duration: 1600, useNativeDriver: true }),
        Animated.timing(glowAnim, { toValue: 0, duration: 1600, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const glowOpacity = glowAnim.interpolate({ inputRange: [0, 1], outputRange: [0.6, 1] });

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={BG} />

      {/* Background glow accent */}
      <View style={styles.bg}>
        <View style={[styles.circle, styles.circleCenter]} />
      </View>

      <View style={styles.container}>

        {/* Icon */}
        <Animated.Text style={[styles.icon, { opacity: quoteAnim, transform: [{ scale: scaleAnim }] }]}>
          🏛️
        </Animated.Text>

        {/* Section label */}
        <Animated.Text style={[styles.sectionLabel, { opacity: lineAnim }]}>
          DAILY MANTRA
        </Animated.Text>

        {/* Quote */}
        <Animated.Text
          style={[
            styles.quote,
            {
              opacity: Animated.multiply(quoteAnim, glowOpacity),
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          "THE ONLY LIMIT IS THE ONE YOU SET."
        </Animated.Text>

        {/* Divider */}
        <Animated.View
          style={[
            styles.divider,
            {
              opacity: lineAnim,
              transform: [{ scaleX: lineAnim }],
            },
          ]}
        />

        {/* Attribution */}
        <Animated.Text style={[styles.attribution, { opacity: lineAnim }]}>
          — Pocket Hercules
        </Animated.Text>

        {/* Back Button */}
        <Animated.View
          style={{
            opacity: buttonAnim,
            transform: [{ translateY: buttonAnim.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }],
          }}
        >
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>← BACK TO HOME</Text>
          </TouchableOpacity>
        </Animated.View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: BG },
  bg:   { ...StyleSheet.absoluteFillObject, overflow: 'hidden' },
  circleCenter: {
    position: 'absolute',
    width: width * 1.2,
    height: width * 1.2,
    borderRadius: 999,
    backgroundColor: GOLD,
    opacity: 0.06,
    top: '20%',
    left: -width * 0.1,
  },
  circle: { position: 'absolute' },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },

  icon: {
    fontSize: 64,
    marginBottom: 20,
  },

  sectionLabel: {
    color: ORANGE,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 3,
    marginBottom: 32,
  },

  quote: {
    color: GOLD,
    fontSize: 32,
    fontWeight: '900',
    textAlign: 'center',
    lineHeight: 44,
    letterSpacing: -0.5,
    textShadowColor: GOLD,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
    marginBottom: 32,
  },

  divider: {
    height: 2,
    width: 60,
    backgroundColor: ORANGE,
    borderRadius: 1,
    marginBottom: 16,
  },

  attribution: {
    color: MUTED,
    fontSize: 14,
    fontStyle: 'italic',
    letterSpacing: 0.5,
    marginBottom: 60,
  },

  button: {
    borderWidth: 1.5,
    borderColor: ORANGE,
    borderRadius: 14,
    paddingHorizontal: 36,
    paddingVertical: 14,
  },
  buttonText: {
    color: ORANGE,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 2,
    textAlign: 'center',
  },
});
