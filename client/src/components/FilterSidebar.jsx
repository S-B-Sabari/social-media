import React, { useState } from 'react';
import { ChevronDown, Filter, X } from 'lucide-react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const FilterSidebar = ({ filters, setFilters, showFilterPhone, setShowFilterPhone }) => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [search, setSearch] = useState(searchParams.get("search") || "");

    // Section Expansion State
    const [expandedSections, setExpendedSections] = useState({
        platform: true,
        price: true,
        followers: true,
        niche: true,
        status: true,
    });

    // Filter Options Data
    const platforms = [
        { value: "youtube", label: "YouTube" },
        { value: "instagram", label: "Instagram" },
        { value: "tiktok", label: "TikTok" },
        { value: "facebook", label: "Facebook" },
        { value: "twitter", label: "Twitter" },
        { value: "linkedin", label: "LinkedIn" },
        { value: "twitch", label: "Twitch" },
        { value: "discord", label: "Discord" },
    ];

    const niches = [
        { value: "lifestyle", label: "Lifestyle" },
        { value: "fitness", label: "Fitness" },
        { value: "food", label: "Food" },
        { value: "travel", label: "Travel" },
        { value: "tech", label: "Tech" },
        { value: "gaming", label: "Gaming" },
        { value: "fashion", label: "Fashion" },
        { value: "beauty", label: "Beauty" },
        { value: "business", label: "Business" },
        { value: "education", label: "Education" },
        { value: "entertainment", label: "Entertainment" },
        { value: "music", label: "Music" },
        { value: "art", label: "Art" },
        { value: "sports", label: "Sports" },
        { value: "health", label: "Health" },
        { value: "finance", label: "Finance" },
    ];

    // Handlers
    const onChangeSearch = (e) => {
        const value = e.target.value;
        setSearch(value);

        if (value) {
            setSearchParams({ search: value });
        } else {
            searchParams.delete("search");
            setSearchParams(searchParams);
        }
    };

    const toggleSection = (section) => {
        setExpendedSections((prev) => ({ ...prev, [section]: !prev[section] }));
    };

    const onFiltersChange = (newFilters) => {
        setFilters({ ...filters, ...newFilters });
    };

    const onClearFilters = () => {
        if (search) {
            navigate("/marketplace");
        }
        setFilters({
            platform: null,
            maxPrice: 100000,
            minFollowers: 0,
            niche: null,
            verified: false,
            monetized: false,
        });
    };

    return (
        <div
            className={`${showFilterPhone
                ? "fixed inset-0 z-100 h-screen w-full bg-white overflow-y-auto" // Mobile: Scrollable full screen
                : "hidden"
                } sm:sticky sm:top-24 sm:block 
                sm:h-fit                         // 1. Shrink to fit content when arrows close
                sm:max-h-[calc(95vh-120px)]     // 2. Prevent it from going off-screen
                sm:overflow-y-auto               // 3. Scroll inside if content is too long
                sm:w-full sm:max-w-75 
                bg-white rounded-lg shadow-sm border border-gray-200 no-scrollbar 
                transition-all duration-300 ease-in-out flex flex-col`} >

            {/* Header (Optional: Make it sticky so it stays at the top while scrolling filters) */}
            <div className="p-4 border-b border-gray-200 sticky top-0 bg-white z-20">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-gray-700">
                        <Filter className="size-4" />
                        <h3 className="font-semibold">Filters</h3>
                    </div>
                    <div className="flex items-center gap-2">
                        <X
                            onClick={onClearFilters}
                            className="size-6 text-gray-500 hover:text-gray-700 p-1 hover:bg-gray-100 
                            rounded transition-colors cursor-pointer"/>
                        <button
                            onClick={() => setShowFilterPhone(false)}
                            className="sm:hidden text-sm border text-gray-700 px-3 py-1 rounded">
                            Apply
                        </button>
                    </div>
                </div>
            </div>

            {/* Search Bar */}
            <div className="p-2 pt-3">
                <input
                    type="text"
                    placeholder="Search by username, platform, niche..."
                    className="w-full text-sm px-3 py-2 border border-gray-300 rounded-md outline-indigo-500"
                    onChange={onChangeSearch}
                    value={search}
                />
            </div>

            {/* Platform Filter */}
            <div className="border-t border-gray-100 mt-4">
                <button
                    onClick={() => toggleSection("platform")}
                    className="flex items-center justify-between w-full py-4 px-3 hover:bg-gray-50 transition-colors group">
                    <label className="text-sm font-medium text-gray-800 cursor-pointer">Platform</label>
                    <ChevronDown
                        className={`size-4 transition-transform ${expandedSections.platform ? "rotate-180" : ""}`} />
                </button>

                {expandedSections.platform && (
                    <div className="flex flex-col gap-2 pl-3 pb-4 pt-1">
                        {platforms.map((platform) => (
                            <label key={platform.value} className="flex items-center gap-2 text-gray-700 text-sm cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={filters.platform?.includes(platform.value) || false}
                                    onChange={(e) => {
                                        const checked = e.target.checked;
                                        const current = filters.platform || [];
                                        const updated = checked
                                            ? [...current, platform.value]
                                            : current.filter((p) => p !== platform.value);

                                        onFiltersChange({
                                            platform: updated.length > 0 ? updated : null,
                                        });
                                    }}
                                />
                                <span>{platform.label}</span>
                            </label>
                        ))}
                    </div>
                )}
            </div>

            {/* Price Range Filter */}
            <div className="border-t border-gray-100">
                <button
                    onClick={() => toggleSection("price")}
                    className="flex items-center justify-between w-full py-4 px-3 hover:bg-gray-50 transition-colors">
                    <label className="text-sm font-medium text-gray-800 cursor-pointer">Price Range</label>
                    <ChevronDown
                        className={`size-4 transition-transform ${expandedSections.price ? "rotate-180" : ""}`} />
                </button>
                {expandedSections.price && (
                    <div className="space-y-3 p-4 pt-1">
                        <div className="flex justify-between items-center">
                            <label className="text-sm font-medium text-gray-700">Max Price</label>
                            <span className="text-indigo-600 font-semibold text-sm">
                                ${(filters.maxPrice || 100000).toLocaleString()}
                            </span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="100000"
                            step="100"
                            value={filters.maxPrice || 100000}
                            onChange={(e) => onFiltersChange({ maxPrice: parseInt(e.target.value) || 0 })}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                        />
                        <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>$0</span>
                            <span>$100k+</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Followers Filter */}
            <div className="border-t border-gray-100">
                <button
                    onClick={() => toggleSection("followers")}
                    className="flex items-center justify-between w-full py-4 px-3 hover:bg-gray-50 transition-colors"
                >
                    <label className="text-sm font-medium text-gray-800 cursor-pointer">Min Followers</label>
                    <ChevronDown
                        className={`size-4 transition-transform ${expandedSections.followers ? "rotate-180" : ""
                            }`}
                    />
                </button>
                {expandedSections.followers && (
                    <div className="px-3 pb-4 pt-1">
                        <select
                            value={filters.minFollowers?.toString() || "0"}
                            onChange={(e) => onFiltersChange({ minFollowers: parseInt(e.target.value) || 0 })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white shadow-sm outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="0">Any Amount</option>
                            <option value="1000">1K+</option>
                            <option value="10000">10K+</option>
                            <option value="100000">100K+</option>
                            <option value="1000000">1M+</option>
                        </select>
                    </div>
                )}
            </div>

            {/* Niche Filter */}
            <div className="border-t border-gray-100">
                <button
                    onClick={() => toggleSection("niche")}
                    className="flex items-center justify-between w-full py-4 px-3 hover:bg-gray-50 transition-colors group">
                    <label className="text-sm font-medium text-gray-800 cursor-pointer">Niche</label>
                    <ChevronDown className={`size-4 transition-transform ${expandedSections.niche ? "rotate-180" : ""}`} />
                </button>

                {expandedSections.niche && (
                    <div className="px-3 pb-5 pt-1">
                        <select
                            value={filters.niche || "0"}
                            onChange={(e) => onFiltersChange({ niche: e.target.value === "0" ? null : e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white 
              shadow-sm outline-none focus:ring-2 focus:ring-indigo-500" >
                            <option value="0">All Niches</option>
                            {niches.map((n) => (
                                <option key={n.value} value={n.value}>{n.label}</option>
                            ))}
                        </select>
                    </div>
                )}
            </div>

            {/* Verification Status Filter */}
            <div className="border-t border-gray-100">
                <button
                    onClick={() => toggleSection("status")}
                    className="flex items-center justify-between w-full py-4 px-3 hover:bg-gray-50 transition-colors"
                >
                    <label className="text-sm font-medium text-gray-800 cursor-pointer">Account Status</label>
                    <ChevronDown
                        className={`size-4 transition-transform ${expandedSections.status ? "rotate-180" : ""
                            }`}
                    />
                </button>
                {expandedSections.status && (
                    <div className="space-y-3 pl-4 pb-4 pt-1">
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={filters.verified || false}
                                onChange={(e) => onFiltersChange({ verified: e.target.checked })}
                            />
                            <span className="text-sm text-gray-700">Verified accounts only</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={filters.monetized || false}
                                onChange={(e) => onFiltersChange({ monetized: e.target.checked })}
                            />
                            <span className="text-sm text-gray-700">Monetized accounts only</span>
                        </label>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FilterSidebar;