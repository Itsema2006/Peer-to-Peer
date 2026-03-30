import React from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput } from 'react-native';
import CourseCard from '../components/CourseCard';

const COURSES = [
  {
    id: '1',
    title: 'JavaScript for Beginners',
    instructor: 'Alice Johnson',
    level: 'Beginner',
    duration: '8 hrs',
    progress: 60,
    icon: '🌐',
    color: '#F7DF1E',
  },
  {
    id: '2',
    title: 'React Native Fundamentals',
    instructor: 'Bob Williams',
    level: 'Intermediate',
    duration: '12 hrs',
    progress: 30,
    icon: '📱',
    color: '#61DAFB',
  },
  {
    id: '3',
    title: 'Python Data Science',
    instructor: 'Carol Smith',
    level: 'Intermediate',
    duration: '15 hrs',
    progress: 0,
    icon: '🐍',
    color: '#3776AB',
  },
  {
    id: '4',
    title: 'Graphic Design Basics',
    instructor: 'David Lee',
    level: 'Beginner',
    duration: '6 hrs',
    progress: 100,
    icon: '🎨',
    color: '#E91E63',
  },
  {
    id: '5',
    title: 'Digital Marketing',
    instructor: 'Eva Martinez',
    level: 'Beginner',
    duration: '10 hrs',
    progress: 45,
    icon: '📣',
    color: '#FF5722',
  },
];

export default function LearnScreen() {
  return (
    <View style={styles.wrapper}>
      <View style={styles.headerBar}>
        <Text style={styles.headerTitle}>📚 Learn</Text>
        <Text style={styles.headerSubtitle}>Sharpen your skills</Text>
      </View>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search courses..."
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.filterRow}>
          {['All', 'Beginner', 'Intermediate', 'Advanced'].map((f) => (
            <View
              key={f}
              style={[styles.filterChip, f === 'All' && styles.filterChipActive]}
            >
              <Text style={[styles.filterText, f === 'All' && styles.filterTextActive]}>{f}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Available Courses ({COURSES.length})</Text>
        {COURSES.map((course) => (
          <CourseCard key={course.id} course={course} />
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
    backgroundColor: '#4A90E2',
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
    color: '#D0E8FF',
    marginTop: 2,
  },
  container: {
    flex: 1,
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
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: '#E9EEF4',
  },
  filterChipActive: {
    backgroundColor: '#4A90E2',
  },
  filterText: {
    fontSize: 12,
    color: '#555',
    fontWeight: '600',
  },
  filterTextActive: {
    color: '#fff',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginHorizontal: 16,
    marginBottom: 10,
  },
  bottomSpace: {
    height: 24,
  },
});
