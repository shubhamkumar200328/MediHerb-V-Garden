import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../components/PlantCard.css';

const PlantCard = ({ plant }) => {
  return (
    <div className="PlantCard__Cardcontainer">
      <div className="PlantCard__card">
        <Link to={`/plant/${plant.id}`} className="PlantCard__link">
          <img
            src={plant.image}
            alt={plant.name}
            className="PlantCard__cardImage"
          />
          <h3 className="PlantCard__cardTitle">{plant.name}</h3>
          <p className="PlantCard__cardDescription">{plant.description}</p>
          <div className="PlantCard__cardInfo">
            <p>
              <strong>Medicinal Use:</strong> {plant.medicinalUse}
            </p>
            <p>
              <strong>Region:</strong> {plant.region}
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};
PlantCard.propTypes = {
  plant: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    medicinalUse: PropTypes.string,
    region: PropTypes.string,
  }).isRequired,
};

export default PlantCard;
