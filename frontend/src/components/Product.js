import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = ({ product }) => {
    return (
        <Card className="my-3 p-3 rounded">
            <Link to={`/product/${product._id}`}>
                <Card.Img src={product.image} variant="top" />
            </Link>

            <Card.Body>
                <a href={`/product/${product._id}`}>
                    <Card.Title as="div">
                        <strong>{product.name}</strong>
                    </Card.Title>
                </a>
            </Card.Body>

            <Card.Text as="div">
                <Rating value={product.rating} text={`${product.numReviews} views`} />
            </Card.Text>

            <Card.Text as="h3">
                ${product.price}
            </Card.Text>
        </Card>
    );
}

export default Product;