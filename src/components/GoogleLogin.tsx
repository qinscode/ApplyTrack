import { googleLogin } from "@/api/auth";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";

type GoogleApi = {
  load: (api: string, callback: () => void) => void;
  auth2: {
    init: (params: { client_id: string }) => void;
    getAuthInstance: () => {
      signIn: () => Promise<{
        getAuthResponse: () => {
          id_token: string;
        };
      }>;
    };
  };
};

declare global {
  // eslint-disable-next-line ts/consistent-type-definitions
  interface Window {
    gapi: GoogleApi;
  }
}

const GoogleLogin = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const initializeGoogleSignIn = () => {
      window.gapi.load("auth2", () => {
        window.gapi.auth2.init({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
        });
      });
    };

    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/platform.js";
    script.async = true;
    script.defer = true;
    script.onload = initializeGoogleSignIn;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      const googleUser = await window.gapi.auth2.getAuthInstance().signIn();
      const googleToken = googleUser.getAuthResponse().id_token;
      const response = await googleLogin(googleToken);

      console.log("Login successful:", response);
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleGoogleSignIn}
      disabled={isLoading}
      className="flex w-full items-center justify-center gap-2"
    >
      {isLoading
        ? (
            <div className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          )
        : (
            <svg className="size-4" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12.545,12.151L12.545,12.151c0,1.054,0.855,1.909,1.909,1.909h3.536c-0.447,1.722-1.504,3.178-2.946,4.158 C13.74,19.159,12.206,19.5,10.545,19.5c-2.714,0-5.036-1.525-6.222-3.751C3.499,14.091,3,12.167,3,10.545 C3,6.362,6.362,3,10.545,3c2.053,0,3.923,0.794,5.322,2.083l2.684-2.684C16.511,0.565,13.673,0,10.545,0 C4.873,0,0.273,4.6,0.273,10.273c0,5.673,4.6,10.273,10.273,10.273c2.826,0,5.422-1.137,7.295-2.986 C20.352,15.294,22,12.138,22,9.204v-1.91h-9.455"
              />
            </svg>
          )}
      {isLoading ? "Signing in..." : "Sign in with Google"}
    </Button>
  );
};

export default GoogleLogin;
