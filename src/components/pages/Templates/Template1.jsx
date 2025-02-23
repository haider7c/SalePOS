import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 5,
    fontSize: 6,
    fontFamily: "Helvetica",
    width: 144,
    height: 288,
  },
  header: {
    textAlign: "center",
    marginBottom: 5,
  },
  section: {
    marginBottom: 3,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 0.5,
    borderBottomColor: "#000",
    paddingVertical: 2,
  },
  boldText: {
    fontWeight: "bold",
    fontSize: 7,
  },
  total: {
    marginTop: 5,
    textAlign: "right",
    fontSize: 8,
    fontWeight: "bold",
  },
});

const Template1 = () => {
  return (
    <Document>
      <Page size={{ width: 144, height: 288 }} style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.boldText}>Business Name</Text>
          <Text>123 Street, City, Country</Text>
          <Text>Phone: +123 456 7890</Text>
          <Text>Date: 898989</Text>
        </View>

        {/* Customer Info */}
        <View style={styles.section}>
          <Text style={styles.boldText}>Customer Details:</Text>
          <Text>Name: Noor Fatima</Text>
          <Text>Phone: 03054141975</Text>
        </View>

        {/* Items */}
        <View style={styles.section}>
          <Text style={styles.boldText}>Items:</Text>
            <View style={styles.row}>
              <Text>(S/N: 1) Item Name</Text>
              <Text>$290</Text>
            </View>
        </View>

        {/* Total */}
        <Text style={styles.total}>Total Due: $290</Text>
      </Page>
    </Document>
  );
};

export default Template1;