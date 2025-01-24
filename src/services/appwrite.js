import { Account, Client, Databases, ID, Query, Storage } from "appwrite";

// Appwrite configuration
export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  projectId: "672cfc4e003a4709c911",
  databaseId: "672cfccb002f456cb332",
  userCollectionId: "672cfcd0003c114264cd",
  accommodationsCollectionId: "6741d7f2000200706b21",
  cottagesCollectionId: "674342ba0017b324fb03",
  employeesCollectionId: "67432e7e00241eb80e40",
  facilitiesCollectionId: "6741e31a0022f8e43fb3",
  roomsCollectionId: "6742f65c003e2169aa2b",
  servicesCollectionId: "6743c72d003a2d3b298d",
  logsCollectionId: "6766ffac001f897801e9",
  storageBucketId: "6789e834002216f21c5c",
};

if (!appwriteConfig.endpoint || !appwriteConfig.projectId) {
  throw new Error("Appwrite environment variables are not defined.");
}

// Initialize Appwrite client
const client = new Client();
client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId);

export const account = new Account(client);
export const databases = new Databases(client);

// Initialize Storage
export const storage = new Storage(client);

// Add error handling utility
const handleError = (error, customMessage) => {
  console.error(error);
  throw new Error(customMessage || "An unexpected error occurred");
};

// Sign In
export async function signIn(email, password) {
  try {
    // Attempt to clear any existing sessions
    try {
      const currentSession = await account.get();
      if (currentSession?.$id) {
        const sessions = await account.listSessions();
        if (sessions?.sessions?.length) {
          await Promise.all(
            sessions.sessions.map((session) =>
              account.deleteSession(session.$id)
            )
          );
        }
      }
    } catch (e) {
      console.debug("No existing sessions to clear");
    }

    // Clear any existing storage/cookies
    localStorage.clear();
    sessionStorage.clear();

    // Attempt to create a new session
    const session = await account.createEmailPasswordSession(email, password);
    console.log("Session created:", session); // Log session creation

    // Fetch current account details
    const currentAccount = await account.get();
    if (!currentAccount) {
      throw new Error("Authentication failed");
    }

    console.log("Account details:", currentAccount); // Log account details

    // Fetch the user document from the collection
    const databaseId = "672cfccb002f456cb332"; // Your database ID
    const usersCollectionId = "672cfcd0003c114264cd"; // Your collection ID for users

    const response = await databases.listDocuments(
      databaseId,
      usersCollectionId,
      [Query.equal("email", currentAccount.email), Query.limit(1)]
    );

    if (response.documents.length === 0) {
      throw new Error("User document not found.");
    }

    const userDocument = response.documents[0];
    console.log("User document:", userDocument); // Log the user document

    // Store the document ID (Appwrite document ID) and role in session storage
    sessionStorage.setItem("userId", userDocument.$id); // Storing document ID
    sessionStorage.setItem("userRole", userDocument.role || "default");

    return currentAccount;
  } catch (error) {
    handleError(error, "Login failed. Please check your credentials.");
    console.error("Error during sign in:", error); // Log the error
  }
}

// Get Current User Document
export async function getCurrentUser() {
  try {
    // Fetch the current account
    const currentAccount = await account.get();

    // Validate the account response
    if (!currentAccount?.$id) {
      throw new Error("No active account found. Please log in.");
    }

    // Fetch the user document from the database
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    // Validate the user document
    if (!response?.documents?.length) {
      throw new Error("User document not found.");
    }

    // Get the user document
    const userDocument = { ...response.documents[0] };

    // Assign default role if missing
    userDocument.role = userDocument.role || "user";

    // Check for role-based permissions
    if (
      userDocument.role === "guests" &&
      !currentAccount.scopes?.includes("account")
    ) {
      throw new Error(
        "Insufficient permissions: User (role: guests) missing scope (account)."
      );
    }

    return userDocument; // Return the validated user document
  } catch (error) {
    throw new Error(error.message || "Failed to retrieve user data.");
  }
}

