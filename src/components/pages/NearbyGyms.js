import { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";
import "../../assets/styles/NearbyGyms.css";

function NearbyGyms() {

  const [gyms, setGyms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNearbyGyms();
  }, []);

  const getNearbyGyms = async () => {
    try {

      navigator.geolocation.getCurrentPosition(async(position)=>{

        const res = await fetch(
          "http://localhost:5000/api/gyms/nearby",
          {
            method:"POST",
            headers:{
              "Content-Type":"application/json"
            },
            body:JSON.stringify({
              latitude:position.coords.latitude,
              longitude:position.coords.longitude
            })
          }
        );

        const data = await res.json();

        if(res.ok){
          setGyms(data.gyms);
        }

        setLoading(false);

      });

    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (

    <div className="nearby-section">

      <div className="nearby-header">
        <h3>Nearby Gyms</h3>
      </div>

      {loading ? (

        <p>Loading nearby gyms...</p>

      ) : gyms.length===0 ? (

        <div className="empty">
          No nearby gyms found.
        </div>

      ) : (

        gyms.map((gym)=>(
          <div className="gym-card" key={gym._id}>

            <img
              src={gym.gymImage}
              alt={gym.gymName}
            />

            <div className="gym-info">

              <h4>{gym.gymName}</h4>

              <p>
                <FaStar className="star"/>
                {gym.rating}
              </p>

              <p>
                <FaMapMarkerAlt/>
                {gym.distance} km away
              </p>

              <p>{gym.address}</p>

              <button>
                View Details
              </button>

            </div>

          </div>
        ))

      )}

    </div>
  );
}

export default NearbyGyms;