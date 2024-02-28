import { useState, useEffect } from "react";
import "./Formcomponent.css";
import { v4 as uuidv4 } from "uuid";

const Formcomponent = (props) => {
  // ขั้นตอนสร้าง State ที่ 1
  const [title, setTitle] = useState(""); // title = จัดเก็บข้อมูลของรายการ , ชื่อฟังชั่น settitle = เอาไว้เปลี่ยนแปลงข้อมูล , (ค่าเริ่มต้น)
  const [amount, setAmount] = useState(0);
  const [formValiid, setFormValid] = useState(false);

 

  // State รับข้อมูลของ title
  const imputTitle = (event) => {
    // ขั้นตอนสร้าง State ที่ 2
    setTitle(event.target.value); // target.value = ค่าที่พิมเข้ามา
  };

  // State รับข้อมูลของ amount
  const imputamount = (event) => {
    setAmount(event.target.value);
  };

  const svaeItem = (event) => {
    // ไม่ให้หน้า reset
    event.preventDefault();
    alert("บันทึกข้อมูลเรียบร้อย");

    // ขั้นตอนสร้าง State ที่ 3
    // เก็บข้อมูลใน State
    const itemData = {
      id: uuidv4(), // สุ่มตัวเลขไม่เท่ากัน
      title: title, // เอามาจาก State useState("")
      amount: Number(amount), // เอามาจาก State useState(0)
    };
    console.log(itemData);

    // ส่งค่าออกไปหา Add
    props.onAddItem(itemData);

    // ขั้นตอนสร้าง State ที่ 4
    // Reset State
    setTitle("");
    setAmount(0);
  };

  useEffect(
    () => {
      // .trim() = ตัดช่องว่างซ้ายขาว ,.length = ตัวอักษรทั้งหมด
      // title = ไม่เป็นค่าว่าง ,amount = ไม่เท่ากับ 0
      const chwckData = title.trim().length > 0 && amount !== 0;
      setFormValid(chwckData)
    },
    [title, amount] // State ที่ต้องการดักจับการเปลี่ยนแปลง
  );

  return (
    <div>
      <form onSubmit={svaeItem}>
        <div className="from-control">
          <label>ชื่อรายการ</label>
          <input
            type="text"
            placeholder="ระบุชื่อรายการ"
            onChange={imputTitle}
            // ขั้นตอนสร้าง State ที่ 4
            value={title} // ผูกข้อมูลกับค่า State ที่เปลี่ยนไป
          />
        </div>
        <div className="from-control">
          <label>จำนวนเงิน</label>
          <input
            type="number"
            placeholder="(+ รายรับ, - รายจ่าย)"
            onChange={imputamount}
            value={amount} // ผูกข้อมูลกับค่า State ที่เปลี่ยนไป
          />
        </div>
        <div>
          <button
            className="btn"
            type="submit"
            // ไม่ให้กดปุ่ม
            disabled={!formValiid}
          >
            เพิ่มข้อมูล
          </button>
        </div>
      </form>
    </div>
  );
};

export default Formcomponent;
