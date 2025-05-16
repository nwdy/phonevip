# Phone VIP

## About The Project
Phone VIP is an e-commerce website focused on selling smartphones.

### Key Features
- **User Authentication**: Users can register, log in, and manage their profiles.
- **Product Management**: Admins can add, update, and delete products.
- **Shopping Cart**: Users can add products to their cart and proceed to checkout.
- **Order Management**: Users can view their order history and track their orders.
- **Payment Integration**: Integrated with VNPAY for secure online payments.
- **Review System**: Users can leave reviews and ratings for products.
- **Search Functionality**: Users can search for products using keywords.
- **Admin Dashboard**: Admins have access to a dashboard for managing users, products, and orders.
- **Chatbot**: Integrated with Voiceflow for customer support.

<!-- ### Screenshots -->


### Built With
![Java Spring](https://img.shields.io/badge/Spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![ElasticSearch](https://img.shields.io/badge/ElasticSearch-005571?style=for-the-badge&logo=elasticsearch&logoColor=white)
![Docker](https://img.shields.io/badge/docker-257bd6?style=for-the-badge&logo=docker&logoColor=white)

## Getting Started

### Prerequisites

Ensure that you installed Docker on your computer. If not, you can download it [here](https://www.docker.com).

### Installation

To run this project, follow these steps:

1. Clone the repo
   ```sh
   git clone https://github.com/nwdy/phonevip.git
   ```
2. Navigate to the project directory:
   ```
   cd phonevip
   ```
3. Create a `secrets.properties` file in the `backend/src/main/resources` directory with the same content as the `secrets.properties.example` file and update the values accordingly:
   ```properties
   POSTGRES_USERNAME=postgres
   POSTGRES_PASSWORD=12345678

   ELASTICSEARCH_URIS=http://localhost:9200
   ELASTICSEARCH_USERNAME=elastic
   ELASTICSEARCH_PASSWORD=123456

   vnpay.vnp_TmnCode=your_tmn_code # VNPAY merchant code
   vnpay.secretKey=your_secret_key # VNPAY secret key

   private_origin=your_domain_name # Your domain name (must be https)
   ```
4. Start the app
   ```sh
   docker compose up --build -d
   ```


## Project Structure
```bash
phonevip
├── README.md
├── compose.yaml
├── frontend
│   ├── Dockerfile
│   ├── ...
└── backend
    ├── Dockerfile
    └── ...
```

## Contributors
- [@nwdy](https://github.com/nwdy) - Backend Developer
- [@DungUETK68](https://github.com/DungUETK68) - Main Frontend Developer
- [@VanDaiMaKet](https://github.com/VanDaiMaKet) - UI Designer & Frontend Developer

## License
This project is distributed under the [MIT License](LICENSE).

## Contact
Please open an issue if you have any questions or suggestions.
