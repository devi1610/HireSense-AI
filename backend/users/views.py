from django.contrib.auth.hashers import make_password, check_password
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import UserProfile, Resume
from .serializers import UserSerializer
import PyPDF2
import io
import requests as req


# ---------------- REGISTER ----------------
@api_view(['POST'])
def register_user(request):
    data = request.data
    serializer = UserSerializer(data=data)

    if serializer.is_valid():
        serializer.save(password=make_password(data['password']))
        return Response({"message": "User registered successfully 🚀"})

    return Response(serializer.errors, status=400)


# ---------------- LOGIN ----------------
@api_view(['POST'])
def login_user(request):
    email = request.data.get('email')
    password = request.data.get('password')

    try:
        user = UserProfile.objects.get(email=email)

        if check_password(password, user.password):
            return Response({
                "message": "Login successful",
                "user": {
                    "name": user.name,
                    "email": user.email
                }
            })

        return Response({"error": "Invalid password"}, status=400)

    except UserProfile.DoesNotExist:
        return Response({"error": "User not found"}, status=404)


# ---------------- UPLOAD ----------------
@api_view(['POST'])
def upload_resume(request):
    try:
        name = request.data.get('name')
        email = request.data.get('email')
        file = request.FILES.get('file')

        if not name or not email or not file:
            return Response({"error": "All fields are required"}, status=400)

        resume = Resume.objects.create(
            name=name,
            email=email,
            file=file
        )

        return Response({
            "message": "Resume uploaded successfully 🚀",
            "id": resume.id
        })

    except Exception as e:
        return Response({"error": str(e)}, status=500)


# ---------------- GET RESUMES ----------------
@api_view(['GET'])
def get_resumes(request):
    resumes = Resume.objects.all().order_by('-uploaded_at')

    data = [{
        "id": r.id,
        "name": r.name,
        "email": r.email,
        "file": r.file.url,
        "uploaded_at": r.uploaded_at
    } for r in resumes]

    return Response(data)


# ---------------- DELETE ----------------
@api_view(['DELETE'])
def delete_resume(request, id):
    try:
        resume = Resume.objects.get(id=id)
        resume.delete()
        return Response({"message": "Deleted successfully 🗑️"})
    except Resume.DoesNotExist:
        return Response({"error": "Resume not found"}, status=404)


# ---------------- AI ANALYSIS ----------------
@api_view(['GET'])
def analyze_resume(request, id):
    try:
        resume = Resume.objects.get(id=id)

        # ---------------- TEXT EXTRACTION ----------------
        text = ""
        file_url = resume.file.url

        # Fix: local URL అయితే full URL చేయి
        if file_url.startswith('/'):
            file_url = 'https://hiresense-ai-75v4.onrender.com' + file_url

        response = req.get(file_url, timeout=30)
        file_bytes = io.BytesIO(response.content)

        reader = PyPDF2.PdfReader(file_bytes)
        for page in reader.pages:
            if page.extract_text():
                text += page.extract_text()

        text = text.lower()

        # ---------------- SKILL DB ----------------
        skills_db = [
            "python", "django", "flask",
            "react", "javascript", "html", "css",
            "sql", "mysql", "postgresql",
            "pandas", "numpy",
            "machine learning", "excel",
            "java", "c++", "aws",
            "docker", "kubernetes",
            "git", "github"
        ]

        # ---------------- SKILL DETECTION ----------------
        user_skills = set()

        for skill in skills_db:
            if skill in text:
                user_skills.add(skill)

        # ---------------- ROLE MATCHING ----------------
        role_requirements = {
            "Backend Developer": {"python", "django", "sql"},
            "Frontend Developer": {"react", "javascript", "html", "css"},
            "Data Analyst": {"sql", "excel", "python", "pandas"},
            "ML Engineer": {"python", "numpy", "pandas", "machine learning"},
            "Full Stack Developer": {"python", "django", "react", "javascript"}
        }

        job_suggestions = []

        for role, req_skills in role_requirements.items():
            match = len(user_skills & req_skills)
            if match >= 2:
                job_suggestions.append(role)

        # ---------------- MISSING SKILLS ----------------
        required_skills = set()

        for role in job_suggestions:
            required_skills.update(role_requirements[role])

        missing_skills = list(required_skills - user_skills)

        # ---------------- JOB LINKS ----------------
        def generate_links(role):
            q = role.replace(" ", "%20")
            return {
                "linkedin": f"https://www.linkedin.com/jobs/search/?keywords={q}",
                "naukri": f"https://www.naukri.com/jobs?q={q}",
                "unstop": f"https://unstop.com/jobs?search={q}"
            }

        recommended_jobs = [
            {
                "role": role,
                "links": generate_links(role)
            }
            for role in job_suggestions
        ]

        # ---------------- ATS SCORE ----------------
        score = min(100, len(user_skills) * 12)

        ai_suggestions = []

        if missing_skills:
            ai_suggestions.append(
                "Add missing skills: " + ", ".join(missing_skills)
            )

        if score < 60:
            ai_suggestions.append("ATS score is low — add more job keywords & projects")
        elif score < 80:
            ai_suggestions.append("Good profile — improve project descriptions for better impact")
        else:
            ai_suggestions.append("Strong resume — tailor it for specific job roles")

        if "git" not in user_skills and "github" not in user_skills:
            ai_suggestions.append("Add Git/GitHub experience (important for recruiters)")

        # ---------------- RESPONSE ----------------
        return Response({
            "skills_detected": list(user_skills),
            "missing_skills": missing_skills,
            "score": score,
            "job_suggestions": job_suggestions,
            "recommended_jobs": recommended_jobs
        })

    except Resume.DoesNotExist:
        return Response({"error": "Resume not found"}, status=404)

    except Exception as e:
        return Response({"error": str(e)}, status=500)