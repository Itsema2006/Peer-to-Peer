import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Dummy Data
const DOUBTS_DATA = [
  {
    id: '1',
    question: 'How does the Doppler effect change the perceived frequency of sound waves?',
    subject: 'Physics',
    subjectIcon: '⚗️', // Simplified text icon for flask
    answers: 2,
    isMyDoubt: false,
  },
  {
    id: '2',
    question: 'What are the key properties of a matrix determinant?',
    subject: 'Mathematics',
    subjectIcon: '🔢',
    answers: 1,
    isMyDoubt: true,
  },
  {
    id: '3',
    question: 'Explain the concept of chemical equilibrium and its factors.',
    subject: 'Chemistry',
    subjectIcon: '🧪',
    answers: 0,
    isMyDoubt: false,
  },
  {
    id: '4',
    question: 'Describe the process of DNA replication in eukaryotic cells.',
    subject: 'Biology',
    subjectIcon: '🧬',
    answers: 2,
    isMyDoubt: true,
  },
  {
    id: '5',
    question: 'What is the runtime complexity of Quicksort?',
    subject: 'Computer Science',
    subjectIcon: '💻',
    answers: 0,
    isMyDoubt: false,
  },
];

const TABS = ['All Questions', 'My Doubts', 'Unanswered'];

