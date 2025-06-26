import { NativeModules, Platform } from 'react-native';
import { useCallback, useState, useEffect } from 'react';

const { DynamicIslandModule } = NativeModules;

export const useDynamicIsland = () => {
  const [isActive, setIsActive] = useState(false);
  const [currentActivity, setCurrentActivity] = useState(null);
  
  const checkSupport = useCallback(() => {
    if (Platform.OS !== 'ios') return false;
    if (!DynamicIslandModule) return false;
    
    try {
      const constants = DynamicIslandModule.getConstants?.() || {};
      return constants.isSupported === true;
    } catch (error) {
      console.error('Error checking support:', error);
      return false;
    }
  }, []);
  
  const startActivity = useCallback(async (title, subtitle, progress = null) => {
    if (!DynamicIslandModule) {
      throw new Error('DynamicIslandModule not found. Make sure to rebuild iOS app.');
    }
    
    try {
      const result = await DynamicIslandModule.startActivity(title, subtitle, progress);
      setIsActive(true);
      setCurrentActivity(result);
      console.log('✅ Dynamic Island started:', result);
      return result;
    } catch (error) {
      console.error('❌ Failed to start Dynamic Island:', error);
      throw error;
    }
  }, []);
  
  const updateActivity = useCallback(async (title, subtitle, progress = null) => {
    if (!DynamicIslandModule) {
      throw new Error('DynamicIslandModule not found');
    }
    
    try {
      await DynamicIslandModule.updateActivity(title, subtitle, progress);
      console.log('✅ Dynamic Island updated');
      return true;
    } catch (error) {
      console.error('❌ Failed to update Dynamic Island:', error);
      throw error;
    }
  }, []);
  
  const endActivity = useCallback(async () => {
    if (!DynamicIslandModule) {
      throw new Error('DynamicIslandModule not found');
    }
    
    try {
      await DynamicIslandModule.endActivity();
      setIsActive(false);
      setCurrentActivity(null);
      console.log('✅ Dynamic Island ended');
      return true;
    } catch (error) {
      console.error('❌ Failed to end Dynamic Island:', error);
      throw error;
    }
  }, []);
  
  const getActiveActivities = useCallback(async () => {
    if (!DynamicIslandModule) return [];
    
    try {
      const activities = await DynamicIslandModule.getActiveActivities();
      return activities;
    } catch (error) {
      console.error('Error getting activities:', error);
      return [];
    }
  }, []);
  
  useEffect(() => {
    if (checkSupport()) {
      getActiveActivities().then(activities => {
        setIsActive(activities.length > 0);
      });
    }
  }, []);
  
  return {
    startActivity,
    updateActivity,
    endActivity,
    getActiveActivities,
    isActive,
    currentActivity,
    isSupported: checkSupport()
  };
};
