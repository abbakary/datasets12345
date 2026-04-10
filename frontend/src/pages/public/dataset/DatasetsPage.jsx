import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Container,
  Card,
  CardContent,
  TextField,
  Box,
  Avatar,
  IconButton,
  InputAdornment,
  Chip,
} from "@mui/material";
import {
  Search,
  SlidersHorizontal,
  TrendingUp,
  MoreVertical,
  ChevronUp,
  Calendar,
  FileIcon,
  HardDrive,
  Download,
  X,
  Grid3x3,
  List,
  ChevronDown,
} from "lucide-react";
import PageLayout from "../components/PageLayout";
import CategorySidebar from "../components/CategorySidebar";
import FiltersPanel from "../components/FiltersPanel";

const PRIMARY_COLOR = "#61C5C3";

export default function DatasetsPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isFiltersPanelOpen, setIsFiltersPanelOpen] = useState(false);
  const [viewType, setViewType] = useState("grid"); // "grid" or "list"
  const [sortBy, setSortBy] = useState("hotness"); // sorting option
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [filters, setFilters] = useState({
    tagSearch: "",
    minSize: "",
    maxSize: "",
    fileTypes: [],
    licenses: [],
    usabilityRatings: [],
    votedFor: [],
  });
  const [appliedFilters, setAppliedFilters] = useState({ ...filters });

  const recentQueries = [
    "Cosmetics & Skincare Product Sales Data (2022)",
    "fleet management",
    "cars damage images",
  ];

  const recentlyViewed = [
    {
      title: "Car Specifications Dataset",
      subtitle: "A Comprehensive Dataset for Vehicle Price Prediction and Machine Learning Analysis",
      image: "https://images.unsplash.com/photo-1552820728-8ac41f1ce891?auto=format&fit=crop&w=100&q=80",
    },
    {
      title: "Cosmetics & Skincare Product Sales Data (2022)",
      subtitle: "A global transactional dataset simulating real-world sales of cosmetic, skincare...",
      image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=100&q=80",
    },
  ];

  const sortOptions = [
    { value: "hotness", label: "Hotness" },
    { value: "most-voted", label: "Most Voted" },
    { value: "new", label: "New" },
    { value: "updated", label: "Updated" },
    { value: "usability", label: "Usability" },
    { value: "most-downloaded", label: "Most Downloaded" },
    { value: "most-notebooks", label: "Most Notebooks" },
  ];

  const trendingDatasets = [
    {
      id: 1,
      title: "Liver Cirrhosis Disease Prediction Dataset",
      author: "zkskhurram",
      usability: "10.0",
      updated: "Updated a day ago",
      files: "2 Files (CSV)",
      size: "10 kB",
      downloads: "92 downloads",
      votes: 13,
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=80",
      avatars: [
        "https://i.pravatar.cc/40?img=11",
        "https://i.pravatar.cc/40?img=14",
      ],
    },
    {
      id: 2,
      title: "Python OSV Vulnerabilities & CVSS Features",
      author: "Kanchana1990",
      usability: "10.0",
      updated: "Updated 14 hours ago",
      files: "3 Files (CSV)",
      size: "3 MB",
      downloads: "32 downloads",
      votes: 10,
      image:
        "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80",
      avatars: [
        "https://i.pravatar.cc/40?img=21",
        "https://i.pravatar.cc/40?img=25",
      ],
    },
    {
      id: 3,
      title: "Spotify Global Hits and Artist Analytics",
      author: "Eman Fatima",
      usability: "10.0",
      updated: "Updated 7 days ago",
      files: "3 Files (CSV)",
      size: "9 kB",
      downloads: "418 downloads",
      votes: 16,
      image:
        "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?auto=format&fit=crop&w=900&q=80",
      avatars: [
        "https://i.pravatar.cc/40?img=31",
        "https://i.pravatar.cc/40?img=33",
      ],
    },
    {
      id: 4,
      title: "Student Mental Health and Burnout Dataset",
      author: "Mansehaj Preet",
      usability: "10.0",
      updated: "Updated 23 days ago",
      files: "1 File (CSV)",
      size: "3 MB",
      downloads: "742 downloads",
      votes: 16,
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
      avatars: [
        "https://i.pravatar.cc/40?img=41",
        "https://i.pravatar.cc/40?img=43",
      ],
    },
  ];

  const handleApplyFilters = () => {
    setAppliedFilters({ ...filters });
    setIsFiltersPanelOpen(false);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      tagSearch: "",
      minSize: "",
      maxSize: "",
      fileTypes: [],
      licenses: [],
      usabilityRatings: [],
      votedFor: [],
    };
    setFilters(clearedFilters);
    setAppliedFilters(clearedFilters);
  };

  const filteredDatasets = trendingDatasets
    .filter((dataset) => {
      const matchesSearch =
        dataset.title.toLowerCase().includes(search.toLowerCase()) ||
        dataset.author.toLowerCase().includes(search.toLowerCase());

      if (!matchesSearch) return false;

      // If no category is selected, show all datasets
      if (!selectedCategory) {
        return true;
      }

      // If a specific subcategory is selected
      if (selectedCategory.selectedSubcategory) {
        return (
          dataset.title.toLowerCase().includes(selectedCategory.selectedSubcategory.name.toLowerCase()) ||
          dataset.title.toLowerCase().includes(selectedCategory.name.toLowerCase())
        );
      }

      // If only main category is selected
      return (
        dataset.title.toLowerCase().includes(selectedCategory.name.toLowerCase()) ||
        dataset.author.toLowerCase().includes(selectedCategory.name.toLowerCase())
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "most-voted":
          return b.votes - a.votes;
        case "most-downloaded":
          return parseInt(b.downloads) - parseInt(a.downloads);
        case "usability":
          return parseFloat(b.usability) - parseFloat(a.usability);
        case "new":
          return b.id - a.id;
        case "updated":
          return a.id - b.id;
        case "most-notebooks":
          return 0; // Placeholder
        case "hotness":
        default:
          return b.votes * parseFloat(b.usability) - a.votes * parseFloat(a.usability);
      }
    });

  return (
    <PageLayout>
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#f8f9fb",
          py: 4,
          position: "relative",
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            position: "relative",
          }}
        >
          {/* Search Bar */}
          <Box sx={{ mb: 4, position: "relative" }}>
            <TextField
              fullWidth
              placeholder="Search 21,149 datasets"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              variant="outlined"
              sx={{
                backgroundColor: "#fff",
                borderRadius: "10px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  height: 50,
                  fontSize: "0.95rem",
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={20} color="#111827" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <Box
                      onClick={() => setIsFiltersPanelOpen(true)}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        fontWeight: 600,
                        color: PRIMARY_COLOR,
                        cursor: "pointer",
                        transition: "opacity 0.2s",
                        "&:hover": {
                          opacity: 0.8,
                        },
                      }}
                    >
                      <SlidersHorizontal size={18} />
                      <Typography
                        fontWeight={600}
                        sx={{ fontSize: "0.9rem", color: PRIMARY_COLOR }}
                      >
                        Filters
                      </Typography>
                    </Box>
                  </InputAdornment>
                ),
              }}
            />

            {/* Search Dropdown */}
            {isSearchFocused && (
              <Box
                sx={{
                  position: "absolute",
                  top: "calc(100% + 8px)",
                  left: 0,
                  right: 0,
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
                  zIndex: 100,
                  overflow: "hidden",
                }}
              >
                {/* Recent Queries */}
                <Box sx={{ borderBottom: "1px solid #e5e7eb" }}>
                  <Typography
                    sx={{
                      px: 2.5,
                      pt: 2,
                      pb: 1,
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      color: "#6b7280",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Recent Queries
                  </Typography>
                  {recentQueries.map((query, idx) => (
                    <Box
                      key={idx}
                      onClick={() => setSearch(query)}
                      sx={{
                        px: 2.5,
                        py: 1.2,
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        cursor: "pointer",
                        transition: "background-color 0.2s",
                        "&:hover": {
                          backgroundColor: "#f9fafb",
                        },
                      }}
                    >
                      <Box sx={{ fontSize: "1rem" }}>⏱️</Box>
                      <Typography sx={{ fontSize: "0.9rem", color: "#374151" }}>
                        {query}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                {/* Recently Viewed */}
                <Box sx={{ borderBottom: "1px solid #e5e7eb" }}>
                  <Typography
                    sx={{
                      px: 2.5,
                      pt: 2,
                      pb: 1,
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      color: "#6b7280",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Recently Viewed
                  </Typography>
                  {recentlyViewed.map((item, idx) => (
                    <Box
                      key={idx}
                      sx={{
                        px: 2.5,
                        py: 1.5,
                        display: "flex",
                        gap: 1.5,
                        cursor: "pointer",
                        transition: "background-color 0.2s",
                        "&:hover": {
                          backgroundColor: "#f9fafb",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          width: 50,
                          height: 50,
                          borderRadius: "8px",
                          backgroundImage: `url(${item.image})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          flexShrink: 0,
                        }}
                      />
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography
                          sx={{
                            fontSize: "0.9rem",
                            fontWeight: 600,
                            color: "#111827",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {item.title}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "0.8rem",
                            color: "#6b7280",
                            mt: 0.3,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {item.subtitle}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>

                {/* Related Tags */}
                <Box sx={{ p: 2.5 }}>
                  <Typography
                    sx={{
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      color: "#6b7280",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      mb: 1,
                    }}
                  >
                    Related Tags
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    {["machine learning", "price prediction", "vehicle data", "analysis"].map(
                      (tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          size="small"
                          onClick={() => setSearch(tag)}
                          sx={{
                            backgroundColor: "#f3f4f6",
                            color: "#374151",
                            fontSize: "0.8rem",
                            height: 28,
                            "&:hover": {
                              backgroundColor: "#e5e7eb",
                            },
                          }}
                        />
                      )
                    )}
                  </Box>
                </Box>
              </Box>
            )}
          </Box>

          {/* Main Content Grid */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "320px 1fr",
              },
              gap: 3,
              position: "relative",
            }}
          >
            {/* Sidebar */}
            <CategorySidebar
              selectedCategory={selectedCategory}
              onCategorySelect={setSelectedCategory}
            />

            {/* Main Content */}
            <Box>
              {/* Header with Controls */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 3,
                  gap: 2,
                  flexWrap: "wrap",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
                  <Box sx={{ fontSize: "1.3rem" }}>📊</Box>
                  <Typography
                    sx={{
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      color: "#111827",
                    }}
                  >
                    {filteredDatasets.length.toLocaleString()} Datasets
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  {/* Sorting Dropdown */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      px: 1.5,
                      py: 0.8,
                      backgroundColor: "#f9fafb",
                      borderRadius: "8px",
                      cursor: "pointer",
                      border: "1px solid #e5e7eb",
                      transition: "all 0.2s",
                      position: "relative",
                      "&:hover": {
                        backgroundColor: "#f3f4f6",
                      },
                    }}
                    component="select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    onMouseDown={(e) => e.preventDefault()}
                    sx={{
                      appearance: "none",
                      backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 0.75rem center",
                      backgroundSize: "16px 12px",
                      paddingRight: "2.5rem",
                      cursor: "pointer",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      px: 1.5,
                      py: 0.8,
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      color: "#111827",
                      backgroundColor: "#f9fafb",
                      transition: "all 0.2s",
                      "&:hover": {
                        backgroundColor: "#f3f4f6",
                      },
                    }}
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Box>

                  {/* View Toggle */}
                  <Box
                    sx={{
                      display: "flex",
                      gap: 0.5,
                      backgroundColor: "#f9fafb",
                      borderRadius: "8px",
                      padding: "4px",
                      border: "1px solid #e5e7eb",
                    }}
                  >
                    <Box
                      onClick={() => setViewType("grid")}
                      sx={{
                        p: 0.8,
                        borderRadius: "6px",
                        backgroundColor: viewType === "grid" ? "#fff" : "transparent",
                        border: viewType === "grid" ? "1px solid #e5e7eb" : "none",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.2s",
                        "&:hover": {
                          backgroundColor: "#f3f4f6",
                        },
                      }}
                      title="Grid View"
                    >
                      <Grid3x3 size={18} color={viewType === "grid" ? PRIMARY_COLOR : "#6b7280"} />
                    </Box>
                    <Box
                      onClick={() => setViewType("list")}
                      sx={{
                        p: 0.8,
                        borderRadius: "6px",
                        backgroundColor: viewType === "list" ? "#fff" : "transparent",
                        border: viewType === "list" ? "1px solid #e5e7eb" : "none",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.2s",
                        "&:hover": {
                          backgroundColor: "#f3f4f6",
                        },
                      }}
                      title="List View"
                    >
                      <List size={18} color={viewType === "list" ? PRIMARY_COLOR : "#6b7280"} />
                    </Box>
                  </Box>
                </Box>
              </Box>

              {/* Category Chips Row */}
              <Box
                sx={{
                  display: "flex",
                  gap: 1.2,
                  flexWrap: "wrap",
                  mb: 4,
                  alignItems: "center",
                }}
              >
                {/* "All Datasets" Chip */}
                <Chip
                  label="All Datasets"
                  onClick={() => setSelectedCategory(null)}
                  variant={!selectedCategory ? "filled" : "outlined"}
                  sx={{
                    borderRadius: "6px",
                    fontSize: "0.85rem",
                    height: 32,
                    px: 1.5,
                    backgroundColor: !selectedCategory ? PRIMARY_COLOR : "#fff",
                    color: !selectedCategory ? "#fff" : "#374151",
                    borderColor: "#d1d5db",
                    fontWeight: 600,
                    "&:hover": {
                      backgroundColor: !selectedCategory
                        ? PRIMARY_COLOR
                        : "#e6f7f6",
                    },
                  }}
                />

                {/* Main Category Chip (if selected) */}
                {selectedCategory && (
                  <Chip
                    label={selectedCategory.name}
                    onClick={() => {
                      setSelectedCategory({
                        ...selectedCategory,
                        selectedSubcategory: null,
                      });
                    }}
                    variant={
                      selectedCategory && !selectedCategory.selectedSubcategory
                        ? "filled"
                        : "outlined"
                    }
                    onDelete={() => setSelectedCategory(null)}
                    deleteIcon={<X size={14} />}
                    sx={{
                      borderRadius: "6px",
                      fontSize: "0.85rem",
                      height: 32,
                      px: 1.5,
                      backgroundColor:
                        selectedCategory && !selectedCategory.selectedSubcategory
                          ? PRIMARY_COLOR
                          : "#fff",
                      color:
                        selectedCategory && !selectedCategory.selectedSubcategory
                          ? "#fff"
                          : "#374151",
                      borderColor: "#d1d5db",
                      fontWeight: 600,
                      "&:hover": {
                        backgroundColor:
                          selectedCategory &&
                          !selectedCategory.selectedSubcategory
                            ? PRIMARY_COLOR
                            : "#e6f7f6",
                      },
                    }}
                  />
                )}

                {/* Subcategory Chips (if selected) */}
                {selectedCategory &&
                  selectedCategory.subcategories &&
                  selectedCategory.subcategories.map((subcategory) => (
                    <Chip
                      key={subcategory.id}
                      label={subcategory.name}
                      onClick={() => {
                        setSelectedCategory({
                          ...selectedCategory,
                          selectedSubcategory: subcategory,
                        });
                      }}
                      variant={
                        selectedCategory.selectedSubcategory?.id ===
                        subcategory.id
                          ? "filled"
                          : "outlined"
                      }
                      onDelete={
                        selectedCategory.selectedSubcategory?.id ===
                        subcategory.id
                          ? () => {
                              setSelectedCategory({
                                ...selectedCategory,
                                selectedSubcategory: null,
                              });
                            }
                          : undefined
                      }
                      deleteIcon={
                        selectedCategory.selectedSubcategory?.id ===
                        subcategory.id ? (
                          <X size={14} />
                        ) : undefined
                      }
                      sx={{
                        borderRadius: "6px",
                        fontSize: "0.85rem",
                        height: 32,
                        px: 1.5,
                        backgroundColor:
                          selectedCategory.selectedSubcategory?.id ===
                          subcategory.id
                            ? PRIMARY_COLOR
                            : "#fff",
                        color:
                          selectedCategory.selectedSubcategory?.id ===
                          subcategory.id
                            ? "#fff"
                            : "#374151",
                        borderColor: "#d1d5db",
                        fontWeight: 500,
                        "&:hover": {
                          backgroundColor:
                            selectedCategory.selectedSubcategory?.id ===
                            subcategory.id
                              ? PRIMARY_COLOR
                              : "#e6f7f6",
                        },
                      }}
                    />
                  ))}
              </Box>

              {/* Datasets Grid/List */}
              <Box
                sx={{
                  display: viewType === "grid" ? "grid" : "flex",
                  gridTemplateColumns:
                    viewType === "grid"
                      ? {
                          xs: "1fr",
                          sm: "repeat(2, 1fr)",
                          lg: "repeat(3, 1fr)",
                        }
                      : undefined,
                  flexDirection: viewType === "list" ? "column" : undefined,
                  gap: 3,
                }}
              >
                {filteredDatasets.length > 0 ? (
                  filteredDatasets.map((dataset) => (
                    <DatasetCard
                      key={dataset.id}
                      dataset={dataset}
                      viewType={viewType}
                    />
                  ))
                ) : (
                  <Box
                    sx={{
                      gridColumn: viewType === "grid" ? "1 / -1" : undefined,
                      textAlign: "center",
                      py: 6,
                      width: "100%",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "1rem",
                        color: "#6b7280",
                        fontWeight: 500,
                      }}
                    >
                      No datasets found in this category
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Filters Panel */}
      <FiltersPanel
        isOpen={isFiltersPanelOpen}
        onClose={() => setIsFiltersPanelOpen(false)}
        filters={filters}
        onFiltersChange={setFilters}
        onApply={handleApplyFilters}
        onClear={handleClearFilters}
      />
    </PageLayout>
  );
}

function DatasetCard({ dataset, viewType = "grid" }) {
  const navigate = useNavigate();

  const handleOpenDataset = () => {
    navigate(`/dataset-info/${dataset.id}`, {
      state: {
        dataset,
      },
    });
  };

  // List view layout
  if (viewType === "list") {
    return (
      <Box
        sx={{
          display: "flex",
          gap: 2,
          padding: 2.5,
          backgroundColor: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: "12px",
          transition: "all 0.3s ease",
          alignItems: "stretch",
          "&:hover": {
            boxShadow: "0 10px 24px rgba(97, 197, 195, 0.12)",
            borderColor: PRIMARY_COLOR,
          },
        }}
      >
        {/* Image Thumbnail */}
        <Box
          sx={{
            width: 100,
            height: 100,
            borderRadius: "8px",
            backgroundImage: `url(${dataset.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            flexShrink: 0,
            cursor: "pointer",
            transition: "all 0.2s",
            "&:hover": {
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            },
          }}
          onClick={handleOpenDataset}
        />

        {/* Content */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          {/* Title and Info */}
          <Box>
            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1, mb: 1 }}>
              <Typography
                onClick={handleOpenDataset}
                sx={{
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  color: "#111827",
                  cursor: "pointer",
                  transition: "color 0.2s ease",
                  flex: 1,
                  "&:hover": {
                    color: PRIMARY_COLOR,
                  },
                }}
              >
                {dataset.title}
              </Typography>
              <IconButton size="small" sx={{ minWidth: 32 }}>
                <MoreVertical size={16} />
              </IconButton>
            </Box>

            <Typography sx={{ fontSize: "0.85rem", color: "#6b7280", mb: 1 }}>
              {dataset.author} · Updated {dataset.updated.replace("Updated ", "")}
            </Typography>

            <Typography sx={{ fontSize: "0.8rem", color: "#111827" }}>
              Usability <b>{dataset.usability}</b> · {dataset.files} ({dataset.size}) · {dataset.downloads} · {dataset.votes} notebooks
            </Typography>
          </Box>

          {/* Footer Info */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mt: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              {dataset.avatars.slice(0, 2).map((avatar, index) => (
                <Avatar
                  key={index}
                  src={avatar}
                  sx={{
                    width: 24,
                    height: 24,
                    border: `1px solid ${PRIMARY_COLOR}`,
                  }}
                />
              ))}
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.3,
                padding: "4px 8px",
                backgroundColor: "#f3f4f6",
                borderRadius: "4px",
                fontSize: "0.8rem",
              }}
            >
              <ChevronUp size={14} />
              <span>{dataset.votes}</span>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }

  // Grid view layout (original)
  return (
    <Card
      sx={{
        borderRadius: "12px",
        overflow: "hidden",
        backgroundColor: "#fff",
        border: "1px solid #e5e7eb",
        boxShadow: "none",
        transition: "all 0.3s ease",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 10px 24px rgba(97, 197, 195, 0.12)",
          borderColor: PRIMARY_COLOR,
        },
      }}
    >
      {/* Image Section */}
      <Box
        sx={{
          height: 160,
          backgroundImage: `url(${dataset.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          "&::after": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0)",
            transition: "backgroundColor 0.2s ease",
          },
          "&:hover::after": {
            backgroundColor: "rgba(0,0,0,0.1)",
          },
        }}
      />

      <CardContent sx={{ p: 2.5, flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Title and Menu */}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 1,
            mb: 1.5,
          }}
        >
          <Typography
            onClick={handleOpenDataset}
            sx={{
              fontSize: "0.98rem",
              fontWeight: 700,
              lineHeight: 1.4,
              color: "#111827",
              cursor: "pointer",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              transition: "color 0.2s ease",
              "&:hover": {
                color: PRIMARY_COLOR,
              },
            }}
          >
            {dataset.title}
          </Typography>

          <IconButton size="small" sx={{ mt: -0.5, minWidth: 32 }}>
            <MoreVertical size={16} />
          </IconButton>
        </Box>

        {/* Author */}
        <Typography
          sx={{
            fontSize: "0.85rem",
            color: "#1f2937",
            fontWeight: 500,
            mb: 1.2,
          }}
        >
          {dataset.author}
        </Typography>

        {/* Usability and Updated */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.8,
            mb: 1.5,
            fontSize: "0.8rem",
            color: "#6b7280",
          }}
        >
          <Typography sx={{ fontSize: "inherit" }}>
            Usability <b style={{ color: "#111827" }}>{dataset.usability}</b>
          </Typography>
          <Box sx={{ width: 1, height: 1, borderRadius: "50%", backgroundColor: "#d1d5db" }} />
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.4 }}>
            <Calendar size={14} />
            <Typography sx={{ fontSize: "inherit" }}>{dataset.updated}</Typography>
          </Box>
        </Box>

        {/* File Details - Spaced Row */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 1,
            mb: 2,
            pb: 2,
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          {/* File Type */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 0.4,
              p: 1,
              borderRadius: "8px",
              backgroundColor: "#f9fafb",
            }}
          >
            <FileIcon size={16} style={{ color: PRIMARY_COLOR }} />
            <Typography sx={{ fontSize: "0.7rem", color: "#6b7280", textAlign: "center" }}>
              {dataset.files}
            </Typography>
          </Box>

          {/* Storage */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 0.4,
              p: 1,
              borderRadius: "8px",
              backgroundColor: "#f9fafb",
            }}
          >
            <HardDrive size={16} style={{ color: PRIMARY_COLOR }} />
            <Typography sx={{ fontSize: "0.7rem", color: "#6b7280", textAlign: "center" }}>
              {dataset.size}
            </Typography>
          </Box>

          {/* Downloads */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 0.4,
              p: 1,
              borderRadius: "8px",
              backgroundColor: "#f9fafb",
            }}
          >
            <Download size={16} style={{ color: PRIMARY_COLOR }} />
            <Typography sx={{ fontSize: "0.7rem", color: "#6b7280", textAlign: "center" }}>
              {dataset.downloads}
            </Typography>
          </Box>
        </Box>
      </CardContent>

      {/* Footer */}
      <Box
        sx={{
          px: 2.5,
          py: 1.5,
          borderTop: "1px solid #e5e7eb",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#f9fafb",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            border: "1px solid #d1d5db",
            borderRadius: "6px",
            overflow: "hidden",
            backgroundColor: "#fff",
          }}
        >
          <Box
            sx={{
              px: 1,
              py: 0.4,
              display: "flex",
              alignItems: "center",
              borderRight: "1px solid #d1d5db",
            }}
          >
            <ChevronUp size={14} />
          </Box>

          <Box sx={{ px: 1.2, py: 0.3 }}>
            <Typography
              sx={{
                fontSize: "0.8rem",
                fontWeight: 700,
              }}
            >
              {dataset.votes}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          {dataset.avatars.map((avatar, index) => (
            <Avatar
              key={index}
              src={avatar}
              sx={{
                width: 24,
                height: 24,
                border: `2px solid ${PRIMARY_COLOR}`,
              }}
            />
          ))}
        </Box>
      </Box>
    </Card>
  );
}
