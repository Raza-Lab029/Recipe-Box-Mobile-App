import { View, Text, StyleSheet, Image } from "react-native";
import { useLocalSearchParams } from "expo-router";

const propertyData: any = {
  '1': {
    name: 'Cozy Studio Apartment',
    location: 'Bambang, Nueva Vizcaya',
    description: 'Perfect for students or young professionals.',
    image: 'https://scontent.fmnl13-4.fna.fbcdn.net/v/t39.30808-6/468323222_579801847873510_5523456564738527184_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeHo0u6_xW31qWu549jmtj_b8u-TOliDqWny75M6WIOpafbJI0JQXhC3oPVQxT5JmgRz04Ax4z6lvLLMYggS5Qse&_nc_ohc=LIfF-UWklbsQ7kNvwH8ErnD&_nc_oc=AdmX8kqCLedCdVVuSdeTafW_04W22ROUOxJYA6ALmLSdfhQNIoJN85AsPu20M23633Q8pC9mGRvRVw4QrCadjLKz&_nc_zt=23&_nc_ht=scontent.fmnl13-4.fna&_nc_gid=Hsg8KExXGMy_dLS33Kt0XA&oh=00_AfLeQ4Hp6Dv_7gJsvhPYlLsvI_dE-AcePGgM6RLOx3B-AQ&oe=682B3411',
  },
  '2': {
    name: 'Modern 2BR Condo',
    location: 'Makati',
    description: 'Spacious unit with skyline views.',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=60',
  },
};

export default function PropertyDetail() {
  const { id } = useLocalSearchParams();

  const property = propertyData[id as string];

  if (!property) {
    return (
      <View style={styles.container}>
        <Text>Property not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: property.image }} style={styles.image} />
      <Text style={styles.title}>{property.name}</Text>
      <Text style={styles.location}>{property.location}</Text>
      <Text style={styles.description}>{property.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  image: { width: '100%', height: 250, marginBottom: 20, borderRadius: 12 },
  title: { fontSize: 24, fontWeight: 'bold' },
  location: { fontSize: 16, color: '#777', marginVertical: 5 },
  description: { fontSize: 16, lineHeight: 22 },
});
