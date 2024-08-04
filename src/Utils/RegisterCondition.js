import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import React, { useState } from "react";
import CustomeButton from "./CustomeButton";

function RegisterCondition({ onSubmit }) {
  // registration state
  const [readTerms, setReadTerms] = useState(false);
  const [termsModel, setTermsModel] = useState(false);
  const [error, setError] = useState("");
  const [agreed, setAgreed] = useState(false);
  return (
    <div style={{ marginTop: "38px", alignItems: "end" }}>
      <label className="trmslbl">
        <input
          onChange={(_) => {
            if (readTerms) {
              setAgreed(_.target.checked);
            } else {
              setError("Please read Terms of Agreements.");
            }
          }}
          type="checkbox"
          className="check_terms"
          checked={agreed}
        />
        &nbsp;By checking this box, I confirm that I have read, understand and
        agree to the
        <span
          style={{ color: "red" }}
          href="/"
          onClick={(_) => {
            _.preventDefault();
            setTermsModel(true);
          }}
        >
           Terms of Agreement 
        </span>
        and Privacy Policy.
      </label>
      <p style={{ marginTop: "20px", textAlign: "center" }}>
        <span onClick={onSubmit}>
          <CustomeButton title="Submit" />
        </span>
        {/* <Button
          variant="contained"
          color="primary"
          // onClick={submitForm}
          //   disabled={validate()}
          style={{
            display: "block",
            margin: "20px auto",
            textTransform: "initial",
          }}
        >
          Submit
        </Button> */}
      </p>

      <div id="CaptchaContainer">
        <Dialog fullWidth maxWidth="sm" open={termsModel}>
          <DialogTitle style={{ textAlign: "center" }}>
            <strong>Terms and Conditions</strong>
          </DialogTitle>
          <DialogContent dividers>
            <>
              Your data with special protections. You can choose to provide
              information in your micple profile fields or life events about
              your religious views, political views, your health. This and other
              information (such as racial or ethnic origin, philosophical
              beliefs membership) could be subject to special protections under
              the laws of your country.
            </>
          </DialogContent>
          <DialogActions>
            <Button
              size="small"
              variant="outlined"
              color="primary"
              onClick={() => {
                setTermsModel(false);
                setReadTerms(true);
                setAgreed(true);
              }}
              style={{ textTransform: "initial" }}
            >
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default RegisterCondition;
