// src/components/Profile/UserGreetingCard.jsx
import { Feather } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../constants/colors';
import { MOCK_USER } from '../../constants/mockData'; // Import mock user data

const UserGreetingCard = () => (
    <View style={styles.userCard}>
        <View style={styles.avatarPlaceholder}>
            <Feather name="user" size={36} color={COLORS.textLight} />
        </View>
        <View>
            <Text style={styles.greetingText}>Hello, {MOCK_USER.name.split(' ')[1]}</Text>
            <Text style={styles.detailText}>{MOCK_USER.email}</Text>
            <Text style={styles.krishiIdText}>Krishi ID: {MOCK_USER.krishiId}</Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    userCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        margin: 10,
        backgroundColor: COLORS.card,
        borderRadius: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
    },
    avatarPlaceholder: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    greetingText: {
        fontSize: 22,
        fontWeight: '800',
        color: COLORS.textDark,
    },
    detailText: {
        fontSize: 14,
        color: COLORS.placeholder,
        marginTop: 2,
    },
    krishiIdText: {
        fontSize: 12,
        fontWeight: '600',
        color: COLORS.secondary,
        marginTop: 5,
    },
});

export default UserGreetingCard;