import { ArrowLeft, Star, Clock, ShoppingBag } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Screen, CartItem } from '../App';
import { useState } from 'react';
import ActiveOrderBanner from './ActiveOrderBanner';
import NewOrderConfirmationModal from './NewOrderConfirmationModal';
import { Order } from '../services/api';

interface RestaurantMenuProps {
  onBack: () => void;
  onNavigate: (screen: Screen) => void;
  onAddToCart: (item: Omit<CartItem, 'quantity'>) => void;
  cartItemCount: number;
  activeOrder?: Order | null;
}

export default function RestaurantMenu({ onBack, onNavigate, onAddToCart, cartItemCount, activeOrder }: RestaurantMenuProps) {
  const [activeCategory, setActiveCategory] = useState('Popular');
  const [showNewOrderModal, setShowNewOrderModal] = useState(false);

  const handleResumeOrder = () => {
    onNavigate('order-active-summary');
  };

  const handleStartNewOrder = () => {
    setShowNewOrderModal(true);
  };

  const confirmNewOrder = () => {
    setShowNewOrderModal(false);
  };

  const categories = ['Popular', 'Wraps & Sandwiches', 'Pasta', 'Pizza'];

  const menuItems = {
    'Popular': [
      {
        id: '1',
        name: 'Shawarma',
        description: 'Tender marinated meat wrapped with fresh vegetables',
        price: 45,
        image: 'https://images.unsplash.com/photo-1721980743519-01f627e7b4b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW5kd2ljaCUyMGZvb2R8ZW58MXx8fHwxNzYzNjAyNDI0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      },
      {
        id: '2',
        name: 'Shawarma Box',
        description: 'Shawarma served over rice with sides',
        price: 55,
        image: 'https://images.unsplash.com/photo-1721980743519-01f627e7b4b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW5kd2ljaCUyMGZvb2R8ZW58MXx8fHwxNzYzNjAyNDI0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      },
      {
        id: '3',
        name: 'Pizza Margarita',
        description: 'Fresh mozzarella, basil, and tomato sauce',
        price: 50,
        image: 'https://images.unsplash.com/photo-1649817253654-4d356cdc4662?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMG1lYWx8ZW58MXx8fHwxNzYzNjM2MTkwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      },
      {
        id: '4',
        name: 'Frosty Fries',
        description: 'Crispy golden fries',
        price: 20,
        image: 'https://images.unsplash.com/photo-1722125680299-783f98369451?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZm9vZCUyMGJ1cmdlcnxlbnwxfHx8fDE3NjM2MDI5NTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      }
    ],
    'Wraps & Sandwiches': [
      {
        id: '5',
        name: 'Shawarma',
        description: 'Tender marinated meat wrapped with fresh vegetables',
        price: 45,
        image: 'https://images.unsplash.com/photo-1721980743519-01f627e7b4b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW5kd2ljaCUyMGZvb2R8ZW58MXx8fHwxNzYzNjAyNDI0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      },
      {
        id: '6',
        name: 'Mexican Wrap',
        description: 'Spicy chicken with peppers and Mexican spices',
        price: 48,
        image: 'https://images.unsplash.com/photo-1721980743519-01f627e7b4b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW5kd2ljaCUyMGZvb2R8ZW58MXx8fHwxNzYzNjAyNDI0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      }
    ],
    'Pasta': [
      {
        id: '7',
        name: 'Bolognaise Pasta',
        description: 'Classic meat sauce with herbs',
        price: 55,
        image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMGRpc2h8ZW58MXx8fHwxNzY1NDYzNjQ2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      },
      {
        id: '8',
        name: 'Carbonara Pasta',
        description: 'Creamy sauce with bacon and parmesan',
        price: 60,
        image: 'https://images.unsplash.com/photo-1633337474564-1d9478ca4e2e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFnaGV0dGklMjBjYXJib25hcmF8ZW58MXx8fHwxNzY1NDU4ODE3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      }
    ],
    'Pizza': [
      {
        id: '9',
        name: 'Pizza Viande Hachée',
        description: 'Ground beef with mozzarella and tomato sauce',
        price: 55,
        image: 'https://images.unsplash.com/photo-1649817253654-4d356cdc4662?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMG1lYWx8ZW58MXx8fHwxNzYzNjM2MTkwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      },
      {
        id: '10',
        name: 'Pizza Poulet',
        description: 'Grilled chicken with vegetables',
        price: 55,
        image: 'https://images.unsplash.com/photo-1649817253654-4d356cdc4662?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMG1lYWx8ZW58MXx8fHwxNzYzNjM2MTkwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      },
      {
        id: '11',
        name: 'Pizza Margarita',
        description: 'Fresh mozzarella, basil, and tomato sauce',
        price: 50,
        image: 'https://images.unsplash.com/photo-1649817253654-4d356cdc4662?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMG1lYWx8ZW58MXx8fHwxNzYzNjM2MTkwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      },
      {
        id: '12',
        name: 'Pizza Charcuterie',
        description: 'Assorted Italian meats and cheese',
        price: 60,
        image: 'https://images.unsplash.com/photo-1649817253654-4d356cdc4662?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMG1lYWx8ZW58MXx8fHwxNzYzNjM2MTkwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      }
    ]
  };

  return (
    <div className="h-full bg-[#F8F9FA] flex flex-col">
      {/* Header with Restaurant Banner */}
      <div className="relative">
        <div className="h-48 relative">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1722125680299-783f98369451?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZm9vZCUyMGJ1cmdlcnxlbnwxfHx8fDE3NjM2MDI5NTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Restaurant"
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
        <div className="px-6 py-4 bg-white">
          <h2 className="text-[#1F2937] mb-2">Proxy</h2>
          <div className="flex items-center space-x-4 text-[#6B7280]">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-[#FFB703] fill-current" />
              <span>4.8 (120+)</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>15–20 min</span>
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
          {menuItems[activeCategory as keyof typeof menuItems].map((item) => (
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