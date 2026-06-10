# Next Node Event-Driven Starter

Starter kit untuk membangun aplikasi **Next.js + Node.js** dengan pendekatan **event-driven architecture**. Repo ini sudah menyiapkan pondasi frontend, API gateway, worker consumer, serta service pendukung seperti PostgreSQL, Redis, dan RabbitMQ.

Project ini sengaja dibuat **tanpa business logic khusus**, jadi bisa langsung dipakai sebagai base project untuk dashboard internal, sistem transaksi, automation flow, atau aplikasi microservices lain yang butuh komunikasi sinkron dan asinkron.

## Highlights

- Frontend modern dengan **Next.js 16** dan **React 19**
- API layer berbasis **Express.js**
- Worker service untuk konsumsi event dari **RabbitMQ**
- **Redis lock wrapper** untuk bantu menangani race condition
- **PostgreSQL** untuk persistence layer
- Sudah disiapkan untuk workflow lokal via **Docker Compose**

## Architecture Overview

```text
Frontend App (Next.js)
        |
        v
API Gateway (Express)
        |
        +--> PostgreSQL
        +--> Redis
        |
        +--> Publish / Integrate Event Flow
                      |
                      v
               RabbitMQ Queue
                      |
                      v
              Worker Event Consumer
```

## Services

| Service | Port | Keterangan |
| --- | --- | --- |
| `frontend-app` | `3000` | UI utama berbasis Next.js |
| `api-gateway` | `3001` | REST API / entry point backend |
| `postgres` | `5432` | Database utama |
| `redis` | `6379` | Cache dan distributed lock |
| `rabbitmq` | `5672` | Message broker |
| `rabbitmq-management` | `15672` | Dashboard RabbitMQ |

## Tech Stack

- Next.js 16
- React 19
- Node.js
- Express.js
- PostgreSQL
- Redis
- RabbitMQ
- Docker Compose

## Quick Start

### 1. Clone dan install dependency

```bash
npm install
```

### 2. Jalankan semua service dengan Docker

```bash
docker compose up --build
```

### 3. Akses aplikasi

- Frontend: `http://localhost:3000`
- API Gateway: `http://localhost:3001`
- RabbitMQ Dashboard: `http://localhost:15672`

Login RabbitMQ default:

```text
username: guest
password: guest
```

## Menjalankan Secara Lokal Tanpa Docker

Jalankan tiap workspace secara terpisah:

```bash
npm run dev --workspace frontend-app
npm run dev --workspace api-gateway
npm run dev --workspace worker-event
```

Pastikan dependency eksternal seperti PostgreSQL, Redis, dan RabbitMQ sudah aktif di environment lokal.

## API Endpoints

Endpoint dasar yang saat ini sudah tersedia:

```http
GET  /health
GET  /api/items
POST /api/items
```

Contoh request:

```bash
curl -X POST http://localhost:3001/api/items \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"generic-item\",\"metadata\":{\"source\":\"readme-example\"}}"
```

Draft OpenAPI tersedia di:

```text
docs/api-docs.yaml
```

## Struktur Project

```text
.
├── frontend-app/         # Next.js frontend
├── services/
│   ├── api-gateway/      # Express API gateway
│   └── worker-event/     # RabbitMQ worker consumer
├── docs/                 # Draft dokumentasi API
├── infrastructure/       # Infrastruktur tambahan
└── docker-compose.yml    # Orkestrasi local development
```

## Cocok Untuk

- Boilerplate tugas akhir atau project kampus
- Starter microservices internal
- Proof of concept event-driven system
- Base project yang ingin cepat dikembangkan tanpa setup dari nol

## Catatan

Ini adalah **starter repository**, bukan aplikasi final. Tujuannya adalah memberi fondasi yang bersih, generik, dan siap dikembangkan lebih lanjut sesuai domain bisnis Anda.
