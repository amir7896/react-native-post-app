import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {
  DeleteFilledIcons,
  ShareIcon,
  SettingIcon,
  BookMarkIcon,
  MinimizeIcon,
} from '../../../../assets/svgs';

interface BottomSheetContentProps {
  user: any;
  posrtUserId: string;
  closeDrawer: () => void;
  openDeleteModal: () => void;
}

const BottomSheetContent: React.FC<BottomSheetContentProps> = ({
  closeDrawer,
  user,
  posrtUserId,
  openDeleteModal,
}) => {
  const handleMinimize = () => {
    closeDrawer();
  };

  console.log('User ===>', user);
  console.log('Post User Id ===>', posrtUserId);

  return (
    <View style={styles.container}>
      {/* Minimize Icon */}
      <TouchableOpacity onPress={handleMinimize} style={styles.minimizeButton}>
        <MinimizeIcon height={25} width={25} />
      </TouchableOpacity>

      {/* Hide edit and delete icons if user is not owner of the post  */}
      {user?._id === posrtUserId ? (
        <>
          {/* Edit Icon */}
          <TouchableOpacity style={styles.button}>
            <SettingIcon height={24} width={24} style={styles.icon} />
            <View>
              <Text style={styles.buttonText}>Edit</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.separator} />
          {/* Delete Icon */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => openDeleteModal()}>
            <DeleteFilledIcons height={24} width={24} style={styles.icon} />
            <View>
              <Text style={styles.buttonText}>Delete</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.separator} />
        </>
      ) : null}

      {/* Share Icon */}
      <TouchableOpacity style={styles.button}>
        <ShareIcon height={24} width={24} style={styles.icon} />
        <View>
          <Text style={styles.buttonText}>Share</Text>
          {/* <Text style={styles.subText}>Would you like to share this post?</Text> */}
        </View>
      </TouchableOpacity>

      {/* Save Icon */}
      <View style={styles.separator} />
      <TouchableOpacity style={styles.button}>
        <BookMarkIcon height={24} width={24} style={styles.icon} />
        <View>
          <Text style={styles.buttonText}>Save post</Text>
          {/* <Text style={styles.subText}>Add this to your saved items.</Text> */}
        </View>
      </TouchableOpacity>
      <View style={styles.separator} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
    minHeight: 500,
  },
  minimizeButton: {
    alignItems: 'center',
    marginBottom: 5,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  buttonText: {
    fontSize: 15,
    color: '#000',
    marginLeft: 15,
    fontWeight: '500',
  },
  subText: {
    fontSize: 12,
    color: '#888',
    marginLeft: 15,
  },
  icon: {
    marginRight: 0,
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 5,
  },
});

export default BottomSheetContent;
