import PropTypes from "prop-types";
import './Item.css'

// porp ค่าทีรับมาจากด้านนอก
const Item = (prop) => {
  // ข้อมูลที่รับมา
  const { title, amount } = prop;
  // กำหนดสี className
  const status = amount<0 ?'expense':'income'
  // เปลี่ยนสัญลักษณ์ 
  const symbol = amount<0 ?'-':'+'

  // return แสดงผล
  return (
    <li className={status}>
      {/* Math.abs = ตัวเลขที่เป็นค่า - เป็น + */}
      {title} <span>{symbol}{Math.abs(amount)}</span>
    </li>
  );
};
// เช็คชนิดข้อมูล
Item.propTypes = {
  title: PropTypes.string.isRequired, // isRequired บังคับต้องป้อนข้อมูล
  amount: PropTypes.number.isRequired,
};

export default Item;
