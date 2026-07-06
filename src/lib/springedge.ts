export const sendSMS = async (to: string, message: string) => {
  const apikey = process.env.SPRINGEDGE_API_KEY;
  const sender = process.env.SPRINGEDGE_SENDER_ID;

  if (!apikey || !sender) {
    console.warn("SpringEdge API key or Sender ID not configured. SMS simulation only.");
    console.log(`[SMS to ${to}]: ${message}`);
    return true; // Simulate success in dev if keys are missing
  }

  try {
    const url = new URL("https://api.springedge.com/web/send");
    url.searchParams.append("apikey", apikey);
    url.searchParams.append("sender", sender);
    url.searchParams.append("to", to);
    url.searchParams.append("message", message);
    url.searchParams.append("format", "json");

    const response = await fetch(url.toString(), {
      method: "GET",
    });

    const data = await response.json();
    console.log("SpringEdge Response:", data);
    
    if (data.status === "AWAITED-DLR") {
        return true;
    }
    
    return true;
  } catch (error) {
    console.error("Error sending SMS via SpringEdge:", error);
    return false;
  }
};

export const sendOTP = async (phone: string, otp: string) => {
  const message = `Your Alcon Enterprises verification code is: ${otp}. Valid for 5 minutes.`;
  return sendSMS(phone, message);
};

export const sendPaymentSMS = async (phone: string, orderId: string, amount: number) => {
  const message = `Your payment of Rs.${amount} for Order ${orderId} was successful! - Alcon Enterprises`;
  return sendSMS(phone, message);
};

export const sendOrderStatusSMS = async (phone: string, status: string, orderId: string) => {
  const message = `Your Order ${orderId} status has been updated to: ${status}. - Alcon Enterprises`;
  return sendSMS(phone, message);
};
