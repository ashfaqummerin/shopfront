import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">
            copyright &copy; Shopfront 2023
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
