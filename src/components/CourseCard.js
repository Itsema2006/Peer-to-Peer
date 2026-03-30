import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function CourseCard({ course }) {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.85}>
      <View style={[styles.iconBadge, { backgroundColor: course.color }]}>
        <Text style={styles.icon}>{course.icon}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.title}>{course.title}</Text>
        <Text style={styles.instructor}>by {course.instructor}</Text>
        <View style={styles.metaRow}>
          <Text style={styles.level}>{course.level}</Text>
          <Text style={styles.duration}>⏱ {course.duration}</Text>
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${course.progress}%`, backgroundColor: course.color }]} />
        </View>
        <Text style={styles.progressText}>{course.progress}% complete</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginHorizontal: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  iconBadge: {
    width: 52,
    height: 52,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  icon: {
    fontSize: 26,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#222',
    marginBottom: 2,
  },
  instructor: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  level: {
    fontSize: 11,
    color: '#4A90E2',
    fontWeight: '600',
    backgroundColor: '#EAF3FF',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  duration: {
    fontSize: 11,
    color: '#666',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#EEE',
    borderRadius: 2,
    marginBottom: 2,
  },
  progressFill: {
    height: 4,
    borderRadius: 2,
  },
  progressText: {
    fontSize: 10,
    color: '#999',
  },
});
