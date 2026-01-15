# Kế Hoạch Xây Dựng Portfolio Website

## Tổng Quan Dự Án

Xây dựng trang portfolio cá nhân với các tính năng:
- **Trang public (/)**: Hiển thị portfolio với nội dung động
- **Trang settings (/settings)**: Cấu hình nội dung, yêu cầu đăng nhập
- **Authentication**: Login/Register
- **CV Parser**: Upload CV và dùng AI để parse thông tin
- **LLM Configuration**: Cấu hình nhiều providers (OpenAI, Anthropic, Google, Groq)
- **Layout Templates**: Chọn layout/template cho portfolio

## Tech Stack

| Công nghệ | Mô tả |
|-----------|-------|
| **Framework** | Next.js 15 (App Router) |
| **Database** | Supabase (PostgreSQL) + Prisma ORM |
| **Authentication** | NextAuth.js v5 với Supabase |
| **UI** | Tailwind CSS + shadcn/ui |
| **AI/LLM** | Vercel AI SDK (hỗ trợ multi-provider) |
| **File Upload** | react-dropzone + Supabase Storage |
| **PDF Parsing** | pdf-parse |

## Cấu Trúc Thư Mục

```
portfolio/
├── prisma/
│   └── schema.prisma          # Database schema
├── src/
│   ├── app/
│   │   ├── (public)/
│   │   │   └── page.tsx       # Trang portfolio public
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── register/
│   │   │       └── page.tsx
│   │   ├── settings/
│   │   │   ├── page.tsx       # Trang cài đặt chính
│   │   │   ├── profile/
│   │   │   │   └── page.tsx   # Cài đặt thông tin cá nhân
│   │   │   ├── cv-parser/
│   │   │   │   └── page.tsx   # Upload & parse CV
│   │   │   ├── llm-config/
│   │   │   │   └── page.tsx   # Cấu hình LLM providers
│   │   │   └── templates/
│   │   │       └── page.tsx   # Chọn layout/template
│   │   ├── api/
│   │   │   ├── auth/[...nextauth]/
│   │   │   │   └── route.ts
│   │   │   ├── cv/
│   │   │   │   ├── upload/
│   │   │   │   │   └── route.ts
│   │   │   │   └── parse/
│   │   │   │       └── route.ts
│   │   │   ├── llm/
│   │   │   │   └── route.ts
│   │   │   └── portfolio/
│   │   │       └── route.ts
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/                # shadcn/ui components
│   │   ├── auth/
│   │   │   ├── login-form.tsx
│   │   │   └── register-form.tsx
│   │   ├── settings/
│   │   │   ├── sidebar.tsx
│   │   │   ├── profile-form.tsx
│   │   │   ├── cv-uploader.tsx
│   │   │   ├── llm-config-form.tsx
│   │   │   └── template-selector.tsx
│   │   ├── portfolio/
│   │   │   ├── templates/
│   │   │   │   ├── minimal.tsx
│   │   │   │   ├── modern.tsx
│   │   │   │   ├── creative.tsx
│   │   │   │   └── developer.tsx
│   │   │   └── sections/
│   │   │       ├── hero.tsx
│   │   │       ├── about.tsx
│   │   │       ├── skills.tsx
│   │   │       ├── experience.tsx
│   │   │       ├── projects.tsx
│   │   │       └── contact.tsx
│   │   └── shared/
│   │       ├── header.tsx
│   │       └── footer.tsx
│   ├── lib/
│   │   ├── prisma.ts          # Prisma client
│   │   ├── auth.ts            # NextAuth config
│   │   ├── llm/
│   │   │   ├── providers.ts   # LLM provider configs
│   │   │   ├── openai.ts
│   │   │   ├── anthropic.ts
│   │   │   ├── google.ts
│   │   │   └── groq.ts
│   │   ├── cv-parser.ts       # CV parsing logic
│   │   └── utils.ts
│   ├── hooks/
│   │   ├── use-portfolio.ts
│   │   └── use-llm.ts
│   └── types/
│       ├── portfolio.ts
│       └── llm.ts
├── .env.local
├── package.json
├── tailwind.config.ts
└── next.config.ts
```

## Database Schema (Prisma)

```prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  password      String
  name          String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  portfolio     Portfolio?
  llmConfigs    LLMConfig[]
}

model Portfolio {
  id            String    @id @default(cuid())
  userId        String    @unique
  user          User      @relation(fields: [userId], references: [id])

  // Thông tin cá nhân
  fullName      String?
  title         String?   // VD: "Senior Developer"
  bio           String?
  avatar        String?
  email         String?
  phone         String?
  location      String?

  // Social links
  github        String?
  linkedin      String?
  twitter       String?
  website       String?

  // Layout & Theme
  template      String    @default("minimal") // minimal, modern, creative, developer
  primaryColor  String    @default("#3b82f6")

  // Parsed CV data (JSON)
  skills        Json?
  experience    Json?
  education     Json?
  projects      Json?
  certifications Json?

  isPublished   Boolean   @default(false)

  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model LLMConfig {
  id            String    @id @default(cuid())
  userId        String
  user          User      @relation(fields: [userId], references: [id])

  provider      String    // openai, anthropic, google, groq
  apiKey        String    // encrypted
  model         String    // gpt-4, claude-3-sonnet, etc.
  isDefault     Boolean   @default(false)

  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  @@unique([userId, provider])
}
```

