import { ArrowLeft, Star, Clock, ShoppingBag } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Screen, CartItem } from '../App';
import { useEffect, useMemo, useState } from 'react';
import ActiveOrderBanner from './ActiveOrderBanner';
import NewOrderConfirmationModal from './NewOrderConfirmationModal';
import { Order } from '../services/api';
import { RestaurantDetails } from '../services/restaurantData';

interface RestaurantMenuProps {
  onBack: () => void;
  onNavigate: (screen: Screen) => void;
  onAddToCart: (item: Omit<CartItem, 'quantity'>) => void;
  cartItemCount: number;
  activeOrder?: Order | null;
  restaurant: RestaurantDetails;
}

export default function RestaurantMenu({ onBack, onNavigate, onAddToCart, cartItemCount, activeOrder, restaurant }: RestaurantMenuProps) {
  const [activeCategory, setActiveCategory] = useState(restaurant.categories[0]?.name || '');
  const [showNewOrderModal, setShowNewOrderModal] = useState(false);

  useEffect(() => {
    setActiveCategory(restaurant.categories[0]?.name || '');
  }, [restaurant]);

  const categories = useMemo(() => restaurant.categories.map((category) => category.name), [restaurant.categories]);
  const menuItems = useMemo(() => {
    return restaurant.categories.find((category) => category.name === activeCategory)?.items || [];
  }, [restaurant.categories, activeCategory]);

  const handleResumeOrder = () => {
    onNavigate('order-active-summary');
  };

  const handleStartNewOrder = () => {
    setShowNewOrderModal(true);
  };

  const confirmNewOrder = () => {
    setShowNewOrderModal(false);
  };

  return (
    <div className="h-full bg-[#F8F9FA] flex flex-col">
      {/* Header */}
      <div className="relative h-64">
        <ImageWithFallback
          src={restaurant.heroImage}
          alt={`${restaurant.name} cover`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent"></div>
        <button
          onClick={onBack}
          className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors active:scale-95"
        >
          <ArrowLeft className="w-5 h-5 text-[#1F2937]" />
        </button>
        <button
          onClick={() => onNavigate('cart')}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors active:scale-95"
        >
          <ShoppingBag className="w-5 h-5 text-[#1F2937]" />
          {cartItemCount > 0 && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#FFB703] rounded-full flex items-center justify-center">
              <span className="text-white text-xs">{cartItemCount}</span>
            </div>
          )}
        </button>
      </div>

      {/* Restaurant Info */}
      <div className="px-6 py-4 bg-white space-y-2">
        <h2 className="text-[#1F2937]">{restaurant.name}</h2>
        <p className="text-[#6B7280] text-sm">{restaurant.description}</p>
        <div className="flex items-center space-x-4 text-[#6B7280]">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-[#FFB703] fill-current" />
            <span>{restaurant.rating} (120+)</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{restaurant.time}</span>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="px-6 py-4 bg-white border-b border-[#E5E7EB]">
        <div className="flex space-x-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full transition-all ${
                activeCategory === category
                  ? 'bg-[#2D6A4F] text-white'
                  : 'bg-[#F3F4F6] text-[#6B7280] hover:bg-[#E5E7EB]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto pb-24">
        {/* Active Order Banner - only show when there is an active order */}
        {activeOrder && (
          <ActiveOrderBanner
            onResumeOrder={handleResumeOrder}
            onStartNew={handleStartNewOrder}
          />
        )}

        <div className="px-6 py-4 space-y-4">
          {menuItems.map((item) => (
            <MenuItem
              key={item.id}
              {...item}
              onAddToCart={() => onAddToCart(item)}
            />
          ))}
        </div>
      </div>

      {/* New Order Confirmation Modal */}
      {showNewOrderModal && (
        <NewOrderConfirmationModal
          onConfirm={confirmNewOrder}
          onCancel={() => setShowNewOrderModal(false)}
        />
      )}
    </div>
  );
}

interface MenuItemProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  onAddToCart: () => void;
}

function MenuItem({ name, description, price, image, onAddToCart }: MenuItemProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden flex hover:shadow-lg transition-all">
      <div className="w-24 h-24 flex-shrink-0">
        <ImageWithFallback
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <h4 className="text-[#1F2937] mb-1">{name}</h4>
          <p className="text-[#6B7280] line-clamp-2">{description}</p>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-[#2D6A4F]">{price} MAD</span>
          <button
            onClick={onAddToCart}
            className="px-4 py-2 bg-[#2D6A4F] text-white rounded-xl hover:bg-[#40916C] transition-colors active:scale-95"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
