import React from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput } from 'react-native';
import TaskCard from '../components/TaskCard';

const TASKS = [
  {
    id: '1',
    title: 'Build a landing page',
    description: 'Create a responsive HTML/CSS landing page for a small business. Figma mockup provided.',
    reward: 40,
    urgency: 'High',
    deadline: 'Due in 2 days',
    category: 'Web Dev',
  },
  {
    id: '2',
    title: 'Edit a 5-min YouTube video',
    description: 'Cut, add captions, and export a 5-minute educational video using any editing tool.',
    reward: 25,
    urgency: 'Medium',
    deadline: 'Due in 4 days',
    category: 'Video',
  },
  {
    id: '3',
    title: 'Translate 500 words (EN → ES)',
    description: 'Accurate translation of a product description from English to Spanish.',
    reward: 15,
    urgency: 'Low',
    deadline: 'Due in 1 week',
    category: 'Translation',
  },
  {
    id: '4',
    title: 'Write a 3-page blog article',
    description: 'SEO-friendly article about sustainable living. Keyword list and outline provided.',
    reward: 30,
    urgency: 'Medium',
    deadline: 'Due in 3 days',
    category: 'Writing',
  },
  {
    id: '5',
    title: 'Design a logo for a startup',
    description: 'Create 3 logo concepts for a fintech startup. Deliverables: PNG + SVG files.',
    reward: 60,
    urgency: 'High',
    deadline: 'Due in 1 day',
    category: 'Design',
  },
];

export default function EarnScreen() {
  return (
    <View style={styles.wrapper}>
      <View style={styles.headerBar}>
        <Text style={styles.headerTitle}>💼 Earn</Text>
        <Text style={styles.headerSubtitle}>Find tasks & get paid</Text>
      </View>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.earningBanner}>
          <Text style={styles.bannerEmoji}>💰</Text>
          <View>
            <Text style={styles.bannerTitle}>Your Total Earnings</Text>
            <Text style={styles.bannerAmount}>$48.00</Text>
          </View>
        </View>

        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search tasks..."
            placeholderTextColor="#999"
          />
        </View>

        <Text style={styles.sectionTitle}>Available Tasks ({TASKS.length})</Text>
        {TASKS.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
        <View style={styles.bottomSpace} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  headerBar: {
    backgroundColor: '#27AE60',
    padding: 20,
    paddingTop: 44,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#B7EDD0',
    marginTop: 2,
  },
  container: {
    flex: 1,
  },
  earningBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#27AE60',
    marginHorizontal: 16,
    marginTop: 14,
    borderRadius: 12,
    padding: 16,
  },
  bannerEmoji: {
    fontSize: 36,
    marginRight: 14,
  },
  bannerTitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
  },
  bannerAmount: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 14,
    marginBottom: 4,
    borderRadius: 10,
    paddingHorizontal: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 42,
    fontSize: 14,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginHorizontal: 16,
    marginVertical: 10,
  },
  bottomSpace: {
    height: 24,
  },
});
