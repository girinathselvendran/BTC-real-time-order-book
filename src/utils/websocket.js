export const connectWebSocket = (onMessage) => {
  const socket = new WebSocket("ws://api-pub.bitfinex.com/ws/2");

  socket.onopen = () => {
    console.log("Connected to WebSocket");
    socket.send(
      JSON.stringify({
        event: "subscribe",
        channel: "book",
        symbol: "tBTCUSD",
      })
    );
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    onMessage(data);
  };

  socket.onerror = (error) => {
    console.error("WebSocket Error:", error);
  };

  socket.onclose = () => {
    console.log("WebSocket connection closed");
  };

  return socket;
};