// Create New User
export async function createUser(
  email,
  password,
  name,
  role = "user",
  additionalData = {}
) {
  try {
    const newAccount = await account.create(ID.unique(), email, password, name);
    const userDocument = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        name,
        role,
        ...additionalData, // This will include the municipality
      }
    );
    return userDocument;
  } catch (error) {
    throw new Error("Failed to create user.");
  }
}

// Sign Out
export const signOut = async () => {
  try {
    // 1. Delete all Appwrite sessions
    const sessions = await account.listSessions();
    const deletionPromises = sessions.sessions.map((session) =>
      account.deleteSession(session.$id)
    );
    await Promise.all(deletionPromises);

    // 2. Clear all cookies systematically
    const cookies = [
      "sessionId",
      "userRole",
      "userMunicipality",
      "authToken",
      "a_session", // Appwrite session cookie
      "fallback_session",
    ];

    // Clear cookies for all possible domains and paths
    cookies.forEach((cookie) => {
      // Root path
      document.cookie = `${cookie}=; expires=Thu, 01 Jan 2025 00:00:00 UTC; path=/;`;
      // Domain and subdomain
      document.cookie = `${cookie}=; expires=Thu, 01 Jan 2025 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
      document.cookie = `${cookie}=; expires=Thu, 01 Jan 2025 00:00:00 UTC; path=/; domain=.${window.location.hostname};`;
    });

    // 3. Clear storage
    localStorage.clear();
    sessionStorage.clear();

    // 4. Reset any global state
    if (typeof window !== "undefined") {
      // Force a complete page reload to clear any remaining state
      window.location.href = "/login";
    }

    return true;
  } catch (error) {
    // Even if there's an error, try to clear everything
    try {
      // Attempt cleanup even if main logout fails
      localStorage.clear();
      sessionStorage.clear();

      cookies.forEach((cookie) => {
        document.cookie = `${cookie}=; expires=Thu, 01 Jan 2025 00:00:00 UTC; path=/;`;
        document.cookie = `${cookie}=; expires=Thu, 01 Jan 2025 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
      });

      // Force reload even on error
      window.location.href = "/login";
    } catch (e) {}
    throw error;
  }
};

export async function submitTourismForm(formData) {
  try {
    // Ensure declineReason is included
    const updatedFormData = {
      ...formData,
      declineReason: formData.declineReason || "Default value or empty string",
    };

    const result = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.accommodationsCollectionId,
      ID.unique(),
      updatedFormData
    );
    return result;
  } catch (error) {
    throw new Error("Failed to submit form data");
  }
}

export const createDocument = async (collectionId, data) => {
  try {
    const databaseId = "672cfccb002f456cb332";
    return await databases.createDocument(
      databaseId,
      collectionId,
      "unique()",
      data
    );
  } catch (error) {
    console.error(
      `Error creating document in collection ${collectionId}:`,
      error
    );
    throw error;
  }
};

export const fetchMunicipalityData = async () => {
  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.accommodationsCollectionId
    );
    return response.documents;
  } catch (error) {
    return [];
  }
};

// Fetch Specific Accommodations
export async function fetchSpecificAccommodations(municipality) {
  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.accommodationsCollectionId,
      [Query.equal("municipality", municipality)]
    );
    return response.documents;
  } catch (error) {
    throw new Error("Failed to fetch specific accommodations");
  }
}

export const getDocumentByQuery = async (collectionId, query) => {
  try {
    const response = await databases.listDocuments(collectionId, [query]);
    if (response.total > 0) {
      return response.documents[0]; // Return the first matching document
    }
    throw new Error("No documents found");
  } catch (error) {
    throw error;
  }
};

export const checkDuplicateAccommodation = async (
  establishmentName,
  businessAddress
) => {
  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.accommodationsCollectionId,
      [
        Query.equal("establishmentName", establishmentName),
        Query.equal("businessAddress", businessAddress),
      ]
    );

    return response?.documents?.length > 0;
  } catch (error) {
    handleError(
      error,
      "Error occurred while checking for duplicate accommodation"
    );
  }
};

export async function fetchAccommodations() {
  try {
    const result = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.accommodationsCollectionId
    );
    return result.documents.map((doc) => ({
      ...doc,
      approvalStatus: doc.approvalStatus || "Awaiting Inspection",
    }));
  } catch (error) {
    throw new Error("Failed to fetch accommodations");
  }
}

