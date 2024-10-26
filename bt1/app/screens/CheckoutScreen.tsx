import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getOrderById } from '../api/apiService'; 

const CheckoutScreen = ({ navigation, route }: { navigation: any; route: any }) => {
  const { orderId } = route.params; // Lấy orderId từ params nếu có
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Lấy thông tin đơn hàng từ API
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderData = await getOrderById(orderId); // Sử dụng hàm getOrderById
        setOrder(orderData);
      } catch (err) {
        setError('Failed to load order data.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  const handlePayment = () => {
    navigation.navigate('PaymentConfirmation'); // Navigate to the payment confirmation screen
  };

  const handleChangePaymentMethod = () => {
    navigation.navigate('PaymentMethods'); // Navigate to the payment methods screen
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }


  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Shipping Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Shipping Information</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>{order.user_name}</Text>
          <Text style={styles.infoText}>{order.total_amount}</Text>
          <Text style={styles.infoText}>{order.created_at}</Text>
          <Text style={styles.infoText}>{order.updated_at}</Text>
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Ionicons name="pencil" size={20} color="#007BFF" />
          <Text style={styles.editButtonText}> Edit</Text>
        </TouchableOpacity>
      </View>

      {/* Payment Method */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Method</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>{order.payment_method}</Text>
        </View>
        <TouchableOpacity style={styles.editButton} onPress={handleChangePaymentMethod}>
          <Ionicons name="pencil" size={20} color="#007BFF" />
          <Text style={styles.editButtonText}> Change</Text>
        </TouchableOpacity>
      </View>

      {/* Payment Button */}
      <TouchableOpacity style={styles.paymentButton} onPress={handlePayment}>
        <Text style={styles.paymentButtonText}>Proceed to Payment</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  infoBox: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  infoText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  editButton: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    padding: 5,
    marginTop: 5,
  },
  editButtonText: {
    color: '#007BFF',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  orderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  orderLabel: {
    fontSize: 16,
    color: '#333',
  },
  orderValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#d17842',
  },
  paymentButton: {
    backgroundColor: '#6b4226',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  paymentButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});