import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  StatusBar,
  SafeAreaView,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const titleAnim    = useRef(new Animated.Value(0)).current;
  const subtitleAnim = useRef(new Animated.Value(0)).current;
  const buttonAnim   = useRef(new Animated.Value(0)).current;
  const pulseAnim    = useRef(new Animated.Value(1)).current;
  const glowAnim     = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.stagger(180, [
      Animated.timing(titleAnim,    { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.timing(subtitleAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(buttonAnim,   { toValue: 1, duration: 500, useNativeDriver: true }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.08, duration: 900, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1.0,  duration: 900, useNativeDriver: true }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, { toValue: 1, duration: 1400, useNativeDriver: true }),
        Animated.timing(glowAnim, { toValue: 0, duration: 1400, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const glowOpacity = glowAnim.interpolate({ inputRange: [0, 1], outputRange: [0.4, 1] });

  const handleGetInspired = () => {
    Animated.sequence([
      Animated.timing(buttonAnim, { toValue: 0.92, duration: 80, useNativeDriver: true }),
      Animated.spring(buttonAnim, { toValue: 1,    useNativeDriver: true }),
    ]).start(() => {
      navigation.navigate('Inspiration');
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0A0F" />

      <View style={styles.bg}>
        <View style={[styles.circle, styles.circleTop]} />
        <View style={[styles.circle, styles.circleBottom]} />
      </View>

      <View style={styles.container}>
        {/* Badge */}
        <Animated.View style={[styles.badge, { transform: [{ scale: pulseAnim }] }]}>
          <Animated.Text style={[styles.badgeText, { opacity: glowOpacity }]}>
            ⚡ ATHLETIC LIFESTYLE
          </Animated.Text>
        </Animated.View>

        {/* Title */}
        <Animated.View
          style={{
            opacity: titleAnim,
            transform: [{ translateY: titleAnim.interpolate({ inputRange: [0, 1], outputRange: [40, 0] }) }],
          }}
        >
          <Text style={styles.titleLine1}>POCKET</Text>
          <Text style={styles.titleLine2}>HERCULES</Text>
          <View style={styles.titleUnderline} />
        </Animated.View>

        {/* Description */}
        <Animated.Text
          style={[
            styles.description,
            {
              opacity: subtitleAnim,
              transform: [{ translateY: subtitleAnim.interpolate({ inputRange: [0, 1], outputRange: [30, 0] }) }],
            },
          ]}
        >
          Your personal strength companion.{'\n'}
          Train harder, recover smarter, and unlock{'\n'}
          the hero within — every single day.
        </Animated.Text>

        {/* Stats row */}
        <Animated.View
          style={[
            styles.statsRow,
            {
              opacity: subtitleAnim,
              transform: [{ translateY: subtitleAnim.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }],
            },
          ]}
        >
          {[
            { value: '500+', label: 'Workouts' },
            { value: '10K+', label: 'Athletes' },
            { value: '98%',  label: 'Consistency' },
          ].map((stat, i) => (
            <View key={i} style={styles.statCard}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </Animated.View>

        {/* CTA */}
        <Animated.View
          style={{
            opacity: buttonAnim,
            transform: [
              { translateY: buttonAnim.interpolate({ inputRange: [0, 1], outputRange: [30, 0] }) },
              { scale: buttonAnim },
            ],
          }}
        >
          <TouchableOpacity style={styles.button} activeOpacity={0.85} onPress={handleGetInspired}>
            <Text style={styles.buttonText}>GET INSPIRED  →</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.Text style={[styles.footerTag, { opacity: subtitleAnim }]}>
          No excuses. Just reps.
        </Animated.Text>
      </View>
    </SafeAreaView>
  );
}

const GOLD   = '#F5C518';
const ORANGE = '#FF6B35';
const BG     = '#0A0A0F';
const CARD   = '#13131C';
const WHITE  = '#FFFFFF';
const MUTED  = '#8A8A9A';

const styles = StyleSheet.create({
  safe:   { flex: 1, backgroundColor: BG },
  bg:     { ...StyleSheet.absoluteFillObject, overflow: 'hidden' },
  circle: { position: 'absolute', borderRadius: 999, opacity: 0.12 },
  circleTop: {
    width: width * 1.1, height: width * 1.1,
    backgroundColor: ORANGE,
    top: -width * 0.55, left: -width * 0.1,
  },
  circleBottom: {
    width: width * 0.9, height: width * 0.9,
    backgroundColor: GOLD,
    bottom: -width * 0.5, right: -width * 0.3,
  },
  container: { flex: 1, paddingHorizontal: 28, justifyContent: 'center', alignItems: 'center' },
  badge: {
    backgroundColor: '#1E1E2E', borderWidth: 1, borderColor: ORANGE,
    borderRadius: 20, paddingHorizontal: 14, paddingVertical: 5, marginBottom: 28,
  },
  badgeText: { color: ORANGE, fontSize: 11, fontWeight: '700', letterSpacing: 2.5 },
  titleLine1: {
    color: WHITE, fontSize: 64, fontWeight: '900', letterSpacing: -1,
    textAlign: 'center', lineHeight: 64,
    textShadowColor: ORANGE, textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 20,
  },
  titleLine2: {
    color: GOLD, fontSize: 64, fontWeight: '900', letterSpacing: -1,
    textAlign: 'center', lineHeight: 68,
    textShadowColor: GOLD, textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 24,
  },
  titleUnderline: {
    height: 3, width: 80, backgroundColor: ORANGE,
    borderRadius: 2, alignSelf: 'center', marginTop: 10, marginBottom: 28,
  },
  description: {
    color: MUTED, fontSize: 16, lineHeight: 26,
    textAlign: 'center', marginBottom: 32, maxWidth: 300,
  },
  statsRow:  { flexDirection: 'row', gap: 12, marginBottom: 40 },
  statCard:  {
    backgroundColor: CARD, borderWidth: 1, borderColor: '#1F1F2E',
    borderRadius: 12, paddingHorizontal: 18, paddingVertical: 12,
    alignItems: 'center', flex: 1,
  },
  statValue: { color: WHITE, fontSize: 20, fontWeight: '800', letterSpacing: -0.5 },
  statLabel: { color: MUTED, fontSize: 11, fontWeight: '600', letterSpacing: 0.5, marginTop: 2 },
  button: {
    backgroundColor: ORANGE, borderRadius: 16,
    paddingHorizontal: 48, paddingVertical: 18,
    shadowColor: ORANGE, shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5, shadowRadius: 20, elevation: 12,
  },
  buttonText: { color: WHITE, fontSize: 16, fontWeight: '800', letterSpacing: 2, textAlign: 'center' },
  footerTag:  { color: MUTED, fontSize: 13, fontStyle: 'italic', marginTop: 28, letterSpacing: 0.5 },
});
