"use client";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Modal from "@/components/modal";
import { useAuthUserStore } from "@/services/user";
import {
  createDocument,
  signOut,
  uploadImage,
  storage,
  appwriteConfig,
} from "@/services/appwrite";
import BasicInfo from "./BasicInfo";
import Facilities from "./Facilities";
import Rooms from "./Rooms";
import Cottages from "./Cottages";
import Services from "./Services";
import Employees from "./Employees";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";

const STORAGE_BUCKET_ID = "6789e834002216f21c5c";

export default function TourismForm() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const [isLoading, setIsLoading] = useState(false);
  const methods = useForm();

  const { authUser, clearAuthUser } = useAuthUserStore();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut();
      clearAuthUser();
      toast.success("Successfully logged out.");
      router.push("/login");
    } catch (error) {
      toast.error("Error logging out. Please try again.");
    }
  };

  const normalizeUrl = (url) => {
    if (!/^https?:\/\//.test(url)) {
      return `http://${url}`;
    }
    return url;
  };

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const userId = sessionStorage.getItem("userId");
      if (!userId) {
        throw new Error(
          "User is not logged in. Please log in to submit the form."
        );
      }

      // Get the image IDs from the form data
      const lguLicenseImageId = data.lguLicenseImageId;
      const dotAccreditationImageId = data.dotAccreditationImageId;

      // Generate image URLs only if IDs exist
      let LGUid = null;
      let dotid = null;

      if (lguLicenseImageId) {
        LGUid = `https://cloud.appwrite.io/v1/storage/buckets/${STORAGE_BUCKET_ID}/files/${lguLicenseImageId}/view?project=${appwriteConfig.projectId}`;
      }

      if (dotAccreditationImageId) {
        dotid = `https://cloud.appwrite.io/v1/storage/buckets/${STORAGE_BUCKET_ID}/files/${dotAccreditationImageId}/view?project=${appwriteConfig.projectId}`;
      }

      // Create the basic info document with image IDs and URLs
      await createDocument("6741d7f2000200706b21", {
        accommodationId: uuidv4(),
        municipality: data.municipality,
        establishmentName: data.establishmentName,
        businessAddress: data.businessAddress,
        contactNumber: data.contactNumber,
        accreditationNumber: data.accreditationNumber,
        expirationDate: data.expirationDate,
        licenseNumber: data.licenseNumber,
        contactPerson: data.contactPerson,
        designation: data.designation,
        email: data.email,
        facebook: data.facebook || "",
        instagram: data.instagram || "",
        twitter: data.twitter || "",
        website: normalizeUrl(data.website || ""),
        bookingCompany: data.bookingCompany || "",
        userId,
        status: "Awaiting Inspection",
        // Store image IDs and URLs
        lguLicenseImageId,
        dotAccreditationImageId,
        LGUid,
        dotid,
      });

      // Proceed with the rest of the form data submission
      const {
        municipality,
        establishmentName,
        businessAddress,
        contactNumber,
        accreditationNumber,
        expirationDate,
        licenseNumber,
        contactPerson,
        designation,
        email,
        facebook,
        instagram,
        twitter,
        website,
        bookingCompany,
      } = data;

      // Validation for required fields
      if (
        !municipality ||
        !establishmentName ||
        !businessAddress ||
        !contactNumber ||
        !accreditationNumber
      ) {
        throw new Error("Please fill in all required fields.");
      }

      // Generate accommodationId
      const accommodationId = uuidv4();

      // Normalize website URL
      const normalizedWebsite = normalizeUrl(website || "");

      // Flatten facilities data
      const facilitiesData = {
        accommodationId, // Unique identifier for the accommodation

        // Dining Outlets
        diningOutletschecked: !!data.diningOutlets?.restaurant?.checked,
        diningOutletscapacity:
          parseInt(data.diningOutlets?.restaurant?.capacity) || 0,
        barchecked: !!data.diningOutlets?.bar?.checked,
        barcapacity: parseInt(data.diningOutlets?.bar?.capacity) || 0,
        coffeeShopchecked: !!data.diningOutlets?.coffeeShop?.checked,
        coffeeShopcapacity:
          parseInt(data.diningOutlets?.coffeeShop?.capacity) || 0,

        // Conference/Convention Facilities
        conventionHallchecked:
          !!data.conferenceConvention?.conventionHall?.checked,
        conventionHallcapacity:
          parseInt(data.conferenceConvention?.conventionHall?.capacity) || 0,
        conventionHallacprice:
          parseFloat(data.conferenceConvention?.conventionHall?.acPrice) || 0.0,
        conventionHallnonacprice:
          parseFloat(data.conferenceConvention?.conventionHall?.nonAcPrice) ||
          0.0,
        conferenceHallchecked:
          !!data.conferenceConvention?.conferenceHall?.checked,
        conferenceHallcapacity:
          parseInt(data.conferenceConvention?.conferenceHall?.capacity) || 0,
        conferenceHallacprice:
          parseFloat(data.conferenceConvention?.conferenceHall?.acPrice) || 0.0,
        conferenceHallnonacprice:
          parseFloat(data.conferenceConvention?.conferenceHall?.nonAcPrice) ||
          0.0,
        functionHallchecked: !!data.conferenceConvention?.functionHall?.checked,
        functionHallcapacity:
          parseInt(data.conferenceConvention?.functionHall?.capacity) || 0,
        functionHallacprice:
          parseFloat(data.conferenceConvention?.functionHall?.acPrice) || 0.0,
        functionHallnonacprice:
          parseFloat(data.conferenceConvention?.functionHall?.nonAcPrice) ||
          0.0,
        meetingRoomchecked: !!data.conferenceConvention?.meetingRoom?.checked,
        meetingHallcapacity:
          parseInt(data.conferenceConvention?.meetingRoom?.capacity) || 0,
        meetingRoomacprice:
          parseFloat(data.conferenceConvention?.meetingRoom?.acPrice) || 0.0,
        meetingRoomnonacprice:
          parseFloat(data.conferenceConvention?.meetingRoom?.nonAcPrice) || 0.0,

        // Marine Recreation
        kayakingchecked: !!data.marineRecreation?.kayaking?.checked,
        kayakingNum: parseInt(data.marineRecreation?.kayaking?.quantity) || 0,
        kayakingprice:
          parseFloat(data.marineRecreation?.kayaking?.price) || 0.0,
        boardSurfingchecked: !!data.marineRecreation?.boardSurfing?.checked,
        boardSurfingNum:
          parseInt(data.marineRecreation?.boardSurfing?.quantity) || 0,
        boardSurfingprice:
          parseFloat(data.marineRecreation?.boardSurfing?.price) || 0.0,
        snorkelingchecked: !!data.marineRecreation?.snorkeling?.checked,
        snorkelingNum:
          parseInt(data.marineRecreation?.snorkeling?.quantity) || 0,
        snorkelingprice:
          parseFloat(data.marineRecreation?.snorkeling?.price) || 0.0,

        // Swimming Pools
        adultPooldepth: data.adultPool?.depth || "",
        adultPoolsize: data.adultPool?.size || "",
        childrensPooldepth: data.childrenPool?.depth || "",
        childrensPoolsize: data.childrenPool?.size || "",

        // Sports Recreation
        basketballCourtchecked: !!data.sportsRecreation?.basketballCourt,
        tennisCourtchecked: !!data.sportsRecreation?.tennisCourt,
        badmintonCourtchecked: !!data.sportsRecreation?.badmintonCourt,
        volleyballCourtchecked: !!data.sportsRecreation?.volleyballCourt,
        beachVolleyballchecked: !!data.sportsRecreation?.beachVolleyball,
        tableTennischecked: !!data.sportsRecreation?.tableTennis,
      };

      // Save Facilities
      await createDocument("6741e31a0022f8e43fb3", facilitiesData);

      // Save Rooms
      if (data.acRooms || data.fanRooms) {
        const acRooms = {
          acRoomtype: data.acRooms?.map((room) => room.type || "") || [],
          acRoomnum:
            data.acRooms?.map((room) => parseInt(room.number) || 0) || [],
          acBedtype: data.acRooms?.map((room) => room.bedType || "") || [],
          acRoomcapacity:
            data.acRooms?.map((room) => parseInt(room.capacity) || 0) || [],
          acRoomrate:
            data.acRooms?.map((room) => parseFloat(room.rate) || 0.0) || [],
          acRoomamenities:
            data.acRooms?.map((room) => room.amenities || "") || [],
        };

        const fanRooms = {
          fanRoomtype: data.fanRooms?.map((room) => room.type || "") || [],
          fanRoomnum:
            data.fanRooms?.map((room) => parseInt(room.number) || 0) || [],
          fanBedtype: data.fanRooms?.map((room) => room.bedType || "") || [],
          fanRoomcapacity:
            data.fanRooms?.map((room) => parseInt(room.capacity) || 0) || [],
          fanRoomrate:
            data.fanRooms?.map((room) => parseFloat(room.rate) || 0.0) || [],
          fanRoomamenities:
            data.fanRooms?.map((room) => room.amenities || "") || [],
        };

        // Combine AC and Fan rooms into a single document
        await createDocument("6742f65c003e2169aa2b", {
          accommodationId,
          ...acRooms,
          ...fanRooms,
        });
      }

      // Save Cottages
      if (data.acCottages || data.nonAcCottages || data.tents) {
        const acCottages = {
          acCottagesname:
            data.acCottages?.map((cottage) => cottage.name || "") || [],
          acCottagessize:
            data.acCottages?.map((cottage) => cottage.size || "") || [],
          acCottagescapacity:
            data.acCottages?.map(
              (cottage) => parseInt(cottage.capacity) || 0
            ) || [],
          acCottagesrate:
            data.acCottages?.map(
              (cottage) => parseFloat(cottage.rate) || 0.0
            ) || [],
          acCottagesamenities:
            data.acCottages?.map((cottage) => cottage.amenities || "") || [],
        };

        const nonAcCottages = {
          nonacCottagesname:
            data.nonAcCottages?.map((cottage) => cottage.name || "") || [],
          nonacCottagessize:
            data.nonAcCottages?.map((cottage) => cottage.size || "") || [],
          nonacCottagescapacity:
            data.nonAcCottages?.map(
              (cottage) => parseInt(cottage.capacity) || 0
            ) || [],
          nonacCottagesrate:
            data.nonAcCottages?.map(
              (cottage) => parseFloat(cottage.rate) || 0.0
            ) || [],
          nonacCottagesamenities:
            data.nonAcCottages?.map((cottage) => cottage.amenities || "") || [],
        };

        const tents = {
          tentsName: data.tents?.map((tent) => tent.name || "") || [],
          tentSize: data.tents?.map((tent) => tent.size || "") || [],
          tentCapacity:
            data.tents?.map((tent) => parseInt(tent.capacity) || 0) || [],
          tentRate:
            data.tents?.map((tent) => parseFloat(tent.rate) || 0.0) || [],
          tentAmenities: data.tents?.map((tent) => tent.amenities || "") || [],
        };

        // Combine all cottages and tents data into a single document
        await createDocument("674342ba0017b324fb03", {
          accommodationId,
          ...acCottages,
          ...nonAcCottages,
          ...tents,
        });
      }

      // Save Services
      if (data) {
        const servicesData = {
          accommodationId, // Unique identifier for the accommodation

          // Rentals
          videokeRentalchecked: !!data.videokeRental?.checked,
          videokeRentalavailabilty:
            parseInt(data.videokeRental?.availability) || 0,
          videokeRentalprice: parseFloat(data.videokeRental?.price) || 0.0,
          atvRentalchecked: !!data.atvRental?.checked,
          atvRentalavailabilty: parseInt(data.atvRental?.availability) || 0,
          atvRentalprice: parseFloat(data.atvRental?.price) || 0.0,
          bicycleRentalchecked: !!data.bicycleRental?.checked,
          bicycleRentalavailability:
            parseInt(data.bicycleRental?.availability) || 0,
          bicycleRentalprice: parseFloat(data.bicycleRental?.price) || 0.0,
          motorcycleRentalchecked: !!data.motorcycleRental?.checked,
          motorcycleRentalavailability:
            parseInt(data.motorcycleRental?.availability) || 0,
          motorcycleRentalprice:
            parseFloat(data.motorcycleRental?.price) || 0.0,

          // Common Facilities
          commonKitchennum: parseInt(data.commonKitchen?.num) || 0,
          commonKitchencharge: parseFloat(data.commonKitchen?.charge) || 0.0,
          commonSinknum: parseInt(data.commonSink?.num) || 0,
          commonSinkcharge: parseFloat(data.commonSink?.charge) || 0.0,
          commonGrillingsitenum: parseInt(data.commonGrillingSite?.num) || 0,
          commonGrillingsitecharge:
            parseFloat(data.commonGrillingSite?.charge) || 0.0,
          commonBathroomnum: parseInt(data.commonBathroom?.num) || 0,
          commonBathroomcharge: parseFloat(data.commonBathroom?.charge) || 0.0,
          commonRestroomnum: parseInt(data.commonRestroom?.num) || 0,
          commonRestroomcharge: parseFloat(data.commonRestroom?.charge) || 0.0,
          showernum: parseInt(data.shower?.num) || 0,
          showercharge: parseFloat(data.shower?.charge) || 0.0,

          // Parking and Campsite
          parkingcapacity: parseInt(data.parking?.capacity) || 0,
          parkingprice: parseFloat(data.parking?.price) || 0.0,
          campsiteAreacapacity: parseInt(data.campsiteArea?.capacity) || 0,
          campsiteAreaprice: parseFloat(data.campsiteArea?.price) || 0.0,

          // Promotions and Discounts
          packageschecked: !!data.promotions?.packages?.checked,
          advanceBookingchecked: !!data.promotions?.advanceBooking?.checked,
          summerPromochecked: !!data.promotions?.summerPromo?.checked,
          holidayPromochecked: !!data.promotions?.holidayPromo?.checked,
          returnClientratechecked: !!data.promotions?.returnClientRate?.checked,
          corporateRatechecked: !!data.promotions?.corporateRate?.checked,
          governmentDiscountchecked:
            !!data.promotions?.governmentDiscount?.checked,
          seniorDiscountchecked: !!data.promotions?.seniorDiscount?.checked,
          othersSpecifychecked: !!data.promotions?.othersSpecify?.checked,
          corporateDiscountamount:
            parseFloat(data.promotions?.corporateDiscount?.amount) || 0.0,
          governmentDiscountamount:
            parseFloat(data.promotions?.governmentDiscount?.amount) || 0.0,
          seniorDiscountamount:
            parseFloat(data.promotions?.seniorDiscount?.amount) || 0.0,
          othersSpecifyDiscountamount:
            parseFloat(data.promotions?.othersSpecify?.amount) || 0.0,
        };

        // Save services data
        await createDocument("6743c72d003a2d3b298d", servicesData);
      }

      // Save Employees
      await createDocument("67432e7e00241eb80e40", {
        accommodationId, // Unique ID for the accommodation
        localmaleNum: parseInt(data.localmaleNum) || 0, // Number of local male employees
        localfemaleNum: parseInt(data.localfemaleNum) || 0, // Number of local female employees
        foreignmaleNum: parseInt(data.foreignmaleNum) || 0, // Number of foreign male employees
        foreignfemaleNum: parseInt(data.foreignfemaleNum) || 0, // Number of foreign female employees
      });

      setIsLoading(false);
      toast.success("Form submitted successfully!");
      router.push("/client");
    } catch (error) {
      setIsLoading(false);
      console.error("Error submitting form:", error);
      toast.error("Error submitting form. Please try again.");
    }
  };
  // Map the tab order for navigation
  const tabOrder = [
    "basic",
    "facilities",
    "rooms",
    "cottages",
    "services",
    "employees",
  ];

  // Function to navigate to the next tab
  const handleNext = () => {
    const currentIndex = tabOrder.indexOf(activeTab);
    if (currentIndex < tabOrder.length - 1) {
      setActiveTab(tabOrder[currentIndex + 1]);
    } else {
      methods.handleSubmit(onSubmit)();
    }
  };

  // Function to navigate to the previous tab
  const handlePrevious = () => {
    const currentIndex = tabOrder.indexOf(activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabOrder[currentIndex - 1]);
    }
  };

  return authUser ? (
    <FormProvider {...methods}>
      <div className="container mx-auto py-10">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Tourism Accommodation Inspection Form</CardTitle>
              <Button variant="outline" onClick={() => router.push("/client")}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="space-y-8"
            >
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="facilities">Facilities</TabsTrigger>
                  <TabsTrigger value="rooms">Rooms</TabsTrigger>
                  <TabsTrigger value="cottages">Cottages & Villas</TabsTrigger>
                  <TabsTrigger value="services">Services</TabsTrigger>
                  <TabsTrigger value="employees">Employees</TabsTrigger>
                </TabsList>
                <TabsContent value="basic">
                  <BasicInfo />
                </TabsContent>
                <TabsContent value="facilities">
                  <Facilities />
                </TabsContent>
                <TabsContent value="rooms">
                  <Rooms />
                </TabsContent>
                <TabsContent value="cottages">
                  <Cottages />
                </TabsContent>
                <TabsContent value="services">
                  <Services />
                </TabsContent>
                <TabsContent value="employees">
                  <Employees />
                </TabsContent>
              </Tabs>
              <div className="flex justify-between">
                {activeTab !== "basic" && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrevious}
                  >
                    Previous
                  </Button>
                )}
                <Button type="button" onClick={handleNext} disabled={isLoading}>
                  {isLoading
                    ? "Submitting..."
                    : activeTab === "employees"
                    ? "Submit"
                    : "Next"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </FormProvider>
  ) : (
    <Modal isOpen={true} onClose={() => router.push("/login")}>
      <div>
        <h2 className="text-lg font-semibold">Login Required</h2>
        <p className="mt-2">You must be logged in to access this page.</p>
      </div>
    </Modal>
  );
}
