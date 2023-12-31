import { useGetData } from "../../Hooks/useGetData";
import { PiFileDashed } from "react-icons/pi";
import { Row, Col, Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

export const EventsPage = () => {

    const { useFirebaseData } = useGetData("ALL", "EVENTS");

    return <>
        {
            useFirebaseData.isLoading ? <div className="title_loading">Loading...</div> : useFirebaseData.data.length === 0 ? <div className="no_record">
                <PiFileDashed />
                <div>
                    No record
                </div>
            </div> : <>
                <div className="title_loading mb-3">Events</div>
                <Row>
                    {
                        useFirebaseData.data.map((e, i) => <Col md={4} className="mb-5">
                            <Card className="card_events_list_content">
                                <Link to={`/event/${e.id}`} style={{ textDecoration: "none" }}>
                                    <Card.Img src="https://cdn.pixabay.com/photo/2016/11/21/17/59/blackboard-1846865_1280.jpg" />
                                    <div className="card_events_list_badge_category">
                                        <Badge bg="primary">{e.category}: {e.type}</Badge>
                                    </div>
                                    <Card.Header className="card_header_title_events_list">
                                        <span>{e.title}</span>
                                    </Card.Header>

                                    <Card.Footer className="card_footer_date_event">
                                        {e.event_starts} - {e.start_time}
                                    </Card.Footer>
                                </Link>
                            </Card>
                        </Col>)
                    }
                </Row>
            </>
        }
    </>;
}