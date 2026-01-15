# Portfolio Builder

Xây dựng portfolio cá nhân chuyên nghiệp với AI-powered CV parsing.

## Tính năng

- **4 Templates đẹp mắt**: Minimal, Modern, Creative, Developer
- **AI CV Parsing**: Upload CV và để AI tự động trích xuất thông tin
- **Multi-LLM Support**: OpenAI, Anthropic Claude, Google Gemini, Groq
- **Authentication**: Đăng ký/đăng nhập an toàn
- **Settings Dashboard**: Quản lý portfolio dễ dàng

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database**: Supabase (PostgreSQL) + Prisma ORM
- **Authentication**: NextAuth.js v5
- **UI**: Tailwind CSS + shadcn/ui
- **AI**: Vercel AI SDK

## Cài đặt

### 1. Clone repository

```bash
git clone <your-repo-url>
cd portfolio
```

### 2. Cài đặt dependencies

```bash
npm install
```

### 3. Cấu hình environment

Copy file `.env.example` thành `.env.local` và điền các giá trị:

```bash
cp .env.example .env.local
```

#### Cấu hình Supabase:
1. Tạo project mới tại [Supabase](https://supabase.com)
2. Vào **Project Settings > Database** để lấy connection strings
3. Vào **Project Settings > API** để lấy URL và keys

#### Cấu hình NextAuth:
```bash
# Generate secret
openssl rand -base64 32
```

### 4. Setup Database

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push
```

### 5. Chạy development server

```bash
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) trong browser.

## Cấu trúc thư mục

```
src/
├── app/
│   ├── (auth)/           # Login, Register pages
│   ├── settings/         # Settings dashboard
│   │   ├── profile/      # Profile settings
│   │   ├── cv-parser/    # CV upload & parse
│   │   ├── llm-config/   # LLM configuration
│   │   └── templates/    # Template selector
│   ├── api/              # API routes
│   └── page.tsx          # Public portfolio
├── components/
│   ├── ui/               # shadcn/ui components
│   ├── auth/             # Auth components
│   ├── settings/         # Settings components
│   └── portfolio/        # Portfolio templates
├── lib/                  # Utilities & configs
└── types/                # TypeScript types
```

## Hướng dẫn sử dụng

### 1. Đăng ký tài khoản
Truy cập `/register` để tạo tài khoản mới.

### 2. Cấu hình LLM Provider
Vào **Settings > LLM Config** để thêm API key cho một trong các providers:
- OpenAI (GPT-4, GPT-3.5)
- Anthropic (Claude)
- Google (Gemini)
- Groq (Llama, Mixtral)

### 3. Upload CV
Vào **Settings > CV Parser** để:
- Upload file PDF hoặc paste text
- AI sẽ tự động parse thông tin
- Review và apply vào portfolio

### 4. Chỉnh sửa thông tin
Vào **Settings > Profile** để chỉnh sửa thông tin cá nhân và social links.

### 5. Chọn Template
Vào **Settings > Templates** để:
- Chọn template (Minimal, Modern, Creative, Developer)
- Customize màu sắc
- Publish portfolio

### 6. Xem Portfolio
Truy cập trang chủ `/` để xem portfolio của bạn.

## Templates

### Minimal
- Clean và đơn giản
- Focus vào nội dung
- Background trắng

### Modern
- Gradient backgrounds
- Glassmorphism effects
- Dark theme

### Creative
- Bold colors
- Unique layouts
- Animated elements

### Developer
- Terminal-inspired
- Monospace fonts
- Code-focused design

## Scripts

```bash
npm run dev       # Chạy development server
npm run build     # Build production
npm run start     # Start production server
npm run lint      # Lint code
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | Supabase pooler connection string |
| `DIRECT_URL` | Supabase direct connection string |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `NEXTAUTH_SECRET` | NextAuth.js secret |
| `NEXTAUTH_URL` | App URL (http://localhost:3000) |

## License

MIT