export async function fetchServices(accommodationId) {
  try {
    const result = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.servicesCollectionId,
      [Query.equal("accommodationId", accommodationId), Query.limit(1000)]
    );
    return result.documents;
  } catch (error) {
    throw new Error("Failed to fetch services");
  }
}

export async function fetchRooms(accommodationId) {
  try {
    const result = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.roomsCollectionId,
      [Query.equal("accommodationId", accommodationId), Query.limit(1000)]
    );
    return result.documents;
  } catch (error) {
    throw new Error("Failed to fetch rooms");
  }
}

export async function fetchEmployees(accommodationId) {
  try {
    const result = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.employeesCollectionId,
      [Query.equal("accommodationId", accommodationId), Query.limit(1000)]
    );
    return result.documents;
  } catch (error) {
    throw new Error("Failed to fetch employees");
  }
}

export async function fetchCottages(accommodationId) {
  try {
    const result = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.cottagesCollectionId,
      [Query.equal("accommodationId", accommodationId), Query.limit(1000)]
    );
    return result.documents;
  } catch (error) {
    throw new Error("Failed to fetch cottages");
  }
}

export async function fetchFacilities(accommodationId) {
  try {
    const result = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.facilitiesCollectionId,
      [Query.equal("accommodationId", accommodationId), Query.limit(1000)]
    );
    return result.documents;
  } catch (error) {
    throw new Error("Failed to fetch facilities");
  }
}

export async function updateApprovalStatus(accommodationId, status) {
  try {
    const result = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.accommodationsCollectionId,
      accommodationId,
      { approvalStatus: status }
    );
    return result;
  } catch (error) {
    throw new Error("Failed to update approval status");
  }
}

// Updated fetchActivityLogs function
export async function fetchActivityLogs() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      throw new Error("User not authenticated");
    }

    // Verify admin role
    if (currentUser.role !== "admin") {
      throw new Error("Unauthorized access. Admin privileges required.");
    }

    // Fetch logs from accommodations collection
    const accommodationsResponse = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.accommodationsCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(100)]
    );

    // Fetch logs from users collection
    const usersResponse = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(100)]
    );

    // Combine and map the results
    const combinedLogs = [
      ...accommodationsResponse.documents,
      ...usersResponse.documents,
    ].map((log) => ({
      id: log.$id,
      municipality: log.municipality || "N/A",
      appointmentDate: log.appointmentDate || "N/A",
      declineReason: log.declineReason || "N/A",
      status: log.status || "N/A",
      userId: log.userId || "N/A",
      name: log.name || "N/A",
      role: log.role || "N/A",
      statusTimestamp: log.statusTimestamp || log.$createdAt,
    }));

    return combinedLogs;
  } catch (error) {
    handleError(error, "Failed to fetch activity logs");
  }
}

export async function createActivityLog(logData) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.role === "admin") {
      throw new Error("Unauthorized access");
    }

    const logEntry = {
      userId: currentUser.$id,
      name: currentUser.name,
      timestamp: new Date().toISOString(),
      ...logData,
    };

    return await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.logsCollectionId,
      ID.unique(),
      logEntry
    );
  } catch (error) {
    handleError(error, "Failed to create activity log");
  }
}

// Update the uploadImage function to be more robust
export async function uploadImage(file, bucketId) {
  try {
    if (!file) {
      throw new Error("No file provided");
    }

    // Basic file validation
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      throw new Error("Invalid file type");
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      throw new Error("File size exceeds limit");
    }

    const fileData = await storage.createFile(bucketId, ID.unique(), file);
    return fileData.$id;
  } catch (error) {
    handleError(error, "Failed to upload image");
  }
}

// Add a function to get image preview URL
export async function getImagePreview(fileId, bucketId) {
  try {
    if (!fileId) return null;
    const imageUrl = storage.getFilePreview(bucketId, fileId);
    return imageUrl;
  } catch (error) {
    console.error("Error getting image preview:", error);
    return null;
  }
}
