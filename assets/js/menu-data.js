/* Catch Lubumbashi — menu content, transcribed from the printed menus (food prices in USD). */
window.CATCH_MENU = {
  food: [
    {
      id: 'seafood',
      label: { en: 'From the Water', fr: 'De la Mer' },
      script: 'Seafood',
      cover: ['assets/img/food/calamari-salad.webp', 'assets/img/food/prawn-pasta.webp'],
      groups: [
        {
          title: { en: 'Starters', fr: 'Entrées' },
          items: [
            { name: 'Fish Soup', fr: 'Soupe de Poisson', price: 11, en_d: 'A light, healthy soup with hake pieces and chopped veg', fr_d: 'Une soupe légère et saine avec des morceaux de merlu et des légumes hachés' },
            { name: 'Falkland Calamari', fr: 'Calamars Falkland', price: 12, en_d: 'Tender calamari tubes, grilled, fried or cajun, served with lemon butter', fr_d: 'Tubes de calamars tendres, grillés, frits ou cajun, servis avec beurre citronné' },
            { name: 'Creamy Garlic Snails', fr: 'Escargots à l’Ail', price: 12, en_d: 'Snails smothered in a creamy garlic sauce', fr_d: 'Escargots nappés d’une sauce crémeuse à l’ail' },
            { name: 'Tempura Prawns', fr: 'Crevettes Tempura', price: 14, en_d: 'Tempura prawns served with a sweet chilli sauce', fr_d: 'Crevettes légères et croquantes servies avec une sauce douce aux piments' }
          ]
        },
        {
          title: { en: 'Fish', fr: 'Poissons' },
          items: [
            { name: 'Tilapia', fr: 'Tilapia', price: 20, tag: { en: 'House favourite', fr: 'Coup de cœur' }, en_d: 'Tilapia grilled to perfection', fr_d: 'Tilapia grillé à la perfection' },
            { name: 'Pangasius', fr: 'Pangasius', price: 22, en_d: 'A delicate white fish, high in protein, grilled with lemon butter or cajun style', fr_d: 'Un poisson blanc délicat, riche en protéines, grillé au beurre citronné ou style cajun' },
            { name: 'Hake', fr: 'Colin', price: 23, en_d: 'Hake grilled to perfection', fr_d: 'Colin grillé à la perfection' },
            { name: 'English Style Fish & Chips', fr: 'Fish & Chips à l’Anglaise', price: 24, en_d: 'Fresh hake fillet deep fried in a crispy batter, served with chips', fr_d: 'Filet de colin frais frit dans une pâte croustillante, servi avec des frites' },
            { name: 'Calamari', fr: 'Calamars', price: 24, en_d: 'Tender calamari tubes, grilled, fried or cajun, served with lemon butter', fr_d: 'Tubes de calamars tendres, grillés, frits ou cajun, servis avec beurre citronné' },
            { name: 'Kingklip', fr: 'Kingklip', price: 32, en_d: 'Fillet of kingklip, lightly grilled, with a lemon butter sauce', fr_d: 'Filet d’abadèche du Cap légèrement grillé, servi avec une sauce au beurre citronné' }
          ]
        },
        {
          title: { en: 'Shellfish', fr: 'Crustacés' },
          items: [
            { name: '12 Prince Prawns', fr: '12 Crevettes Prince', price: 34, en_d: 'Twelve prince prawns', fr_d: 'Douze crevettes prince' },
            { name: '8 Queen Prawns', fr: '8 Crevettes Reines', price: 38, en_d: 'Eight queen prawns', fr_d: 'Huit crevettes reines' },
            { name: '8 King Prawns', fr: '8 Crevettes Royales', price: 'SQ', en_d: 'Eight king prawns, priced on request', fr_d: 'Huit crevettes royales, prix sur demande' }
          ]
        },
        {
          title: { en: 'Seafood Specialities', fr: 'Spécialités de la Mer' },
          items: [
            { name: 'Fillet Capitaine', fr: 'Filet de Capitaine', price: 32, tag: { en: 'Congolese classic', fr: 'Classique congolais' }, en_d: 'Grilled capitaine served with ngayi ngayi and plantain', fr_d: 'Capitaine grillé servi avec ngayi ngayi et banane plantain' },
            { name: 'Butter Kingklip Curry', fr: 'Curry de Kingklip au Beurre', price: 32, en_d: 'Cubes of kingklip simmered in a buttery curry, with caramelised onions and cardamom rice', fr_d: 'Kingklip en cubes mijoté dans un beurre au curry, servi avec des oignons caramélisés et du riz à la cardamome' },
            { name: 'Prawn Curry', fr: 'Curry de Crevettes', price: 36, en_d: 'Queen prawns cooked in a delicious coconut milk curry sauce', fr_d: 'Crevettes reines cuites dans une délicieuse sauce au curry et lait de coco' },
            { name: 'Seared Salmon', fr: 'Saumon Saisi', price: 38, en_d: 'Salmon grilled and glazed with teriyaki sauce, served on vegetable noodles', fr_d: 'Saumon grillé et glacé à la sauce teriyaki, servi sur des nouilles aux légumes' }
          ]
        }
      ]
    },
    {
      id: 'burgers',
      label: { en: 'Burgers & Wraps', fr: 'Burgers & Wraps' },
      script: 'Burgers',
      cover: ['assets/img/food/dagalicious.webp', 'assets/img/food/wraps.webp'],
      groups: [
        {
          title: { en: 'Wraps & Burgers', fr: 'Wraps & Burgers' },
          items: [
            { name: 'Burger', fr: 'Burger', price: 16, img: 'assets/img/food/cheeseburger.webp', en_d: 'Grilled 200g beef patty, served with chips', fr_d: '200g de pur bœuf haché, servi avec des frites' },
            { name: 'Chicken Burger', fr: 'Burger au Poulet', price: 16, img: 'assets/img/food/chicken-burger.webp', en_d: 'Grilled chicken fillet topped with a slice of cheese and sweet chilli sauce, served with chips', fr_d: 'Filet de poulet grillé surmonté d’une tranche de fromage, sauce aigre-douce, servi avec des frites' },
            { name: 'Cheese Burger', fr: 'Cheese Burger', price: 17, img: 'assets/img/food/cheeseburger.webp', en_d: 'Grilled 200g beef patty with a slice of cheddar cheese, served with chips', fr_d: 'Avec une tranche de cheddar, servi avec des frites' },
            { name: 'Santa Fe Wrap', fr: 'Wrap Santa Fe', price: 18, img: 'assets/img/food/wraps.webp', en_d: 'Grilled chicken strips, grilled veggies, avo (seasonal), spinach and cream cheese, with or without sweet chilli sauce', fr_d: 'Lanières de poulet grillées, légumes grillés, avocat (de saison), épinards et fromage frais, avec ou sans sauce aigre-douce' },
            { name: 'Dagalicious', fr: 'Dagalicious', price: 22, tag: { en: 'Signature', fr: 'Signature' }, img: 'assets/img/food/dagalicious.webp', en_d: 'Grilled 200g beef patty with cheddar, ham, bacon and a fried egg, served with chips', fr_d: 'Avec une tranche de cheddar, jambon, bacon et œuf, servi avec des frites' },
            { name: 'Cuban Wrap', fr: 'Wrap Cubain', price: 23, img: 'assets/img/food/wraps.webp', en_d: 'Beef, chicken, halloumi and sweet chilli sauce', fr_d: 'Bœuf, poulet, halloumi et sauce aigre-douce' }
          ]
        },
        {
          title: { en: 'Sandwiches & Triple Deckers', fr: 'Sandwichs & Triple Deckers' },
          items: [
            { name: 'Cheese & Tomato', fr: 'Fromage & Tomate', price: 10, en_d: 'Cheese and tomato', fr_d: 'Fromage et tomate' },
            { name: 'Ham & Cheese', fr: 'Jambon & Fromage', price: 11, en_d: 'Ham and cheese', fr_d: 'Jambon et fromage' },
            { name: 'Bacon, Egg & Cheese', fr: 'Bacon, Œuf & Fromage', price: 12, en_d: 'Bacon, egg and cheese', fr_d: 'Bacon, œuf et fromage' },
            { name: 'Chicken Mayo', fr: 'Poulet Mayo', price: 12, en_d: 'Chicken mayonnaise', fr_d: 'Poulet à la mayonnaise' },
            { name: 'Emperor Triple Decker', fr: 'Triple Decker Empereur', price: 18, img: 'assets/img/food/triple-decker.webp', en_d: 'Grilled cheese, tomato, chicken mayonnaise, bacon and egg', fr_d: 'Fromage grillé, tomate, poulet mayonnaise, bacon et œuf' }
          ]
        }
      ]
    },
    {
      id: 'salads',
      label: { en: 'Salads', fr: 'Salades' },
      script: 'Salads',
      cover: ['assets/img/food/smoked-salmon-salad.webp', 'assets/img/food/greek-salad.webp'],
      groups: [
        {
          title: { en: 'Fresh & Crisp', fr: 'Fraîches & Croquantes' },
          items: [
            { name: 'Greek Salad', fr: 'Salade Grecque', price: 17, img: 'assets/img/food/greek-salad.webp', en_d: 'Crispy greens, tomato, cucumber, feta cheese and kalamata olives', fr_d: 'Légumes croustillants, tomate, concombre, feta et olives kalamata' },
            { name: 'Chicken Caesar Salad', fr: 'Salade César au Poulet', price: 21, img: 'assets/img/food/chicken-caesar.webp', en_d: 'Chicken breast with chopped avo, feta, lettuce, red cabbage, sweet corn and roasted cashews, with an Asian dressing', fr_d: 'Poitrine de poulet, avocat, feta, laitue, chou rouge, maïs et noix de cajou rôties, assaisonnement asiatique' },
            { name: 'Asian Beef Salad', fr: 'Salade de Bœuf Asiatique', price: 21, en_d: 'Strips of beef cured with sesame seeds and soya sauce, tossed with baby salad and a lightly seasoned Asian dressing', fr_d: 'Languettes de bœuf marinées au sésame et à la sauce soja, mélangées à de jeunes pousses et nappées d’une sauce' },
            { name: 'Calamari Salad', fr: 'Salade de Calamars', price: 22, img: 'assets/img/food/calamari-salad.webp', en_d: 'Grilled calamari with lettuce, red cabbage, sesame seeds, baby spinach and a tangy dressing', fr_d: 'Calamars grillés, laitue, chou rouge, graines de sésame et pousses d’épinard, assaisonnement piquant' },
            { name: 'Smoked Salmon Salad', fr: 'Salade au Saumon Fumé', price: 23, img: 'assets/img/food/smoked-salmon-salad.webp', en_d: 'Smoked salmon, avo, tomato, cucumber, mixed greens and wild rocket', fr_d: 'Saumon fumé, avocat, tomate, concombre, légumes verts et roquette sauvage' }
          ]
        }
      ]
    },
    {
      id: 'breakfast',
      label: { en: 'Breakfast', fr: 'Petit-Déjeuner' },
      script: 'Breakfast',
      cover: ['assets/img/food/full-monty.webp', 'assets/img/food/eggs-terrace.webp'],
      groups: [
        {
          title: { en: 'Morning Plates', fr: 'Assiettes du Matin' },
          items: [
            { name: 'On the Run', fr: 'On the Run', price: 11, img: 'assets/img/food/eggs-terrace.webp', en_d: '2 fried eggs, 3 rashers of bacon and grilled tomato', fr_d: '2 œufs frits, 3 tranches de bacon et tomate grillée' },
            { name: 'Eggs Benedict', fr: 'Œufs Bénédicte', price: 14, en_d: 'Poached eggs on round toast with ham, gratinated with a tangy hollandaise', fr_d: 'Œufs pochés sur pain grillé rond avec du jambon, gratinés à la sauce hollandaise' },
            { name: 'Not So Fast', fr: 'Not So Fast', price: 15, img: 'assets/img/food/not-so-fast.webp', en_d: '2 eggs to order, bacon, sautéed mushroom, pork or beef sausage and grilled tomato', fr_d: '2 œufs, bacon, champignons sautés, saucisse de porc ou de bœuf et tomate grillée' },
            { name: 'Omelette', fr: 'Omelette', price: 16, en_d: '3-egg folded omelette with 2 fillings: tomato & onion, bacon, mushroom or cheese. Egg-white only on request', fr_d: 'Omelette de 3 œufs, 2 garnitures au choix : tomate & oignon, bacon, champignon, fromage. Possible uniquement avec des blancs' },
            { name: 'Full Monty', fr: 'Full Monty', price: 18, tag: { en: 'The big one', fr: 'Le grand jeu' }, img: 'assets/img/food/full-monty.webp', en_d: '2 eggs to order, bacon, minute steak, pork or beef sausage, sautéed mushroom, grilled tomato and baked beans', fr_d: '2 œufs, bacon, steak minute, saucisse de porc ou de bœuf, champignons sautés, tomate grillée et haricots à la tomate' }
          ]
        }
      ]
    },
    {
      id: 'pub',
      label: { en: 'Pub Bites', fr: 'Bouchées Pub' },
      script: 'Legends',
      note: { en: 'Shared with our neighbours at Legends Bar, La Plage', fr: 'Avec nos voisins du Legends Bar, La Plage' },
      cover: ['assets/img/food/meaty-mania.webp', 'assets/img/food/ribs.webp'],
      groups: [
        {
          title: { en: 'Baskets & Platters', fr: 'Paniers & Plateaux' },
          items: [
            { name: 'Saucy Chips', fr: 'Frites à la Sauce', price: '7 / 9', en_d: 'Chips with cheese sauce, or with cheese & bacon sauce', fr_d: 'Frites avec sauce au fromage, ou au fromage et bacon' },
            { name: 'Nachos', fr: 'Nachos', price: 19, en_d: 'Melted cheddar & mozzarella, jalapeños, guacamole, salsa and sour cream. Add chicken or beef', fr_d: 'Cheddar et mozzarella fondus, jalapeños, guacamole, salsa et crème épaisse. Ajoutez poulet ou bœuf' },
            { name: 'Chicken Finger Basket', fr: 'Panier de Doigts de Poulet', price: 19, en_d: 'Crumbed chicken strips and chips with a honey mustard dip', fr_d: 'Doigts de poulet panés et frites, sauce miel et moutarde' },
            { name: 'Chicken Drumie Basket', fr: 'Panier de Pilons', price: 21, en_d: 'Chicken drumsticks and chips with a BBQ or prego dip', fr_d: 'Pilons de poulet et frites, sauce BBQ ou prego' },
            { name: 'Wing Basket', fr: 'Panier d’Ailes', price: 22, en_d: 'Chicken wings and chips, BBQ or peri-peri', fr_d: 'Ailes de poulet et frites, BBQ ou peri-peri' },
            { name: 'Trinchado on a Stick', fr: 'Trinchado sur Brochette', price: 28, en_d: 'Mini beef skewers topped with prego sauce, served with sliced baguette', fr_d: 'Mini brochettes de bœuf nappées de sauce prego, servies avec une baguette en tranches' },
            { name: 'Rib Basket', fr: 'Panier de Côtes', price: 35, img: 'assets/img/food/ribs.webp', en_d: 'Ribs and chips', fr_d: 'Côtes et frites' },
            { name: 'Classic Combo', fr: 'Combinaison Classique', price: 39, en_d: 'Crumbed chicken strips, mini beef kebabs, chips and a BBQ dip', fr_d: 'Bandes de poulet panées, mini brochettes de bœuf, frites et sauce BBQ' },
            { name: 'Meaty Mania', fr: 'Manie de la Viande', price: 39, img: 'assets/img/food/meaty-mania.webp', en_d: 'Chouriço, mini kebabs, mini cheese grillers and chips with BBQ and prego dips', fr_d: 'Chouriço, mini brochettes, mini saucisses au fromage et frites, sauces BBQ et prego' }
          ]
        },
        {
          title: { en: 'Rolls & Sliders', fr: 'Sandwichs & Sliders' },
          items: [
            { name: 'Steak Roll', fr: 'Sandwich au Steak', price: 17, en_d: 'Served with chips and salad', fr_d: 'Servi avec frites et salade' },
            { name: 'Prego Roll', fr: 'Sandwich Prego', price: 18, en_d: 'Served with chips and salad', fr_d: 'Servi avec frites et salade' },
            { name: 'Sliders', fr: 'Sliders', price: 21, en_d: 'With chicken or beef', fr_d: 'Au poulet ou au bœuf' }
          ]
        }
      ]
    },
    {
      id: 'sweet',
      label: { en: 'Desserts & Café', fr: 'Desserts & Café' },
      script: 'Sweet',
      cover: ['assets/img/food/sundae.webp', 'assets/img/food/oreo-shake.webp'],
      groups: [
        {
          title: { en: 'Desserts', fr: 'Desserts' },
          items: [
            { name: 'Waffles with Syrup', fr: 'Gaufres au Sirop', price: 9, en_d: 'Waffles with ice cream or cream', fr_d: 'Avec de la glace ou de la crème' },
            { name: 'Ice Cream & Bar One Sauce', fr: 'Glace & Sauce Bar One', price: 10, img: 'assets/img/food/sundae.webp', en_d: 'Vanilla ice cream with Bar One sauce', fr_d: 'Glace vanille et sauce Bar One' },
            { name: 'Malva Pudding', fr: 'Malva Pudding', price: 11, tag: { en: 'South African classic', fr: 'Classique sud-africain' }, en_d: 'Classic South African dessert served with a caramel custard', fr_d: 'Dessert sud-africain classique servi avec une crème caramel' },
            { name: 'Chocolate Mousse', fr: 'Mousse au Chocolat', price: 11, en_d: 'Chocolate mousse', fr_d: 'Mousse au chocolat' },
            { name: 'Banana Split', fr: 'Banana Split', price: 12, en_d: 'Vanilla ice cream, caramel sauce and pan-fried banana', fr_d: 'Glace vanille, sauce caramel et banane poêlée' }
          ]
        },
        {
          title: { en: 'Coffee & Tea', fr: 'Café & Thé' },
          items: [
            { name: 'Brewed Coffee', fr: 'Café Brassé', price: 4, en_d: 'Blend of the day', fr_d: 'Mélange du jour' },
            { name: 'Americano', fr: 'Americano', price: 4, en_d: 'Double shot of espresso topped up with boiling water', fr_d: 'Un double expresso allongé à l’eau bouillante' },
            { name: 'Single / Double Espresso', fr: 'Expresso Simple / Double', price: '4 / 5', en_d: 'Full-bodied espresso with thick crema', fr_d: 'Un expresso corsé à la crema épaisse' },
            { name: 'Macchiato', fr: 'Macchiato', price: 4, en_d: 'Full-bodied espresso topped with a dome of froth', fr_d: 'Un expresso corsé, garni d’un dôme de mousse de lait' },
            { name: 'Cappuccino', fr: 'Cappuccino', price: 5, en_d: 'Espresso, one third steamed milk, one third milk froth. Add whipped cream +$2', fr_d: 'Un expresso, un tiers de lait chaud, un tiers de mousse. Crème fouettée +2$' },
            { name: 'Café Latte', fr: 'Café Latte', price: 6, en_d: 'Espresso, steamed milk and froth', fr_d: 'Un expresso, du lait chaud et de la mousse de lait' },
            { name: 'Teas', fr: 'Thés', price: 4, en_d: 'Five Roses or Rooibos', fr_d: 'Thé noir Five Roses ou Rooibos' },
            { name: 'Hot Chocolate', fr: 'Chocolat Chaud', price: 6, en_d: 'Original or white', fr_d: 'Classique ou chocolat blanc' },
            { name: 'Milo / Horlicks', fr: 'Milo / Horlicks', price: 6, en_d: 'Malted and comforting', fr_d: 'Boisson maltée réconfortante' }
          ]
        },
        {
          title: { en: 'Shakes, Smoothies & Frappés', fr: 'Shakes, Smoothies & Frappés' },
          items: [
            { name: 'Milkshakes', fr: 'Milkshakes', price: 7, img: 'assets/img/food/oreo-shake.webp', en_d: 'Lime, banana, strawberry or chocolate', fr_d: 'Citron, banane, fraise ou chocolat' },
            { name: 'Fruit Smoothie', fr: 'Smoothie aux Fruits', price: 8, en_d: 'Blended with ice: mango, strawberry, passion fruit or peach', fr_d: 'Mixé avec de la glace : mangue, fraise, fruit de la passion ou pêche' },
            { name: 'Original Freezo', fr: 'Café Glacé Original', price: 8, en_d: 'Frozen coffee perfection with a luscious blend of the finest Arabica', fr_d: 'Un café classique glacé, réalisé avec les Arabicas les plus fins' },
            { name: 'Coco Mocha Nut Frappé', fr: 'Frappé Coco, Moka & Noix', price: 8, en_d: 'The finest cocoas, coffee and coconut blended to perfection', fr_d: 'Cacaos les plus fins, café et noix de coco mélangés à la perfection' },
            { name: 'Sticky Toffee Frappé', fr: 'Frappé au Caramel Collant', price: 8, en_d: 'Your original freezo blended with real sticky toffee bits', fr_d: 'Votre café glacé mélangé à de vrais morceaux de caramel collant' }
          ]
        }
      ]
    }
  ],

  /* Bar — colour = the hue the glass fills with on hover */
  cocktails: [
    { name: 'Strawberry Daiquiri', price: 12, d: 'White rum, lime and strawberry, served frozen', c: '#ff4d6d' },
    { name: 'Margarita', price: 12, d: 'Tequila, lemon, lime, sugar and triple sec', c: '#d9f27e' },
    { name: 'Piña Colada', price: 13, d: 'Cream, piña colada syrup, pineapple juice, white rum and Malibu', c: '#fff1c9' },
    { name: 'Original Mojito', price: 12, d: 'White rum, mint syrup, mint leaves, lime wedges and soda', c: '#b8f2a0' },
    { name: 'Strawberry Mojito', price: 13, d: 'Strawberry syrup, mint, white rum, lime wedges and soda', c: '#ff7aa2' },
    { name: 'Kiwi Mojito', price: 13, d: 'Kiwi, mint, white rum, lime wedges and soda', c: '#8fd14f' },
    { name: 'Call Me a Cab', price: 13, d: 'Vodka, peach schnapps, Malibu, pineapple juice and lemonade', c: '#ffc46b' },
    { name: 'Jam Jar', price: 18, d: 'Vodka, cane, pineapple juice, passion fruit purée and fresh lemon, topped with lemonade', c: '#ffb238' },
    { name: 'Caipirinha', price: 10, d: 'Cachaça, sugar and lime', c: '#e3f5b0' },
    { name: 'Strawberry Caipirinha', price: 11, d: 'Cachaça, strawberry, sugar and lime', c: '#ff5c7a' },
    { name: 'Long Island Iced Tea', price: 16, d: 'Vodka, tequila, gin and lime, topped with Coca-Cola', c: '#a8642c' },
    { name: 'Long Island Iced Tea Bull', price: 18, d: 'Vodka, tequila, gin and lime, topped with Red Bull', c: '#d79b3c' },
    { name: 'Gummy Berry Juice', price: 12, d: 'Vodka, Malibu, blue curaçao, passion fruit, grenadine and lemonade', c: '#7b5cff' },
    { name: 'Tropical Dream', price: 12, d: 'Malibu, peach schnapps, orange juice, pineapple juice and grenadine', c: '#ff9f43' },
    { name: '357 Magnum', price: 12, d: 'Light rum, vodka, amaretto and Sprite', c: '#f6e7b4' },
    { name: '57 Chevy', price: 11, d: 'Vodka, Southern Comfort and pineapple juice', c: '#ffd166' },
    { name: 'Hurricane', price: 12, d: 'Vodka, grenadine, gin, light rum and pineapple juice', c: '#ff6b6b' },
    { name: 'Afrikaaner', price: 12, d: 'Amarula, peach schnapps, vodka, milk and chocolate syrup', c: '#c89f7a' },
    { name: '100 Miles Per Hour', price: 13, d: 'Light rum, Southern Comfort, blue curaçao, whiskey, grenadine and Sprite', c: '#5b6cff' },
    { name: 'Bad Attitude', price: 16, d: 'Rum, vodka, gin, tequila, amaretto, pineapple, orange, cranberry and grenadine', c: '#e63946' },
    { name: 'Blue Dolphin', price: 14, d: 'Malibu, Captain Morgan, blue curaçao, vodka and Sprite', c: '#1fb6ff' },
    { name: 'Bomber', price: 11, d: 'Amaretto, Southern Comfort and pineapple juice', c: '#f4b860' },
    { name: 'Bronze Monkey', price: 11, d: 'Vodka, Captain Morgan and orange juice', c: '#e8913a' },
    { name: 'Down Under', price: 13, d: 'Vodka, rum, tequila, blue curaçao and soda', c: '#2ec4f1' },
    { name: 'Drunken Sailor', price: 11, d: 'Light rum, vodka, lime juice and Coca-Cola', c: '#8c4a2f' },
    { name: 'Fuzzy Comfort', price: 13, d: 'Light rum, gin, Southern Comfort, peach schnapps and orange juice', c: '#ffae5c' },
    { name: 'Hustler', price: 11, d: 'White rum, dark rum, Roses passion fruit and Roses lime', c: '#c6e86b' },
    { name: 'Miami Beach', price: 15, d: 'Vodka, tequila, rum, gin, lime and peach schnapps', c: '#ffcf8a' },
    { name: 'Over the Top', price: 12, d: 'Vodka, peach schnapps, cranberry juice and pineapple juice', c: '#ff5d8f' },
    { name: 'Phoenix', price: 11, d: 'Tequila, blue curaçao, grenadine and orange juice', c: '#ff7b39' },
    { name: 'Amaretto Sour', price: 11, d: 'Amaretto with sweet & sour mix', c: '#f2c14e' },
    { name: 'Flying Bull', price: 12, d: 'Light rum, dark rum and Red Bull', c: '#e0b44b' },
    { name: 'Raging Bull', price: 12, d: 'Vodka, tequila, lime juice and Red Bull', c: '#dcd35a' }
  ],
  bubbles: [
    { name: 'Goodnight Kiss', price: 16, d: 'Champagne, Campari and Angostura bitters', c: '#ff8fa3' },
    { name: 'Champagne Mojito', price: 16, d: 'Light rum, fresh mint and champagne', c: '#d8f5c4' },
    { name: 'Champagne Strawberry Mojito', price: 16, d: 'Light rum, strawberry syrup, mint and champagne', c: '#ffb3c1' },
    { name: 'French 75', price: 15, d: 'Gin, lemon juice and champagne', c: '#fff3b0' }
  ],
  shooters: [
    { name: 'Flaming Lamborghini', price: 26, d: 'Our signature party shooter, only for the brave', c: '#ff6a00' },
    { name: 'Jäger Bomb', price: 11, d: 'Jägermeister and Red Bull', c: '#6b3a1e' },
    { name: 'Liquid Cocaine', price: 6, d: 'Vodka, blue curaçao and lime', c: '#29b6f6' },
    { name: 'Suit Case', price: 6, d: 'Jack Daniel’s and passion fruit', c: '#f2a541' },
    { name: 'Turkish Delight', price: 6, d: 'Sambuca, Amarula, grenadine and cream', c: '#ffc2d1' },
    { name: 'Silver Bullet', price: 7, d: 'Jack Daniel’s, Southern Comfort and amaretto', c: '#e9c46a' }
  ],
  wines: [
    {
      title: 'White Blends', items: [
        { name: 'Boschendal Blanc de Blanc', price: 40, d: 'Floral nose of guava, orange zest and apple; a touch of orange peel and cinnamon' },
        { name: 'Miss Lucy', price: 50, d: 'Bursts with citrus pamplemousse flavours' }
      ]
    },
    {
      title: 'Sauvignon Blanc', items: [
        { name: 'Nederburg', price: 30, d: 'Juicy fruit with granadilla and tropical notes' },
        { name: 'Porcupine Ridge', price: 45, d: 'Pineapple, papaya and kiwi with a golden apple finish' },
        { name: 'Glen Carlou', price: 50, d: 'Melon and fig, passion fruit, gooseberry and grapefruit' }
      ]
    },
    {
      title: 'Chardonnay', items: [
        { name: 'Haute Cabrière', price: 50, d: 'Elegant and rich, with fruit and subtle spice' },
        { name: 'Glen Carlou', price: 65, d: 'Rich, complex layers of fruit in a classic French style' }
      ]
    },
    {
      title: 'Rosé', items: [
        { name: 'Nederburg Rosé', price: 40, d: 'Bright strawberry with candy floss aromas; fruity and refreshing' }
      ]
    },
    {
      title: 'Merlot', items: [
        { name: 'Nederburg', price: 35, d: 'Strawberry and blackcurrant with subtle vanilla oak' },
        { name: 'Porcupine Ridge', price: 45, d: 'Aromas of plum and mulberry' },
        { name: 'The Game Reserve', price: 55, d: 'Cassis, black plum, violets and a minty lift; spice and cedar' }
      ]
    },
    {
      title: 'Red Blends', items: [
        { name: 'Zevenwacht Tin Mine Red', price: 50, d: 'Violets, dried spice and black fruit with mocha and dark chocolate' },
        { name: 'Kanonkop Kadette', price: 50, d: 'Blackcurrant, mocha and raspberry with dark chocolate' },
        { name: 'Beyerskloof Synergy', price: 55, d: 'Red fruit and cherries over sweet cedar oak' },
        { name: 'Warwick Three Cape Ladies', price: 85, d: 'Ripe plum and brambleberry' },
        { name: 'Meerlust Rubicon', price: 135, d: 'Tobacco leaf and cigar box with firm tannins' }
      ]
    },
    {
      title: 'Cabernet Sauvignon', items: [
        { name: 'Brampton', price: 40, d: 'Dark chocolate, blackcurrant and spearmint' },
        { name: 'Porcupine Ridge', price: 45, d: 'Blackcurrant with delicate vanilla oak' },
        { name: 'Warwick', price: 55, d: 'Dark chocolate, brambleberry, clove and thyme' },
        { name: 'Waterford', price: 110, d: 'Freshly turned earth and nuts' }
      ]
    },
    {
      title: 'Champagne', items: [
        { name: 'Moët & Chandon', price: 140 },
        { name: 'Moët & Chandon Ice', price: 220 },
        { name: 'Moët & Chandon Rosé', price: 280 }
      ]
    }
  ],
  spirits: [
    { title: 'Blended Scotch', items: [['J&B', 4], ['Johnnie Walker Red', 4], ['Jack Daniel’s', 5], ['Famous Grouse', 5], ['Grant’s', 5], ['Chivas Regal 12', 6], ['Ballantine’s', 6], ['Dimple 15', 7], ['Johnnie Walker Black', 7], ['Johnnie Walker Double Black', 8], ['Johnnie Walker Gold', 11], ['Johnnie Walker Platinum', 13], ['Johnnie Walker Blue', 'SQ']] },
    { title: 'Single Malt', items: [['Glenfiddich 12', 11], ['Glenlivet 12', 11], ['Glenlivet 15', 15], ['Glenfiddich 15', 16]] },
    { title: 'Irish Whiskey', items: [['Jameson', 6], ['Jameson 12', 9]] },
    { title: 'Tequila', items: [['Olmeca', 5], ['Jose Cuervo Gold', 5], ['Don Julio Reposado', 9], ['Patrón Añejo', 12], ['Patrón Reposado', 14]] },
    { title: 'Vodka', items: [['Smirnoff', 4.5], ['Absolut', 6], ['Skyy', 6], ['Belvedere', 10], ['Cîroc', 10]] },
    { title: 'Cognac', items: [['Courvoisier VS', 8], ['Hennessy VS', 10], ['Courvoisier VSOP', 10], ['Rémy Martin VSOP', 13], ['Hennessy VSOP', 14], ['Rémy Martin XO', 'SQ'], ['Hennessy XO', 'SQ']] },
    { title: 'Brandy', items: [['Klipdrift', 4], ['Richelieu', 4.5]] }
  ],
  beers: [
    { title: 'Local', items: [['Simba Small', 4.5], ['Simba Big', 5.5], ['Tembo', 5.5], ['Castel Big', 6], ['Guinness', 5], ['Beaufort', 5], ['Skol', 5], ['33 Export', 6]] },
    { title: 'Imported', items: [['Amstel', 5], ['Heineken', 6], ['Savanna Light', 6], ['Savanna Dry', 6], ['Corona', 7], ['Leffe Blonde', 10], ['Leffe Brune', 10]] }
  ]
};
