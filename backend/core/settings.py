from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = 'django-insecure-b#=l5yuc=jxl#mfj!le=c*@tdf1f@d76k+($3m5k)&=h3!(+ra'

DEBUG = True  # (later production lo False cheyyali)

ALLOWED_HOSTS = [
    "hiresense-ai-75v4.onrender.com",
    ".onrender.com",
    "localhost",
    "127.0.0.1"
]


# ================= APPS =================
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'rest_framework',
    'corsheaders',
    'users',
]


# ================= MIDDLEWARE =================
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',

    'corsheaders.middleware.CorsMiddleware',  # MUST be high

    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]


ROOT_URLCONF = 'core.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'core.wsgi.application'


# ================= DATABASE =================
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# ================= DRF =================
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
}


# ================= CORS =================
CORS_ALLOW_ALL_ORIGINS = True

# optional safe config
CSRF_TRUSTED_ORIGINS = [
    "https://hiresense-ai-75v4.onrender.com",
    "https://*.onrender.com"
]


# ================= INTERNATIONAL =================
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True


# ================= STATIC =================
STATIC_URL = 'static/'

MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'


DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'