import { Search, ShoppingCart, User, Menu } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Menu className="h-6 w-6 mr-4 lg:hidden" />
            <h1 className="text-2xl font-bold text-blue-600">Mehta Electronics</h1>
          </div>
          
          <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="hidden lg:flex items-center space-x-2 cursor-pointer">
              <User className="h-5 w-5" />
              <span>Account</span>
            </div>
            <div className="flex items-center space-x-2 cursor-pointer">
              <ShoppingCart className="h-5 w-5" />
              <span className="hidden lg:inline">Cart</span>
              <span className="bg-blue-600 text-white rounded-full px-2 py-0.5 text-xs">0</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;