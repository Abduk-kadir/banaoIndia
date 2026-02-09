import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react"; // Don't forget this!
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Complain from "../../../components/complain";
import Loader from "../../../components/loader";
import MakeReviewModal from "../../../components/makeReviewModal";
import ShowComplain from "../../../components/showComplainModal";
import {
  getcustomerBookingAction,
  resetcreateBooking,
} from "../../../redux/slices/booking/booking";

const Booking = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state?.bookings?.customerLoading);
  let bookings = useSelector((state) => state?.bookings?.customerBooking?.data);
  bookings = bookings ? bookings : [];
  const isLoading = loading;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const [isComModalVisible, setComIsModalVisible] = useState(false);
  const [comselectedService, setComSelectedService] = useState(null);

  const [isShowCompaintVisible, setShowCompaintVisible] = useState(false);
  const [showselectedComplain, setShowselectedComplain] = useState(null);

  const openReviewModal = (serviceData) => {
    setSelectedService(serviceData);
    setIsModalVisible(true);
  };
  const openComplainModal = (serviceData) => {
    console.log("open compaling");
    setComSelectedService(serviceData);
    setComIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedService(null);
  };

  const closeComplianModal = () => {
    setComIsModalVisible(false);
    setComSelectedService(null);
  };

  const openShowCompliant = (complain) => {
    setShowselectedComplain(complain);
    setShowCompaintVisible(true);
  };
  const closeShowCompliant = () => {
    setShowCompaintVisible(false);
    setShowselectedComplain(null);
  };

  const handleStatus = (status, complain) => {
    if (status == "complained") {
      console.log("ccompalins is showing");
      openShowCompliant(complain);
    }
  };

  useFocusEffect(
    useCallback(() => {
      Promise.all([
        dispatch(getcustomerBookingAction({})),
        dispatch(resetcreateBooking({})),
      ]);
    }, [dispatch]),
  );

  const getStatusStyle = (status) => {
    switch ((status || "").toLowerCase()) {
      case "confirmed":
        return { bg: "#e8f5e9", color: "#2e7d32" };
      case "complained":
        return { bg: "#fff3e0", color: "#ef6c00" };
      case "completed":
        return { bg: "#e3f2fd", color: "#1976d2" };
      case "cancelled":
        return { bg: "#ffebee", color: "#c62828" };
      case "complaint cancelled":
        return { bg: "#5fb1aaff", color: "#ffebee" };
    }
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {bookings.map((elem, index) => {
          const statusStyle = getStatusStyle(elem.status);

          return (
            <View key={index} style={styles.card}>
              {/* Header: Customer Name + Status */}
              <View style={styles.header}>
                <View style={styles.leftside}>
                  <View>
                    <Image
                      source={{ uri: elem.serviceprovider[0]?.photo }}
                      style={styles.image}
                    />
                    <Text style={styles.customerName}>
                      {elem.serviceprovider[0]?.name || "Unknown Customer"}
                    </Text>
                    <Text style={styles.email}>
                      {elem.serviceprovider[0]?.email}
                    </Text>
                    <Text>
                      {elem.bookingDate
                        ? new Date(elem.bookingDate).toLocaleDateString(
                            "en-GB",
                            {
                              weekday: "short",
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            },
                          )
                        : "-"}
                    </Text>
                  </View>
                </View>
                <View style={styles.rightside}>
                  <View>
                    <View
                      style={[
                        styles.statusBadge,
                        { backgroundColor: statusStyle?.bg },
                      ]}
                    >
                      <TouchableOpacity>
                        <Text
                          style={[
                            styles.statusText,
                            { color: statusStyle?.color },
                          ]}
                          onPress={() =>
                            handleStatus(elem.status, elem?.complaints[0])
                          }
                        >
                          {elem.status || "Unknown"}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <Text style={styles.value}>{elem.category || "-"}</Text>
                    <Text style={styles.value}>{elem.work || "-"}</Text>
                    <Text style={styles.price}>
                      ₹{" "}
                      {elem.paymentStatus == "paid"
                        ? elem.price + " Paid"
                        : elem.price}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Consistent Rows */}

              <View style={styles.buttonRow}>
                {elem.status == "confirmed" ? (
                  <>
                    <TouchableOpacity style={styles.cancelBtn}>
                      <Text style={styles.cancelBtnText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.payBtn}>
                      <Text style={styles.cancelBtnText}>Pay</Text>
                    </TouchableOpacity>
                  </>
                ) : elem.status == "complaint cancelled" ||
                  elem.status == "cancelled" ? (
                  ""
                ) : elem.status != "cancelled" &&
                  elem.status != "complained" ? (
                  <>
                    <TouchableOpacity
                      style={styles.reviewBtn}
                      onPress={() => openReviewModal(elem)}
                    >
                      <Text style={styles.reviewBtnText}>Review</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.complainBtn}
                      onPress={() => openComplainModal(elem)}
                    >
                      <Text style={styles.cancelBtnText}>Complain</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  ""
                )}
              </View>
            </View>
          );
        })}
      </ScrollView>
      {isModalVisible && (
        <MakeReviewModal
          isModalVisible={isModalVisible}
          toggleModal={closeModal}
          data={selectedService} // 传入当前点击的 booking
        />
      )}
      {isComModalVisible && (
        <Complain
          isModalVisible={isComModalVisible}
          toggleModal={closeComplianModal}
          data={comselectedService} // 传入当前点击的 booking
        />
      )}

      {isShowCompaintVisible && (
        <ShowComplain
          isModalVisible={isShowCompaintVisible}
          toggleModal={closeShowCompliant}
          data={{ ...showselectedComplain, text: "Cancel" }} // 传入当前点击的 booking
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingBottom: 40,
    backgroundColor: "white",
  },
  leftside: {
    width: "50%",
  },
  rightside: {
    width: "50%",
  },
  image: {
    width: 70,
    height: 70,
    resizeMode: "cover",
    borderRadius: 10,
    marginBottom: 1,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 12,
  },
  card: {
    backgroundColor: "#eaece4ff",
    borderRadius: 16,
    padding: 5,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  header: {
    flexDirection: "row",
  },
  customerName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  email: {
    fontSize: 13.5,
    color: "#666",
    marginTop: 3,
  },
  statusBadge: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 10,
    alignSelf: "flex-end", // keeps it aligned right
    marginBottom: 10,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },

  // Only these three lines changed — category & work now look premium
  value: {
    fontSize: 15.5,
    color: "#1f2937",
    backgroundColor: "#f1f5f9",
    alignSelf: "flex-end",
    paddingHorizontal: 5,
    paddingVertical: 6,
    borderRadius: 12,
    fontWeight: "600",
    marginBottom: 6,
  },
  price: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#2e7d32",
    backgroundColor: "#ecfdf5",
    alignSelf: "flex-end",
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 100,
  },

  cancelBtn: {
    backgroundColor: "#c55b5bff",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  payBtn: {
    backgroundColor: "#55ab72ff",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  cancelBtnText: {
    color: "white",
    fontSize: 14.5,
    fontWeight: "600",
  },
  complainBtn: {
    backgroundColor: "#f6af45ff",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  reviewBtn: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 11,
    paddingHorizontal: 32,
    borderRadius: 12,
    // orange border to make it pop
  },
  reviewBtnText: {
    color: "#271203ff", // orange text
    fontSize: 15,
    fontWeight: "600",
  },
});
export default Booking;
