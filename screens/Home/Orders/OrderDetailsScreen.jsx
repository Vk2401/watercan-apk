import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, ActivityIndicator,SafeAreaView } from "react-native";
import { DataTable, Button } from "react-native-paper";
import axios from "axios";

const OrderDetailsScreen = ({ route, navigation }) => {
  const { orderId } = route.params;
  const [orderDetails, setOrderDetails] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrderDetails();
    fetchOrderHistory();
  }, []);

  const fetchOrderDetails = async () => {
    try {
      const response = await axios.get(
        `https://ezwater.muvastech.com/wp-json/wc/v3/orders/${orderId}`,
        {
          auth: {
            username: "ck_f748834b2a5a1441b3c62ed42661f72388b2dc8f", // Replace with your consumer key
            password: "cs_2a33a7799afc3c7ae4a42b8ad560c30129845d67", // Replace with your consumer secret
          },
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setOrderDetails(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching order details:", error.message);
      setLoading(false);
    }
  };

  const fetchOrderHistory = async () => {
    try {
      const response = await axios.get(
        `https://ezwater.muvastech.com/wp-json/wc/v3/orders`,
        {
          auth: {
            username: "ck_f748834b2a5a1441b3c62ed42661f72388b2dc8f", // Replace with your consumer key
            password: "cs_2a33a7799afc3c7ae4a42b8ad560c30129845d67", // Replace with your consumer secret
          },
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setOrderHistory(response.data);
    } catch (error) {
      console.error("Error fetching order history:", error.message);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <ScrollView style={{ flex: 1, padding: 16 }} className="mt-6">


      {/* Order History Section */}
      <Text style={{ fontSize: 20, fontWeight: "bold", marginVertical: 16 }} className="text-black">
        Order History
      </Text>

      {orderHistory.length > 0 ? (
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Order ID</DataTable.Title>
            <DataTable.Title numeric>Date</DataTable.Title>
            <DataTable.Title numeric>Total</DataTable.Title>
          </DataTable.Header>

          {orderHistory.map((order) => (
            <DataTable.Row key={order.id}>
              <DataTable.Cell>{order.id}</DataTable.Cell>
              <DataTable.Cell numeric>{order.date_created}</DataTable.Cell>
              <DataTable.Cell numeric>{order.total}</DataTable.Cell>
             
            </DataTable.Row>
          ))}
        </DataTable>
      ) : (
        <Text className="text-red-500 text-center">No past orders found.</Text>
      )}
    </ScrollView>
    </SafeAreaView>
  );
};

export default OrderDetailsScreen;
