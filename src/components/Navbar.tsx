import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Droplets, Menu, X, LogOut, UserCircle, Map, Plus, ChevronDown, Shield } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { useMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, profile, signOut, isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMobile();

  const isActive = (path: string) => location.pathname === path;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = async () => {
    try {
      setIsOpen(false); // Close mobile menu if open
      
      await signOut();
      
      // Toast will be shown on redirect
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleMobileSignOut = async () => {
    try {
      setIsOpen(false);
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Find Stations", path: "/find" },
    { name: "Add Station", path: "/add" },
    { name: "Sponsor", path: "/sponsor" },
    { name: "Join Us", path: "/join-us" },
    // Only show admin link for admin users
    ...(isAdmin ? [{ name: "Admin Dashboard", path: "/admin" }] : []),
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 
      ${isOpen ? 'bg-white shadow' : 'bg-white/80 backdrop-blur-md'}
      ${location.pathname === '/' ? 'bg-transparent' : ''}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo with animation */}
          <Link 
            to="/" 
            className="flex items-center group"
          >
            <Droplets className="h-8 w-8 text-aquify-blue mr-2 transform group-hover:scale-110 transition-transform duration-300" />
            <span className="text-xl font-bold bg-gradient-to-r from-aquify-blue to-aquify-darkBlue bg-clip-text text-transparent">
              Aquify
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 
                  ${isActive(link.path)
                    ? "text-aquify-blue bg-blue-50/80 shadow-sm"
                    : "text-gray-700 hover:text-aquify-blue hover:bg-blue-50/50"
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* User Menu / Auth Button with animations */}
          <div className="hidden md:flex items-center">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="flex items-center space-x-1 px-4 py-2 rounded-full hover:bg-blue-50/50 transition-all duration-300"
                  >
                    <UserCircle className="h-5 w-5 mr-1 text-aquify-blue" />
                    <span className="text-sm font-medium">
                      {profile?.username || user.email?.split("@")[0] || "User"}
                    </span>
                    <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center cursor-pointer">
                      <UserCircle className="mr-2 h-4 w-4" />
                      <span>My Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin" className="flex items-center cursor-pointer">
                        <Shield className="mr-2 h-4 w-4" />
                        <span>Admin Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleSignOut}
                    className="text-red-500 focus:text-red-500 cursor-pointer"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                asChild
                className="bg-aquify-blue hover:bg-aquify-darkBlue text-white rounded-full px-6 
                          transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
                size="sm"
              >
                <Link to="/auth">Sign In</Link>
              </Button>
            )}
          </div>

          {/* Mobile menu button with animation */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-aquify-blue focus:outline-none transition-transform duration-200 hover:scale-110"
            >
              {isOpen ? (
                <X className="h-6 w-6 transform rotate-0 transition-transform duration-300" />
              ) : (
                <Menu className="h-6 w-6 transform rotate-0 transition-transform duration-300" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Animated Mobile Navigation */}
      <div 
        className={`md:hidden bg-white/95 backdrop-blur-md transform transition-all duration-300 ease-in-out
          ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}
      >
        <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive(link.path)
                    ? "text-refillia-blue bg-blue-50"
                    : "text-gray-700 hover:text-refillia-blue hover:bg-gray-50"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="border-t border-gray-200 my-2 pt-2">
              {user ? (
                <>
                  <Link
                    to="/profile"
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-refillia-blue hover:bg-gray-50 flex items-center"
                    onClick={() => setIsOpen(false)}
                  >
                    <UserCircle className="h-5 w-5 mr-2" />
                    My Profile
                  </Link>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-refillia-blue hover:bg-gray-50 flex items-center"
                      onClick={() => setIsOpen(false)}
                    >
                      <Shield className="h-5 w-5 mr-2" />
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={handleMobileSignOut}
                    className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-red-500 hover:bg-red-50 flex items-center"
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  to="/auth"
                  className="px-3 py-2 rounded-md text-sm font-medium bg-refillia-blue text-white hover:bg-refillia-darkBlue flex items-center justify-center"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
      </div>
    </nav>
  );
};

export default Navbar;
