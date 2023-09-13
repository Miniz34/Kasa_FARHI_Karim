import "./ProfileHouseCard.scss";
import { Link } from "react-router-dom";

interface ProfileHouseCardProps {
  title: string;
  description: string;
  picture: string;
  id: number;
}

function ProfileHouseCard({
  title,
  description,
  picture,
  id,
}: ProfileHouseCardProps) {
  console.log(title, description, picture, id);
  return (
    <Link to={`../../house/${id}`} className="profile-redirect">
      <div className="profile-house">
        <div className="profile-house-card">
          <div className="profile-house-text">
            <div className="profile-house-card-title">
              <h2>{title}</h2>
            </div>
            <div className="profile-house-card-description">
              <p>{description}</p>
            </div>
          </div>
          <div className="profile-house-card-img">
            <img src={picture} alt="thumbnail-house" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProfileHouseCard;
