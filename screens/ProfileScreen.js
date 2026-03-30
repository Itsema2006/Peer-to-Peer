import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Dummy Student Data
const STUDENT_DATA = {
  name: 'Alex Johnson',
  email: 'alex.johnson@student.edu',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1760&auto=format&fit=crop',
  badge: 'Pro Student',
  earnings: 1245.50,
  progress: {
    coursesCompleted: 12,
    hoursLearned: 148,
    certificates: 5,
  },
  engagement: {
    streak: 14,
    globalRank: 428,
    forumPosts: 83,
  }
};

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 900;

  const handleBack = () => {
    navigation.goBack();
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={handleBack} style={styles.backButton}>
        <Text style={styles.backIcon}>←</Text>
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Student Profile</Text>
      <View style={{ width: 40 }} /> {/* Spacer for alignment */}
    </View>
  );

  const renderPersonalInfo = () => (
    <View style={styles.personalInfoCard}>
      <Image source={{ uri: STUDENT_DATA.avatar }} style={styles.avatarLarge} />
      <View style={styles.personalDetails}>
        <Text style={styles.studentName}>{STUDENT_DATA.name}</Text>
        <Text style={styles.studentEmail}>{STUDENT_DATA.email}</Text>
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeIcon}>🌟</Text>
          <Text style={styles.badgeText}>{STUDENT_DATA.badge}</Text>
        </View>
      </View>
      {isDesktop && (
        <TouchableOpacity style={styles.editProfileBtn}>
           <Text style={styles.editProfileText}>Edit Profile</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const renderEarnings = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Wallet & Earnings</Text>
      <View style={styles.earningsCard}>
        <View style={styles.earningsHeader}>
          <View>
            <Text style={styles.earningsLabel}>Total Earned</Text>
            <Text style={styles.earningsAmount}>${STUDENT_DATA.earnings.toFixed(2)}</Text>
          </View>
          <View style={styles.earningsIconBg}>
            <Text style={styles.earningsIcon}>💰</Text>
          </View>
        </View>
        
        <View style={styles.earningsActions}>
          <TouchableOpacity style={styles.withdrawBtn}>
            <Text style={styles.withdrawBtnText}>Withdraw Funds</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.historyBtn}>
            <Text style={styles.historyBtnText}>View History</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderProgress = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Learning Progress</Text>
      <View style={styles.statsGrid}>
        
        <View style={styles.statBox}>
          <View style={[styles.statIconBg, { backgroundColor: '#E0E7FF' }]}>
             <Text style={styles.statIcon}>📚</Text>
          </View>
          <Text style={styles.statValue}>{STUDENT_DATA.progress.coursesCompleted}</Text>
          <Text style={styles.statLabel}>Courses</Text>
        </View>

        <View style={styles.statBox}>
          <View style={[styles.statIconBg, { backgroundColor: '#FEF3C7' }]}>
             <Text style={styles.statIcon}>⏱️</Text>
          </View>
          <Text style={styles.statValue}>{STUDENT_DATA.progress.hoursLearned}h</Text>
          <Text style={styles.statLabel}>Studied</Text>
        </View>

        <View style={styles.statBox}>
          <View style={[styles.statIconBg, { backgroundColor: '#D1FAE5' }]}>
             <Text style={styles.statIcon}>🎓</Text>
          </View>
          <Text style={styles.statValue}>{STUDENT_DATA.progress.certificates}</Text>
          <Text style={styles.statLabel}>Certificates</Text>
        </View>

      </View>
    </View>
  );

  const renderEngagement = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>App Engagement</Text>
      <View style={styles.engagementCard}>
        
        <View style={styles.engRow}>
          <View style={styles.engLeft}>
             <Text style={styles.engIcon}>🔥</Text>
             <Text style={styles.engTitle}>Current Streak</Text>
          </View>
          <Text style={styles.engValue}>{STUDENT_DATA.engagement.streak} Days</Text>
        </View>
        
        <View style={styles.divider}/>

        <View style={styles.engRow}>
          <View style={styles.engLeft}>
             <Text style={styles.engIcon}>🏆</Text>
             <Text style={styles.engTitle}>Global Rank</Text>
          </View>
          <Text style={styles.engValue}>#{STUDENT_DATA.engagement.globalRank}</Text>
        </View>
        
        <View style={styles.divider}/>

        <View style={styles.engRow}>
           <View style={styles.engLeft}>
             <Text style={styles.engIcon}>💬</Text>
             <Text style={styles.engTitle}>Forum Activity</Text>
          </View>
          <Text style={styles.engValue}>{STUDENT_DATA.engagement.forumPosts} Posts</Text>
        </View>

      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={[styles.contentArea, isDesktop && styles.contentAreaDesktop]}>
          {renderPersonalInfo()}
          
          <View style={isDesktop ? styles.desktopColumns : null}>
             <View style={isDesktop ? styles.columnLeft : null}>
                {renderEarnings()}
                {renderEngagement()}
             </View>
             <View style={isDesktop ? styles.columnRight : null}>
                {renderProgress()}
             </View>
          </View>

          {!isDesktop && (
            <TouchableOpacity style={styles.editProfileBtnMobile}>
              <Text style={styles.editProfileText}>Edit Profile</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: Platform.OS === 'android' ? 20 : 10,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  backIcon: {
    fontSize: 24,
    color: '#1A1A1A',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  scrollContent: {
    paddingTop: 20,
  },
  contentArea: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  contentAreaDesktop: {
    maxWidth: 900,
    alignSelf: 'center',
    width: '100%',
  },
  desktopColumns: {
    flexDirection: 'row',
    gap: 30,
    alignItems: 'flex-start',
  },
  columnLeft: {
    flex: 1,
  },
  columnRight: {
    flex: 1,
  },
  
  // Personal Info Box
  personalInfoCard: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 15,
    elevation: 5,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.02)',
  },
  avatarLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#F3F4F6',
    marginRight: 20,
  },
  personalDetails: {
    flex: 1,
  },
  studentName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  studentEmail: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  badgeContainer: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  badgeIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  badgeText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#D97706',
  },
  editProfileBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
  },
  editProfileBtnMobile: {
    marginTop: 10,
    paddingVertical: 14,
    backgroundColor: '#F3F4F6',
    borderRadius: 14,
    alignItems: 'center',
  },
  editProfileText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#4B5563',
  },

  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 16,
    letterSpacing: -0.3,
  },

  // Earnings Card
  earningsCard: {
    backgroundColor: '#1E1B4B', // Deep indigo
    borderRadius: 24,
    padding: 24,
    shadowColor: '#1E1B4B',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 8,
  },
  earningsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  earningsLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 4,
    fontWeight: '500',
  },
  earningsAmount: {
    fontSize: 36,
    fontWeight: '800',
    color: '#FFF',
    letterSpacing: -1,
  },
  earningsIconBg: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  earningsIcon: {
    fontSize: 24,
  },
  earningsActions: {
    flexDirection: 'row',
    gap: 12,
  },
  withdrawBtn: {
    flex: 1,
    backgroundColor: '#A855F7',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  withdrawBtnText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '700',
  },
  historyBtn: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  historyBtnText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '600',
  },

  // Progress Stats Grid
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.02)',
  },
  statIconBg: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statIcon: {
    fontSize: 20,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },

  // Engagement
  engagementCard: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.02)',
  },
  engRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  engLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  engIcon: {
    fontSize: 20,
    marginRight: 12,
    width: 24,
    textAlign: 'center',
  },
  engTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#4B5563',
  },
  engValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1A1A1A',
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
  },
  
  bottomPadding: {
    height: 60,
  },
});
