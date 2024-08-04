import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core";

import {
  AndroidIcon,
  AppleIcon,
  WindowsIcon,
  macOS,
} from "../../../assets/apps";

export default ({ open, close }) => {
  return (
    <Dialog open={open} onClose={close} fullWidth maxWidth="xs" className="download-popup">
      {/* <DialogTitle style={{ textAlign: "center" }}>
        <strong>Downloads</strong>
      </DialogTitle> */}
      <DialogContent dividers>
        <div>
          <div className="AAW">
            <div>
              <button>
                <div
                  className="text-center"
                  onClick={() => window.open("https://play.google.com/store/apps/details?id=com.micple")}
                >
                  <img src={AndroidIcon} alt="img" />
                </div>
                <div className="text-center">Android</div>
              </button>
            </div>
            <div>
              <button>
                <div
                  className="text-center"
                  onClick={() => window.open("https://micple.com")}
                >
                  <img src={AppleIcon} alt="img" />
                </div>
                <div className="text-center">Apple</div>
              </button>
            </div>
            {/* <div>
              <button>
                <div
                  className="text-center"
                  onClick={() =>
                    window.open(
                      "https://micple.com"
                    )
                  }
                >
                  <img src={WindowsIcon} alt="img" />
                  <div className="text-center">Windows</div>
                </div>
              </button>
            </div> */}
            {/* <div>
              <button>
                <div
                  className="text-center"
                  onClick={() =>
                    window.open(
                      "https://micple.com"
                    )
                  }
                >
                  <img src={macOS} alt="img" />
                  <div className="text-center">MacOS</div>
                </div>
              </button>
            </div> */}
          </div>
        </div>
      </DialogContent>

      {/* <DialogActions>
        <Button
          variant="outlined"
          color="primary"
          onClick={close}
          style={{ fontSize: 14, textTransform: "initial", padding: "0 5px" }}
        >
          Close
        </Button>
      </DialogActions> */}



    </Dialog>
  );
};
