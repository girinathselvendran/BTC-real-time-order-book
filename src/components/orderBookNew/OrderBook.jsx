import React, { useCallback, useEffect, useState } from 'react';
import { RecordsList } from './RecordsList';
import './OrderBook.scss';
import { useSelector, useDispatch } from 'react-redux';
import { addAsks, addBids, setConnected } from '../../redux/orderBookSlice';
import { OrderBookWebSocket } from '../../utils/webSocketConnection';


export const OrderBook = () => {
  const dispatch = useDispatch();
  const { bids, asks, connected } = useSelector(state => state.orderBook);
  const [error, setError] = useState(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [isDisconnecting, setIsDisconnecting] = useState(false)

  const connect = useCallback(() => {
    setIsConnecting(true)
    const { success } = OrderBookWebSocket.init(
      () => {
        setIsConnecting(false)
        dispatch(setConnected(true))
        setError(null)
      },
      (msg) => {
        try {
          const data = JSON.parse(msg.data)

          if (!Array.isArray(data)) {
            setConnected(false)
            return
          }

          const [channelId, ...newRows] = JSON.parse(msg.data);
          const total = 0

          const newBids = []
          const newAsks = []
          newRows.forEach(([price, count, amount]) => {
            if (amount > 0) {
              newBids.push({ channelId, price, count, amount, total })
            } else {
              newAsks.push({ channelId, price, count, amount: Math.abs(amount), total })
            }
          })

          if (newBids.length > 0) {
            dispatch(addBids(newBids))
          }

          if (newAsks.length > 0) {
            dispatch(addAsks(newAsks))
          }

          setError(null)
        } catch (e) {
          console.error(e.message)
          setError('Error updating the order book')
        }
      },
      () => setError('Error on reading the order book')
    )

    if (!success) {
      setIsConnecting(false)
      setError('Error on connecting to the order book')
    }
  }, [dispatch, setIsConnecting, setError])

  const disconnect = useCallback(() => {
    if (isDisconnecting) return

    setIsDisconnecting(true)
    OrderBookWebSocket.close(() => {
      setIsDisconnecting(false)
      dispatch(setConnected(false))
    })
  }, [isDisconnecting, setIsDisconnecting])

  useEffect(() => {
    connect()
    return () => {
      disconnect()
    }
  }, [connect]);

  const connectButtonDisable = isDisconnecting || isConnecting || connected
  const disconnectButtonDisable = isDisconnecting || isConnecting || !connected

  return (
    <div className='OrderBook'>
      <div className="book__buttons">
        <button
          className='success-btn'
          onClick={connect}
          disabled={connectButtonDisable}>Connect</button>

        <button
          className='failed-btn'
          onClick={disconnect}
          disabled={disconnectButtonDisable}>Disconnect</button>
      </div>

      <div className="message">
        Order Book Status: {isConnecting ? 'Connecting' : isDisconnecting ? 'Disconnecting' : connected ? 'Connected' : 'Disconnected'}
      </div>

      <div className="hr"></div>
      {bids && asks && < div className='OrderBook_Header'>
        <div className='OrderBook_Header_Columns'>COUNT</div>
        <div className='OrderBook_Header_Columns'>AMOUNT</div>
        <div className='OrderBook_Header_Columns'>TOTAL</div>
        <div className='OrderBook_Header_Columns'>PRICE</div>

        <div className='OrderBook_Header_Columns'>PRICE</div>
        <div className='OrderBook_Header_Columns'>TOTAL</div>
        <div className='OrderBook_Header_Columns'>AMOUNT</div>
        <div className='OrderBook_Header_Columns'>COUNT</div>
      </div>}

      <div className='OrderBook_RecordsWrap'>
        {bids && (
          <RecordsList ordersType='bid' records={bids} maxVolumeDeviation={25} />
        )}
        {asks && (
          <RecordsList ordersType='ask' records={asks} maxVolumeDeviation={25} />
        )}
      </div>
    </div >
  );
};