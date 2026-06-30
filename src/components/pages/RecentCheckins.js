import { useEffect, useState } from "react";
import { FaHistory } from "react-icons/fa";
import "../../assets/styles/RecentCheckins.css";

function RecentCheckins() {
  const [checkins, setCheckins] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchRecentCheckins();
  }, []);

  const fetchRecentCheckins = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/checkins/user/${user._id}`
      );

      const data = await res.json();

      if (res.ok) {
        setCheckins(data.checkins);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkins-section">

      <div className="section-header">
        <div className="title">
          <FaHistory className="header-icon" />
          <h3>Recent Check-ins</h3>
        </div>
      </div>

      {loading ? (
        <div className="loading">
          Loading...
        </div>
      ) : checkins.length === 0 ? (
        <div className="empty-state">

          <h4>No Check-ins Yet</h4>

          <p>
            Your gym visits will appear here after your QR code
            is scanned at the gym entrance.
          </p>

        </div>
      ) : (
        <table className="checkins-table">

          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Gym</th>
            </tr>
          </thead>

          <tbody>

            {checkins.map((item) => (

              <tr key={item._id}>

                <td>
                  {new Date(item.checkInTime).toLocaleDateString()}
                </td>

                <td>
                  {new Date(item.checkInTime).toLocaleTimeString()}
                </td>

                <td>{item.gymName}</td>

              </tr>

            ))}

          </tbody>

        </table>
      )}

    </div>
  );
}

export default RecentCheckins;