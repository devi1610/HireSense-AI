from django.db import models
import os


class UserProfile(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)

    def __str__(self):
        return self.email


def upload_path(instance, filename):
    return f"resumes/{instance.email}_{filename}"


class Resume(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name="resumes",null=True, blank=True)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    file = models.FileField(upload_to=upload_path)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name