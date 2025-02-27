# Phone VIP

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
3. Start the app
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
