import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Welcome to Peer2Peer 👋</Text>
        <Text style={styles.subtitle}>Learn skills. Earn money. All in one place.</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Courses</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>5</Text>
          <Text style={styles.statLabel}>Tasks Done</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>$48</Text>
          <Text style={styles.statLabel}>Earned</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Quick Access</Text>

      <TouchableOpacity
        style={[styles.quickCard, { backgroundColor: '#4A90E2' }]}
        onPress={() => navigation.navigate('Learn')}
      >
        <Text style={styles.quickCardIcon}>📚</Text>
        <View>
          <Text style={styles.quickCardTitle}>Start Learning</Text>
          <Text style={styles.quickCardDesc}>Browse courses and tutorials</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.quickCard, { backgroundColor: '#27AE60' }]}
        onPress={() => navigation.navigate('Earn')}
      >
        <Text style={styles.quickCardIcon}>💼</Text>
        <View>
          <Text style={styles.quickCardTitle}>Find Tasks</Text>
          <Text style={styles.quickCardDesc}>Pick up gigs and earn money</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    backgroundColor: '#4A90E2',
    padding: 24,
    paddingTop: 40,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#D0E8FF',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  statCard: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  statLabel: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginHorizontal: 16,
    marginBottom: 12,
  },
  quickCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    padding: 16,
  },
  quickCardIcon: {
    fontSize: 32,
    marginRight: 14,
  },
  quickCardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  quickCardDesc: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 2,
  },
});
