function addData(db: any, data: any) {
  const transaction = db.transaction(["messages"], "readwrite");
  const objectStore = transaction.objectStore("messages");

  const request = objectStore.add(data);

  request.onsuccess = () => {
    console.log("Data added successfully!");
  };

  request.onerror = (event: any) => {
    console.error("Add request error: ", event.target.error);
  };
}

const openDatabase = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("chats", 1);

    request.onupgradeneeded = (event: any) => {
      const db = event.target.result;

      if (!db.objectStoreNames.contains("messages")) {
        db.createObjectStore("messages", { keyPath: "_id" });
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

// get all data from indexedb
const getAllDataFromDB = async () => {
  // Function to retrieve all messages from the object store
  const getAllMessages = (db: IDBDatabase) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(["messages"], "readwrite");
      const objectStore = transaction.objectStore("messages");

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

    return messages;
  } catch (err) {
    console.log("err", err);
  }
};

const updateMultipleRecords = async (db: any, userId: string, id: string) => {
  const transaction = db.transaction(["messages"], "readwrite");
  const objectStore = transaction.objectStore("messages");

  const cursorRequest = objectStore.openCursor();

  cursorRequest.onsuccess = (event: any) => {
    const cursor = event.target.result;

    if (cursor) {
      const user = cursor.value;
      if (
        (user.sent_by?._id || user.sent_by) === userId ||
        (user.sent_to?._id || user.sent_to) === id ||
        (user.sent_by?._id || user.sent_by) === id ||
        (user.sent_to?._id || user.sent_to) === userId
      ) {
        const updatedRecord = { ...cursor.value, status: "seen" };
        const updateRequest = cursor.update(updatedRecord);

        updateRequest.onsuccess = () => {};

        updateRequest.onerror = (updateEvent: any) => {
          console.error("Error updating record:", updateEvent.target.error);
        };
      }

      cursor.continue(); // Move to the next record
    } else {
      console.log("No more entries to check");
    }
  };

  cursorRequest.onerror = (event: any) => {
    console.error("Error opening cursor:", event.target.error);
  };

  transaction.oncomplete = () => {
    db.close();
  };
};

const deleteMultipleRecords = async (db: any, userId: string, id: string) => {
  const transaction = db.transaction(["messages"], "readwrite");
  const objectStore = transaction.objectStore("messages");

  const cursorRequest = objectStore.openCursor();

  cursorRequest.onsuccess = (event: any) => {
    const cursor = event.target.result;

    if (cursor) {
      const user = cursor.value;
      if (
        (user.sent_by?._id || user.sent_by) === userId ||
        (user.sent_to?._id || user.sent_to) === id ||
        (user.sent_by?._id || user.sent_by) === id ||
        (user.sent_to?._id || user.sent_to) === userId
      ) {
        const deleteRequest = cursor.delete();

        deleteRequest.onsuccess = () => {
          console.log("Deleted user with key:", cursor.key);
        };
      }

      cursor.continue(); // Move to the next record
    } else {
      console.log("No more entries to check");
    }
  };

  cursorRequest.onerror = (event: any) => {
    console.error("Error opening cursor:", event.target.error);
  };

  transaction.oncomplete = () => {
    db.close();
  };
};

const deleteViaKeyFromIndexdb = async (db: any, id: string) => {
  const transaction = db.transaction(["messages"], "readwrite");
  const objectStore = transaction.objectStore("messages");

  const cursorRequest = objectStore.openCursor();

  cursorRequest.onsuccess = (event: any) => {
    const cursor = event.target.result;

    if (cursor) {
      const user = cursor.value;
      if (user._id === id) {
        const deleteRequest = cursor.delete();

        deleteRequest.onsuccess = () => {
          console.log("Deleted user with key:", cursor.key);
        };
      }

      cursor.continue(); // Move to the next record
    } else {
      console.log("No more entries to check");
    }
  };

  cursorRequest.onerror = (event: any) => {
    console.error("Error opening cursor:", event.target.error);
  };

  transaction.oncomplete = () => {
    db.close();
  };
};

const updateViaKeyInIndexdb = async (db: any, id: string, data: any) => {
  const transaction = db.transaction(["messages"], "readwrite");
  const objectStore = transaction.objectStore("messages");

  const cursorRequest = objectStore.openCursor();

  cursorRequest.onsuccess = (event: any) => {
    const cursor = event.target.result;

    if (cursor) {
      const user = cursor.value;
      if (user._id === id) {
        const updatedRecord = data;
        const updateRequest = cursor.update(updatedRecord);

        updateRequest.onsuccess = () => {};

        updateRequest.onerror = (updateEvent: any) => {
          console.error("Error updating record:", updateEvent.target.error);
        };
      }

      cursor.continue(); // Move to the next record
    } else {
      console.log("No more entries to check");
    }
  };

  cursorRequest.onerror = (event: any) => {
    console.error("Error opening cursor:", event.target.error);
  };

  transaction.oncomplete = () => {
    db.close();
  };
};

export {
  getAllDataFromDB,
  addData,
  updateMultipleRecords,
  openDatabase,
  deleteMultipleRecords,
  deleteViaKeyFromIndexdb,
  updateViaKeyInIndexdb,
};
