import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Animated,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Dummy Data
const TRENDING_COURSES = [
  {
    id: '1',
    title: 'Advanced React Native',
    instructor: 'Jane Doe',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2940&auto=format&fit=crop',
    color: '#FF6B6B',
  },
  {
    id: '2',
    title: 'UI/UX Masterclass',
    instructor: 'John Smith',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop',
    color: '#4ECDC4',
  },
  {
    id: '3',
    title: 'Fullstack Development',
    instructor: 'Alex Johnson',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2944&auto=format&fit=crop',
    color: '#45B7D1',
  },
  {
    id: '4',
    title: 'Data Science 101',
    instructor: 'Dr. Alan Turing',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=2874&auto=format&fit=crop',
    color: '#9B59B6',
  },
];

const TRENDING_QUIZZES = [
  { id: '1', title: 'JavaScript Basics', questions: 15, color: '#F1C40F', icon: '⚡' },
  { id: '2', title: 'React Hooks', questions: 20, color: '#9B59B6', icon: '⚛️' },
  { id: '3', title: 'CSS Grid Layouts', questions: 10, color: '#E74C3C', icon: '🎨' },
  { id: '4', title: 'Python for Beginners', questions: 25, color: '#2ECC71', icon: '🐍' },
];

const ANIMATED_VIDEOS = [
  {
    id: '1',
    title: 'Introduction to Algorithms',
    duration: '10:45',
    thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=2940&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'Understanding Data Structures',
    duration: '15:20',
    thumbnail: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=2874&auto=format&fit=crop',
  },
  {
    id: '3',
    title: 'Machine Learning Basics',
    duration: '12:30',
    thumbnail: 'https://images.unsplash.com/photo-1485796826113-174aa68fd81b?q=80&w=2940&auto=format&fit=crop',
  },
];

// Reusable Pulsing Play Button
const PulsingPlayButton = ({ onPress }) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [pulseAnim]);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.playButtonContainer}>
      <Animated.View
        style={[
          styles.playButtonPulse,
          {
            transform: [{ scale: pulseAnim }],
            opacity: pulseAnim.interpolate({
              inputRange: [1, 1.2],
              outputRange: [0.6, 0],
            }),
          },
        ]}
      />
      <View style={styles.playButtonInner}>
        <Text style={styles.playIcon}>▶</Text>
      </View>
    </TouchableOpacity>
  );
};

