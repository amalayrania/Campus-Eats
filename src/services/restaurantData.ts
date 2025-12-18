import { Restaurant } from './api';

export interface RestaurantCategory {
  name: string;
  items: Restaurant['menu'];
}

export interface RestaurantDetails extends Omit<Restaurant, 'menu'> {
  heroImage: string;
  description: string;
  categories: RestaurantCategory[];
}

export const restaurants: RestaurantDetails[] = [
  {
    id: 'proxy',
    name: 'Proxy',
    image: 'https://images.unsplash.com/photo-1722125680299-783f98369451?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZm9vZCUyMGJ1cmdlcnxlbnwxfHx8fDE3NjM2MDI5NTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    heroImage: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJnZXIlMjByZXN0YXVyYW50fGVufDF8fHx8MTc2MzY0MjE5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    time: '15–20 min',
    status: 'open',
    rating: 4.8,
    description: 'Campus favorite for juicy burgers and loaded fries.',
    categories: [
      {
        name: 'Popular',
        items: [
          {
            id: 'proxy-1',
            name: 'Shawarma',
            description: 'Tender marinated meat wrapped with fresh vegetables',
            price: 45,
            image: 'https://images.unsplash.com/photo-1721980743519-01f627e7b4b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW5kd2ljaCUyMGZvb2R8ZW58MXx8fHwxNzYzNjAyNDI0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
          },
          {
            id: 'proxy-2',
            name: 'Shawarma Box',
            description: 'Shawarma served over rice with sides',
            price: 55,
            image: 'https://images.unsplash.com/photo-1721980743519-01f627e7b4b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW5kd2ljaCUyMGZvb2R8ZW58MXx8fHwxNzYzNjAyNDI0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
          },
          {
            id: 'proxy-3',
            name: 'Cheese Bomb Burger',
            description: 'Double beef patty with molten cheese core',
            price: 65,
            image: 'https://images.unsplash.com/photo-1722125680299-783f98369451?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZm9vZCUyMGJ1cmdlcnxlbnwxfHx8fDE3NjM2MDI5NTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
          },
          {
            id: 'proxy-4',
            name: 'Frosty Fries',
            description: 'Crispy golden fries with house seasoning',
            price: 20,
            image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcml0ZXN8ZW58MXx8fHwxNzYzNjQyMTYxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
          }
        ]
      },
      {
        name: 'Wraps & Sandwiches',
        items: [
          {
            id: 'proxy-5',
            name: 'Mexican Wrap',
            description: 'Spicy chicken with peppers and Mexican spices',
            price: 48,
            image: 'https://images.unsplash.com/photo-1721980743519-01f627e7b4b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW5kd2ljaCUyMGZvb2R8ZW58MXx8fHwxNzYzNjAyNDI0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
          },
          {
            id: 'proxy-6',
            name: 'Crispy Chicken Sandwich',
            description: 'Buttermilk fried chicken with lettuce and aioli',
            price: 42,
            image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVzcHklMjBjaGlja2VuJTIwc2FuZHdpY2h8ZW58MXx8fHwxNzYzNjQyMTgwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
          }
        ]
      },
      {
        name: 'Pasta',
        items: [
          {
            id: 'proxy-7',
            name: 'Bolognaise Pasta',
            description: 'Classic meat sauce with herbs',
            price: 55,
            image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMGRpc2h8ZW58MXx8fHwxNzY1NDYzNjQ2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
          },
          {
            id: 'proxy-8',
            name: 'Carbonara Pasta',
            description: 'Creamy sauce with bacon and parmesan',
            price: 60,
            image: 'https://images.unsplash.com/photo-1633337474564-1d9478ca4e2e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFnaGV0dGklMjBjYXJib25hcmF8ZW58MXx8fHwxNzY1NDU4ODE3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
          }
        ]
      },
      {
        name: 'Pizza',
        items: [
          {
            id: 'proxy-9',
            name: 'Pizza Viande Hachée',
            description: 'Ground beef with mozzarella and tomato sauce',
            price: 55,
            image: 'https://images.unsplash.com/photo-1649817253654-4d356cdc4662?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMG1lYWx8ZW58MXx8fHwxNzYzNjM2MTkwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
          },
          {
            id: 'proxy-10',
            name: 'Pepperoni Pizza',
            description: 'House tomato sauce, mozzarella and spicy pepperoni',
            price: 60,
            image: 'https://images.unsplash.com/photo-1548365328-9bdbffc1b1c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXBwZXJvbmknaXx8fHx8MTc2MzY0MjE4NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
          }
        ]
      }
    ]
  },
  {
    id: 'l-italien',
    name: "L'Italien",
    image: 'https://images.unsplash.com/photo-1649817253654-4d356cdc4662?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMG1lYWx8ZW58MXx8fHwxNzYzNjM2MTkwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    heroImage: 'https://images.unsplash.com/photo-1529059997568-3d847b1154f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGl0YWxpYW4lMjByZXN0YXVyYW50fGVufDF8fHx8MTc2MzY0MjIwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    time: '20–25 min',
    status: 'busy',
    rating: 4.6,
    description: 'Freshly tossed pizzas and creamy pastas straight from the stone oven.',
    categories: [
      {
        name: 'Pizza',
        items: [
          {
            id: 'italien-1',
            name: 'Pizza Margarita',
            description: 'Fresh mozzarella, basil, and tomato sauce',
            price: 50,
            image: 'https://images.unsplash.com/photo-1649817253654-4d356cdc4662?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMG1lYWx8ZW58MXx8fHwxNzYzNjM2MTkwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
          },
          {
            id: 'italien-2',
            name: 'Truffle Mushroom Pizza',
            description: 'White sauce, wild mushrooms, and truffle oil',
            price: 70,
            image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwbXVzaHJvb20lMjBwaXp6YXxlbnwxfHx8fDE3NjM2NDIxNjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
          }
        ]
      },
      {
        name: 'Pasta',
        items: [
          {
            id: 'italien-3',
            name: 'Penne Arrabiata',
            description: 'Spicy tomato sauce with basil',
            price: 52,
            image: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMHRvbWF0byUyMHNhdWNlfGVufDF8fHx8MTc2MzY0MjE5M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
          },
          {
            id: 'italien-4',
            name: 'Seafood Linguine',
            description: 'Prawns, calamari, garlic butter sauce',
            price: 75,
            image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWFmb29kJTIwcGFzdGF8ZW58MXx8fHwxNzYzNjQyMTc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
          }
        ]
      }
    ]
  },
  {
    id: 'l-americain',
    name: "L'Américain",
    image: 'https://images.unsplash.com/photo-1722125680299-783f98369451?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZm9vZCUyMGJ1cmdlcnxlbnwxfHx8fDE3NjM2MDI5NTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    heroImage: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJnZXIlMjByZXN0YXVyYW50fGVufDF8fHx8MTc2MzY0MjE5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    time: '10–15 min',
    status: 'open',
    rating: 4.9,
    description: 'All-American bites with stacked burgers and crispy fries.',
    categories: [
      {
        name: 'Burgers',
        items: [
          {
            id: 'americain-1',
            name: 'Double Smash Burger',
            description: 'Two seared beef patties, cheese, and secret sauce',
            price: 68,
            image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJnZXIlMjBkb3VibGV8ZW58MXx8fHwxNzYzNjQyMTc4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
          },
          {
            id: 'americain-2',
            name: 'BBQ Bacon Burger',
            description: 'Smoky barbecue sauce with crispy beef bacon',
            price: 70,
            image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWxpY2lvdXMlMjBidXJnZXJ8ZW58MXx8fHwxNzYzNjQyMTg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
          }
        ]
      },
      {
        name: 'Fries & Sides',
        items: [
          {
            id: 'americain-3',
            name: 'Loaded Fries',
            description: 'Cheese sauce, scallions, and crispy bacon bits',
            price: 38,
            image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcml0ZXN8ZW58MXx8fHwxNzYzNjQyMTYxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
          },
          {
            id: 'americain-4',
            name: 'Chicken Wings',
            description: 'Buffalo or BBQ glaze, served with ranch',
            price: 55,
            image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwd2luZ3N8ZW58MXx8fHwxNzYzNjQyMjEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
          }
        ]
      }
    ]
  },
  {
    id: 'l-international',
    name: "L'International",
    image: 'https://images.unsplash.com/photo-1651352650142-385087834d9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxhZCUyMGhlYWx0aHklMjBmb29kfGVufDF8fHx8MTc2MzU5ODUwMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    heroImage: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwd2luZ3N8ZW58MXx8fHwxNzYzNjQyMjEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    time: '15–20 min',
    status: 'open',
    rating: 4.7,
    description: 'Global comfort food, from shawarmas to fresh salads.',
    categories: [
      {
        name: 'Grill',
        items: [
          {
            id: 'international-1',
            name: 'Mixed Grill Plate',
            description: 'Chicken, kofta, and veggies with sauces',
            price: 80,
            image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmlsbCUyMG1peGVkfGVufDF8fHx8MTc2MzY0MjIyMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
          },
          {
            id: 'international-2',
            name: 'Chicken Kebab Wrap',
            description: 'Charred chicken, pickles, and garlic sauce',
            price: 46,
            image: 'https://images.unsplash.com/photo-1721980743519-01f627e7b4b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW5kd2ljaCUyMGZvb2R8ZW58MXx8fHwxNzYzNjAyNDI0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
          }
        ]
      },
      {
        name: 'Salads',
        items: [
          {
            id: 'international-3',
            name: 'Mediterranean Salad',
            description: 'Cucumbers, olives, feta, and lemon dressing',
            price: 35,
            image: 'https://images.unsplash.com/photo-1651352650142-385087834d9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxhZCUyMGhlYWx0aHklMjBmb29kfGVufDF8fHx8MTc2MzU5ODUwMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
          },
          {
            id: 'international-4',
            name: 'Falafel Bowl',
            description: 'Crispy falafel with hummus and fresh veggies',
            price: 40,
            image: 'https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxodW1tdXN8ZW58MXx8fHwxNzYzNjQyMjI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
          }
        ]
      }
    ]
  }
];
