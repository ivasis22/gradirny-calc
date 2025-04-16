export const ResultField = ({ label, value, unit }) => (
    <div className="d-flex justify-content-between mb-2">
      <span>{label}:</span>
      <strong>
        {value} {unit && <span>{unit}</span>}
      </strong>
    </div>
);