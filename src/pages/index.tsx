// pages/index.tsx
import { useState, useEffect } from "react";
import { Button, Input, Spacer } from "@nextui-org/react";
import { validate } from "email-validator";

const Home = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "normal" | "loading" | "success" | "error"
  >("normal");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    if (validate(email)) {
      setErrorMessage("");
    }
  }, [email]);

  const handleSubscribe = async () => {
    if (!validate(email)) {
      setErrorMessage("Invalid email format. Please enter a valid email.");
      return;
    }

    setStatus("loading");
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }

    setTimeout(() => setStatus("normal"), 3000);
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Coming Soon</h1>
      <p>
        Are you ready to get something new from us? Then subscribe to the
        newsletter to get the latest updates!
      </p>
      <Spacer y={2} />
      <Input
        isClearable
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        color={errorMessage ? "danger" : "primary"}
      />
      {errorMessage && (
        <p style={{ color: "red", textAlign: "left", marginTop: "5px" }}>
          {errorMessage}
        </p>
      )}
      <Spacer y={1} />
      <Button onClick={handleSubscribe} disabled={status === "loading"}>
        {status === "normal" && "Subscribe"}
        {status === "loading" && "Subscribing..."}
        {status === "success" && "Subscribed!"}
        {status === "error" && "Failed!"}
      </Button>
    </div>
  );
};

export default Home;
