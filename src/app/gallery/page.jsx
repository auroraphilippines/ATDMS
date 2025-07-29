"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  Globe,
  Star,
  Users,
  Wifi,
  Car,
  Utensils,
  Waves,
  Mountain,
  Search,
  Filter,
  Award,
  Heart,
  Share2,
  Eye,
  Clock,
  CheckCircle,
  AlertCircle,
  Sparkles,
  TrendingUp,
} from "lucide-react";

export default function GalleryPage() {
  const [mounted, setMounted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const [priceRange, setPriceRange] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [isScrolled, setIsScrolled] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [favorites, setFavorites] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mounted]);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
            <div
              className="absolute inset-0 w-20 h-20 border-4 border-blue-500 border-b-transparent rounded-full animate-spin mx-auto opacity-30"
              style={{
                animationDirection: "reverse",
                animationDuration: "1.5s",
              }}
            ></div>
          </div>
          <p className="text-white text-lg font-medium">Loading Gallery...</p>
          <p className="text-purple-300 text-sm mt-2">
            Discovering amazing places
          </p>
        </div>
      </div>
    );
  }

  // Enhanced establishment data with more details
  const establishments = [
    {
      id: 1,
      name: "Costa Pacifica Resort",
      category: "Resorts",
      location: "Baler, Aurora",
      image: "/images/costa.png",
      rating: 4.8,
      reviews: 324,
      status: "registered",
      priceRange: "luxury",
      established: "2018",
      description:
        "Luxury beachfront resort with world-class amenities and stunning ocean views. Perfect for families and couples seeking a premium beach experience.",
      longDescription:
        "Experience unparalleled luxury at Costa Pacifica Resort, where pristine beaches meet world-class hospitality. Our resort features elegantly appointed suites with panoramic ocean views, multiple dining venues, and a full-service spa. Whether you're seeking adventure or relaxation, our dedicated concierge team will ensure your stay exceeds expectations.",
      amenities: [
        "Free WiFi",
        "Swimming Pool",
        "Restaurant",
        "Spa",
        "Beach Access",
        "Parking",
        "Room Service",
        "Fitness Center",
      ],
      contact: {
        phone: "+63 (042) 123-4567",
        email: "info@costapacifica.com",
        website: "https://costapacifica.com",
      },
      capacity: "150 guests",
      features: [
        "Beachfront",
        "Family-Friendly",
        "Luxury",
        "Spa",
        "Fine Dining",
      ],
      awards: ["Best Resort 2023", "Eco-Friendly Certified"],
      newListing: false,
      verified: true,
    },
    {
      id: 2,
      name: "Dingalan Bay Resort",
      category: "Beaches",
      location: "Dingalan, Aurora",
      image: "/images/bay.png",
      rating: 4.5,
      reviews: 189,
      status: "registered",
      priceRange: "moderate",
      established: "2015",
      description:
        "Pristine waters and scenic views make this the perfect getaway for nature lovers. Experience the untouched beauty of Aurora's coastline.",
      longDescription:
        "Nestled along the pristine coastline of Dingalan, this resort offers an authentic connection with nature. Wake up to the sound of waves, enjoy fresh seafood, and explore hidden coves. Perfect for eco-tourists and adventure seekers.",
      amenities: [
        "Beach Access",
        "Kayak Rental",
        "Restaurant",
        "Parking",
        "Picnic Areas",
        "Snorkeling Gear",
      ],
      contact: {
        phone: "+63 (042) 234-5678",
        email: "contact@dingalanbay.com",
        website: "https://dingalanbay.com",
      },
      capacity: "80 guests",
      features: ["Natural Beauty", "Water Sports", "Eco-Friendly", "Adventure"],
      awards: ["Eco Tourism Award 2022"],
      newListing: false,
      verified: true,
    },
    {
      id: 3,
      name: "Aurora Resort & Spa",
      category: "Resorts",
      location: "Baler, Aurora",
      image: "/images/resort.jpg",
      rating: 4.6,
      reviews: 267,
      status: "registered",
      priceRange: "luxury",
      established: "2012",
      description:
        "Family-friendly accommodation with modern facilities and traditional Filipino hospitality.",
      longDescription:
        "A perfect blend of modern comfort and Filipino tradition. Our resort caters to families with kids' clubs, multiple pools, and cultural activities. Experience authentic local cuisine and warm hospitality.",
      amenities: [
        "Free WiFi",
        "Spa Services",
        "Kids Club",
        "Restaurant",
        "Pool",
        "Parking",
        "Cultural Shows",
        "Game Room",
      ],
      contact: {
        phone: "+63 (042) 345-6789",
        email: "reservations@auroraresort.com",
        website: "https://auroraresort.com",
      },
      capacity: "200 guests",
      features: [
        "Family-Friendly",
        "Spa",
        "Cultural Experience",
        "Entertainment",
      ],
      awards: ["Family Resort of the Year 2023"],
      newListing: false,
      verified: true,
    },
    {
      id: 4,
      name: "Casa Esperanza Boutique Hotel",
      category: "Hotels",
      location: "Baler, Aurora",
      image: "/images/casa.png",
      rating: 4.7,
      reviews: 156,
      status: "registered",
      priceRange: "luxury",
      established: "2020",
      description:
        "Boutique hotel experience with personalized service and elegant accommodations.",
      longDescription:
        "An intimate boutique experience where every detail matters. Each room tells a story through carefully curated art and furnishings. Our personalized service ensures a memorable stay.",
      amenities: [
        "Free WiFi",
        "Concierge",
        "Restaurant",
        "Bar",
        "Parking",
        "Laundry",
        "Art Gallery",
        "Library",
      ],
      contact: {
        phone: "+63 (042) 456-7890",
        email: "hello@casaesperanza.com",
        website: "https://casaesperanza.com",
      },
      capacity: "40 guests",
      features: [
        "Boutique",
        "Personalized Service",
        "Elegant Design",
        "Art Collection",
      ],
      awards: ["Boutique Hotel Excellence 2023"],
      newListing: true,
      verified: true,
    },
    {
      id: 5,
      name: "Baler Surfing Beach",
      category: "Beaches",
      location: "Baler, Aurora",
      image: "/images/baler.png",
      rating: 4.9,
      reviews: 445,
      status: "registered",
      priceRange: "budget",
      established: "1970s",
      description:
        "Famous surfing destination with perfect waves and beautiful coastal scenery.",
      longDescription:
        "The birthplace of surfing in the Philippines. This legendary beach offers consistent waves year-round and a vibrant surf culture. Perfect for beginners and pros alike.",
      amenities: [
        "Surf Lessons",
        "Board Rental",
        "Beach Cafe",
        "Parking",
        "Shower Facilities",
        "Surf Shop",
      ],
      contact: {
        phone: "+63 (042) 567-8901",
        email: "surf@balersurfing.com",
        website: "https://balersurfing.com",
      },
      capacity: "Unlimited day visitors",
      features: ["Surfing", "Historic", "Adventure Sports", "Beach Culture"],
      awards: ["Best Surf Spot Philippines 2023"],
      newListing: false,
      verified: true,
    },
    // Add some non-registered establishments
    {
      id: 11,
      name: "Sunset Beach Inn",
      category: "Hotels",
      location: "Baler, Aurora",
      image: "/placeholder.svg?height=300&width=400",
      rating: null,
      reviews: 0,
      status: "not_registered",
      priceRange: "budget",
      established: "2021",
      description: "Budget-friendly accommodation near the beach.",
      amenities: ["Basic WiFi", "Restaurant", "Parking"],
      contact: {
        phone: "+63 (042) 111-2222",
        email: "info@sunsetbeachinn.com",
        website: "#",
      },
      capacity: "30 guests",
      features: ["Budget-Friendly", "Basic Amenities"],
      awards: [],
      newListing: true,
      verified: false,
    },
  ];

  const categories = [
    "All",
    "Registered",
    "Not Registered",
    "Resorts",
    "Hotels",
    "Beaches",
    "Restaurants",
  ];
  const locations = ["all", "Baler", "Dingalan", "Casiguran"];
  const priceRanges = ["all", "budget", "moderate", "luxury"];

  // Enhanced filtering logic
  const filteredEstablishments = establishments.filter((establishment) => {
    const matchesCategory =
      selectedCategory === "All" ||
      (selectedCategory === "Registered" &&
        establishment.status === "registered") ||
      (selectedCategory === "Not Registered" &&
        establishment.status === "not_registered") ||
      establishment.category === selectedCategory;

    const matchesSearch =
      establishment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      establishment.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      establishment.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesLocation =
      locationFilter === "all" ||
      establishment.location
        .toLowerCase()
        .includes(locationFilter.toLowerCase());

    const matchesPrice =
      priceRange === "all" || establishment.priceRange === priceRange;

    return matchesCategory && matchesSearch && matchesLocation && matchesPrice;
  });

  // Sorting logic
  const sortedEstablishments = [...filteredEstablishments].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return (b.rating || 0) - (a.rating || 0);
      case "reviews":
        return (b.reviews || 0) - (a.reviews || 0);
      case "name":
        return a.name.localeCompare(b.name);
      case "newest":
        return new Date(b.established) - new Date(a.established);
      default:
        return 0;
    }
  });

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  const getAmenityIcon = (amenity) => {
    switch (amenity.toLowerCase()) {
      case "free wifi":
        return <Wifi className="w-4 h-4" />;
      case "parking":
        return <Car className="w-4 h-4" />;
      case "restaurant":
        return <Utensils className="w-4 h-4" />;
      case "beach access":
        return <Waves className="w-4 h-4" />;
      case "hiking trails":
        return <Mountain className="w-4 h-4" />;
      default:
        return <Star className="w-4 h-4" />;
    }
  };

  const getPriceColor = (priceRange) => {
    switch (priceRange) {
      case "budget":
        return "bg-green-100 text-green-800";
      case "moderate":
        return "bg-yellow-100 text-yellow-800";
      case "luxury":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <motion.header
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-lg"
            : "bg-white/60 backdrop-blur-sm"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link href="/">
                <Button
                  variant="outline"
                  className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm border-2 border-indigo-200 hover:border-indigo-400 hover:bg-white transition-all duration-300 rounded-full px-6 py-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="font-medium">Back to Home</span>
                </Button>
              </Link>
            </motion.div>

            <motion.div
              className="flex items-center space-x-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link href="/" className="flex items-center space-x-3">
                <div className="relative">
                  <Image
                    src="/images/lap.png"
                    alt="AAS Logo"
                    width={50}
                    height={50}
                    className="hover:scale-105 transition-transform duration-300 drop-shadow-lg rounded-full"
                  />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    AAS
                  </span>
                  <div className="text-xs text-gray-500 -mt-1 font-medium">
                    Gallery
                  </div>
                </div>
              </Link>
            </motion.div>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setViewMode(viewMode === "grid" ? "list" : "grid")
                }
                className="rounded-full"
              >
                <Eye className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      <main className="pt-24 relative z-10">
        {/* Enhanced Hero Section */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                <span>Discover Amazing Places</span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Explore{" "}
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Aurora's
                </span>
                <br />
                <span className="text-4xl md:text-5xl lg:text-6xl">
                  Finest Destinations
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Discover certified accommodations, pristine beaches, and
                unforgettable experiences in the beautiful province of Aurora,
                Philippines.
              </p>
            </motion.div>

            {/* Enhanced Search and Filter Section */}
            <motion.div
              className="max-w-6xl mx-auto mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Main Search Bar */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-6 mb-6">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type="text"
                      placeholder="Search establishments, locations, or amenities..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-12 pr-4 py-4 text-lg border-0 bg-gray-50 focus:bg-white transition-colors duration-300 rounded-xl"
                    />
                  </div>
                  <Button
                    onClick={() => setShowFilters(!showFilters)}
                    variant="outline"
                    className="px-6 py-4 rounded-xl border-2 border-indigo-200 hover:border-indigo-400 transition-colors duration-300"
                  >
                    <Filter className="w-5 h-5 mr-2" />
                    Filters
                  </Button>
                </div>

                {/* Advanced Filters */}
                <AnimatePresence>
                  {showFilters && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-6 pt-6 border-t border-gray-200"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Category
                          </label>
                          <Select
                            value={selectedCategory}
                            onValueChange={setSelectedCategory}
                          >
                            <SelectTrigger className="rounded-xl">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem key={category} value={category}>
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Location
                          </label>
                          <Select
                            value={locationFilter}
                            onValueChange={setLocationFilter}
                          >
                            <SelectTrigger className="rounded-xl">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {locations.map((location) => (
                                <SelectItem key={location} value={location}>
                                  {location === "all"
                                    ? "All Locations"
                                    : location}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Price Range
                          </label>
                          <Select
                            value={priceRange}
                            onValueChange={setPriceRange}
                          >
                            <SelectTrigger className="rounded-xl">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {priceRanges.map((price) => (
                                <SelectItem key={price} value={price}>
                                  {price === "all"
                                    ? "All Prices"
                                    : price.charAt(0).toUpperCase() +
                                      price.slice(1)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Sort By
                          </label>
                          <Select value={sortBy} onValueChange={setSortBy}>
                            <SelectTrigger className="rounded-xl">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="rating">Rating</SelectItem>
                              <SelectItem value="reviews">Reviews</SelectItem>
                              <SelectItem value="name">Name</SelectItem>
                              <SelectItem value="newest">Newest</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Quick Category Filters */}
              <div className="flex flex-wrap gap-3 justify-center">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                      selectedCategory === category
                        ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg transform scale-105"
                        : "bg-white/80 text-gray-700 border border-gray-300 hover:bg-indigo-50 hover:border-indigo-300"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Results Summary */}
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="inline-flex items-center space-x-4 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-indigo-600" />
                  <span className="text-gray-700 font-medium">
                    {sortedEstablishments.length} of {establishments.length}{" "}
                    establishments
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Enhanced Establishments Grid */}
        <section className="pb-20">
          <div className="container mx-auto px-4">
            <div
              className={`grid gap-8 ${
                viewMode === "grid"
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1 max-w-4xl mx-auto"
              }`}
            >
              <AnimatePresence>
                {sortedEstablishments.map((establishment, index) => (
                  <motion.div
                    key={establishment.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -8 }}
                    className="group cursor-pointer"
                  >
                    <Card
                      className={`bg-white/90 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden h-full rounded-3xl border-2 ${
                        establishment.status === "not_registered"
                          ? "border-red-300 hover:border-red-400"
                          : "border-gray-200 hover:border-indigo-300"
                      }`}
                    >
                      {/* Enhanced Image Section */}
                      <div className="relative overflow-hidden h-64">
                        <Image
                          src={establishment.image || "/placeholder.svg"}
                          alt={establishment.name}
                          width={400}
                          height={300}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* Top Badges */}
                        <div className="absolute top-4 left-4 flex flex-col space-y-2">
                          <Badge
                            className={`${
                              establishment.status === "not_registered"
                                ? "bg-red-500 hover:bg-red-600"
                                : "bg-indigo-500 hover:bg-indigo-600"
                            } text-white font-medium`}
                          >
                            {establishment.category}
                          </Badge>
                          {establishment.newListing && (
                            <Badge className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-medium">
                              ✨ New
                            </Badge>
                          )}
                        </div>

                        {/* Top Right Actions */}
                        <div className="absolute top-4 right-4 flex flex-col space-y-2">
                          {establishment.status === "registered" &&
                            establishment.rating && (
                              <div className="bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1 shadow-lg">
                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                <span className="text-sm font-bold text-gray-900">
                                  {establishment.rating}
                                </span>
                                <span className="text-xs text-gray-600">
                                  ({establishment.reviews})
                                </span>
                              </div>
                            )}
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="rounded-full bg-white/90 backdrop-blur-sm border-0 hover:bg-white p-2"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFavorite(establishment.id);
                              }}
                            >
                              <Heart
                                className={`w-4 h-4 ${
                                  favorites.includes(establishment.id)
                                    ? "text-red-500 fill-current"
                                    : "text-gray-600"
                                }`}
                              />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="rounded-full bg-white/90 backdrop-blur-sm border-0 hover:bg-white p-2"
                            >
                              <Share2 className="w-4 h-4 text-gray-600" />
                            </Button>
                          </div>
                        </div>

                        {/* Status Badge for Non-Registered */}
                        {establishment.status === "not_registered" && (
                          <div className="absolute bottom-4 left-4 right-4">
                            <div className="bg-red-500/90 backdrop-blur-sm text-white rounded-lg px-3 py-2 text-center">
                              <div className="flex items-center justify-center space-x-2">
                                <AlertCircle className="w-4 h-4" />
                                <span className="text-sm font-medium">
                                  NOT REGISTERED
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <CardContent className="p-6 flex-1 flex flex-col">
                        {/* Header */}
                        <div className="mb-4">
                          <div className="flex items-start justify-between mb-2">
                            <h3
                              className={`text-xl font-bold group-hover:transition-colors duration-300 ${
                                establishment.status === "not_registered"
                                  ? "text-red-700 group-hover:text-red-800"
                                  : "text-gray-900 group-hover:text-indigo-600"
                              }`}
                            >
                              {establishment.name}
                            </h3>
                            {establishment.verified && (
                              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 ml-2" />
                            )}
                          </div>

                          <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {establishment.location}
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              Est. {establishment.established}
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-sm text-gray-600">
                            <div className="flex items-center">
                              <Users className="w-4 h-4 mr-1" />
                              {establishment.capacity}
                            </div>
                            <Badge
                              className={getPriceColor(
                                establishment.priceRange
                              )}
                            >
                              {establishment.priceRange
                                ?.charAt(0)
                                .toUpperCase() +
                                establishment.priceRange?.slice(1)}
                            </Badge>
                          </div>
                        </div>

                        {/* Description */}
                        {establishment.status === "registered" && (
                          <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">
                            {establishment.description}
                          </p>
                        )}

                        {/* Not Registered Warning */}
                        {establishment.status === "not_registered" && (
                          <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                            <div className="flex items-center">
                              <AlertCircle className="w-5 h-5 text-red-400 mr-2" />
                              <p className="text-red-700 text-sm font-medium">
                                This establishment is not yet registered with
                                AAS
                              </p>
                            </div>
                            <p className="text-red-600 text-xs mt-1 ml-7">
                              Contact information may not be verified
                            </p>
                          </div>
                        )}

                        {/* Features */}
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-2">
                            {establishment.features
                              .slice(0, 3)
                              .map((feature, idx) => (
                                <Badge
                                  key={idx}
                                  variant="secondary"
                                  className={`text-xs ${
                                    establishment.status === "not_registered"
                                      ? "bg-red-100 text-red-800"
                                      : "bg-indigo-100 text-indigo-800"
                                  }`}
                                >
                                  {feature}
                                </Badge>
                              ))}
                            {establishment.features.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{establishment.features.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>

                        {/* Awards */}
                        {establishment.awards &&
                          establishment.awards.length > 0 && (
                            <div className="mb-4">
                              <div className="flex items-center space-x-2">
                                <Award className="w-4 h-4 text-yellow-500" />
                                <span className="text-xs text-gray-600 font-medium">
                                  {establishment.awards[0]}
                                </span>
                              </div>
                            </div>
                          )}

                        {/* Amenities */}
                        <div className="mb-6">
                          <h4 className="text-sm font-semibold text-gray-900 mb-3">
                            Top Amenities
                          </h4>
                          <div className="grid grid-cols-2 gap-2">
                            {establishment.amenities
                              .slice(0, 4)
                              .map((amenity, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center text-xs text-gray-600"
                                >
                                  {getAmenityIcon(amenity)}
                                  <span className="ml-2 truncate">
                                    {amenity}
                                  </span>
                                </div>
                              ))}
                          </div>
                          {establishment.amenities.length > 4 && (
                            <p className="text-xs text-gray-500 mt-2">
                              +{establishment.amenities.length - 4} more
                              amenities
                            </p>
                          )}
                        </div>

                        {/* Contact Info */}
                        <div className="border-t pt-4 mt-auto">
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center text-xs text-gray-600">
                              <Phone className="w-3 h-3 mr-2 flex-shrink-0" />
                              <span className="truncate">
                                {establishment.contact.phone}
                              </span>
                            </div>
                            <div className="flex items-center text-xs text-gray-600">
                              <Mail className="w-3 h-3 mr-2 flex-shrink-0" />
                              <span className="truncate">
                                {establishment.contact.email}
                              </span>
                            </div>
                          </div>

                          {/* Action Button */}
                          <div>
                            {establishment.contact.website !== "#" ? (
                              <a
                                href={establishment.contact.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`inline-flex items-center justify-center w-full px-4 py-3 text-white text-sm font-medium rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg ${
                                  establishment.status === "not_registered"
                                    ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                                    : "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                                }`}
                              >
                                <Globe className="w-4 h-4 mr-2" />
                                Visit Website
                              </a>
                            ) : (
                              <div className="inline-flex items-center justify-center w-full px-4 py-3 bg-gray-300 text-gray-500 text-sm font-medium rounded-xl cursor-not-allowed">
                                <Globe className="w-4 h-4 mr-2" />
                                Website Unavailable
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* No Results */}
            {sortedEstablishments.length === 0 && (
              <motion.div
                className="text-center py-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-8xl mb-6">🏨</div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  No establishments found
                </h3>
                <p className="text-gray-600 mb-8 text-lg">
                  Try adjusting your search terms or filters to discover more
                  places
                </p>
                <Button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("All");
                    setLocationFilter("all");
                    setPriceRange("all");
                  }}
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 px-8 py-3 rounded-xl text-lg font-medium"
                >
                  Clear All Filters
                </Button>
              </motion.div>
            )}
          </div>
        </section>
      </main>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Aurora Accommodation System (AAS)
              </h3>
              <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                Your trusted guide to discovering and exploring certified
                accommodations and tourism destinations in the beautiful
                province of Aurora, Philippines.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center items-center space-x-8 mb-8"
            >
              <Image
                src="/images/DOT.png"
                alt="Department of Tourism"
                width={80}
                height={80}
                className="object-contain hover:scale-110 transition-transform duration-300 filter brightness-0 invert"
              />
              <Image
                src="/images/lap.png"
                alt="Aurora Province"
                width={80}
                height={80}
                className="object-contain hover:scale-110 transition-transform duration-300"
              />
              <Image
                src="/images/bgaurora.png"
                alt="Love Philippines"
                width={140}
                height={80}
                className="object-contain hover:scale-110 transition-transform duration-300"
              />
            </motion.div>

            <div className="border-t border-gray-700 pt-8">
              <p className="text-sm text-gray-400">
                &copy; {new Date().getFullYear()} Aurora Accommodation System.
                All rights reserved.
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Developed with ❤️ by クリスチャン ジョセフ マリグメン
              </p>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
