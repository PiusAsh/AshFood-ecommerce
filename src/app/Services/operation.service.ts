
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Food } from '../Models/food';


@Injectable({
  providedIn: 'root'
})
export class OperationService {

  constructor(private http: HttpClient) { }

  


  products: Food[] = [
    {
      id: 1,
      name: 'Egusi Soup',
      category: 'Soup',
      description: 'A delicious Nigerian soup made with ground melon seeds and various spices.',
      price: 800,
      thumbnail: '/assets/images/38-1-450x450 (1).png'
    },

    {
      id: 2,
      name: 'Pounded Yam',
      category: 'Soup',
      description: 'A popular Nigerian staple food made by pounding boiled yam.',
      price: 500,
      thumbnail: '/assets/images/26-1-450x450.png'
    },
    {
      id: 3,
      name: 'Chin Chin',
      category: 'Snack',
      description: 'A crunchy Nigerian snack made with flour, sugar, and other ingredients.',
      price: 300,
      thumbnail: '/assets/images/pizza (3).png'
    },
    {
      id: 4,
      name: 'Samosa',
      category: 'Snack',
      description: 'A savory pastry filled with spiced meat or vegetables.',
      price: 200,
      thumbnail: '/assets/images/pizza (3).png'
    },
    {
      id: 5,
      name: 'Jollof Rice',
      category: 'Rice',
      description: 'A popular West African rice dish cooked with tomatoes, spices, and other ingredients.',
      price: 1000,
      thumbnail: '/assets/images/rice.png'
    },
    {
      id: 6,
      name: 'Fried Rice',
      category: 'Rice',
      description: 'A flavorful rice dish made with mixed vegetables, meat, and seasonings.',
      price: 1200,
      thumbnail: '/assets/images/rice.png'
    },
    {
      id: 7,
      name: 'Pepperoni Pizza',
      category: 'Pizza',
      description: 'A classic pizza topped with pepperoni slices and melted cheese.',
      price: 1500,
      thumbnail: '/assets/images/pizza (3).png'
    },
    {
      id: 8,
      name: 'Margherita Pizza',
      category: 'Pizza',
      description: 'A traditional pizza topped with fresh tomatoes, mozzarella cheese, and basil.',
      price: 1400,
      thumbnail: '/assets/images/pizza (3).png'
    },
    {
      id: 9,
      name: 'Bitterleaf Soup',
      category: 'Soup',
      description: 'A Nigerian soup made with bitterleaf and assorted meats.',
      price: 900,
      thumbnail: '/assets/images/pizza (3).png'
    },
    {
      id: 10,
      name: 'Okro Soup',
      category: 'Soup',
      description: 'A hearty Nigerian soup made with okra and other ingredients.',
      price: 750,
      thumbnail: '/assets/images/pizza (3).png'
    },
    {
      id: 11,
      name: 'Chips',
      category: 'Snack',
      description: 'Crispy potato chips perfect for snacking.',
      price: 250,
      thumbnail: '/assets/images/pizza (3).png'
    },
    {
      id: 12,
      name: 'Suya',
      category: 'Snack',
      description: 'Spicy grilled skewered meat popular in Nigeria.',
      price: 400,
      thumbnail: '/assets/images/pizza (3).png'
    },
    {
      id: 13,
      name: 'Coconut Rice',
      category: 'Rice',
      description: 'Fragrant rice cooked with coconut milk and spices.',
      price: 1100,
      thumbnail: '/assets/images/chicken.png'
    },
    {
      id: 14,
      name: 'Jollof Spaghetti',
      category: 'Rice',
      description: 'Spaghetti cooked in a flavorful tomato-based sauce.',
      price: 900,
      thumbnail: '/src/assets/images/spag.png'
    },
    {
      id: 15,
      name: 'Vegetable Pizza',
      category: 'Pizza',
      description: 'Pizza topped with a variety of fresh vegetables.',
      price: 1300,
      thumbnail: '/assets/images/pizza (3).png'
    },
    {
      id: 16,
      name: 'BBQ Chicken Pizza',
      category: 'Pizza',
      description: 'Pizza topped with barbecued chicken, onions, and cheese.',
      price: 1600,
      thumbnail: '/assets/images/pizza (3).png'
    },
    {
      id: 17,
      name: 'Edikaikong Soup',
      category: 'Soup',
      description: 'A nutritious Nigerian soup made with vegetables and assorted meats.',
      price: 950,
      thumbnail: '/assets/images/pizza (3).png'
    },
    {
      id: 18,
      name: 'Ofe Nsala',
      category: 'Soup',
      description: 'A traditional Igbo soup made with fresh fish and spices.',
      price: 850,
      thumbnail: '/assets/images/pizza (3).png'
    },
    {
      id: 19,
      name: 'Chin-Chin Cookies',
      category: 'Snack',
      description: 'Buttery cookies with a hint of vanilla, a delightful Nigerian snack.',
      price: 350,
      thumbnail: '/assets/images/pizza (3).png'
    },
    {
      id: 20,
      name: 'Puff Puff',
      category: 'Snack',
      description: 'Deep-fried dough balls dusted with powdered sugar.',
      price: 150,
      thumbnail: '/assets/images/pizza (3).png'
    },
    {
      id: 21,
      name: 'Coconut Jollof Rice',
      category: 'Rice',
      description: 'A variation of jollof rice cooked with coconut milk.',
      price: 1250,
      thumbnail: '/assets/images/pizza (3).png'
    },
    {
      id: 22,
      name: 'Native Jollof Rice',
      category: 'Rice',
      description: 'A local version of jollof rice made with indigenous spices.',
      price: 1150,
      thumbnail: '/assets/images/pizza (3).png'
    },
    {
      id: 23,
      name: 'Meat Feast Pizza',
      category: 'Pizza',
      description: 'Pizza loaded with a variety of meats and cheese.',
      price: 1700,
      thumbnail: '/assets/images/pizza (3).png'
    },
    {
      id: 24,
      name: 'Hawaiian Pizza',
      category: 'Pizza',
      description: 'Pizza topped with ham, pineapple, and cheese.',
      price: 1450,
      thumbnail: 'https://example.com/hawaiian-pizza.jpg'
    },
    {
      id: 25,
      name: 'Ogbono Soup',
      category: 'Soup',
      description: 'A rich Nigerian soup thickened with ground ogbono seeds.',
      price: 850,
      thumbnail: 'https://example.com/ogbono-soup.jpg'
    },
    {
      id: 26,
      name: 'Ewedu Soup',
      category: 'Soup',
      description: 'A popular Yoruba soup made with jute leaves and served with a variety of meats.',
      price: 800,
      thumbnail: 'https://example.com/ewedu-soup.jpg'
    },
    {
      id: 27,
      name: 'Plantain Chips',
      category: 'Snack',
      description: 'Crispy chips made from ripe plantains.',
      price: 300,
      thumbnail: 'https://example.com/plantain-chips.jpg'
    },
    {
      id: 28,
      name: 'Akara',
      category: 'Snack',
      description: 'Deep-fried bean cakes, a popular Nigerian street food.',
      price: 200,
      thumbnail: 'https://example.com/akara.jpg'
    },
    {
      id: 29,
      name: 'Banga Soup',
      category: 'Soup',
      description: 'A traditional Nigerian soup made with palm fruit extract.',
      price: 950,
      thumbnail: 'https://example.com/banga-soup.jpg'
    },
    {
      id: 30,
      name: 'Efo Riro',
      category: 'Soup',
      description: 'A Nigerian vegetable soup made with spinach and assorted meats.',
      price: 900,
      thumbnail: 'https://example.com/efo-riro.jpg'
    },
    {
      id: 31,
      name: 'Sausage Roll',
      category: 'Snack',
      description: 'Puff pastry filled with sausage meat, a popular snack in Nigeria.',
      price: 250,
      thumbnail: 'https://example.com/sausage-roll.jpg'
    },
    {
      id: 32,
      name: 'Egg Roll',
      category: 'Snack',
      description: 'Deep-fried pastry filled with egg, a delicious grab-and-go snack.',
      price: 200,
      thumbnail: 'https://example.com/egg-roll.jpg'
    },
    {
      id: 33,
      name: 'Coconut Egusi Soup',
      category: 'Soup',
      description: 'A variation of egusi soup made with coconut milk and ground melon seeds.',
      price: 900,
      thumbnail: 'https://example.com/coconut-egusi-soup.jpg'
    },
    {
      id: 34,
      name: 'Oha Soup',
      category: 'Soup',
      description: 'A traditional Igbo soup made with oha leaves and assorted meats.',
      price: 850,
      thumbnail: 'https://example.com/oha-soup.jpg'
    },
    {
      id: 35,
      name: 'Suya Pizza',
      category: 'Pizza',
      description: 'A unique fusion of Nigerian suya spice on a pizza.',
      price: 1600,
      thumbnail: 'https://example.com/suya-pizza.jpg'
    },
    {
      id: 36,
      name: 'Seafood Pizza',
      category: 'Pizza',
      description: 'Pizza topped with a medley of delicious seafood.',
      price: 1550,
      thumbnail: 'https://example.com/seafood-pizza.jpg'
    },
    {
      id: 37,
      name: 'Ofe Onugbu',
      category: 'Soup',
      description: 'A Nigerian soup made with bitterleaf and assorted meats.',
      price: 950,
      thumbnail: 'https://example.com/ofe-onugbu.jpg'
    },
    {
      id: 38,
      name: 'Nkwobi',
      category: 'Soup',
      description: 'A spicy Nigerian delicacy made with cow foot.',
      price: 850,
      thumbnail: 'https://example.com/nkwobi.jpg'
    },
    {
      id: 39,
      name: 'Chin-Chin Biscuits',
      category: 'Snack',
      description: 'Delicious bite-sized biscuits with a hint of cinnamon.',
      price: 350,
      thumbnail: 'https://example.com/chin-chin-biscuits.jpg'
    },
    {
      id: 40,
      name: 'Spring Rolls',
      category: 'Snack',
      description: 'Crispy fried rolls filled with vegetables and meat.',
      price: 200,
      thumbnail: 'https://example.com/spring-rolls.jpg'
    }
  ];





  getAllProducts(): any[] {
    return [...this.products];
  }

  getAllFoodsBySearch(searchTerm: string){
return this.getAllProducts().filter(x => x.category.toLowerCase().includes(searchTerm.toLowerCase()))
  }

// getFoodById1(foodID: string): any{
//     return this.getAllProducts().find(x => x.food.id === foodID) ?? new Food()
// }
getFoodById(foodID: string): Food {
    console.log(foodID, 'foodID', foodID);
    const foundFood = this.products.find(product => product.id === parseInt(foodID));
    return foundFood ?? new Food();
}


getFoodByIde(foodID: string): any {
    const allProducts = this.getAllProducts();
    if (Array.isArray(allProducts)) {
        const foundFood = allProducts.find(x => x.food.id === foodID);
        if (foundFood) {
            return foundFood;
        }
    }
    return new Food();
}

}


