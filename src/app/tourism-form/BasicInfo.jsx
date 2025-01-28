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
import { getImagePreview, storage, databases } from "@/services/appwrite";
import { ID } from "appwrite";
import { appwriteConfig } from "@/services/appwrite";

const STORAGE_BUCKET_ID = "6789e834002216f21c5c";
const ACCOMMODATIONS_COLLECTION_ID = "6741d7f2000200706b21";

export default function BasicInfo() {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  const [lguLicenseImage, setLguLicenseImage] = useState(null);
  const [dotAccreditationImage, setDotAccreditationImage] = useState(null);
  const [lguLicenseFile, setLguLicenseFile] = useState(null);
  const [dotAccreditationFile, setDotAccreditationFile] = useState(null);

  // Watch for image IDs and accommodation ID from form context
  const lguLicenseImageId = watch("lguLicenseImageId");
  const dotAccreditationImageId = watch("dotAccreditationImageId");
  const accommodationId = watch("accommodationId");

  useEffect(() => {
    const loadImages = async () => {
      if (lguLicenseImageId) {
        try {
          const imageUrl = await getImagePreview(
            lguLicenseImageId,
            STORAGE_BUCKET_ID
          );
          setLguLicenseImage(imageUrl.href || imageUrl.toString());
        } catch (error) {
          console.error("Error loading LGU license image:", error);
        }
      }
      if (dotAccreditationImageId) {
        try {
          const imageUrl = await getImagePreview(
            dotAccreditationImageId,
            STORAGE_BUCKET_ID
          );
          setDotAccreditationImage(imageUrl.href || imageUrl.toString());
        } catch (error) {
          console.error("Error loading DOT accreditation image:", error);
        }
      }
    };
    loadImages();
  }, [lguLicenseImageId, dotAccreditationImageId]);

  const handleSelectChange = (value, name) => {
    setValue(name, value, { shouldValidate: true });
  };

  const uploadFileToStorage = async (file, isLguLicense = true) => {
    try {
      // Step 1: Upload file to storage
      const fileResponse = await storage.createFile(
        STORAGE_BUCKET_ID,
        ID.unique(),
        file
      );

      // Step 2: Update form context with only the image IDs
      if (isLguLicense) {
        setValue("lguLicenseImageId", fileResponse.$id);
      } else {
        setValue("dotAccreditationImageId", fileResponse.$id);
      }

      return fileResponse;
    } catch (error) {
      console.error("Failed to upload file:", error);
      throw error;
    }
  };

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

        const previewUrl = await getImagePreview(
          uploadedFile.$id,
          STORAGE_BUCKET_ID
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
            {/* Municipality */}
            <div className="space-y-2">
              <Label htmlFor="municipality">Municipality</Label>
              <Select
                value={watch("municipality")}
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
              {errors.municipality && (
                <span className="text-red-500 text-sm">
                  {errors.municipality.message}
                </span>
              )}
            </div>

            {/* Establishment Name */}
            <div className="space-y-2">
              <Label htmlFor="establishmentName">Establishment Name</Label>
              <Input
                id="establishmentName"
                placeholder="Enter establishment name"
                {...register("establishmentName", {
                  required: "Establishment name is required",
                })}
              />
              {errors.establishmentName && (
                <span className="text-red-500 text-sm">
                  {errors.establishmentName.message}
                </span>
              )}
            </div>

            {/* Business Address */}
            <div className="space-y-2">
              <Label htmlFor="businessAddress">Business Address</Label>
              <Input
                id="businessAddress"
                placeholder="Enter business address"
                {...register("businessAddress", {
                  required: "Business address is required",
                })}
              />
              {errors.businessAddress && (
                <span className="text-red-500 text-sm">
                  {errors.businessAddress.message}
                </span>
              )}
            </div>

            {/* Contact Number */}
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
              {errors.contactNumber && (
                <span className="text-red-500 text-sm">
                  {errors.contactNumber.message}
                </span>
              )}
            </div>

            {/* Accreditation Number */}
            <div className="space-y-2">
              <Label htmlFor="accreditationNumber">Accreditation Number</Label>
              <Input
                id="accreditationNumber"
                placeholder="Enter accreditation number"
                {...register("accreditationNumber", {
                  required: "Accreditation number is required",
                })}
              />
              {errors.accreditationNumber && (
                <span className="text-red-500 text-sm">
                  {errors.accreditationNumber.message}
                </span>
              )}
            </div>

            {/* Expiration Date */}
            <div className="space-y-2">
              <Label htmlFor="expirationDate">Expiration Date</Label>
              <Input
                id="expirationDate"
                type="date"
                {...register("expirationDate", {
                  required: "Expiration date is required",
                })}
              />
              {errors.expirationDate && (
                <span className="text-red-500 text-sm">
                  {errors.expirationDate.message}
                </span>
              )}
            </div>

            {/* License Number */}
            <div className="space-y-2">
              <Label htmlFor="licenseNumber">LGU License Number</Label>
              <Input
                id="licenseNumber"
                placeholder="Enter LGU license number"
                {...register("licenseNumber", {
                  required: "LGU license number is required",
                })}
              />
              {errors.licenseNumber && (
                <span className="text-red-500 text-sm">
                  {errors.licenseNumber.message}
                </span>
              )}
            </div>

            {/* Contact Person */}
            <div className="space-y-2">
              <Label htmlFor="contactPerson">Contact Person</Label>
              <Input
                id="contactPerson"
                placeholder="Enter contact person's name"
                {...register("contactPerson", {
                  required: "Contact person is required",
                })}
              />
              {errors.contactPerson && (
                <span className="text-red-500 text-sm">
                  {errors.contactPerson.message}
                </span>
              )}
            </div>

            {/* Designation */}
            <div className="space-y-2">
              <Label htmlFor="designation">Designation</Label>
              <Input
                id="designation"
                placeholder="Enter designation"
                {...register("designation", {
                  required: "Designation is required",
                })}
              />
              {errors.designation && (
                <span className="text-red-500 text-sm">
                  {errors.designation.message}
                </span>
              )}
            </div>

            {/* Email */}
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
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Social Media Links */}
            <div className="space-y-2">
              <Label htmlFor="facebook">Facebook</Label>
              <Input
                id="facebook"
                placeholder="Enter Facebook URL"
                {...register("facebook")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="instagram">Instagram</Label>
              <Input
                id="instagram"
                placeholder="Enter Instagram URL"
                {...register("instagram")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="twitter">Twitter</Label>
              <Input
                id="twitter"
                placeholder="Enter Twitter URL"
                {...register("twitter")}
              />
            </div>

            {/* Website */}
            <div className="space-y-2">
              <Label htmlFor="website">Other Website</Label>
              <Input
                id="website"
                type="url"
                placeholder="Enter website URL"
                {...register("website", {
                  pattern: {
                    value:
                      /^(https?:\/\/)?([a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/.*)?$/,
                    message: "Invalid URL format. Example: https://example.com",
                  },
                })}
              />
              {errors.website && (
                <span className="text-red-500 text-sm">
                  {errors.website.message}
                </span>
              )}
            </div>

            {/* Booking Company */}
            <div className="space-y-2">
              <Label htmlFor="bookingCompany">Booking Company</Label>
              <Input
                id="bookingCompany"
                placeholder="Enter booking company"
                {...register("bookingCompany")}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Image Upload Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* LGU License Certificate */}
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
                  "lguLicenseImageId"
                )
              }
              className="mt-4"
            />
          </div>
        </div>

        {/* DOT Accreditation Certificate */}
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
                src="/images/certificate.png"
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
                  "dotAccreditationImageId"
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
