import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#0a0a0a",
    color: "white",
    padding: 40,
    fontSize: 12,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    color: "#d4af37",
    fontSize: 18,
  },
  section: {
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default function InvoicePDF({ invoice }) {
  const subtotal = Number(invoice.amount);
  const tax = invoice.tax_enabled ? (subtotal * invoice.tax_rate) / 100 : 0;
  const total = subtotal + tax;

  return (
    <Document>
      <Page size="A4" style={styles.page}>

        <View style={styles.header}>
          <Text style={styles.title}>COLE LEY CO., LTD</Text>
          <Text>INVOICE #{invoice.invoice_number}</Text>
          <Text>{invoice.date}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>BILL TO</Text>
          <Text>{invoice.client}</Text>
          <Text>{invoice.client_address}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>ITEMS</Text>
          {invoice.items.map((item, i) => (
            <View key={i} style={styles.row}>
              <Text>{item.description}</Text>
              <Text>{(item.qty * item.price).toFixed(2)} THB</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text>Subtotal: {subtotal.toFixed(2)}</Text>
          {invoice.tax_enabled && (
            <Text>VAT: {tax.toFixed(2)}</Text>
          )}
          <Text style={styles.title}>TOTAL: {total.toFixed(2)} THB</Text>
        </View>

      </Page>
    </Document>
  );
}