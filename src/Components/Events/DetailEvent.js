import { useGetData } from "../../Hooks/useGetData";
import { PiFileDashed } from "react-icons/pi";
import { Card, Row, Col, Button } from "react-bootstrap";
import { FaRegCalendarAlt } from "react-icons/fa";

export const DetailEvent = () => {

    const { useFirebaseData } = useGetData("BY_ID", "EVENTS");

    return <Card className="mb-5">

        {
            useFirebaseData.isLoading ? <div className="title_loading">Loading...</div> : Object.keys(useFirebaseData.data).length === 0 ? <div className="no_record">
                <PiFileDashed />
                <div>
                    No record
                </div>
            </div> : <>

                <div style={{ paddingTop: "3%", backgroundImage: "url(https://cdn.pixabay.com/photo/2016/11/21/17/59/blackboard-1846865_1280.jpg)" }} className="img_banner_event_detail">
                    {/* <Card.Img height={300} src="" /> */}
                </div>
                <Card.Header className="card_header_event_detail">
                    <div className="title_loading">{useFirebaseData.data.title}</div>
                </Card.Header>
                <div style={{ textAlign: "center", padding: "1%" }}>
                    <b>Published by:</b> {useFirebaseData.data.organizer}  {" | "}
                    <b>Event Location:</b> {useFirebaseData.data.entity}
                </div>
                <Card.Body>
                    <Row>
                        <Col md={8}>
                            <div>
                                {useFirebaseData.data.description}
                            </div>
                            <div style={{ padding: "5%", color: "#1e063d", fontWeight: "bold" }}>
                                {useFirebaseData.data.category}: {useFirebaseData.data.type}
                            </div>
                        </Col>
                        <Col md={4}>
                            <Card style={{ borderRadius: "0" }}>
                                <Card.Header style={{ textAlign: "center" }}>
                                    <div >
                                        <p><b>Start:</b> {useFirebaseData.data.event_starts} - {useFirebaseData.data.start_time}</p>
                                        <p><b>End:</b> {useFirebaseData.data.event_ends} - {useFirebaseData.data.end_time}</p>
                                    </div>
                                </Card.Header>
                                <Card.Body className="calendar_detail_event_content">
                                    <FaRegCalendarAlt />
                                </Card.Body>
                                <Card.Footer>
                                    <p>{useFirebaseData.data.price ? "The event will be paid" : "The event will be free"} {useFirebaseData.data.price ? useFirebaseData.data.price : ""} </p>
                                    <div className="d-grid gap-2">
                                        <Button className='btn_orange_submit' type="submit" onMouseDown={(e) => e.preventDefault()}
                                            onClick={() => alert("The ticket is supposed to have been bought :)")}>
                                            Buy Ticket
                                        </Button>
                                    </div>
                                </Card.Footer>
                            </Card>
                        </Col>
                    </Row>
                </Card.Body>
            </>
        }
    </Card>;
}