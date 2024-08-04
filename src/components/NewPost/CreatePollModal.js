import React from "react";
import { Button, Modal } from "react-bootstrap";


const CreatePoll = (props) => {
  return (
    <div>

      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter" style={{ textAlign: "center"}}  >
                    Create You Poll
          </Modal.Title>
          {/* <h4 style={{ textAlign: "center"}}>Terms and Conditions</h4> */}
        </Modal.Header>
        <Modal.Body>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onClick}>Agree</Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};

export default CreatePoll;
