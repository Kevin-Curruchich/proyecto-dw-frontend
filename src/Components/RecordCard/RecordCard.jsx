import { BiDetail, BiCreditCard, BiCalendarAlt } from "react-icons/bi";
import "./RecordCard.css";

function RecordCard({ record }) {
  return (
    <div className="record">
      <p
        className={`record--amount ${
          record.RECORD_TYPE == 1 ? "income" : "expense"
        }`}
      >
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: record.CURRENCIE_SYMBOL,
        }).format(record.AMOUNT)}
      </p>
      <p className="record--description">
        <BiDetail /> {record.DESCRIPTION}
      </p>
      <p className="record--bank">
        <BiCreditCard /> {record.BANK_ACCOUNT}
      </p>
      <p>
        <BiCalendarAlt />
        {/* {record.RECORD_DATE} */}
        {`
        ${new Intl.DateTimeFormat("es-US").format(
          new Date(record.RECORD_DATE)
        )}`}
      </p>
    </div>
  );
}

export default RecordCard;
