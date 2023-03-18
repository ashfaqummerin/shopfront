import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";

const ProductCarouselItem = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`}>
      <Image
        src={product.image}
        alt={product.name}
        className="carousel__image"
      />
      <div className="carousel__text__container">
        <h3 className="carousel__text">{product.name}</h3>
        <h3 className="carousel__text">$ {product.price}</h3>
      </div>
    </Link>
  );
};

export default ProductCarouselItem;
