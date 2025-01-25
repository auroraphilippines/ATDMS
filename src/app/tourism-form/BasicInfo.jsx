import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";
import { useFormContext } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { getImagePreview } from "@/services/appwrite";
import { storage } from "@/services/appwrite";
import { databases } from "@/services/appwrite";
import { ID } from "appwrite";
import { appwriteConfig } from "@/services/appwrite";

export default function BasicInfo() {
  const { register, setValue, watch } = useFormContext();
  const [lguLicenseImage, setLguLicenseImage] = useState(null);
  const [dotAccreditationImage, setDotAccreditationImage] = useState(null);
  const [lguLicenseFile, setLguLicenseFile] = useState(null);
  const [dotAccreditationFile, setDotAccreditationFile] = useState(null);

  // Watch for image IDs from form context
  const lguLicenseImageId = watch("lguLicenseImageId");
  const dotAccreditationImageId = watch("dotAccreditationImageId");

  useEffect(() => {
    // Load existing images if IDs are present
    const loadImages = async () => {
      if (lguLicenseImageId) {
        try {
          const imageUrl = await getImagePreview(
            lguLicenseImageId,
            "6789e834002216f21c5c"
          );
          // Ensure we have a valid URL
          setLguLicenseImage(imageUrl.href || imageUrl.toString());
        } catch (error) {
          console.error("Error loading LGU license image:", error);
        }
      }
      if (dotAccreditationImageId) {
        try {
          const imageUrl = await getImagePreview(
            dotAccreditationImageId,
            "6789e834002216f21c5c"
          );
          // Ensure we have a valid URL
          setDotAccreditationImage(imageUrl.href || imageUrl.toString());
        } catch (error) {
          console.error("Error loading DOT accreditation image:", error);
        }
      }
    };
    loadImages();
  }, [lguLicenseImageId, dotAccreditationImageId]);

  const handleSelectChange = (value, name) => {
    setValue(name, value, { shouldValidate: true }); // Trigger validation if required
  };
  const uploadFileToStorage = async (file, isLguLicense = true) => {
    try {
      // Upload file to storage
      const response = await storage.createFile(
        appwriteConfig.storageBucketId, // Using the config value
        ID.unique(),
        file
      );

      // Create or update document in accommodations collection
      const documentData = isLguLicense
        ? { lgulicense: response.$id }
        : { dotlicense: response.$id };

      await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.accommodationsCollectionId,
        ID.unique(),
        documentData
      );

      return response;
    } catch (error) {
      console.error("Failed to upload file:", error);
      throw error;
    }
  };
  useEffect(() => {
    console.log("LGU License Image ID:", lguLicenseImageId);
    console.log("DOT Accreditation Image ID:", dotAccreditationImageId);
  }, [lguLicenseImageId, dotAccreditationImageId]);

  const handleImageUpload = async (
    event,
    setImageFunction,
    setFileFunction,
    fieldName
  ) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const isLguLicense = fieldName === "lguLicenseImageId";
        const uploadedFile = await uploadFileToStorage(file, isLguLicense);
        setValue(fieldName, uploadedFile.$id);

        // Get the preview URL for the uploaded image
        const previewUrl = await getImagePreview(
          uploadedFile.$id,
          appwriteConfig.storageBucketId
        );
        setImageFunction(previewUrl.href || previewUrl.toString());
        setFileFunction(file);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };
  return (
    <TabsContent value="basic" className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="municipality">Municipality</Label>
              <Select
                value={watch("municipality")} // Bind the current value
                onValueChange={(value) =>
                  handleSelectChange(value, "municipality")
                }
              >
                <SelectTrigger id="municipality">
                  <SelectValue placeholder="Select Municipality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Baler">Baler</SelectItem>
                  <SelectItem value="San Luis">San Luis</SelectItem>
                  <SelectItem value="Maria Aurora">Maria Aurora</SelectItem>
                  <SelectItem value="Dipaculao">Dipaculao</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="establishmentName">Establishment Name</Label>
              <Input
                id="establishmentName"
                placeholder="Enter establishment name"
                {...register("establishmentName", {
                  required: "Establishment name is required",
                })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="businessAddress">Business Address</Label>
              <Input
                id="businessAddress"
                placeholder="Enter business address"
                {...register("businessAddress", {
                  required: "Business address is required",
                })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactNumber">Contact Number</Label>
              <Input
                id="contactNumber"
                placeholder="Enter contact number"
                type="tel"
                {...register("contactNumber", {
                  required: "Contact number is required",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Invalid contact number format",
                  },
                })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="accreditationNumber">Accreditation Number</Label>
              <Input
                id="accreditationNumber"
                placeholder="Enter accreditation number"
                {...register("accreditationNumber", {
                  required: "Accreditation number is required",
                })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expirationDate">Expiration Date</Label>
              <Input
                id="expirationDate"
                type="date"
                {...register("expirationDate", {
                  required: "Expiration date is required",
                })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="licenseNumber">LGU License Number</Label>
              <Input
                id="licenseNumber"
                placeholder="Enter LGU license number"
                {...register("licenseNumber", {
                  required: "LGU license number is required",
                })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactPerson">Contact Person</Label>
              <Input
                id="contactPerson"
                placeholder="Enter contact person's name"
                {...register("contactPerson", {
                  required: "Contact person is required",
                })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="designation">Designation</Label>
              <Input
                id="designation"
                placeholder="Enter designation"
                {...register("designation", {
                  required: "Designation is required",
                })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter email address"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address format",
                  },
                })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="facebook">Facebook</Label>
              <Input
                id="facebook"
                placeholder="Enter Facebook URL"
                {...register("facebook", {
                  required: "Facebook URL is required",
                })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instagram">Instagram</Label>
              <Input
                id="instagram"
                placeholder="Enter Instagram URL"
                {...register("instagram", {
                  required: "Instagram URL is required",
                })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="twitter">Twitter</Label>
              <Input
                id="twitter"
                placeholder="Enter Twitter URL"
                {...register("twitter", {
                  required: "Twitter URL is required",
                })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Other Website</Label>
              <Input
                id="website"
                type="url"
                placeholder="Enter website URL"
                {...register("website", {
                  required: "Website is required",
                  pattern: {
                    value:
                      /^(https?:\/\/)?([a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/.*)?$/,
                    message: "Invalid URL format. Example: https://example.com",
                  },
                })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bookingCompany">Booking Company</Label>
              <Input
                id="bookingCompany"
                placeholder="Enter booking company"
                {...register("bookingCompany", {
                  required: "Booking company is required",
                })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">LGU License Certificate</h3>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
            {lguLicenseImage ? (
              <Image
                src={lguLicenseImage}
                alt="LGU License Certificate"
                width={300}
                height={200}
                className="mx-auto object-contain"
              />
            ) : (
              <Image
                src="/images/certificate.png"
                alt="LGU License Certificate Placeholder"
                width={300}
                height={200}
                className="mx-auto"
              />
            )}
            <Input
              type="file"
              accept="image/*"
              onChange={(e) =>
                handleImageUpload(
                  e,
                  setLguLicenseImage,
                  setLguLicenseFile,
                  "lguLicenseImageId" // Field name to save uploaded file ID
                )
              }
              className="mt-4"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            DOT Accreditation License Certificate
          </h3>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
            {dotAccreditationImage ? (
              <Image
                src={dotAccreditationImage}
                alt="DOT Accreditation License Certificate"
                width={300}
                height={200}
                className="mx-auto object-contain"
              />
            ) : (
              <Image
                src="/image/certificate.png"
                alt="DOT Accreditation License Certificate Placeholder"
                width={300}
                height={200}
                className="mx-auto"
              />
            )}
            <Input
              type="file"
              accept="image/*"
              onChange={(e) =>
                handleImageUpload(
                  e,
                  setDotAccreditationImage,
                  setDotAccreditationFile,
                  "dotAccreditationImageId" // Field name to save uploaded file ID
                )
              }
              className="mt-4"
            />
          </div>
        </div>
      </div>
    </TabsContent>
  );
}
