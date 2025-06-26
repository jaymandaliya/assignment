import { NativeModules, Platform } from 'react-native';

// Import the react-native-live-activities module
import LiveActivities from 'react-native-live-activity';

class LiveActivityManager {
    
    constructor() {
        this.activeActivities = new Map();
    }

    /**
     * Start a new Live Activity for order tracking
     * @param {Object} orderData - Order information
     * @returns {Promise<string>} Activity ID
     */
    async startActivity(orderData) {
        if (Platform.OS !== 'ios') {
            throw new Error('Live Activities are only supported on iOS');
        }

        try {
            const activityAttributes = {
                orderId: orderData.orderId,
                restaurant: orderData.restaurant,
                items: orderData.items,
                total: orderData.total,
                deliveryAddress: orderData.deliveryAddress
            };

            const contentState = {
                status: orderData.status,
                etaMinutes: orderData.etaMinutes,
                driverName: orderData.driver?.name || '',
                driverAvatar: orderData.driver?.avatar || '',
                timestamp: Date.now()
            };

            // Start the Live Activity
            const activityId = await LiveActivities.startActivity(
                'OrderTrackingActivity', // Activity type defined in iOS
                activityAttributes,
                contentState
            );

            this.activeActivities.set(activityId, {
                ...orderData,
                startTime: Date.now()
            });

            console.log('Live Activity started:', activityId);
            return activityId;

        } catch (error) {
            console.error('Failed to start Live Activity:', error);
            throw error;
        }
    }

    /**
     * Update an existing Live Activity
     * @param {string} activityId - Activity ID
     * @param {Object} updateData - Updated order data
     */
    async updateActivity(activityId, updateData) {
        if (Platform.OS !== 'ios') {
            return;
        }

        try {
            const contentState = {
                status: updateData.status,
                etaMinutes: updateData.etaMinutes,
                driverName: updateData.driver?.name || '',
                driverAvatar: updateData.driver?.avatar || '',
                timestamp: Date.now()
            };

            await LiveActivities.updateActivity(activityId, contentState);

            // Update local cache
            if (this.activeActivities.has(activityId)) {
                this.activeActivities.set(activityId, {
                    ...this.activeActivities.get(activityId),
                    ...updateData,
                    lastUpdate: Date.now()
                });
            }

            console.log('Live Activity updated:', activityId, updateData.status);

        } catch (error) {
            console.error('Failed to update Live Activity:', error);
            throw error;
        }
    }

    /**
     * End a Live Activity
     * @param {string} activityId - Activity ID
     */
    async endActivity(activityId) {
        if (Platform.OS !== 'ios') {
            return;
        }

        try {
            // End with final state showing delivery completion
            const finalState = {
                status: 'delivered',
                etaMinutes: 0,
                driverName: this.activeActivities.get(activityId)?.driver?.name || '',
                driverAvatar: this.activeActivities.get(activityId)?.driver?.avatar || '',
                timestamp: Date.now(),
                showRating: true
            };

            await LiveActivities.updateActivity(activityId, finalState);
            
            // End the activity after a brief delay to show final state
            setTimeout(async () => {
                await LiveActivities.endActivity(activityId);
                this.activeActivities.delete(activityId);
                console.log('Live Activity ended:', activityId);
            }, 3000);

        } catch (error) {
            console.error('Failed to end Live Activity:', error);
            throw error;
        }
    }

    /**
     * Get all active activities
     * @returns {Array} Active activities
     */
    getActiveActivities() {
        return Array.from(this.activeActivities.entries()).map(([id, data]) => ({
            id,
            ...data
        }));
    }

    /**
     * Check if device supports Live Activities
     * @returns {boolean} Support status
     */
    isSupported() {
        return Platform.OS === 'ios' && LiveActivities.isSupported();
    }

    /**
     * Request Live Activity permission
     * @returns {Promise<boolean>} Permission granted
     */
    async requestPermission() {
        if (Platform.OS !== 'ios') {
            return false;
        }

        try {
            const granted = await LiveActivities.requestPermission();
            return granted;
        } catch (error) {
            console.error('Failed to request Live Activity permission:', error);
            return false;
        }
    }
}

// Export singleton instance
export default new LiveActivityManager();