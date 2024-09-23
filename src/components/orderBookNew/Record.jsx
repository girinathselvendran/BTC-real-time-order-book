import { HUMBLE_COLOR_BY_ORDER_TYPE } from '../../constants/colors';
import './Record.scss';


export const Record = ({ order, maxVolumeDeviation, total, orderType }) => {

    const rootClassName = `Record ${orderType === 'ask' ? 'Record--inverted' : ''}`;

    return (
        <div className={rootClassName}>

            <div className='Record_ProgressWrap'>
                <div className='Progress'>
                    <div
                        className='Progress_Bar'
                        style={{ width: `${Math.round((total / maxVolumeDeviation) * 100) || 1}%`, background: HUMBLE_COLOR_BY_ORDER_TYPE[orderType] }}
                    ></div>
                </div>
            </div>
            <div className='Record_ValueWrap'>
                <ValueRenderer value={order.count} />
            </div>
            <div className='Record_ValueWrap'>
                <ValueRenderer value={order.amount} requiredCharsAmount={4} />
            </div>
            <div className='Record_ValueWrap'>
                <ValueRenderer value={total} requiredCharsAmount={4} />
            </div>
            <div className='Record_ValueWrap'>
                <ValueRenderer value={order.price} />
            </div>
        </div>
    );
};

const ValueRenderer = ({ value, requiredCharsAmount = 0 }) => {
    const formatted = (Number((value * 10000).toFixed(0)) / 10000).toFixed(requiredCharsAmount);

    return <span className='ValueRenderer'>{formatted}</span>;
};