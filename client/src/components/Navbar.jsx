import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { BoxIcon, CircleAlertIcon, Grip, ListCheckIcon, Menu, MessageCircleMore, MessageCircleMoreIcon, X } from "lucide-react";
import { useClerk, useUser, UserButton } from "@clerk/clerk-react";

const Navbar = () => {
    const { user } = useUser();
    const { openSignIn } = useClerk();

    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <nav className="h-20">
            <div className="fixed left-0 top-0 right-0 z-50 flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white">

                {/* Logo */}
                <img
                    src={assets.logo}
                    alt="logo"
                    className="h-10 cursor-pointer"
                    onClick={() => {
                        navigate("/");
                        window.scrollTo(0, 0);
                    }}
                />

                {/* Desktop Menu */}
                <div className="hidden sm:flex items-center gap-4 md:gap-8 text-gray-800">
                    <Link to="/">Home</Link>
                    <Link to="/marketplace">Marketplace</Link>

                    <Link
                        to={user ? "/messages" : "#"}
                        onClick={() => !user && openSignIn()}
                    >
                        Messages
                    </Link>

                    <Link
                        to={user ? "/my-listings" : "#"}
                        onClick={() => !user && openSignIn()}
                    >
                        My Listings
                    </Link>
                </div>

                {/* Right side */}
                <div className="flex items-center gap-4">
                    {user ? (
                        <UserButton afterSignOutUrl="/">
                            <UserButton.MenuItems>

                                <UserButton.Action
                                    label="Marketplace"
                                    labelIcon={<Grip size={16} />}
                                    onClick={() => navigate("/marketplace")}
                                />
                            </UserButton.MenuItems>

                            <UserButton.MenuItems>
                                <UserButton.Action
                                    label="Messages"
                                    labelIcon={<MessageCircleMoreIcon size={16} />}
                                    onClick={() => navigate("/messages")}
                                />
                            </UserButton.MenuItems>

                            <UserButton.MenuItems>
                                <UserButton.Action
                                    label="My Listings"
                                    labelIcon={<ListCheckIcon size={16} />}
                                    onClick={() => navigate("/my-listings")}
                                />
                            </UserButton.MenuItems>

                            <UserButton.MenuItems>
                                <UserButton.Action
                                    label="My Orders"
                                    labelIcon={<BoxIcon size={16} />}
                                    onClick={() => navigate("my-orders")}
                                />
                            </UserButton.MenuItems>

                        </UserButton>
                    ) : (
                        <button
                            onClick={openSignIn}
                            className="max-sm:hidden px-8 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full" >
                            Login
                        </button>
                    )}

                    <Menu
                        onClick={() => setMenuOpen(true)}
                        className="sm:hidden cursor-pointer"
                    />
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`sm:hidden fixed inset-0 bg-white z-50 transition-transform ${menuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="flex flex-col items-center justify-center h-full text-xl font-semibold gap-6">
                    <Link to="/marketplace" onClick={() => setMenuOpen(false)}>
                        Marketplace
                    </Link>

                    {user ? (
                        <>
                            <Link to="/messages" onClick={() => setMenuOpen(false)}>Messages</Link>
                            <Link to="/my-listings" onClick={() => setMenuOpen(false)}>My Listings</Link>
                        </>
                    ) : (
                        <button onClick={openSignIn}>Login</button>
                    )}

                    <X
                        onClick={() => setMenuOpen(false)}
                        className="absolute top-6 right-6 size-8 cursor-pointer text-gray-500 hover:text-gray-700"
                    />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
