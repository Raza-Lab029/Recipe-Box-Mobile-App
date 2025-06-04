import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

const properties = [
  {
    id: '1',
    name: 'Cozy Studio Apartment',
    location: 'Bambang, Nueva Vizcaya',
    image: 'https://scontent.fmnl13-4.fna.fbcdn.net/v/t39.30808-6/468323222_579801847873510_5523456564738527184_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeHo0u6_xW31qWu549jmtj_b8u-TOliDqWny75M6WIOpafbJI0JQXhC3oPVQxT5JmgRz04Ax4z6lvLLMYggS5Qse&_nc_ohc=LIfF-UWklbsQ7kNvwH8ErnD&_nc_oc=AdmX8kqCLedCdVVuSdeTafW_04W22ROUOxJYA6ALmLSdfhQNIoJN85AsPu20M23633Q8pC9mGRvRVw4QrCadjLKz&_nc_zt=23&_nc_ht=scontent.fmnl13-4.fna&_nc_gid=Hsg8KExXGMy_dLS33Kt0XA&oh=00_AfLeQ4Hp6Dv_7gJsvhPYlLsvI_dE-AcePGgM6RLOx3B-AQ&oe=682B3411',
  },
  {
    id: '2',
    name: 'Modern 2BR Condo',
    location: 'Makati',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=60',
  },
];

export default function PropertyList() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Available Properties</Text>
      <FlatList
        data={properties}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/properties/${item.id}`)}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.location}>{item.location}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  header: { fontSize: 26, fontWeight: 'bold', marginBottom: 20 },
  card: { marginBottom: 15, borderRadius: 12, overflow: 'hidden', backgroundColor: '#eee' },
  image: { width: '100%', height: 160 },
  info: { padding: 10 },
  name: { fontSize: 18, fontWeight: '600' },
  location: { fontSize: 14, color: '#777' },
});
