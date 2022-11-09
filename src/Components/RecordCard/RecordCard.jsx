import { BiDetail, BiCar } from "react-icons/bi";
import "./RecordCard.css";

function RecordCard({ record }) {
  return (
    <div className="record">
      <p className={`record--amount ${"income"}`}>
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: record.moneda,
        }).format(record.precio)}
      </p>
      <p className="record--description">
        <BiDetail /> {record.descripcion}
      </p>
      <p className="record--bank">
        <BiCar /> Camion: {record.truck_unique_code}
      </p>
    </div>
  );
}

export default RecordCard;
