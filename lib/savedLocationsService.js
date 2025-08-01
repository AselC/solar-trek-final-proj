import { db } from './firebase';
import { collection, addDoc, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';

/**
 * Add a location to the Firestore database.
 */
export const saveLocation = async (userId, location) => {
  try {
    const docRef = await addDoc(collection(db, 'saved_locations'), {
      userId,
      name: location.name,
      lat: location.lat,
      lng: location.lng,
      createdAt: new Date(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error saving location:', error);
    throw error;
  }
};

/**
 * Get all saved locations for a specific user.
 */
export const getSavedLocations = async (userId) => {
  try {
    const q = query(collection(db, 'saved_locations'), where('userId', '==', userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('Error fetching saved locations:', error);
    throw error;
  }
};

/**
 * Delete a saved location by ID.
 */
export const deleteLocation = async (locationId) => {
  try {
    await deleteDoc(doc(db, 'saved_locations', locationId));
  } catch (error) {
    console.error('Error deleting location:', error);
    throw error;
  }
};
