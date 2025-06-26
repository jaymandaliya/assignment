import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Slider,
  Switch,
  ScrollView,
  SafeAreaView
} from 'react-native';
import { useDynamicIsland } from './useDynamicIsland';

const DynamicIslandDemo = () => {
  const { 
    startActivity, 
    updateActivity, 
    endActivity, 
    getActiveActivities,
    isActive, 
    currentActivity,
    isSupported 
  } = useDynamicIsland();
  
  const [progress, setProgress] = useState(0.3);
  const [counter, setCounter] = useState(0);
  const [autoUpdate, setAutoUpdate] = useState(false);
  const [activities, setActivities] = useState([]);
  
  // Auto-update progress
  useEffect(() => {
    let interval;
    if (autoUpdate && isActive) {
      interval = setInterval(async () => {
        const newProgress = Math.min(progress + 0.1, 1.0);
        setProgress(newProgress);
        try {
          await updateActivity(
            `🎵 Playing (${counter})`,
            `Progress: ${Math.round(newProgress * 100)}%`,
            newProgress
          );
        } catch (error) {
          console.error('Auto-update failed:', error);
        }
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [autoUpdate, isActive, progress, counter, updateActivity]);
  
  const handleStart = async () => {
    try {
      await startActivity(
        '🎵 Now Playing', 
        'React Native Song', 
        progress
      );
      Alert.alert('✅ Started!', 'Check the Dynamic Island at the top of your screen');
    } catch (error) {
      Alert.alert('❌ Error', error.message);
    }
  };
  
  const handleUpdate = async () => {
    try {
      const newCounter = counter + 1;
      setCounter(newCounter);
      await updateActivity(
        `🎵 Playing (${newCounter})`,
        `Updated ${new Date().toLocaleTimeString()}`,
        progress
      );
      Alert.alert('✅ Updated!', 'Dynamic Island content refreshed');
    } catch (error) {
      Alert.alert('❌ Error', error.message);
    }
  };
  
  const handleEnd = async () => {
    try {
      await endActivity();
      setCounter(0);
      setAutoUpdate(false);
      Alert.alert('✅ Ended!', 'Dynamic Island activity stopped');
    } catch (error) {
      Alert.alert('❌ Error', error.message);
    }
  };
  
  const refreshActivities = async () => {
    try {
      const activeActivities = await getActiveActivities();
      setActivities(activeActivities);
    } catch (error) {
      console.error('Failed to refresh activities:', error);
    }
  };
  
  const getStatusIcon = () => {
    if (!isSupported) return '❌';
    return isActive ? '🟢' : '⚫';
  };
  
  const getStatusText = () => {
    if (!isSupported) return 'Not Supported';
    return isActive ? 'Active' : 'Inactive';
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>🏝️ Dynamic Island Demo</Text>
        
        <View style={styles.statusCard}>
          <Text style={styles.statusTitle}>Status</Text>
          <Text style={styles.statusText}>
            {getStatusIcon()} {getStatusText()}
          </Text>
          {currentActivity && (
            <Text style={styles.activityInfo}>
              ID: {currentActivity.id?.substring(0, 8)}...
            </Text>
          )}
        </View>
        
        <View style={styles.controlCard}>
          <Text style={styles.controlTitle}>Progress Control</Text>
          <Text style={styles.progressLabel}>
            Progress: {Math.round(progress * 100)}%
          </Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={1}
            value={progress}
            onValueChange={setProgress}
            minimumTrackTintColor="#007AFF"
            maximumTrackTintColor="#E5E5EA"
            thumbTintColor="#007AFF"
          />
          
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Auto-update</Text>
            <Switch
              value={autoUpdate}
              onValueChange={setAutoUpdate}
              disabled={!isActive}
            />
          </View>
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[
              styles.button, 
              styles.startButton,
              isActive && styles.disabledButton
            ]} 
            onPress={handleStart}
            disabled={isActive}
          >
            <Text style={styles.buttonText}>🚀 Start Activity</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.button, 
              styles.updateButton,
              !isActive && styles.disabledButton
            ]} 
            onPress={handleUpdate}
            disabled={!isActive}
          >
            <Text style={styles.buttonText}>🔄 Update ({counter})</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.button, 
              styles.endButton,
              !isActive && styles.disabledButton
            ]} 
            onPress={handleEnd}
            disabled={!isActive}
          >
            <Text style={styles.buttonText}>⏹️ End Activity</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.refreshButton]} 
            onPress={refreshActivities}
          >
            <Text style={styles.buttonText}>🔍 Check Activities</Text>
          </TouchableOpacity>
        </View>
        
        {activities.length > 0 && (
          <View style={styles.activitiesCard}>
            <Text style={styles.activitiesTitle}>Active Activities</Text>
            {activities.map((activity, index) => (
              <Text key={index} style={styles.activityItem}>
                • {activity.title}: {activity.subtitle}
              </Text>
            ))}
          </View>
        )}
        
        <View style={styles.infoCard}>
          <Text style={styles.infoText}>
            📱 This demo works on iPhone 14 Pro/15 Pro/16 series with Dynamic Island
          </Text>
          <Text style={styles.infoText}>
            🔄 Long press the Dynamic Island to see expanded view
          </Text>
          <Text style={styles.infoText}>
            ⚠️ Must test on physical device, not simulator
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#1d1d1f',
  },
  statusCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  statusText: {
    fontSize: 16,
    color: '#666',
  },
  activityInfo: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  controlCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  controlTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
  },
  progressLabel: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  slider: {
    width: '100%',
    height: 40,
    marginBottom: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  switchLabel: {
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    marginBottom: 20,
  },
  button: {
    padding: 16,
    borderRadius: 12,
    marginVertical: 6,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  startButton: {
    backgroundColor: '#007AFF',
  },
  updateButton: {
    backgroundColor: '#FF9500',
  },
  endButton: {
    backgroundColor: '#FF3B30',
  },
  refreshButton: {
    backgroundColor: '#34C759',
  },
  disabledButton: {
    backgroundColor: '#8E8E93',
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  activitiesCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  activitiesTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  activityItem: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  infoCard: {
    backgroundColor: '#e3f2fd',
    padding: 16,
    borderRadius: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#1976d2',
    marginBottom: 4,
    textAlign: 'center',
  },
});

export default DynamicIslandDemo;