export default function HomeScreen() {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 900;

  const handleProfileNavigation = () => {
    navigation.navigate('Profile');
  };

  const handleAuthNavigation = () => {
    navigation.navigate('AuthunticationScreen');
  };

  const renderSidebar = () => {
    if (!isDesktop) return null;

    const navItems = [
      { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
      { id: 'courses', label: 'My Courses', icon: '📚' },
      { id: 'quizzes', label: 'Quizzes', icon: '📝', onPress: () => navigation.navigate('Quiz') },
      { id: 'doubts', label: 'Doubt Section', icon: '❓', onPress: () => navigation.navigate('DoubtScreen') },
      { id: 'messages', label: 'Messages', icon: '💬' },
      { id: 'settings', label: 'Settings', icon: '⚙️' },
    ];

    return (
      <View style={styles.sidebar}>
        <View style={styles.sidebarHeader}>
          <Text style={styles.sidebarLogoIcon}>🎓</Text>
          <Text style={styles.sidebarLogoText}>LearnPath</Text>
        </View>

        <View style={styles.sidebarNav}>
          {navItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.navItem, item.id === 'dashboard' && styles.navItemActive]}
              onPress={item.onPress}
            >
              <Text style={styles.navItemIcon}>{item.icon}</Text>
              <Text style={[styles.navItemText, item.id === 'dashboard' && styles.navItemTextActive]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity onPress={handleAuthNavigation} style={styles.logoutBtn}>
          <Text style={styles.navItemIcon}>🚪</Text>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View>
        <Text style={styles.greeting}>Hello, Student! 👋</Text>
        <Text style={styles.subtitle}>Welcome back to your learning dashboard</Text>
      </View>
      {!isDesktop && (
        <TouchableOpacity onPress={handleProfileNavigation} style={styles.profileButton}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1760&auto=format&fit=crop' }}
            style={styles.profileImage}
          />
        </TouchableOpacity>
      )}
      {isDesktop && (
        <View style={styles.desktopProfileWrap}>
          <TouchableOpacity style={styles.notificationBtn}>
            <Text style={{ fontSize: 20 }}>🔔</Text>
            <View style={styles.notificationDot} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleProfileNavigation} style={styles.profileButton}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1760&auto=format&fit=crop' }}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  const renderTrendingCourses = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Trending Courses</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={[styles.horizontalScroll, isDesktop && styles.horizontalScrollDesktop]}>
        {TRENDING_COURSES.map((course) => (
          <TouchableOpacity key={course.id} style={[styles.courseCard, { width: Math.min(width * 0.8, 320) }]} activeOpacity={0.9}>
            <Image source={{ uri: course.image }} style={styles.courseImage} />
            <View style={styles.courseContent}>
              <View style={[styles.categoryPill, { backgroundColor: course.color }]}>
                <Text style={styles.categoryText}>Technology</Text>
              </View>
              <Text style={styles.courseTitle} numberOfLines={2}>
                {course.title}
              </Text>
              <View style={styles.courseFooter}>
                <Text style={styles.instructorText}>{course.instructor}</Text>
                <View style={styles.ratingContainer}>
                  <Text style={styles.starIcon}>★</Text>
                  <Text style={styles.ratingText}>{course.rating}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderTrendingQuizzes = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Trending Quizzes</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={[styles.horizontalScroll, isDesktop && styles.horizontalScrollDesktop]}>
        {TRENDING_QUIZZES.map((quiz) => (
          <TouchableOpacity
            key={quiz.id}
            style={[styles.quizCard, { backgroundColor: quiz.color, width: Math.min(width * 0.7, 280) }]}
            activeOpacity={0.9}
          >
            <Text style={styles.quizIcon}>{quiz.icon}</Text>
            <View style={styles.quizDetails}>
              <Text style={styles.quizTitle}>{quiz.title}</Text>
              <Text style={styles.quizQuestions}>{quiz.questions} Questions</Text>
            </View>
            <View style={styles.quizPlayBtn}>
              <Text style={styles.quizPlayIcon}>▶</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderAnimatedVideos = () => {
    // On Desktop, rather than a giant list, we wrap them in a grid.
    return (
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Animated Learning</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        <View style={isDesktop ? styles.desktopVideoGrid : styles.mobileVideoList}>
          {ANIMATED_VIDEOS.map((video) => (
            <View key={video.id} style={[styles.videoCard, isDesktop && styles.videoCardDesktop]}>
              <Image source={{ uri: video.thumbnail }} style={styles.videoThumbnail} />
              <View style={styles.videoOverlay} />

              <View style={styles.videoContent}>
                <View style={styles.durationBadge}>
                  <Text style={styles.durationText}>{video.duration}</Text>
                </View>
                <PulsingPlayButton onPress={() => console.log(`Play video ${video.id}`)} />
              </View>
              <Text style={styles.videoTitle}>{video.title}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.layout}>
        {renderSidebar()}
        <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {renderHeader()}

          {/* Main sections container */}
          <View style={[styles.contentArea, isDesktop && styles.contentAreaDesktop]}>
            {renderTrendingCourses()}
            {renderTrendingQuizzes()}
            {renderAnimatedVideos()}
          </View>

          <View style={styles.bottomPadding} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  layout: {
    flex: 1,
    flexDirection: 'row', // Will be row on desktop, column on mobile
  },
  sidebar: {
    width: 260,
    backgroundColor: '#FFF',
    borderRightWidth: 1,
    borderRightColor: '#Eef0f2',
    paddingVertical: 30,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  sidebarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  sidebarLogoIcon: {
    fontSize: 28,
    marginRight: 10,
  },
  sidebarLogoText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1A1A1A',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  sidebarNav: {
    flex: 1,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  navItemActive: {
    backgroundColor: 'rgba(124,58,237,0.1)',
  },
  navItemIcon: {
    fontSize: 20,
    marginRight: 14,
    width: 24,
    textAlign: 'center',
  },
  navItemText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6b7280',
  },
  navItemTextActive: {
    color: '#7c3aed',
    fontWeight: '700',
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginTop: 20,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#EF4444',
  },
  mainContent: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: Platform.OS === 'android' ? 40 : 20,
  },
  contentArea: {
    paddingBottom: 20,
  },
  contentAreaDesktop: {
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    marginBottom: 35,
    marginTop: 10,
  },
  greeting: {
    fontSize: clamp(24, 32), // Custom clamp logic or fixed
    fontSize: 32,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: '#6B7280',
    fontWeight: '500',
  },
  desktopProfileWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  notificationBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  notificationDot: {
    position: 'absolute',
    top: 10,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  profileButton: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 5,
  },
  profileImage: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 2,
    borderColor: '#FFF',
  },
  section: {
    marginBottom: 40,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1A1A1A',
    letterSpacing: -0.3,
  },
  seeAllText: {
    fontSize: 14,
    color: '#7c3aed', // Purple to match nav
    fontWeight: '700',
    marginBottom: 2,
  },
  horizontalScroll: {
    paddingHorizontal: 20,
    paddingBottom: 20, // For shadow
    gap: 20,
  },
  horizontalScrollDesktop: {
    // On super large desktop screens, maybe we don't need horizontal scroll but grid?
    // Kept scrollable but with max sizes
  },

  // Course Card
  courseCard: {
    // Width handled dynamically
    backgroundColor: '#FFF',
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.02)',
  },
  courseImage: {
    width: '100%',
    height: 180,
  },
  courseContent: {
    padding: 20,
  },
  categoryPill: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 12,
  },
  categoryText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  courseTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 14,
    lineHeight: 26,
  },
  courseFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 14,
  },
  instructorText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '600',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  starIcon: {
    color: '#F59E0B',
    fontSize: 14,
    marginRight: 4,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#D97706',
  },

  // Quiz Card
  quizCard: {
    // Width handled dynamically
    padding: 24,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  quizIcon: {
    fontSize: 36,
    marginRight: 18,
  },
  quizDetails: {
    flex: 1,
  },
  quizTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#FFF',
    marginBottom: 6,
  },
  quizQuestions: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '600',
  },
  quizPlayBtn: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  quizPlayIcon: {
    color: '#FFF',
    fontSize: 16,
    marginLeft: 3,
  },

  // Video Section
  mobileVideoList: {
    paddingHorizontal: 20,
    gap: 20,
  },
  desktopVideoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 20,
  },
  // Video Card
  videoCard: {
    height: 220,
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 10,
    backgroundColor: '#000',
  },
  videoCardDesktop: {
    width: 340, // Fixed width for desktop grid
    flexGrow: 1, // Let it fill space equally
    maxWidth: '48%', // Ensure 2 per row
  },
  videoThumbnail: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  videoOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)', // Slightly darker
  },
  videoContent: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  durationBadge: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    backdropFilter: 'blur(4px)',
  },
  durationText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  videoTitle: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    color: '#FFF',
    fontSize: 20,
    fontWeight: '800',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },

  // Play Button Assembly
  playButtonContainer: {
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButtonPulse: {
    position: 'absolute',
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FFF',
  },
  playButtonInner: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
  },
  playIcon: {
    fontSize: 22,
    color: '#7c3aed', // Purple matches theme
    marginLeft: 4,
  },

  bottomPadding: {
    height: 60,
  },
});

function clamp(min, pref, max) {
  // Utility for clamping if needed later
  return pref;
}
