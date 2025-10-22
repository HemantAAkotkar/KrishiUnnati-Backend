// src/components/Profile/ActionItem.jsx
import { Feather } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../constants/colors';

const ActionItem = ({ iconName, title, subtitle, onPress, isDanger = false, isLastItem = false }) => (
    <TouchableOpacity 
        style={[styles.actionItem, isLastItem && { borderBottomWidth: 0 }]} 
        onPress={onPress}
    >
        <View style={styles.actionIconContainer}>
            <Feather 
                name={iconName} 
                size={22} 
                color={isDanger ? COLORS.danger : COLORS.secondary} 
            />
        </View>
        <View style={styles.actionTextContainer}>
            <Text style={styles.actionTitle}>{title}</Text>
            {subtitle && <Text style={styles.actionSubtitle}>{subtitle}</Text>}
        </View>
        <Feather name="chevron-right" size={20} color={COLORS.placeholder} />
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    actionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.divider,
    },
    actionIconContainer: {
        marginRight: 15,
        width: 30,
        alignItems: 'center',
    },
    actionTextContainer: {
        flex: 1,
    },
    actionTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: COLORS.textDark,
    },
    actionSubtitle: {
        fontSize: 12,
        color: COLORS.placeholder,
        marginTop: 2,
    },
});

export default ActionItem;