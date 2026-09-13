import "./DashboardCard.css";
import { useNavigate } from "react-router-dom";

function DashboardCard({ title, description, icon, path }) {

  const navigate = useNavigate();

  return (
    <div className="dashboard-card">

      <div className="icon">
        {icon}
      </div>

      <h2>{title}</h2>

      <p>{description}</p>

      <button onClick={() => navigate(path)}>
        Open
      </button>

    </div>
  );
}

export default DashboardCard;