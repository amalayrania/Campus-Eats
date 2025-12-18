import { Search, Clock, Star, ShoppingBag, User, Home, Package, X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Screen } from '../App';
import { Order, getOrderProgress, formatOrderStatus } from '../services/api';
import { useState, useMemo } from 'react';
import { RestaurantDetails } from '../services/restaurantData';

interface HomeScreenProps {
  onNavigate: (screen: Screen) => void;
  restaurants: RestaurantDetails[];
  onSelectRestaurant: (restaurant: RestaurantDetails) => void;
  cartItemCount: number;
  activeOrder?: Order | null;
}

export default function HomeScreen({ onNavigate, restaurants, onSelectRestaurant, cartItemCount, activeOrder }: HomeScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter restaurants based on search query
  const filteredRestaurants = useMemo(() => {
    if (!searchQuery.trim()) {
      return restaurants;
    }
    return restaurants.filter(restaurant =>
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [restaurants, searchQuery]);

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="h-full bg-[#F8F9FA] overflow-y-auto pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#2D6A4F] to-[#40916C] px-6 pt-12 pb-8 rounded-b-[32px]">
        <h2 className="text-white mb-6">
          What's for lunch today?
        </h2>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
          <input
            type="text"
            placeholder="Search meals or restaurants"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-12 py-4 bg-white rounded-2xl shadow-lg outline-none text-[#1F2937] placeholder:text-[#9CA3AF]"
          />
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280] hover:text-[#1F2937] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Active Order Status */}
      {activeOrder && (
        <div className="px-6 -mt-6 mb-6">
          <div className="bg-white rounded-2xl p-4 shadow-lg flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-[#FFB703]/10 flex items-center justify-center">
              <Package className="w-6 h-6 text-[#FFB703]" />
            </div>
            <div className="flex-1">
              <p className="text-[#1F2937]">Your Order #{activeOrder.orderNumber} is {formatOrderStatus(activeOrder.status)}</p>
              <div className="w-full h-2 bg-[#F3F4F6] rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-[#FFB703] rounded-full" style={{ width: `${getOrderProgress(activeOrder.status)}%` }}></div>
              </div>
            </div>
            <button
              onClick={() => onNavigate('tracking')}
              className="text-[#2D6A4F]"
            >
              Track
            </button>
          </div>
        </div>
      )}

      {/* Today's Restaurants */}
      <div className="px-6 mb-6">
        <h3 className="text-[#1F2937] mb-4">Today's Restaurants</h3>
        {filteredRestaurants.length > 0 ? (
          <div className="flex space-x-4 overflow-x-auto pb-2 -mx-6 px-6 scrollbar-hide">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                name={restaurant.name}
                image={restaurant.image}
                time={restaurant.time}
                status={restaurant.status}
                rating={restaurant.rating}
                onClick={() => onSelectRestaurant(restaurant)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-[#6B7280]">
              {searchQuery.trim()
                ? `No restaurants found matching "${searchQuery}"`
                : 'No restaurants are available right now.'}
            </p>
          </div>
        )}
      </div>

      {/* Recommended Items */}
      <div className="px-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[#1F2937]">Recommended for You</h3>
          <button className="text-[#2D6A4F]">See all</button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FoodCard
            name="Shawarma"
            image="https://images.unsplash.com/photo-1721980743519-01f627e7b4b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW5kd2ljaCUyMGZvb2R8ZW58MXx8fHwxNzYzNjAyNDI0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            price={45}
          />
          <FoodCard
            name="Pizza Margarita"
            image="https://images.unsplash.com/photo-1649817253654-4d356cdc4662?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMG1lYWx8ZW58MXx8fHwxNzYzNjM2MTkwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            price={55}
          />
          <FoodCard
            name="Cheese Bomb Burger"
            image="https://images.unsplash.com/photo-1722125680299-783f98369451?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZm9vZCUyMGJ1cmdlcnxlbnwxfHx8fDE3NjM2MDI5NTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            price={50}
          />
          <FoodCard
            name="Salad Bar"
            image="https://images.unsplash.com/photo-1651352650142-385087834d9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxhZCUyMGhlYWx0aHklMjBmb29kfGVufDF8fHx8MTc2MzU5ODUwMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            price={35}
          />
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E7EB] px-6 py-4 flex items-center justify-around max-w-[430px] mx-auto rounded-t-[40px]">
        <button className="flex flex-col items-center space-y-1">
          <Home className="w-6 h-6 text-[#2D6A4F]" />
          <span className="text-[#2D6A4F]">Home</span>
        </button>
        <button
          onClick={() => onNavigate('tracking')}
          className="flex flex-col items-center space-y-1"
        >
          <Package className="w-6 h-6 text-[#9CA3AF]" />
          <span className="text-[#9CA3AF]">Orders</span>
        </button>
        <button
          onClick={() => onNavigate('cart')}
          className="relative flex flex-col items-center space-y-1"
        >
          <ShoppingBag className="w-6 h-6 text-[#9CA3AF]" />
          {cartItemCount > 0 && (
            <div className="absolute -top-1 -right-2 w-5 h-5 bg-[#FFB703] rounded-full flex items-center justify-center">
              <span className="text-white text-xs">{cartItemCount}</span>
            </div>
          )}
          <span className="text-[#9CA3AF]">Cart</span>
        </button>
        <button
          onClick={() => onNavigate('profile')}
          className="flex flex-col items-center space-y-1"
        >
          <User className="w-6 h-6 text-[#9CA3AF]" />
          <span className="text-[#9CA3AF]">Profile</span>
        </button>
      </div>
    </div>
  );
}

interface RestaurantCardProps {
  name: string;
  image: string;
  time: string;
  status: 'open' | 'busy' | 'closed';
  rating: number;
  onClick: () => void;
}

function RestaurantCard({ name, image, time, status, rating, onClick }: RestaurantCardProps) {
  const statusColors = {
    open: 'bg-[#40916C] text-white',
    busy: 'bg-[#FFB703] text-white',
    closed: 'bg-[#DC2626] text-white'
  };

  return (
    <button
      onClick={onClick}
      className="flex-shrink-0 w-64 bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all active:scale-95"
    >
      <div className="relative h-32">
        <ImageWithFallback
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className={`absolute top-3 right-3 px-3 py-1 rounded-full ${statusColors[status]}`}>
          <span className="capitalize">{status}</span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-[#1F2937]">{name}</h4>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-[#FFB703] fill-current" />
            <span className="text-[#6B7280]">{rating}</span>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-[#6B7280]">
          <Clock className="w-4 h-4" />
          <span>{time}</span>
        </div>
      </div>
    </button>
  );
}

interface FoodCardProps {
  name: string;
  image: string;
  price: number;
}

function FoodCard({ name, image, price }: FoodCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all">
      <div className="relative h-32">
        <ImageWithFallback
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-3">
        <p className="text-[#1F2937] mb-2">{name}</p>
        <div className="flex items-center justify-between">
          <span className="text-[#2D6A4F]">{price} MAD</span>
          <button className="w-8 h-8 rounded-full bg-[#2D6A4F] flex items-center justify-center text-white hover:bg-[#40916C] transition-colors active:scale-95">
            +
          </button>
        </div>
      </div>
    </div>
  );
}
