import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function TaskCard({ task }) {
  const urgencyColors = { High: '#E74C3C', Medium: '#F39C12', Low: '#27AE60' };
  const color = urgencyColors[task.urgency] || '#888';

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.85}>
      <View style={styles.topRow}>
        <Text style={styles.title}>{task.title}</Text>
        <Text style={styles.reward}>${task.reward}</Text>
      </View>
      <Text style={styles.description}>{task.description}</Text>
      <View style={styles.bottomRow}>
        <Text style={[styles.urgencyBadge, { color, borderColor: color }]}>{task.urgency}</Text>
        <Text style={styles.deadline}>⏰ {task.deadline}</Text>
        <Text style={styles.category}>{task.category}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
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
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#222',
    flex: 1,
    marginRight: 8,
  },
  reward: {
    fontSize: 17,
    fontWeight: '800',
    color: '#27AE60',
  },
  description: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
    marginBottom: 10,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  urgencyBadge: {
    fontSize: 11,
    fontWeight: '700',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  deadline: {
    fontSize: 11,
    color: '#888',
    flex: 1,
  },
  category: {
    fontSize: 11,
    color: '#4A90E2',
    backgroundColor: '#EAF3FF',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
});
