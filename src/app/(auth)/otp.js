import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/loader";
import ToastMessage from "../../components/toastmessage";
import { emailVerifyAction, enterEmailAction } from "../../redux/slices/email/emailSlice";

const Otp = () => {
  const dispatch = useDispatch();
  const email = useSelector((state) =>state.emails.email.data);
  const loading = useSelector((state) => state.emails.verifyLoading);
  const emailLoading = useSelector((state) => state?.emails?.emailLoading);
  const success = useSelector((state) => state?.emails?.verifyData?.success);
  const errormessage = useSelector(
    (state) => state?.emails?.verifyError?.message
  );
  const successMessage = useSelector(
    (state) => state?.emails?.verifyData?.message
  );
  const emailSuccess = useSelector((state) => state?.emails?.email?.success);
  console.log("error message", errormessage);
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(300);
  const [isExpired, setIsExpired] = useState(false);
  const handleSubmit = () => {
    dispatch(emailVerifyAction({ email, otp }));
  };
  const handleResentOtp = async () => {
    setTimeLeft(300); // Reset timer
    setIsExpired(false); // Reset expiration
    setOtp(""); // Clear OTP input
    const result = await dispatch(enterEmailAction({ email }));
    if (enterEmailAction.fulfilled.match(result)) {
      ToastMessage(
        "success",
        "OTP Resent",
        "Check your message box for the new OTP."
      );
    } else {
      ToastMessage(
        "error",
        "Failed to resend OTP",
        result.payload?.message || "Try again"
      );
    }
   
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    if (success) {
      ToastMessage("success", successMessage, "please select user type");
      setTimeout(() => {
        router.replace("userType");
      }, 500);
    }

    if (timeLeft <= 0) {
      setIsExpired(true);
      ToastMessage("error", "Otp expired", "please request for new otp");
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer); // Cleanup on unmount
  }, [timeLeft]);

  return (
    <View style={styles.container}>
      {loading || emailLoading ? (
        <Loader />
      ) : (
        <>
          <Text style={styles.head}>Go to Your Gmail</Text>
          <Text style={styles.timer}>{formatTime(timeLeft)}</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Otp"
            value={otp}
            onChangeText={setOtp}
            keyboardType="numeric"
            maxLength={6}
          />
          {errormessage && (
            <Text style={{ color: "red", marginBottom: 20 }}>
              {errormessage}
            </Text>
          )}
          <TouchableOpacity
            style={[styles.button, isExpired && styles.buttonDisabled]}
            onPress={handleSubmit}
            disabled={isExpired}
          >
            <Text
              style={{ fontSize: 23, color: "white" }}
              onPress={handleSubmit}
            >
              Submit
            </Text>
          </TouchableOpacity>
          {isExpired && (
            <TouchableOpacity
              onPress={handleResentOtp}
              style={{ marginTop: 20 }}
            >
              <Text style={{ fontSize: 16, color: "#4626f9" }}>Resend OTP</Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  input: {
    fontSize: 16,
    borderWidth: 0.3,
    paddingTop: 20,
    paddingBottom: 20,
    marginBottom: 20,
    borderRadius: 5,
    borderColor: "#bfb9e4",
    paddingHorizontal: 80,
  },
  button: {
    backgroundColor: "#ffe003",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    paddingHorizontal: 80,
  },
  head: {
    marginTop: 40,
    fontSize: 22,
    marginBottom: 30,
    fontWeight: "400",
  },
  timer: {
    fontSize: 24, // Larger font for visibility
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  resendButton: {
    marginTop: 10,
    padding: 10,
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
});

export default Otp;
