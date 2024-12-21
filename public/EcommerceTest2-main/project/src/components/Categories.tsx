
import { Cpu, Battery, Wifi,  CircuitBoard } from 'lucide-react';

const categories = [
  { name: 'Development Boards', icon: Cpu },
  // { name: 'Components', icon: Microchip },
  // { name: 'Robotics', icon: Robot },
  { name: 'Power Supply', icon: Battery },
  { name: 'IoT & Wireless', icon: Wifi },
  // { name: 'Tools', icon: Tool },
  // { name: 'Motors', icon: Lightning },
  { name: 'Modules', icon: CircuitBoard },
];

const Categories = () => {
  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.name}
                className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              >
                <Icon className="h-8 w-8 text-blue-600 mb-2" />
                <span className="text-sm text-center">{category.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Categories;