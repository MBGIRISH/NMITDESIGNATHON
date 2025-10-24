import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../firebase';

const sampleDustbins = [
  {
    name: 'Main Street Bin',
    location: { lat: 12.9716, lng: 77.5946 },
    threshold: 80,
    currentFill: 45,
    status: 'Available'
  },
  {
    name: 'Park Avenue Bin',
    location: { lat: 12.9726, lng: 77.5956 },
    threshold: 75,
    currentFill: 85,
    status: 'Full'
  },
  {
    name: 'Shopping Mall Bin',
    location: { lat: 12.9706, lng: 77.5936 },
    threshold: 90,
    currentFill: 30,
    status: 'Available'
  },
  {
    name: 'Bus Station Bin',
    location: { lat: 12.9736, lng: 77.5966 },
    threshold: 70,
    currentFill: 75,
    status: 'Full'
  },
  {
    name: 'School Zone Bin',
    location: { lat: 12.9696, lng: 77.5926 },
    threshold: 85,
    currentFill: 20,
    status: 'Available'
  }
];

export const initializeSampleData = async () => {
  if (!isFirebaseConfigured()) {
    console.warn('Firebase is not configured. Cannot initialize sample data.');
    return false;
  }

  try {
    // Check if dustbins collection already has data
    const dustbinsSnapshot = await getDocs(collection(db, 'dustbins'));
    
    if (!dustbinsSnapshot.empty) {
      console.log('Sample data already exists. Skipping initialization.');
      return true;
    }

    // Add sample dustbins
    console.log('Initializing sample data...');
    const promises = sampleDustbins.map(dustbin => 
      addDoc(collection(db, 'dustbins'), dustbin)
    );
    
    await Promise.all(promises);
    console.log('Sample data initialized successfully!');
    return true;
  } catch (error) {
    console.error('Error initializing sample data:', error);
    return false;
  }
};

export const clearAllData = async () => {
  if (!isFirebaseConfigured()) {
    console.warn('Firebase is not configured. Cannot clear data.');
    return false;
  }

  try {
    const dustbinsSnapshot = await getDocs(collection(db, 'dustbins'));
    const deletePromises = dustbinsSnapshot.docs.map(doc => doc.ref.delete());
    await Promise.all(deletePromises);
    console.log('All data cleared successfully!');
    return true;
  } catch (error) {
    console.error('Error clearing data:', error);
    return false;
  }
};