export default function DoubtScreen() {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 900;

  const [activeTab, setActiveTab] = useState('All Questions');
  const [searchQuery, setSearchQuery] = useState('');

  const handleAuthNavigation = () => {
    navigation.navigate('AuthunticationScreen');
  };

  const renderSidebar = () => {
    if (!isDesktop) return null;

    const navItems = [
      { id: 'dashboard', label: 'Dashboard', icon: '🏠', route: 'Home' },
      { id: 'courses', label: 'My Courses', icon: '📚' },
      { id: 'quizzes', label: 'Quizzes', icon: '📝', route: 'Quiz' },
      { id: 'doubts', label: 'Doubt Section', icon: '❓', route: 'DoubtScreen' },
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
              style={[styles.navItem, item.id === 'doubts' && styles.navItemActive]}
              onPress={() => item.route && item.route !== 'DoubtScreen' && navigation.navigate(item.route)}
            >
              <Text style={styles.navItemIcon}>{item.icon}</Text>
              <Text style={[styles.navItemText, item.id === 'doubts' && styles.navItemTextActive]}>
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
      <Text style={styles.headerTitle}>Doubt Section</Text>
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );

  const renderSearchBar = () => (
    <View style={styles.searchContainer}>
      <Text style={styles.searchIcon}>🔍</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for questions"
        placeholderTextColor="#9CA3AF"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
    </View>
  );

  const renderTabs = () => (
    <View style={styles.tabsContainer}>
      {TABS.map((tab) => {
        const isActive = activeTab === tab;
        return (
          <TouchableOpacity
            key={tab}
            style={[styles.tabButton, isActive && styles.activeTabButton]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, isActive && styles.activeTabText]}>{tab}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  const renderDoubtList = () => {
    // Filter the doubts based on the active tab
    const filteredDoubts = DOUBTS_DATA.filter((doubt) => {
      // "My Doubts" includes doubts asked by the student
      if (activeTab === 'My Doubts') {
        return doubt.isMyDoubt;
      }
      // "Unanswered" includes only community questions (and maybe own) with 0 answers
      if (activeTab === 'Unanswered') {
        return doubt.answers === 0;
      }
      // "All Questions" includes all community/student questions
      return true;
    });

    // Optionally apply the search query
    const searchFilteredDoubts = filteredDoubts.filter((doubt) => 
      doubt.question.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <View style={styles.listContainer}>
        {searchFilteredDoubts.map((doubt) => (
          <TouchableOpacity key={doubt.id} style={styles.doubtCard} activeOpacity={0.7}>
            <View style={styles.doubtCardTop}>
              <Text style={styles.doubtQuestion}>{doubt.question}</Text>
              <Text style={styles.chevronIcon}>›</Text>
            </View>
            <View style={styles.doubtCardBottom}>
              <View style={styles.infoRow}>
                <Text style={styles.infoIcon}>{doubt.subjectIcon}</Text>
                <Text style={styles.infoText}>{doubt.subject}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoIcon}>💬</Text>
                <Text style={styles.infoText}>{doubt.answers} {doubt.answers === 1 ? 'answer' : 'answers'}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={[styles.infoText, { marginLeft: 10, fontStyle: 'italic', fontSize: 13 }]}>
                  {doubt.isMyDoubt ? 'You asked this' : 'Community Question'}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
        {searchFilteredDoubts.length === 0 && (
          <Text style={{ textAlign: 'center', marginTop: 40, color: '#6B7280' }}>
            No doubts found.
          </Text>
        )}
      </View>
    );
  };

  const renderBottomNav = () => {
    if (isDesktop) return null;

    const bottomNavItems = [
      { id: 'Home', label: 'Home', icon: '🏠', route: 'Home' },
      { id: 'Courses', label: 'Courses', icon: '🎓' },
      { id: 'Query', label: 'Query', icon: '❓', route: 'DoubtScreen' },
      { id: 'Profile', label: 'Profile', icon: '👤', route: 'Profile' },
    ];

    return (
      <View style={styles.bottomNav}>
        {bottomNavItems.map(item => {
          const isActive = item.id === 'Query';
          return (
            <TouchableOpacity 
              key={item.id} 
              style={styles.bottomNavItem}
              onPress={() => item.route && item.route !== 'DoubtScreen' ? navigation.navigate(item.route) : null}
            >
              <View style={[styles.bottomNavIconContainer, isActive && styles.bottomNavIconActiveContainer]}>
                <Text style={[styles.bottomNavIcon, isActive && styles.bottomNavIconActive]}>{item.icon}</Text>
              </View>
              <Text style={[styles.bottomNavText, isActive && styles.bottomNavTextActive]}>{item.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.layout}>
        {renderSidebar()}
        <View style={styles.mainContent}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <View style={[styles.contentArea, isDesktop && styles.contentAreaDesktop]}>
              {renderHeader()}
              {renderSearchBar()}
              {renderTabs()}
              {renderDoubtList()}
            </View>
          </ScrollView>
          {renderBottomNav()}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  layout: {
    flex: 1,
    flexDirection: 'row',
  },
  // Sidebar styles reused
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
    backgroundColor: 'rgba(14, 165, 233, 0.1)', // Light blue bg for active
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
    color: '#0ea5e9',
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
    backgroundColor: '#FAFAFB',
  },
  scrollContent: {
    paddingTop: Platform.OS === 'android' ? 40 : 20,
    paddingBottom: 100, // accommodate bottom nav
  },
  contentArea: {
    paddingHorizontal: 20,
  },
  contentAreaDesktop: {
    maxWidth: 900,
    alignSelf: 'center',
    width: '100%',
    paddingHorizontal: 40,
  },
  
  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    position: 'relative',
    height: 50,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.5,
  },
  addButton: {
    position: 'absolute',
    right: 0,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '400',
    marginTop: -2,
  },
  
  // Search Bar
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 24,
    paddingHorizontal: 16,
    height: 48,
    marginBottom: 24,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 8,
    color: '#9CA3AF',
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '500',
  },
  
  // Tabs
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTabButton: {
    borderBottomColor: '#0EA5E9',
  },
  tabText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#6B7280',
  },
  activeTabText: {
    color: '#111827',
  },
  
  // List
  listContainer: {
    flex: 1,
    gap: 16,
  },
  doubtCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  doubtCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  doubtQuestion: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    lineHeight: 24,
    marginRight: 16,
  },
  chevronIcon: {
    fontSize: 24,
    color: '#9CA3AF',
    marginTop: -2,
  },
  doubtCardBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  infoText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },

  // Bottom Navigation
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  bottomNavItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
  },
  bottomNavIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  bottomNavIconActiveContainer: {
    backgroundColor: '#0EA5E9', // The blue circle around active icon in bottom nav
  },
  bottomNavIcon: {
    fontSize: 22,
    color: '#6B7280',
  },
  bottomNavIconActive: {
    color: '#FFFFFF',
  },
  bottomNavText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#6B7280',
  },
  bottomNavTextActive: {
    color: '#0EA5E9',
  },
});
