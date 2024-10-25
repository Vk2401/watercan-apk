import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
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
            username: "your_consumer_key", // Replace with your consumer key
            password: "your_consumer_secret", // Replace with your consumer secret
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
            username: "your_consumer_key", // Replace with your consumer key
            password: "your_consumer_secret", // Replace with your consumer secret
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
    <ScrollView style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 16 }}>
        Order Details
      </Text>

      {/* Order Details Table */}
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Product</DataTable.Title>
          <DataTable.Title numeric>Quantity</DataTable.Title>
          <DataTable.Title numeric>Price</DataTable.Title>
        </DataTable.Header>

        {orderDetails.line_items.map((item) => (
          <DataTable.Row key={item.id}>
            <DataTable.Cell>{item.name}</DataTable.Cell>
            <DataTable.Cell numeric>{item.quantity}</DataTable.Cell>
            <DataTable.Cell numeric>{item.total}</DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>

      {/* Order History Section */}
      <Text style={{ fontSize: 20, fontWeight: "bold", marginVertical: 16 }}>
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
              <DataTable.Cell>
                <Button
                  onPress={() =>
                    navigation.navigate("Orders", { orderId: order.id })
                  }
                >
                  View Details
                </Button>
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      ) : (
        <Text>No past orders found.</Text>
      )}
    </ScrollView>
  );
};

export default OrderDetailsScreen;
