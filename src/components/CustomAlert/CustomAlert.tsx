import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Modal, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface CustomAlertProps {
  isVisible: boolean;
  title: string;
  message: string;
  onClose: () => void;
  type: 'success' | 'error' | 'info'; // Add type prop
}

const CustomAlert: React.FC<CustomAlertProps> = ({
  isVisible,
  title,
  message,
  onClose,
  type,
}) => {
  const [gradientColors, setGradientColors] = useState<string[]>([]);

  useEffect(() => {
    switch (type) {
      case 'success':
        setGradientColors(['#4CAF50', '#81C784']);
        break;
      case 'error':
        setGradientColors(['#E53935', '#EF5350']);
        break;
      case 'info':
        setGradientColors(['#1E90FF', '#4169E1']);
        break;
      default:
        setGradientColors(['#1E90FF', '#4169E1']);
    }
  }, [type]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <LinearGradient colors={gradientColors} style={styles.gradient}>
            <Text style={styles.modalTitle}>{title}</Text>
          </LinearGradient>
          <Text style={styles.modalText}>{message}</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    borderWidth: 3,
    borderColor: 'rgba(10, 3, 3, 0.5)',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
  },
  gradient: {
    width: '100%',
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    marginBottom: 5,
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    padding: 15,
    fontSize: 18,
    lineHeight: 24,
  },
  closeButton: {
    backgroundColor: '#2196F3',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  closeButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default CustomAlert;
