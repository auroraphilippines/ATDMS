import React, { useState, useEffect, useMemo, useCallback } from "react";
import { User, Mail, Phone, MapPin, Calendar, Key } from "lucide-react";
import { account, databases } from "@/services/appwrite";
import { ID, Query } from "appwrite";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import DOMPurify from "dompurify";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [originalData, setOriginalData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  // Input validation functions
  const validators = {
    name: (value) => {
      if (!value || value.trim().length === 0) return "Name is required";
      if (value.length < 2) return "Name must be at least 2 characters";
      return null;
    },
    email: (value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) return "Invalid email format";
      return null;
    },
    phone: (value) => {
      if (value && !/^\+?[\d\s-]+$/.test(value)) {
        return "Phone number can only contain digits, spaces, and hyphens";
      }
      return null;
    },
    address: (value) => {
      if (value && value.length > 200) return "Address is too long";
      return null;
    },
  };

  // Form validation state
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Memoized form validation
  const validateForm = useCallback(() => {
    const newErrors = {};
    Object.keys(validators).forEach((field) => {
      const validator = validators[field];
      const value = formData[field];
      const error = validator(value);
      if (error) newErrors[field] = error;
    });
    return newErrors;
  }, [formData]);

  // Memoized hasChanges check
  const hasChanges = useMemo(() => {
    return (
      formData.name !== originalData.name ||
      formData.phone !== originalData.phone ||
      formData.address !== originalData.address
    );
  }, [formData, originalData]);

  useEffect(() => {
    let isMounted = true;

    const fetchUserProfile = async () => {
      try {
        const currentAccount = await account.get();

        const userDocuments = await databases.listDocuments(
          "672cfccb002f456cb332",
          "672cfcd0003c114264cd",
          [Query.equal("accountId", currentAccount.$id)]
        );

        if (!isMounted) return;

        if (userDocuments.documents.length > 0) {
          const userDoc = userDocuments.documents[0];
          const sanitizedUserDoc = {
            ...userDoc,
            name: DOMPurify.sanitize(userDoc.name || currentAccount.name),
            phone: DOMPurify.sanitize(userDoc.phone || ""),
            address: DOMPurify.sanitize(userDoc.address || ""),
          };

          setUser({
            ...currentAccount,
            ...sanitizedUserDoc,
            dateJoined: userDoc.$createdAt,
          });

          const initialData = {
            name: sanitizedUserDoc.name,
            email: currentAccount.email,
            phone: sanitizedUserDoc.phone,
            address: sanitizedUserDoc.address,
          };

          setFormData(initialData);
          setOriginalData(initialData);
        }
      } catch (error) {
        // Log detailed error server-side or to monitoring service
        console.error({
          type: "PROFILE_FETCH_ERROR",
          timestamp: new Date().toISOString(),
          error: error.message,
          stack: error.stack,
        });

        // Show generic error to user
        setError("Unable to load profile. Please try again later.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchUserProfile();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    const sanitizedValue = DOMPurify.sanitize(value);

    setFormData((prev) => ({
      ...prev,
      [name]: sanitizedValue,
    }));

    // Clear error when user starts typing
    setErrors((prev) => ({
      ...prev,
      [name]: null,
    }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate form
      const formErrors = validateForm();
      if (Object.keys(formErrors).length > 0) {
        setErrors(formErrors);
        toast.error("Please correct the errors in the form");
        return;
      }

      // Ensure required fields are present
      if (!formData.name.trim()) {
        throw new Error("Name is required");
      }

      const sanitizedData = {
        name: DOMPurify.sanitize(formData.name.trim()),
        phone: DOMPurify.sanitize(formData.phone.trim()),
        address: DOMPurify.sanitize(formData.address.trim()),
      };

      await databases.updateDocument(
        "672cfccb002f456cb332",
        "672cfcd0003c114264cd",
        user.$id,
        sanitizedData
      );

      await account.updateName(sanitizedData.name);

      setUser((prev) => ({
        ...prev,
        ...sanitizedData,
      }));

      setOriginalData((prev) => ({
        ...prev,
        ...sanitizedData,
      }));

      toast.success("Profile updated successfully!");
    } catch (error) {
      // Log detailed error server-side
      console.error({
        type: "PROFILE_UPDATE_ERROR",
        timestamp: new Date().toISOString(),
        error: error.message,
        stack: error.stack,
      });

      // Show generic error to user
      toast.error("Unable to update profile. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const InputField = ({
    icon: Icon,
    label,
    name,
    type = "text",
    value,
    onChange,
    disabled = false,
  }) => (
    <div className="space-y-2">
      <Label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
      </Label>
      <div className="relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-indigo-500" aria-hidden="true" />
        </div>
        <Input
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          className="pl-10 w-full border-indigo-300 focus:border-indigo-500 focus:ring-indigo-500"
          disabled={disabled}
        />
      </div>
    </div>
  );

  // Enhanced error display
  const ErrorMessage = ({ error }) =>
    error ? (
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-red-500 text-sm mt-1"
      >
        {error}
      </motion.p>
    ) : null;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <div className="h-12 w-12 border-4 border-t-4 border-indigo-600 border-t-transparent rounded-full"></div>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4 bg-red-100 rounded-lg">
        Error: {error}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <h2 className="text-3xl font-bold text-indigo-700 mb-6">Your Profile</h2>
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-indigo-700">
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <InputField
                  icon={User}
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                <ErrorMessage error={errors.name} />
              </motion.div>
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <InputField
                  icon={Mail}
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled
                />
                <ErrorMessage error={errors.email} />
              </motion.div>
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <InputField
                  icon={Phone}
                  label="Phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                />
                <ErrorMessage error={errors.phone} />
              </motion.div>
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <InputField
                  icon={MapPin}
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
                <ErrorMessage error={errors.address} />
              </motion.div>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex justify-center"
            >
              <Button
                type="submit"
                disabled={!hasChanges || isSubmitting}
                className={`${!hasChanges || isSubmitting ? "opacity-50" : ""}`}
              >
                {isSubmitting ? "Updating..." : "Update Profile"}
              </Button>
            </motion.div>
          </form>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-8 border-t border-indigo-200 pt-6"
          >
            <h3 className="text-xl font-semibold mb-4 text-indigo-700">
              Account Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center text-gray-700">
                <Calendar className="mr-2 h-5 w-5 text-indigo-500" />
                <span>
                  Member since:{" "}
                  {user && new Date(user.dateJoined).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center text-gray-700">
                <Key className="mr-2 h-5 w-5 text-indigo-500" />
                <span>User ID: {user?.$id}</span>
              </div>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Profile;
