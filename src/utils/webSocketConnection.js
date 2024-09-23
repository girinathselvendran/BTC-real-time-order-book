class OrderBookWebSocketClass {
  constructor() {
    this._ws = null;
    this._isConnecting = false;
    this._isClosing = false;
  }

  init(onOpen, onMessage, onError) {
    if (this._ws || this._isConnecting || this._isClosing) {
      return {
        success: false,
      };
    }

    this._isConnecting = true;
    this._ws = new WebSocket("wss://api-pub.bitfinex.com/ws/2");
    this._ws.onopen = () => {
      this._isConnecting = false;
      this._ws.send(
        JSON.stringify({
          event: "subscribe",
          channel: "book",
          symbol: "tBTCUSD",
        })
      );
      if (onOpen) {
        onOpen();
      }
    };

    this._ws.onmessage = (msg) => {
      if (onMessage) {
        onMessage(msg);
      }
    };

    this._ws.onerror = (error) => {
      console.error(error);
      if (onError) {
        onError();
      }
    };

    return {
      success: true,
    };
  }

  close(onClose) {
    if (this._ws) {
      this._isClosing = true;
      this._ws.close(1000);
      this._ws.onclose = () => {
        this._isClosing = false;
        if (onClose) {
          onClose();
        }
      };
      this._ws = null;
    }
  }
}

export const OrderBookWebSocket = new OrderBookWebSocketClass();
