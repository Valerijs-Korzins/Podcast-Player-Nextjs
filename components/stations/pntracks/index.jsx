import styles from "./style.module.scss";
import { Col, Container, Row } from "react-bootstrap";
import Playedcards from "./playedcards";
import Nextcards from "./nextcards";

const Pntracks = () => {
  return (
    <Container>
      <Row className={styles.pntrack}>
        <Playedcards />
        <Col xs={1}></Col>
        <Nextcards />
      </Row>
    </Container>
  );
};

export default Pntracks;
