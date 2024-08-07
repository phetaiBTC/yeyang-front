// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, ActivityIndicator, StyleSheet, Button, Alert } from 'react-native';
// import axios from 'axios';
// import { useNavigation } from '@react-navigation/native'; // Import useNavigation

// const HomeScreen = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigation = useNavigation(); // Use navigation hook

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get('http://192.168.43.8:3000/client-api/get-users?page=1&perpage=10&search=');
//         setUsers(response.data.info);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   const handleEdit = (userId) => {
//     navigation.navigate('Edit', { userId });
//   };

//   const handleDelete = async (userId) => {
//     Alert.alert(
//       'Delete User',
//       'Are you sure you want to delete this user?',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         { 
//           text: 'OK', 
//           onPress: async () => {
//             try {
//               await axios.delete(`http://192.168.43.8:3000/client-api/delete-users/${userId}`);
//               setUsers(users.filter(user => user._id !== userId));
//             } catch (err) {
//               setError(err.message);
//             }
//           } 
//         }
//       ]
//     );
//   };

//   if (loading) {
//     return <ActivityIndicator size="large" color="#0000ff" />;
//   }

//   if (error) {
//     return <Text>Error: {error}</Text>;
//   }

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={users}
//         keyExtractor={(item) => item._id}
//         renderItem={({ item }) => (
//           <View style={styles.item}>
//             <Text>Email: {item.email}</Text>
//             <Text>firstName: {item.firstName}</Text>
//             <Text>lastName: {item.lastName}</Text>
//             <Text>Mobile: {item.mobile}</Text>
//             <Text>Role: {item.role}</Text>
//             <Text>Created At: {item.createdAt}</Text>
//             <View style={styles.buttonsContainer}>
//               <Button title="Edit" onPress={() => handleEdit(item._id)} />
//               <Button title="Delete" color="red" onPress={() => handleDelete(item._id)} />
//             </View>
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   item: {
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
//   buttonsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 8,
//   },
// });

// export default HomeScreen;
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Button, Alert, TextInput } from 'react-native';
import axios from 'axios';
import { getUser } from '../apis/apiService';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const HomeScreen = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState("1");
  const [perPage, setPerPage] = useState("10");
  const [search, setSearch] = useState('');
  const [error, setError] = useState(null);
  const navigation = useNavigation(); // Use navigation hook
  
  
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const userData = await getUser(page, perPage, search);
        setUsers(userData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page, perPage, search]);

  const handleEdit = (userId) => {
    
    navigation.navigate('Edit', { userId });
  };

  const handleDelete = async (userId) => {
    Alert.alert(
      'Delete User',
      'Are you sure you want to delete this user?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: async () => {
            try {
              await axios.delete(`http://192.168.43.8:3000/client-api/delete-users/${userId}`);
              setUsers(users.filter(user => user._id !== userId));
            } catch (err) {
              setError(err.message);
            }
          }
        }
      ]
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }
  const handleNextPage = () => {
    let paGe=parseInt(page)
    let up = (paGe+1)
    let text = up.toString();
    setPage(text);
  };

  const handlePreviousPage = () => {
    let paGe=parseInt(page)
    let down = (paGe-1)
    let text = down.toString();
    setPage(text); // Ensure page doesn't go below 1
  };
  return (
    <View style={styles.container}>
      <Text>Page:</Text>
      <TextInput
        style={styles.input}
        value={page}
        onChangeText={setPage} />
      <Text>PerPage:</Text>
      <TextInput
        style={styles.input}
        value={perPage}
        onChangeText={setPerPage} />
      <Text>Search:</Text>
      <TextInput
        style={styles.input}
        value={search}
        onChangeText={setSearch} />
      <FlatList
        data={users}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>Email: {item.email}</Text>
            <Text>firstName: {item.firstName}</Text>
            <Text>lastName: {item.lastName}</Text>
            <Text>Mobile: {item.mobile}</Text>
            <Text>Role: {item.role}</Text>
            <Text>Created At: {item.createdAt}</Text>
            <View style={styles.buttonsContainer}>
              <Button title="Edit" onPress={() => handleEdit(item._id)} />
              <Button title="Delete" color="red" onPress={() => handleDelete(item._id)} />
            </View>
          </View>
        )}
      />
      <View style={styles.paginationButtons}>
        <Button
          title="Back"
          onPress={handlePreviousPage}
          disabled={page <= 1 || loading} // Disable if on first page
        />
        <Button
          title="Next"
          onPress={handleNextPage}
          disabled={loading} // Disable while loading
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
  },
  paginationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
});

export default HomeScreen;
