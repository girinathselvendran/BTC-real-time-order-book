import { Record } from './Record';
import './RecordsList.scss';

export const RecordsList = ({ ordersType, records, maxVolumeDeviation }) => {
    return (
        <div className='RecordsList'>
            {records.map((record, index) => {
                const total = records.reduce((acc, cur, i) => {
                    if (i > index) {
                        return acc;
                    }
                    return acc + cur.amount;
                }, 0);

                return (
                    <Record
                        key={String(record.count) + String(record.amount) + String(record.price) + index}
                        orderType={ordersType}
                        order={record}
                        total={total}
                        maxVolumeDeviation={maxVolumeDeviation}
                    />
                );
            })}
        </div>
    );
};



// import { Record } from './Record';

// import './RecordsList.scss';



// export const RecordsList = ({ ordersType, records, maxVolumeDeviation }) => {
//     // Get the latest 20 records
//     const latestRecords = records.slice(-20); // Get last 20 records

//     return (
//         <div className='RecordsList'>
//             {latestRecords.map((record, index) => {
//                 const total = latestRecords.reduce((acc, cur, i) => {
//                     if (i > index) {
//                         return acc;
//                     }
//                     return acc + cur.amount;
//                 }, 0);

//                 return (
//                     <Record
//                         // key={record.price}
//                         key={String(record.count) + String(record.amount) + String(record.price) + index}
//                         orderType={ordersType}
//                         order={record}
//                         total={total}
//                         maxVolumeDeviation={maxVolumeDeviation}
//                     />
//                 );
//             })}
//         </div>
//     );
// };
