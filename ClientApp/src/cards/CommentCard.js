import React from "react";
import { Col, Row } from "reactstrap";
import FormattedDate from "../components/FormattedDate";
const CommentCard = ({ comment }) => {
    return (
        <Row style={{ border: "1px Solid" }}>
            <Row>
                <Col>
                    <i className="bi bi-person-circle" /><span style={{ color: 'black', fontWeight: 'bold' }}>{comment.authorName}   </span>
                    <i className="bi bi-clock-history">
                        <FormattedDate date={comment.datePublished} />
                    </i>
                </Col>
            </Row>
            <Row>
                <Col>
                    <span>{comment.text}</span>
                </Col>
            </Row>

        </Row>
    );
};
export default CommentCard;
