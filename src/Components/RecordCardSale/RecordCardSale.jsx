import { BiDetail, BiPyramid, BiTagAlt } from "react-icons/bi";
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
      <p className="record--bank">
        <BiTagAlt /> Materia Prima: {record.materia_prima_label}
      </p>
      <p className="record--bank">
        <BiPyramid /> Para: {record.tipo_matera_prima_label}
      </p>
      <p className="record--description">
        <BiDetail /> {record.notas}
      </p>
    </div>
  );
}

export default RecordCard;
