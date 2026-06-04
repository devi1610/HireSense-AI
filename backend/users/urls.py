from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register_user),
    path('login/', views.login_user),
    path('upload/', views.upload_resume),
    path('resumes/', views.get_resumes),
    path('analyze/<int:id>/', views.analyze_resume),
    path('delete/<int:id>/', views.delete_resume),
]