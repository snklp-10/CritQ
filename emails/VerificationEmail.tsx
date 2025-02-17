import * as React from "react";
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Text,
  Button,
  Heading,
} from "@react-email/components";

interface VerificationEmailProps {
  username: string;
  verifyLink: string;
}

export const VerificationEmail = ({
  username,
  verifyLink,
}: VerificationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Verify your email to activate your CritQ account</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Heading style={styles.heading}>
            Verify Your Email, {username}! 🔐
          </Heading>
          <Text style={styles.text}>
            Thank you for signing up for **CritQ**! To activate your account,
            please verify your email by clicking the button below:
          </Text>
          <Button href={verifyLink} style={styles.button}>
            Verify Email
          </Button>
          <Text style={styles.text}>
            If you did not sign up for CritQ, please ignore this email.
          </Text>
          <Text style={styles.footer}>— The CritQ Team</Text>
        </Container>
      </Body>
    </Html>
  );
};

const styles = {
  body: {
    backgroundColor: "#f4f4f4",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  container: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    maxWidth: "500px",
    margin: "0 auto",
    textAlign: "center" as const,
  },
  heading: {
    fontSize: "22px",
    color: "#333",
  },
  text: {
    fontSize: "16px",
    color: "#555",
  },
  button: {
    backgroundColor: "#007bff",
    color: "#ffffff",
    padding: "12px 20px",
    borderRadius: "5px",
    textDecoration: "none",
    display: "inline-block",
    marginTop: "10px",
  },
  footer: {
    fontSize: "14px",
    color: "#888",
    marginTop: "20px",
  },
};

export default VerificationEmail;