## Các Bước Thực Hiện

### Phase 1: Setup & Foundation
1. **Khởi tạo Next.js 15 project**
   - `npx create-next-app@latest . --typescript --tailwind --eslint --app`

2. **Cài đặt dependencies**
   ```bash
   npm install prisma @prisma/client next-auth@beta
   npm install @supabase/supabase-js
   npm install ai @ai-sdk/openai @ai-sdk/anthropic @ai-sdk/google
   npm install react-dropzone pdf-parse bcryptjs
   npm install zod react-hook-form @hookform/resolvers
   npm install lucide-react
   npx shadcn@latest init
   ```

3. **Setup Prisma với Supabase**
   - Cấu hình connection string
   - Tạo schema và migrate

### Phase 2: Authentication
4. **Implement NextAuth.js v5**
   - Credentials provider (email/password)
   - Session management
   - Protected routes middleware

5. **Tạo Login/Register pages**
   - Form validation với Zod
   - UI với shadcn/ui

### Phase 3: Settings Dashboard
6. **Tạo layout settings với sidebar**
   - Navigation giữa các tabs
   - Protected route

7. **Profile Settings**
   - Form chỉnh sửa thông tin cá nhân
   - Upload avatar

8. **CV Parser**
   - Upload CV (PDF/DOCX)
   - Gọi AI để parse
   - Preview và chỉnh sửa kết quả

9. **LLM Configuration**
   - Form thêm/sửa API keys cho các providers
   - Test connection
   - Chọn default provider

10. **Template Selector**
    - Preview các templates
    - Chọn và customize màu sắc

### Phase 4: Portfolio Templates
11. **Tạo 4 templates**
    - **Minimal**: Clean, đơn giản, focus vào nội dung
    - **Modern**: Gradient, animations, modern design
    - **Creative**: Bold colors, unique layouts
    - **Developer**: Terminal-inspired, code-focused

12. **Tạo các sections component**
    - Hero, About, Skills, Experience, Projects, Contact

### Phase 5: Public Portfolio
13. **Render portfolio page**
    - Fetch data từ database
    - Render template đã chọn
    - SEO optimization

### Phase 6: Testing & Polish
14. **Testing**
    - Chạy local và test các tính năng
    - Fix bugs

15. **Optimization**
    - Image optimization
    - Performance tuning

## Templates Preview

### 1. Minimal Template
- Background trắng, typography sạch
- Layout một cột
- Subtle hover effects

### 2. Modern Template
- Gradient backgrounds
- Card-based sections
- Smooth scroll animations
- Glassmorphism effects

### 3. Creative Template
- Bold color blocks
- Asymmetric layouts
- Interactive elements
- Unique typography

### 4. Developer Template
- Dark theme mặc định
- Terminal-style header
- Code syntax highlighting
- Monospace fonts

## API Endpoints

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| POST | `/api/auth/register` | Đăng ký tài khoản |
| POST | `/api/auth/[...nextauth]` | NextAuth handlers |
| GET/PUT | `/api/portfolio` | Lấy/cập nhật portfolio |
| POST | `/api/cv/upload` | Upload CV file |
| POST | `/api/cv/parse` | Parse CV với AI |
| GET/POST/DELETE | `/api/llm` | Quản lý LLM configs |

## Biến Môi Trường (.env.local)

```env
# Database
DATABASE_URL="postgresql://..."

# Supabase
NEXT_PUBLIC_SUPABASE_URL="..."
NEXT_PUBLIC_SUPABASE_ANON_KEY="..."
SUPABASE_SERVICE_ROLE_KEY="..."

# NextAuth
NEXTAUTH_SECRET="..."
NEXTAUTH_URL="http://localhost:3000"

# LLM Keys (optional - user sẽ tự cấu hình)
# OPENAI_API_KEY="..."
# ANTHROPIC_API_KEY="..."
# GOOGLE_AI_API_KEY="..."
# GROQ_API_KEY="..."
```

## Verification / Testing

1. **Authentication Flow**
   - Đăng ký tài khoản mới
   - Đăng nhập/đăng xuất
   - Truy cập /settings khi chưa login → redirect về login

2. **CV Parser**
   - Upload file PDF
   - AI parse thành công
   - Data hiển thị đúng trong form

3. **LLM Configuration**
   - Thêm API key cho mỗi provider
   - Test connection hoạt động
   - Chọn default provider

4. **Portfolio**
   - Chọn template và xem preview
   - Publish portfolio
   - Truy cập trang chủ hiển thị đúng template

## Ước Tính Files Cần Tạo

- **~50+ files** bao gồm:
  - 15+ page components
  - 20+ UI components
  - 10+ API routes
  - 5+ lib utilities
  - Config files
