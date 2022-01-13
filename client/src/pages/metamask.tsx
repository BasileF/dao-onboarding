import {
  Button,
  Grid,
  Paper,
  Step,
  Stepper,
  Typography,
  StepLabel,
} from "@mui/material";
import { useState } from "react";
import Web3 from "web3";
import config from "../utils/config.js";

let web3: Web3 | undefined = undefined;

const Metamask = () => {
  const [loading, setLoading] = useState(false);

  const handleAuthenticate = ({
    publicAddress,
    signature,
  }: {
    publicAddress: string;
    signature: string;
  }) =>
    fetch(`${config.main_service_url}/auth`, {
      body: JSON.stringify({ publicAddress, signature }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    }).then((response) => response.json());

  const handleSignup = (publicAddress: string) =>
    fetch(`${config.main_service_url}/users`, {
      body: JSON.stringify({ publicAddress }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    }).then((response) => response.json());

  const handleSignMessage = async ({
    publicAddress,
    nonce,
  }: {
    publicAddress: string;
    nonce: string;
  }) => {
    try {
      const signature = await web3!.eth.personal.sign(
        `I am signing my one-time nonce: ${nonce}`,
        publicAddress,
        ""
      );

      return { publicAddress, signature };
    } catch (err) {
      throw new Error("You need to sign the message to be able to log in.");
    }
  };

  const handleClick = async () => {
    if (!(window as any).ethereum) {
      window.alert("Please install MetaMask first.");
      return;
    }

    if (!web3) {
      try {
        await (window as any).ethereum.enable();
        web3 = new Web3((window as any).ethereum);
      } catch (error) {
        window.alert("You need to allow MetaMask.");
        return;
      }
    }

    const coinbase = await web3.eth.getCoinbase();
    if (!coinbase) {
      window.alert("Please activate MetaMask first.");
      return;
    }

    const publicAddress = coinbase.toLowerCase();
    setLoading(true);
    console.log(`${config.main_service_url}/users`);
    fetch(`${config.main_service_url}/users?publicAddress=${publicAddress}`)
      .then((response) => response.json())
      .then((users) => (users.length ? users[0] : handleSignup(publicAddress)))
      .then(handleSignMessage)
      .then(handleAuthenticate)
      // .then(onLoggedIn)
      .catch((err) => {
        window.alert(err);
        setLoading(false);
      });
  };

  return (
    <Grid
      container
      justifyContent={"center"}
      alignItems={"center"}
      style={{ height: "100%", width: "100%" }}
    >
      <Grid item>
        <Paper
          style={{ height: "fit-content", width: "480px", padding: "32px" }}
        >
          <Grid
            container
            spacing={2}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Grid item sm={12}>
              <Typography variant="h3">Welcome!</Typography>
            </Grid>
            <Grid item sm={12}>
              <Stepper>
                <Step active={true}>
                  <StepLabel></StepLabel>
                </Step>
                <Step active={true}>
                  <StepLabel></StepLabel>
                </Step>
                <Step active={true}>
                  <StepLabel></StepLabel>
                </Step>
              </Stepper>
            </Grid>
            <Grid item sm={12}>
              <Typography variant="h4">About</Typography>
            </Grid>
            <Grid item sm={12}>
              <Typography variant="body1" style={{ float: "left" }}>
                VISION
              </Typography>
            </Grid>
            <Grid item sm={12}>
              <Typography
                variant="body2"
                style={{ textAlign: "left", marginLeft: "12px" }}
              >
                To our members, being a fan isn't enough. The Krause House is a
                Decentralized Autonomous Organization (DAO) governed by the
                community, the fans, the basketball lovers and purists. The
                Krause House is a community of hoop fanatics that are just crazy
                enough to buy an NBA team.
              </Typography>
            </Grid>
            <Grid item sm={12}>
              <Typography variant="body1" style={{ float: "left" }}>
                IMPORTANT LINKS
              </Typography>
            </Grid>
            <Grid item sm={12}>
              <Typography
                variant="body2"
                style={{ textAlign: "left", marginLeft: "12px" }}
              >
                Click here to learn more about Krause House
              </Typography>
              <Typography
                variant="body2"
                style={{ textAlign: "left", marginLeft: "12px" }}
              >
                Click here for other resources
              </Typography>
              <Typography
                variant="body2"
                style={{ textAlign: "left", marginLeft: "12px" }}
              >
                Click here to see how you can contribute
              </Typography>
            </Grid>
            <Grid item sm={12} style={{ marginTop: "24px" }}>
              <Button variant="contained" fullWidth onClick={handleClick}>
                Connect with Metamask
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Metamask;
