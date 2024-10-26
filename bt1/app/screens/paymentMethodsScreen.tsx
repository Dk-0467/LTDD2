import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const paymentMethods = [
  { id: '1', name: 'Wallet', balance: '$100.50', image: 'https://img.icons8.com/fluency/48/wallet.png' },
  { id: '2', name: 'Google Pay', image: 'https://img.icons8.com/color/48/google-pay.png' },
  { id: '3', name: 'Apple Pay', image: 'https://img.icons8.com/color/48/apple-pay.png' },
  { id: '4', name: 'Amazon Pay', image: 'https://img.icons8.com/color/48/amazon.png' },
];

const PaymentMethodsScreen = () => {
  const navigation = useNavigation();

  const renderPaymentMethod = ({ item }) => (
    <TouchableOpacity
      style={styles.paymentCard}
      onPress={() => Alert.alert('Selected Payment Method', item.name)}
    >
      <View style={styles.paymentCardInner}>
        <Image source={{ uri: item.image }} style={styles.paymentImage} />
        <Text style={styles.paymentName}>{item.name}</Text>
      </View>
      {item.balance && <Text style={styles.balance}>{item.balance}</Text>}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Credit Card Section */}
      <View style={styles.cardContainer}>
        <Text style={styles.cardTextNumber}>3897 8923 6745 4638</Text>
        <View style={styles.cardDetails}>
          <Text style={styles.cardHolder}>Robert Evans</Text>
          <Text style={styles.cardExpiry}>02/30</Text>
        </View>
      </View>

      {/* Payment Methods */}
      <FlatList
        data={paymentMethods}
        renderItem={renderPaymentMethod}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        style={styles.paymentList}
      />

      {/* Price and Pay Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.payButton} onPress={() => Alert.alert('Payment', 'Paying with Credit Card')}>
          <Text style={styles.payButtonText}>Pay from Credit Card</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414', // Full dark background
    padding: 20,
  },
  cardContainer: {
    backgroundColor: '#1F1F1F', // Dark grey card background
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  cardTextNumber: {
    fontSize: 22,
    color: '#FFF', // White card number
    letterSpacing: 3,
    marginBottom: 20,
  },
  cardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cardHolder: {
    fontSize: 16,
    color: '#D3D3D3', // Light grey for cardholder name
  },
  cardExpiry: {
    fontSize: 16,
    color: '#D3D3D3', // Light grey for expiry date
  },
  paymentList: {
    marginBottom: 20,
  },
  paymentCard: {
    backgroundColor: '#262626', // Dark payment method background
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  paymentCardInner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentImage: {
    width: 40,
    height: 40,
    marginRight: 15,
  },
  paymentName: {
    fontSize: 18,
    color: '#FFF', // White text for payment method names
  },
  balance: {
    fontSize: 16,
    color: '#FFF', // White balance text
  },
  bottomContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#333', // Subtle divider
  },
  price: {
    color: '#FFF', // White text for price
    fontSize: 32, // Larger font size for price
    fontWeight: 'bold',
    marginBottom: 20,
  },
  payButton: {
    backgroundColor: '#FF7F00', // Bright orange pay button
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  payButtonText: {
    color: '#FFF', // White text on the button
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PaymentMethodsScreen;
