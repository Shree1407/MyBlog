import React from "react";
import { Col, Row } from "reactstrap";
import FormattedDate from "../components/FormattedDate";
const BlogCardHeader = ({ props }) => {
  return (
    <Row>
      <Col>
        <i className="bi bi-person-circle" />
        <span style={{ fontWeight: "bold" }}>{props.authorName} </span>
        <i className="bi bi-clock-history">
          <span> </span>{" "}
        </i>
        <FormattedDate date={props.datePublished} />
      </Col>
    </Row>
  );
};
export default BlogCardHeader;
