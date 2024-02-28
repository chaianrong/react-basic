import Transaction from "./Components/Transaction";
import Formcomponent from "./Components/Formcomponent";
import "./App.css";
import { useEffect, useState } from "react";
import DataContext from "./Data/Datacontext";
import ReportComponent from "./Components/ReportComponent";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  /*
  const initData = [
    { id: 1, title: "ค่ารถ", amount: -2000 },
    { id: 2, title: "เงินเดือน", amount: 5000 },
    { id: 3, title: "ค่ารักษาพยาบาล", amount: -1500 },
  ];
  */

  // ขั้นตอนสร้าง State ที่ 1
  const [items, setItems] = useState([]);

  const [reprotIncom, setreprotIncom] = useState(0);
  const [reprotExpense, setreprotExpense] = useState(0);

  // รับค่าจาก Form Component
  const onAddNewItem = (newItem) => {
    // ขั้นตอนสร้าง State ที่ 2
    // setItems = เปลี่ยนแปลงข้มมูลของ State
    // loop ข้อมูล , prvItem = ช้อมูลเดิม
    setItems((prvItem) => {
      return [newItem, ...prvItem];
    });
    console.log(newItem);
  };

  // ดึงข้อมูลบเฉพาะ ตัวเลข
  useEffect(() => {
    const amounts = items.map((items) => items.amount);
    const income = amounts
      .filter((element) => element > 0)
      .reduce((total, element) => (total += element), 0);
    const expense =
      amounts
        .filter((element) => element < 0)
        .reduce((total, element) => (total += element), 0) * -1;
    setreprotIncom(income.toFixed(2));
    setreprotExpense(expense.toFixed(2));
  }, [items, reprotIncom, reprotExpense]);

  return (
    // .Provider การส่งข้อมูลผ่าน value
    <DataContext.Provider
      // value = ข้อมูลกลาง
      value={{
        income: reprotIncom,
        expense: reprotExpense,
      }}
    >
      <div className="container">
        <h1 className="desig">แอพบัญชีราย - รายจ่าย</h1>
        <Router>
          <div>
            <ul className="horizontal-menu">
              <li>
                <Link className="front" to="/">ข้อมูลบัญชี</Link>
              </li>
              <li>
                <Link to="/insert">บันทึกข้อมูล</Link>
              </li>
            </ul>
            <Routes>
              <Route path="/" element={<ReportComponent />} />
              <Route
                path="/insert"
                element={
                  <div>
                    <Formcomponent onAddItem={onAddNewItem} />
                    {/* ขั้นตอนสร้าง State ที่ 3 */}
                    <Transaction items={items} />
                  </div>
                }
              />
            </Routes>
          </div>
        </Router>
      </div>
    </DataContext.Provider>
  );
}

export default App;
