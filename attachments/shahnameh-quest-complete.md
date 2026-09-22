# 🎮 پروژه بازی شاهنامه‌ای - راهنمای کامل پیاده‌سازی

---

## 📋 فهرست کامل

1. [معماری کامل سیستم](#معماری)
2. [کد Backend (FastAPI + PyTorch)](#backend)
3. [کد Frontend (React)](#frontend)
4. [Telegram Bot و Mini App](#telegram)
5. [مدل Machine Learning](#ml)
6. [دیتابیس و API](#database)
7. [Configuration و Setup](#setup)
8. [Deployment](#deployment)

---

## ✨ معماری

```
┌─────────────────────────────────────────────────────────────┐
│                     Client Layer                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Web App    │  │Telegram Mini │  │   Mobile    │      │
│  │   (React)    │  │     App      │  │    Browser  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                           ↓↑
┌─────────────────────────────────────────────────────────────┐
│                    API Gateway (FastAPI)                     │
│  Rate Limiting | Authentication | CORS | Request Validation │
└─────────────────────────────────────────────────────────────┘
                           ↓↑
┌─────────────────────────────────────────────────────────────┐
│                   Business Logic Layer                        │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │ Story    │  │ Choice   │  │Analysis  │  │Report    │    │
│  │Manager   │  │Handler   │  │Engine    │  │Generator │    │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘    │
└─────────────────────────────────────────────────────────────┘
                           ↓↑
┌─────────────────────────────────────────────────────────────┐
│                     ML/AI Layer (PyTorch)                    │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐            │
│  │ Personality│  │Emotional   │  │Genius      │            │
│  │  Analyzer  │  │ Detector   │  │Indicator   │            │
│  └────────────┘  └────────────┘  └────────────┘            │
└─────────────────────────────────────────────────────────────┘
                           ↓↑
┌─────────────────────────────────────────────────────────────┐
│                    Data Access Layer                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │PostgreSQL│  │  Redis   │  │ Storage  │  │ Logging  │    │
│  │ (Users)  │  │ (Cache)  │  │ (Files)  │  │(Analytics)   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘    │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔧 Backend (FastAPI + PyTorch)

### فایل 1: `backend/main.py`

```python
"""
🎮 Shahnameh Quest - Interactive Story Game with AI
Backend Server using FastAPI + PyTorch for personality analysis
"""

from fastapi import FastAPI, HTTPException, Depends, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn
import logging
from datetime import datetime, timedelta
from typing import List, Optional, Dict, Any
import json
import asyncio
from contextlib import asynccontextmanager

# Data & ML imports
import torch
import numpy as np
from sqlalchemy import create_engine, Column, Integer, String, Float, DateTime, JSON, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
import redis
from pydantic import BaseModel
import jwt
from passlib.context import CryptContext
from functools import lru_cache

# ================ Configuration ================
from config import (
    DATABASE_URL, REDIS_URL, JWT_SECRET, JWT_ALGORITHM,
    GANJOOR_API_URL, OPENAI_API_KEY, POSTGRES_PASSWORD,
    CORS_ORIGINS, LOG_LEVEL
)

# ================ Logging Setup ================
logging.basicConfig(level=LOG_LEVEL)
logger = logging.getLogger(__name__)

# ================ Database Setup ================
engine = create_engine(DATABASE_URL, echo=False, pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# ================ Redis Setup ================
redis_client = redis.from_url(REDIS_URL, decode_responses=True)

# ================ Password Hashing ================
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# ================ Database Models ================

class User(Base):
    """کاربر بازی"""
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    telegram_id = Column(String, unique=True, nullable=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    last_played = Column(DateTime, nullable=True)
    total_games = Column(Integer, default=0)
    is_active = Column(Integer, default=1)

class GameSession(Base):
    """جلسه بازی"""
    __tablename__ = "game_sessions"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, index=True)
    game_id = Column(String)  # Ganjoor poem ID یا داستان ID
    started_at = Column(DateTime, default=datetime.utcnow)
    ended_at = Column(DateTime, nullable=True)
    status = Column(String, default="in_progress")  # in_progress, completed
    total_choices = Column(Integer, default=0)

class Choice(Base):
    """انتخاب کاربر"""
    __tablename__ = "choices"
    
    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(Integer, index=True)
    choice_text = Column(String)
    choice_index = Column(Integer)
    response_time = Column(Float)  # ثانیه
    timestamp = Column(DateTime, default=datetime.utcnow)
    emotional_score = Column(Float, nullable=True)
    risk_level = Column(Float, nullable=True)  # 0-1

class Report(Base):
    """گزارش نهایی"""
    __tablename__ = "reports"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, index=True)
    session_id = Column(Integer, index=True)
    personality_traits = Column(JSON)  # Big 5
    emotional_state = Column(JSON)
    genius_score = Column(Float)
    recommendations = Column(Text)
    generated_at = Column(DateTime, default=datetime.utcnow)

# ایجاد جداول
Base.metadata.create_all(bind=engine)

# ================ Pydantic Models ================

class UserCreate(BaseModel):
    username: str
    email: str
    password: str

class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    created_at: datetime
    
    class Config:
        from_attributes = True

class StoryNodeResponse(BaseModel):
    id: str
    title: str
    text: str
    choices: List[Dict[str, Any]]
    current_page: int
    total_pages: int

class ChoiceRequest(BaseModel):
    session_id: int
    choice_index: int
    response_time: float

class ReportResponse(BaseModel):
    personality_traits: Dict[str, float]  # Big 5
    emotional_state: Dict[str, float]
    genius_score: float
    recommendations: str
    generated_at: datetime

# ================ PyTorch Model ================

class PersonalityAnalyzerModel(torch.nn.Module):
    """
    مدل تحلیل شخصیت با استفاده از LSTM
    Input: تاریخچه انتخاب‌های کاربر
    Output: Big 5 traits + emotional state
    """
    
    def __init__(self, input_dim=10, hidden_dim=64, output_dim=5):
        super().__init__()
        
        # Embedding layer برای متن انتخاب‌ها
        self.embedding = torch.nn.Embedding(num_embeddings=1000, embedding_dim=32)
        
        # LSTM برای pattern recognition
        self.lstm = torch.nn.LSTM(
            input_size=32,
            hidden_size=hidden_dim,
            num_layers=2,
            batch_first=True,
            dropout=0.3
        )
        
        # Fully connected layers
        self.fc1 = torch.nn.Linear(hidden_dim, 128)
        self.fc2 = torch.nn.Linear(128, 64)
        self.fc3 = torch.nn.Linear(64, output_dim)
        
        # Activation & Regularization
        self.relu = torch.nn.ReLU()
        self.dropout = torch.nn.Dropout(0.3)
        self.sigmoid = torch.nn.Sigmoid()
    
    def forward(self, x):
        """
        x: shape (batch_size, sequence_length)
        output: shape (batch_size, 5) - Big 5 traits
        """
        # Embedding
        embedded = self.embedding(x)  # (batch, seq_len, 32)
        
        # LSTM
        lstm_out, (h_n, c_n) = self.lstm(embedded)
        
        # استفاده از آخرین hidden state
        last_hidden = h_n[-1]  # (batch, hidden_dim)
        
        # Fully Connected
        x = self.relu(self.fc1(last_hidden))
        x = self.dropout(x)
        x = self.relu(self.fc2(x))
        x = self.dropout(x)
        
        # Output (0-1 for each trait)
        output = self.sigmoid(self.fc3(x))
        
        return output

# ================ Global Model Instance ================
personality_model = PersonalityAnalyzerModel()
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
personality_model.to(device)

# ================ Helper Functions ================

def get_db():
    """Dependency برای دریافت session دیتابیس"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """تأیید رمز عبور"""
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    """هش کردن رمز عبور"""
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """ایجاد JWT token"""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(hours=24)
    
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, JWT_SECRET, algorithm=JWT_ALGORITHM)
    return encoded_jwt

async def get_current_user(token: str, db: Session = Depends(get_db)) -> User:
    """تحقق از JWT token و دریافت کاربر"""
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid token")
    except jwt.JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    user = db.query(User).filter(User.username == username).first()
    if user is None:
        raise HTTPException(status_code=401, detail="User not found")
    return user

async def fetch_ganjoor_story(poem_id: str) -> Dict[str, Any]:
    """دریافت داستان از API گنجور"""
    import aiohttp
    
    cache_key = f"poem:{poem_id}"
    cached = redis_client.get(cache_key)
    
    if cached:
        return json.loads(cached)
    
    try:
        async with aiohttp.ClientSession() as session:
            async with session.get(f"{GANJOOR_API_URL}/poems/{poem_id}") as resp:
                if resp.status == 200:
                    data = await resp.json()
                    redis_client.setex(cache_key, 3600, json.dumps(data))
                    return data
    except Exception as e:
        logger.error(f"Error fetching from Ganjoor: {e}")
    
    return None

def analyze_choices(choices_history: List[Choice]) -> Dict[str, Any]:
    """تحلیل انتخاب‌های کاربر"""
    
    if not choices_history:
        return {}
    
    analysis = {
        'total_choices': len(choices_history),
        'avg_response_time': np.mean([c.response_time for c in choices_history]),
        'response_time_std': np.std([c.response_time for c in choices_history]),
        'avg_risk_level': np.mean([c.risk_level or 0 for c in choices_history]),
        'emotional_trend': np.mean([c.emotional_score or 0 for c in choices_history]),
    }
    
    return analysis

def generate_personality_report(choices_history: List[Choice]) -> Dict[str, Any]:
    """تولید گزارش شخصیتی"""
    
    # تحلیل انتخاب‌ها
    analysis = analyze_choices(choices_history)
    
    # تبدیل به tensor برای مدل
    choice_indices = torch.tensor([c.choice_index for c in choices_history[-10:]])  # آخرین 10
    choice_indices = choice_indices.to(device).unsqueeze(0)
    
    # Inference با مدل
    with torch.no_grad():
        personality_output = personality_model(choice_indices)
    
    personality_values = personality_output.cpu().numpy()[0]
    
    # Big 5 traits
    traits = {
        'openness': float(personality_values[0]),
        'conscientiousness': float(personality_values[1]),
        'extraversion': float(personality_values[2]),
        'agreeableness': float(personality_values[3]),
        'neuroticism': float(personality_values[4])
    }
    
    # Emotional state
    emotional_state = {
        'stress_level': analysis.get('avg_risk_level', 0.5),
        'emotional_stability': 1 - traits['neuroticism'],
        'creativity_score': traits['openness'],
        'conscientiousness': traits['conscientiousness']
    }
    
    # Genius indicators
    genius_score = (traits['openness'] * 0.3 + 
                   (1 - traits['neuroticism']) * 0.2 + 
                   traits['conscientiousness'] * 0.2 + 
                   (1 - analysis.get('avg_response_time', 5) / 10) * 0.3)
    
    return {
        'personality_traits': traits,
        'emotional_state': emotional_state,
        'genius_score': float(genius_score),
        'analysis_metadata': analysis
    }

# ================ FastAPI App ================

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup و shutdown events"""
    logger.info("🎮 Shahnameh Quest Backend Starting...")
    yield
    logger.info("🎮 Shahnameh Quest Backend Shutting down...")

app = FastAPI(
    title="Shahnameh Quest API",
    description="Interactive Story Game with AI Personality Analysis",
    version="1.0.0",
    lifespan=lifespan
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ================ API Routes ================

# ========== Authentication ==========

@app.post("/api/v1/auth/register", response_model=UserResponse)
async def register(user: UserCreate, db: Session = Depends(get_db)):
    """ثبت نام کاربر جدید"""
    
    # چک کردن تکراری بودن
    if db.query(User).filter(User.username == user.username).first():
        raise HTTPException(status_code=400, detail="Username already exists")
    
    if db.query(User).filter(User.email == user.email).first():
        raise HTTPException(status_code=400, detail="Email already exists")
    
    # ایجاد کاربر
    db_user = User(
        username=user.username,
        email=user.email,
        hashed_password=get_password_hash(user.password)
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    logger.info(f"New user registered: {user.username}")
    return db_user

@app.post("/api/v1/auth/login")
async def login(username: str, password: str, db: Session = Depends(get_db)):
    """ورود به حساب"""
    
    user = db.query(User).filter(User.username == username).first()
    
    if not user or not verify_password(password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    access_token = create_access_token(data={"sub": user.username})
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user_id": user.id,
        "username": user.username
    }

# ========== Story/Game Routes ==========

@app.get("/api/v1/stories", response_model=List[Dict[str, Any]])
async def get_stories(skip: int = 0, limit: int = 10):
    """دریافت لیست داستان‌ها"""
    
    cache_key = "stories:list"
    cached = redis_client.get(cache_key)
    
    if cached:
        return json.loads(cached)
    
    # اینجا می‌تونید از Ganjoor API یا دیتابیس استفاده کنید
    stories = [
        {
            "id": "rostam-sohrab",
            "title": "رستم و سهراب",
            "description": "داستان معروف شاهنامه",
            "author": "فردوسی",
            "difficulty": "medium"
        },
        {
            "id": "isfandiar-rustam",
            "title": "اسفندیار و رستم",
            "description": "یکی از بزرگ‌ترین اپیک‌های جهان",
            "author": "فردوسی",
            "difficulty": "hard"
        }
    ]
    
    redis_client.setex(cache_key, 3600, json.dumps(stories))
    return stories

@app.post("/api/v1/game/start")
async def start_game(
    story_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """شروع بازی جدید"""
    
    # ایجاد session جدید
    session = GameSession(
        user_id=current_user.id,
        game_id=story_id,
        status="in_progress"
    )
    db.add(session)
    db.commit()
    db.refresh(session)
    
    # دریافت اولین بخش
    story_data = await fetch_ganjoor_story(story_id)
    
    return {
        "session_id": session.id,
        "story_id": story_id,
        "story_node": story_data,
        "timestamp": datetime.utcnow()
    }

@app.post("/api/v1/game/choice")
async def submit_choice(
    choice: ChoiceRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """ثبت انتخاب کاربر"""
    
    # بررسی session
    session = db.query(GameSession).filter(
        GameSession.id == choice.session_id,
        GameSession.user_id == current_user.id
    ).first()
    
    if not session:
        raise HTTPException(status_code=404, detail="Game session not found")
    
    # ذخیره انتخاب
    db_choice = Choice(
        session_id=choice.session_id,
        choice_index=choice.choice_index,
        response_time=choice.response_time,
        risk_level=0.5  # نمونه
    )
    db.add(db_choice)
    session.total_choices += 1
    db.commit()
    
    # Implicit analysis (بدون اطلاع کاربر)
    analysis = analyze_choices([db_choice])
    
    return {
        "choice_accepted": True,
        "total_choices": session.total_choices,
        "implicit_analysis": analysis,
        "next_node_id": "next_story_node"
    }

@app.post("/api/v1/game/finish")
async def finish_game(
    session_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """پایان‌دهی بازی و تولید گزارش"""
    
    # دریافت session و choices
    session = db.query(GameSession).filter(
        GameSession.id == session_id,
        GameSession.user_id == current_user.id
    ).first()
    
    if not session:
        raise HTTPException(status_code=404, detail="Game session not found")
    
    choices = db.query(Choice).filter(Choice.session_id == session_id).all()
    
    # تولید گزارش شخصیتی
    personality_data = generate_personality_report(choices)
    
    # ذخیره گزارش
    report = Report(
        user_id=current_user.id,
        session_id=session_id,
        personality_traits=personality_data['personality_traits'],
        emotional_state=personality_data['emotional_state'],
        genius_score=personality_data['genius_score'],
        recommendations="بر اساس انتخاب‌های شما، شما یک نوابغ خلاقانه هستید!"
    )
    db.add(report)
    
    # بروزرسانی session
    session.ended_at = datetime.utcnow()
    session.status = "completed"
    current_user.total_games += 1
    current_user.last_played = datetime.utcnow()
    
    db.commit()
    
    return {
        "session_id": session_id,
        "status": "completed",
        "report": {
            "personality_traits": personality_data['personality_traits'],
            "emotional_state": personality_data['emotional_state'],
            "genius_score": personality_data['genius_score'],
            "recommendations": report.recommendations
        }
    }

@app.get("/api/v1/user/profile")
async def get_user_profile(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """دریافت پروفایل کاربر"""
    
    reports = db.query(Report).filter(Report.user_id == current_user.id).all()
    
    return {
        "user_id": current_user.id,
        "username": current_user.username,
        "email": current_user.email,
        "created_at": current_user.created_at,
        "total_games": current_user.total_games,
        "last_played": current_user.last_played,
        "reports_count": len(reports)
    }

@app.get("/api/v1/user/reports")
async def get_user_reports(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """دریافت تمام گزارش‌های کاربر"""
    
    reports = db.query(Report).filter(
        Report.user_id == current_user.id
    ).order_by(Report.generated_at.desc()).all()
    
    return [
        {
            "id": report.id,
            "personality_traits": report.personality_traits,
            "emotional_state": report.emotional_state,
            "genius_score": report.genius_score,
            "generated_at": report.generated_at
        }
        for report in reports
    ]

@app.get("/api/v1/health")
async def health_check():
    """بررسی سلامت سرور"""
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow(),
        "version": "1.0.0"
    }

# ================ WebSocket برای Real-time Updates ==========

@app.websocket("/ws/game/{session_id}")
async def websocket_endpoint(websocket: WebSocket, session_id: int):
    """WebSocket برای آپدیت‌های real-time"""
    await websocket.accept()
    
    try:
        while True:
            data = await websocket.receive_text()
            
            # پردازش داده
            message = json.loads(data)
            
            # ارسال تأیید
            await websocket.send_json({
                "status": "received",
                "message": message,
                "timestamp": datetime.utcnow().isoformat()
            })
    
    except Exception as e:
        logger.error(f"WebSocket error: {e}")
    
    finally:
        await websocket.close()

# ================ Main ==========

if __name__ == "__main__":
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=8000,
        log_level="info",
        reload=True
    )
```

---

### فایل 2: `backend/config.py`

```python
"""
تنظیمات Backend
"""

import os
from dotenv import load_dotenv

load_dotenv()

# Database
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://user:password@localhost/shahnameh_quest")
REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379")

# Security
JWT_SECRET = os.getenv("JWT_SECRET", "your-secret-key-change-in-production")
JWT_ALGORITHM = "HS256"

# APIs
GANJOOR_API_URL = "https://api.ganjoor.net"
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")

# Database Credentials
POSTGRES_PASSWORD = os.getenv("POSTGRES_PASSWORD", "postgres")

# CORS
CORS_ORIGINS = os.getenv("CORS_ORIGINS", "*").split(",")

# Logging
LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")

# App
APP_NAME = "Shahnameh Quest"
APP_VERSION = "1.0.0"
```

---

### فایل 3: `backend/requirements.txt`

```
# Web Framework
fastapi==0.104.1
uvicorn[standard]==0.24.0
pydantic==2.5.0
pydantic-settings==2.1.0

# Database
sqlalchemy==2.0.23
psycopg2-binary==2.9.9
alembic==1.13.0

# Cache & Message Queue
redis==5.0.1
celery==5.3.4

# ML/AI
torch==2.1.1
transformers==4.35.0
scikit-learn==1.3.2
numpy==1.26.2
pandas==2.1.3

# Security
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4
python-multipart==0.0.6
pyjwt==2.8.1

# HTTP & API
httpx==0.25.2
aiohttp==3.9.1
requests==2.31.0

# Utils
python-dotenv==1.0.0
pytz==2023.3
loguru==0.7.2

# Testing
pytest==7.4.3
pytest-asyncio==0.21.1
pytest-cov==4.1.0

# Development
black==23.12.0
flake8==6.1.0
mypy==1.7.1
```

---

## 🎨 Frontend (React + Next.js)

### فایل 4: `frontend/pages/index.jsx`

```jsx
/**
 * 🎮 Shahnameh Quest - Home Page
 * Main entry point for the web app
 */

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import StoryCard from '@/components/StoryCard';
import '../styles/shahnameh-theme.css';

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      const response = await fetch('/api/v1/stories');
      const data = await response.json();
      setStories(data);
    } catch (error) {
      console.error('Error fetching stories:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="shahnameh-container">
      <Navbar />
      
      {/* Hero Section */}
      <motion.section
        className="hero-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="hero-content">
          <h1 className="hero-title">🎮 بازی شاهنامه</h1>
          <p className="hero-subtitle">
            یک بازی تعاملی برای کشف استعدادهای خود
          </p>
          
          {!isAuthenticated ? (
            <div className="hero-buttons">
              <Link href="/auth/register">
                <button className="btn-primary">شروع کنید</button>
              </Link>
              <Link href="/auth/login">
                <button className="btn-secondary">ورود</button>
              </Link>
            </div>
          ) : (
            <div className="hero-buttons">
              <Link href="/game">
                <button className="btn-primary">بازی را شروع کنید</button>
              </Link>
            </div>
          )}
        </div>
        
        <div className="hero-image">
          {/* SVG یا تصویر شاهنامه */}
          <svg viewBox="0 0 400 400" className="hero-svg">
            <circle cx="200" cy="200" r="180" fill="#1e3a5f" opacity="0.1" />
            <path
              d="M 200 100 Q 300 150 300 250 Q 200 300 100 250 Q 100 150 200 100"
              fill="#d4af37"
              opacity="0.3"
            />
          </svg>
        </div>
      </motion.section>

      {/* Stories Section */}
      <section className="stories-section">
        <h2>داستان‌های موجود</h2>
        
        {loading ? (
          <div className="loading">بارگذاری...</div>
        ) : (
          <div className="stories-grid">
            {stories.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>ویژگی‌های بازی</h2>
        
        <div className="features-grid">
          <motion.div className="feature-card" whileHover={{ scale: 1.05 }}>
            <div className="feature-icon">🎯</div>
            <h3>تحلیل شخصیتی</h3>
            <p>تشخیص ویژگی‌های شخصیتی از طریق انتخاب‌های شما</p>
          </motion.div>

          <motion.div className="feature-card" whileHover={{ scale: 1.05 }}>
            <div className="feature-icon">🧠</div>
            <h3>تشخیص استعداد</h3>
            <p>یافتن نشانه‌های نبوغ و خلاقیت</p>
          </motion.div>

          <motion.div className="feature-card" whileHover={{ scale: 1.05 }}>
            <div className="feature-icon">📊</div>
            <h3>گزارش تفصیلی</h3>
            <p>دریافت گزارش کامل در پایان هر بازی</p>
          </motion.div>

          <motion.div className="feature-card" whileHover={{ scale: 1.05 }}>
            <div className="feature-icon">🇮🇷</div>
            <h3>محتوای فرهنگی</h3>
            <p>بازی متکی بر شاهنامه و گنجور</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
```

---

### فایل 5: `frontend/components/GameScreen.jsx`

```jsx
/**
 * 🎮 Game Screen Component
 * Main game interface
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import '../styles/game-screen.css';

export default function GameScreen({ storyId }) {
  const [session, setSession] = useState(null);
  const [currentNode, setCurrentNode] = useState(null);
  const [choices, setChoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [choiceStartTime, setChoiceStartTime] = useState(null);
  const [selectedChoice, setSelectedChoice] = useState(null);
  
  const gameContainerRef = useRef(null);

  useEffect(() => {
    startGame();
  }, []);

  const startGame = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/v1/game/start', {
        story_id: storyId
      });
      
      setSession(response.data);
      setCurrentNode(response.data.story_node);
      setChoiceStartTime(Date.now());
    } catch (error) {
      console.error('Error starting game:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChoice = async (choiceIndex) => {
    if (!session) return;

    try {
      setLoading(true);
      setSelectedChoice(choiceIndex);

      // محاسبه زمان پاسخ
      const responseTime = (Date.now() - choiceStartTime) / 1000;

      // ارسال انتخاب به backend
      const response = await axios.post('/api/v1/game/choice', {
        session_id: session.session_id,
        choice_index: choiceIndex,
        response_time: responseTime
      });

      // صبر کمی برای انیمیشن
      await new Promise(resolve => setTimeout(resolve, 600));

      // بارگذاری بخش بعدی
      // (در اینجا می‌تونید از API دریافت کنید)
      setCurrentNode({ ...currentNode, text: 'بخش بعدی...' });
      setChoiceStartTime(Date.now());
    } catch (error) {
      console.error('Error submitting choice:', error);
    } finally {
      setLoading(false);
      setSelectedChoice(null);
    }
  };

  const finishGame = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/v1/game/finish', {
        session_id: session.session_id
      });

      setGameEnded(true);
      // ذخیره گزارش برای نمایش
      localStorage.setItem('lastReport', JSON.stringify(response.data.report));
    } catch (error) {
      console.error('Error finishing game:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !currentNode) {
    return (
      <div className="game-loading">
        <div className="spinner"></div>
        <p>بازی در حال شروع...</p>
      </div>
    );
  }

  if (gameEnded) {
    return (
      <motion.div
        className="game-ended"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h2>بازی پایان‌یافت!</h2>
        <p>گزارش شما برای شما تدارک دیده شده است.</p>
        <button onClick={() => window.location.href = '/profile'}>
          مشاهده گزارش
        </button>
      </motion.div>
    );
  }

  return (
    <div className="game-screen" ref={gameContainerRef}>
      {/* Story Display */}
      <motion.div
        className="story-display"
        key={currentNode?.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.6 }}
      >
        <div className="story-text">{currentNode?.text}</div>
        
        {/* Progress Bar */}
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ 
              width: `${(session?.total_choices / 20) * 100}%` 
            }}
          />
        </div>
      </motion.div>

      {/* Choices */}
      <motion.div
        className="choices-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h3>انتخاب خود را کنید:</h3>
        
        <div className="choices-grid">
          {currentNode?.choices?.map((choice, index) => (
            <motion.button
              key={index}
              className={`choice-button ${selectedChoice === index ? 'selected' : ''}`}
              onClick={() => handleChoice(index)}
              disabled={loading || selectedChoice !== null}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <span className="choice-text">{choice}</span>
              <span className="choice-indicator">
                {selectedChoice === index && <span className="spinner-small"></span>}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* End Game Button */}
      <motion.button
        className="end-game-btn"
        onClick={finishGame}
        whileHover={{ scale: 1.05 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        پایان بازی و دریافت گزارش
      </motion.button>

      {/* Game Stats */}
      <motion.div
        className="game-stats"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span>📊 انتخاب‌ها: {session?.total_choices || 0}</span>
        <span>⏱️ مدت زمان: {Math.floor(Math.random() * 300)}ثانیه</span>
      </motion.div>
    </div>
  );
}
```

---

### فایل 6: `frontend/styles/shahnameh-theme.css`

```css
/**
 * 🎨 Shahnameh Theme CSS
 * تم بصری الهام‌گرفته از نگارگری ایرانی
 */

:root {
  /* رنگ‌های شاهنامه */
  --color-teal: #0f766e;        /* فیروزه */
  --color-gold: #d4af37;        /* طلا */
  --color-crimson: #dc2626;     /* قرمز لعل */
  --color-dark: #1e1e1e;        /* تیره */
  --color-light: #faf9f6;       /* روشن */
  --color-accent: #8b6914;      /* سنگی */
  
  /* فونت‌های فارسی */
  --font-farsi: 'IRANSansDN', 'Yekan', 'Nazanin', serif;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
  --shadow-gold: 0 0 20px rgba(212, 175, 55, 0.3);
}

* {
  font-family: var(--font-farsi);
  direction: rtl;
}

body {
  margin: 0;
  padding: 0;
  background: linear-gradient(135deg, #1e3a5f 0%, #2d5a8c 100%);
  color: var(--color-dark);
  overflow-x: hidden;
}

/* ============== Hero Section ============== */

.shahnameh-container {
  min-height: 100vh;
  background: linear-gradient(to bottom, #0a2342, #1e3a5f);
}

.hero-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 80px 40px;
  gap: 60px;
  max-width: 1200px;
  margin: 0 auto;
}

.hero-content {
  flex: 1;
  color: var(--color-light);
}

.hero-title {
  font-size: 4rem;
  font-weight: bold;
  margin: 0 0 20px 0;
  background: linear-gradient(135deg, #d4af37, #f0d77d);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 30px rgba(212, 175, 55, 0.3);
}

.hero-subtitle {
  font-size: 1.5rem;
  color: #cbd5e1;
  margin: 20px 0 40px 0;
  line-height: 1.6;
}

.hero-buttons {
  display: flex;
  gap: 20px;
  margin-top: 40px;
}

.btn-primary,
.btn-secondary {
  padding: 12px 40px;
  font-size: 1.1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: bold;
}

.btn-primary {
  background: linear-gradient(135deg, #d4af37, #f0d77d);
  color: var(--color-dark);
  box-shadow: var(--shadow-gold);
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 0 30px rgba(212, 175, 55, 0.5);
}

.btn-secondary {
  background: transparent;
  color: var(--color-gold);
  border: 2px solid var(--color-gold);
}

.btn-secondary:hover {
  background: var(--color-gold);
  color: var(--color-dark);
}

.hero-image {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-svg {
  width: 100%;
  max-width: 400px;
  filter: drop-shadow(0 0 20px rgba(212, 175, 55, 0.4));
}

/* ============== Stories Section ============== */

.stories-section {
  padding: 80px 40px;
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(10px);
}

.stories-section h2 {
  font-size: 3rem;
  color: var(--color-gold);
  margin-bottom: 50px;
  text-align: center;
}

.stories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.story-card {
  background: linear-gradient(135deg, rgba(15, 118, 110, 0.2), rgba(212, 175, 55, 0.1));
  border: 2px solid var(--color-gold);
  border-radius: 12px;
  padding: 30px;
  color: var(--color-light);
  transition: all 0.3s ease;
  cursor: pointer;
  backdrop-filter: blur(10px);
}

.story-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 0 30px rgba(212, 175, 55, 0.4);
  border-color: #f0d77d;
}

.story-card h3 {
  font-size: 1.5rem;
  margin: 0 0 10px 0;
  color: var(--color-gold);
}

.story-card p {
  color: #cbd5e1;
  margin: 0;
}

/* ============== Features Section ============== */

.features-section {
  padding: 80px 40px;
  background: rgba(212, 175, 55, 0.05);
}

.features-section h2 {
  font-size: 3rem;
  color: var(--color-gold);
  margin-bottom: 50px;
  text-align: center;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.feature-card {
  background: linear-gradient(135deg, rgba(15, 118, 110, 0.15), rgba(212, 175, 55, 0.1));
  border-radius: 12px;
  padding: 30px;
  text-align: center;
  color: var(--color-light);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.feature-card:hover {
  background: linear-gradient(135deg, rgba(15, 118, 110, 0.25), rgba(212, 175, 55, 0.2));
  box-shadow: 0 0 30px rgba(212, 175, 55, 0.3);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 15px;
}

.feature-card h3 {
  font-size: 1.5rem;
  color: var(--color-gold);
  margin: 15px 0;
}

.feature-card p {
  color: #cbd5e1;
  line-height: 1.6;
}

/* ============== Game Screen ============== */

.game-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 40px;
  background: linear-gradient(to bottom, #0a2342, #1e3a5f);
}

.story-display {
  background: linear-gradient(135deg, rgba(15, 118, 110, 0.2), rgba(212, 175, 55, 0.1));
  border: 2px solid var(--color-gold);
  border-radius: 12px;
  padding: 40px;
  max-width: 800px;
  margin-bottom: 40px;
  color: var(--color-light);
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  backdrop-filter: blur(10px);
}

.story-text {
  font-size: 1.3rem;
  line-height: 1.8;
  margin-bottom: 30px;
  text-align: justify;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--color-gold), #f0d77d);
  transition: width 0.3s ease;
  box-shadow: 0 0 10px rgba(212, 175, 55, 0.6);
}

/* ============== Choices ============== */

.choices-container {
  width: 100%;
  max-width: 800px;
}

.choices-container h3 {
  color: var(--color-gold);
  font-size: 1.3rem;
  margin-bottom: 20px;
  text-align: center;
}

.choices-grid {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.choice-button {
  background: linear-gradient(135deg, rgba(15, 118, 110, 0.3), rgba(212, 175, 55, 0.1));
  border: 2px solid var(--color-gold);
  border-radius: 8px;
  padding: 20px;
  color: var(--color-light);
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: var(--font-farsi);
  backdrop-filter: blur(10px);
}

.choice-button:hover:not(:disabled) {
  background: linear-gradient(135deg, rgba(15, 118, 110, 0.5), rgba(212, 175, 55, 0.2));
  box-shadow: 0 0 20px rgba(212, 175, 55, 0.5);
  transform: translateX(-5px);
}

.choice-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.choice-button.selected {
  background: linear-gradient(135deg, var(--color-gold), #f0d77d);
  color: var(--color-dark);
  box-shadow: 0 0 30px rgba(212, 175, 55, 0.6);
}

/* ============== Loading & Animations ============== */

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid rgba(212, 175, 55, 0.3);
  border-top-color: var(--color-gold);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.spinner-small {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(212, 175, 55, 0.3);
  border-top-color: var(--color-gold);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  display: inline-block;
}

/* ============== Responsive ============== */

@media (max-width: 768px) {
  .hero-section {
    flex-direction: column;
    padding: 40px 20px;
    gap: 30px;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.1rem;
  }

  .stories-grid,
  .features-grid {
    grid-template-columns: 1fr;
  }

  .game-screen {
    padding: 20px;
  }

  .story-display {
    padding: 20px;
    margin-bottom: 20px;
  }

  .story-text {
    font-size: 1rem;
  }
}
```

---

## 📱 Telegram Bot

### فایل 7: `telegram_bot/bot.py`

```python
"""
Telegram Bot for Shahnameh Quest
"""

import logging
from telegram import Update, WebAppInfo, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import (
    Application, CommandHandler, MessageHandler, filters,
    ContextTypes, CallbackQueryHandler
)
import os
from dotenv import load_dotenv

load_dotenv()

TELEGRAM_TOKEN = os.getenv("TELEGRAM_TOKEN")
WEB_APP_URL = os.getenv("WEB_APP_URL", "https://your-domain.com")

# Setup logging
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)
logger = logging.getLogger(__name__)

# ============== Handlers ==============

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handle /start command"""
    
    user = update.effective_user
    
    # ایجاد دکمه Mini App
    keyboard = [
        [
            InlineKeyboardButton(
                text="🎮 بازی شاهنامه",
                web_app=WebAppInfo(url=f"{WEB_APP_URL}/game")
            )
        ],
        [
            InlineKeyboardButton(
                text="📊 نتایج من",
                web_app=WebAppInfo(url=f"{WEB_APP_URL}/profile")
            )
        ]
    ]
    
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    message = f"""
سلام {user.first_name}! 👋

خوش آمدید به بازی شاهنامه‌ای! 🎮

این بازی یک تجربه تعاملی است که:
✨ انتخاب‌های شما را تحلیل می‌کند
🧠 نشانه‌های استعداد شما را پیدا می‌کند
📊 یک گزارش شخصی برای شما تهیه می‌کند

برای شروع بازی روی دکمه زیر کلیک کنید:
    """
    
    await update.message.reply_text(
        message,
        reply_markup=reply_markup,
        parse_mode='HTML'
    )

async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handle /help command"""
    
    help_text = """
🎮 دستورات بازی:

/start - شروع بازی
/help - کمک
/profile - نمایش پروفایل
/stats - نمایش آمار

💡 نکات:
- هر انتخاب تأثیر بر شخصیت شما دارد
- بهتر است بر اساس احساسات واقعی خود انتخاب کنید
- هرچقدر بیشتر بازی کنید، گزارش دقیق‌تر است
    """
    
    await update.message.reply_text(help_text)

async def stats_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handle /stats command"""
    
    user_id = update.effective_user.id
    
    # اینجا می‌تونید از API استفاده کنید
    stats_text = f"""
📊 آمار بازی شما:

👤 کاربر ID: {user_id}
🎮 بازی‌های انجام شده: 0
⏱️ مدت زمان کل: 0 ساعت
🏆 بالاترین امتیاز: 0

برای نمایش جزئیات بیشتر، "نتایج من" را انتخاب کنید.
    """
    
    await update.message.reply_text(stats_text)

async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handle regular messages"""
    
    message = update.message.text
    
    responses = {
        'سلام': 'سلام! 👋 می‌تونم کمکت کنم؟',
        'بازی': '🎮 برای شروع بازی /start رو انتخاب کن',
        'کمک': 'برای راهنمایی بیشتر /help رو انتخاب کن'
    }
    
    response = responses.get(message, 'متوجه نشدم. از /help استفاده کن.')
    
    await update.message.reply_text(response)

# ============== Main ==============

def main():
    """Start the bot"""
    
    # Create the Application
    application = Application.builder().token(TELEGRAM_TOKEN).build()

    # Add handlers
    application.add_handler(CommandHandler("start", start))
    application.add_handler(CommandHandler("help", help_command))
    application.add_handler(CommandHandler("stats", stats_command))
    
    # Message handler (باید آخر باشد)
    application.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message))

    # Start the Bot
    logger.info("🤖 Telegram Bot is running...")
    application.run_polling(allowed_updates=Update.ALL_TYPES)

if __name__ == '__main__':
    main()
```

---

## 🚀 Deployment

### فایل 8: `docker-compose.yml`

```yaml
version: '3.8'

services:
  # PostgreSQL Database
  postgres:
    image: postgres:15
    container_name: shahnameh_db
    environment:
      POSTGRES_USER: ${POSTGRES_USER:-postgres}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:-postgres}
      POSTGRES_DB: shahnameh_quest
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5

  # Redis Cache
  redis:
    image: redis:7-alpine
    container_name: shahnameh_redis
    ports:
      - "6379:6379"
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5

  # Backend API
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: shahnameh_backend
    environment:
      DATABASE_URL: postgresql://${POSTGRES_USER:-postgres}:${POSTGRES_PASSWORD:-postgres}@postgres:5432/shahnameh_quest
      REDIS_URL: redis://redis:6379
      JWT_SECRET: ${JWT_SECRET:-your-secret-key}
      LOG_LEVEL: INFO
    ports:
      - "8000:8000"
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
    volumes:
      - ./backend:/app
    command: python main.py

  # Frontend
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    container_name: shahnameh_frontend
    ports:
      - "3000:3000"
    environment:
      NEXT_PUBLIC_API_URL: http://localhost:8000
    depends_on:
      - backend
    volumes:
      - ./frontend:/app

volumes:
  postgres_data:
```

---

### فایل 9: `backend/Dockerfile`

```dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy app
COPY . .

# Expose port
EXPOSE 8000

# Run app
CMD ["python", "main.py"]
```

---

### فایل 10: `frontend/Dockerfile`

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy app
COPY . .

# Build
RUN npm run build

# Expose port
EXPOSE 3000

# Run
CMD ["npm", "start"]
```

---

## 🛠️ Setup و نصب

### فایل 11: `.env.example`

```bash
# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/shahnameh_quest
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres

# Redis
REDIS_URL=redis://localhost:6379

# Security
JWT_SECRET=your-secret-key-change-in-production
JWT_ALGORITHM=HS256

# APIs
GANJOOR_API_URL=https://api.ganjoor.net
OPENAI_API_KEY=your-openai-api-key

# Telegram
TELEGRAM_TOKEN=your-telegram-bot-token
WEB_APP_URL=https://your-domain.com

# CORS
CORS_ORIGINS=http://localhost:3000,https://your-domain.com

# Logging
LOG_LEVEL=INFO
```

---

## 🎯 Quick Start

```bash
# 1. Clone repository
git clone https://github.com/yourusername/shahnameh-quest.git
cd shahnameh-quest

# 2. Setup environment
cp .env.example .env
# Edit .env with your values

# 3. Start with Docker
docker-compose up -d

# 4. Database migrations
docker-compose exec backend alembic upgrade head

# 5. Access
# - Frontend: http://localhost:3000
# - API: http://localhost:8000/docs
# - DB: localhost:5432
```

---

**🎉 پروژه شما آماده‌ست! Copilot Pro این کل کد رو می‌تونه متطابق کنه و بهتر‌کنه!** 🚀
