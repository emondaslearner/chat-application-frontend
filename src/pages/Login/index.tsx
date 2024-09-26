import { signIn } from "@src/apis/auth";
import { getAllMessageAPI } from "@src/apis/message";
import Button from "@src/components/shared/Button";
import Input from "@src/components/shared/Input";
import Label from "@src/components/shared/Label";
import { RootState } from "@src/store/store";
import { success } from "@src/utils/alert";
import { handleAxiosError } from "@src/utils/error";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";

interface LoginProps { }

const processUserMessagesInIndexDB = async () => {
  // Function to open the database
  const openDatabase = () => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('chats', 1);

      request.onupgradeneeded = (event: any) => {
        const db = event.target.result;

        if (!db.objectStoreNames.contains('messages')) {
          db.createObjectStore('messages', { keyPath: '_id' });
        }
      };

      request.onsuccess = (event: any) => {
        resolve(event.target.result);
      };

      request.onerror = (event: any) => {
        reject(event.target.errorCode);
      };
    });
  };

  // Function to retrieve all messages from the object store
  const getAllMessages = (db: IDBDatabase) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['messages'], 'readwrite');
      const objectStore = transaction.objectStore('messages');

      const getAllRequest = objectStore.getAll();

      getAllRequest.onsuccess = (event: any) => {
        resolve({ messages: event.target.result, objectStore });
      };

      getAllRequest.onerror = (event: any) => {
        reject(event.target.errorCode);
      };
    });
  };

  try {
    // Open the database
    const database: any = await openDatabase();

    // Get all messages
    const { messages }: any = await getAllMessages(database);

    if (!messages.length) {
      const data: any = await getAllMessageAPI({
        page: 1,
        limit: 50000
      });

      const allMessage = data?.data;

      if (allMessage && allMessage.length > 0) {

        const db = indexedDB.open('chats'); // Replace with your database name

        db.onsuccess = (event: any) => {
          const transaction = event.target.result.transaction(['messages'], 'readwrite'); // Replace with your object store name
          const objectStore = transaction.objectStore('messages');

          const insertMessages = async () => {
            for (const message of allMessage) {
              try {
                await objectStore.put(message);
              } catch (error) {
                console.error(`Error inserting message with _id: ${message._id}`, error);
              }
            }
          };

          insertMessages()
        };

        db.onerror = (event) => {
          console.error('Error opening database');
        };
      }
    }

  } catch (error) {
    console.error('Error processing user messages:', error);
  }
};


const Login: React.FC<LoginProps> = () => {
  // themeColor
  const themeColor: "light" | "dark" = useSelector(
    (state: RootState) => state.themeConfig.mode
  );

  // states
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(false);

  // router dom
  const navigate: NavigateFunction = useNavigate();

  const clearStates = () => {
    setEmail("");
    setPassword("");
  };

  // check logged in or not
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      setLoader(true);
      const data: any = await signIn({ email, password });
      setLoader(false);

      if (data.code === 200) {
        localStorage.setItem("token", data.token);
        success({ message: data.message, themeColor });
        navigate("/");
      }
      clearStates();
      processUserMessagesInIndexDB();
    } catch (err) {
      setLoader(false);
      handleAxiosError(err, themeColor);
    }
  };

  return (
    <div className="w-full h-[100vh] flex justify-center items-center dark:bg-dark_light_bg_">
      <div
        style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
        className="max-w-[400px] w-full shadow-lg px-[10px] py-[20px] rounded-[10px] dark:bg-dark_bg_"
      >
        <h1 className="text-center text-[22px] font-semibold dark:text-white_">
          Login
        </h1>

        <form onSubmit={handleLogin} className="w-[90%] mx-auto">
          <div className=" mt-[10px]">
            <Label htmlFor="email">Email:</Label>
            <Input
              placeholder="Enter an email"
              id="email"
              type="text"
              className="rounded-[5px] mt-[4px]"
              value={email}
              required
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
          </div>

          <div className=" mt-[10px]">
            <div className="flex w-full items-center justify-between">
              <Label htmlFor="password">Password:</Label>
              <Link
                to="/forgot-password"
                className="text-primary_ text-[16px] font-semibold hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            <Input
              placeholder="Enter a password"
              id="password"
              type="password"
              className="rounded-[5px] mt-[4px]"
              value={password}
              required
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />
          </div>

          <Button
            loader={loader}
            loaderMessage="Processing..."
            fill={true}
            className="w-full mt-[20px]"
          >
            Login
          </Button>
          <Link
            to="/sign-up"
            className="text-primary_ text-[16px] font-semibold hover:underline mt-[10px] text-center block"
          >
            Don't have any account?
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
