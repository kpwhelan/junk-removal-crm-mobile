import { StyleSheet } from 'react-native';

export const statCardStyles = StyleSheet.create({
    card: {
        width: '48%',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        alignItems: 'center',

        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 10,
        shadowOffset: {
            width: 0,
            height: 3,
        },

        elevation: 3,
    },

    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },

    title: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: 6,
        textAlign: 'center',
    },

    value: {
        fontSize: 28,
        fontWeight: '700',
        color: '#111827',
    },

    subtitle: {
        marginTop: 6,
        fontSize: 13,
        color: '#6B7280',
        textAlign: 'center',
    },
});
