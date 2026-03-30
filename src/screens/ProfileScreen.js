import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';

const SKILLS = ['JavaScript', 'React Native', 'Python', 'Graphic Design', 'Content Writing'];

const BADGES = [
  { icon: '🏅', label: 'First Course' },
  { icon: '💰', label: 'First Earn' },
  { icon: '🔥', label: '7-Day Streak' },
];

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>JS</Text>
        </View>
        <Text style={styles.name}>John Student</Text>
        <Text style={styles.username}>@johnstudent</Text>
        <Text style={styles.bio}>Passionate learner & freelancer 🚀</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Text style={styles.statNum}>5</Text>
          <Text style={styles.statLbl}>Courses</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.stat}>
          <Text style={styles.statNum}>3</Text>
          <Text style={styles.statLbl}>Tasks</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.stat}>
          <Text style={styles.statNum}>$48</Text>
          <Text style={styles.statLbl}>Earned</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>🏆 Badges</Text>
      <View style={styles.badgeRow}>
        {BADGES.map((b) => (
          <View key={b.label} style={styles.badge}>
            <Text style={styles.badgeIcon}>{b.icon}</Text>
            <Text style={styles.badgeLabel}>{b.label}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>🛠 Skills</Text>
      <View style={styles.skillRow}>
        {SKILLS.map((s) => (
          <View key={s} style={styles.skillChip}>
            <Text style={styles.skillText}>{s}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.editBtn}>
        <Text style={styles.editBtnText}>Edit Profile</Text>
      </TouchableOpacity>
      <View style={styles.bottomSpace} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  headerCard: {
    backgroundColor: '#4A90E2',
    alignItems: 'center',
    paddingTop: 44,
    paddingBottom: 28,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 28,
    fontWeight: '800',
    color: '#4A90E2',
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  username: {
    fontSize: 13,
    color: '#D0E8FF',
    marginTop: 2,
  },
  bio: {
    fontSize: 13,
    color: '#E8F4FF',
    marginTop: 6,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
  },
  stat: {
    alignItems: 'center',
  },
  statNum: {
    fontSize: 20,
    fontWeight: '800',
    color: '#4A90E2',
  },
  statLbl: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  divider: {
    width: 1,
    height: 32,
    backgroundColor: '#E0E0E0',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginHorizontal: 16,
    marginBottom: 10,
    marginTop: 4,
  },
  badgeRow: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    marginBottom: 16,
    gap: 10,
  },
  badge: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    flex: 1,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
  },
  badgeIcon: {
    fontSize: 28,
    marginBottom: 4,
  },
  badgeLabel: {
    fontSize: 11,
    color: '#555',
    textAlign: 'center',
    fontWeight: '600',
  },
  skillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 20,
  },
  skillChip: {
    backgroundColor: '#EAF3FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  skillText: {
    color: '#4A90E2',
    fontWeight: '600',
    fontSize: 13,
  },
  editBtn: {
    marginHorizontal: 16,
    backgroundColor: '#4A90E2',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
  },
  editBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
  bottomSpace: {
    height: 24,
  },
});
