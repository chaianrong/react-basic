import "./Transaction.css";
import Item from "./Item";

// porp ค่าทีรับมาจากด้านนอก
const Transaction = (porps) => {
  const { items } = porps;
  return (
    <div>
      <ul className="item-list">
        {/* loop รับข้อมูล */}
        {items.map((element) => {
          return (
            // เขียนแบบเก่า
            //<Item title= {element.title} amount={element.amount} key={uuidv4()}/>

            // เขียนแบบใหม่
            <Item {...element} key={element.id} /> // ชื่อ PROPERTY ของ  data กับค่าที่ส่งเข้าไปใน Item มีชื่อเหมือนกัน
          );
        })}
      </ul>
    </div>
  );
};

export default Transaction;
