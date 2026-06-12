from django.core.mail import send_mail
from django.utils.crypto import get_random_string
from django.contrib.auth.hashers import make_password, check_password
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import UserProfile, Resume
from .serializers import UserSerializer
import PyPDF2


reset_tokens = {}

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


# ---------------- RESUME UPLOAD ----------------
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


# ---------------- RESUME LIST ----------------
@api_view(['GET'])
def get_resumes(request):
    resumes = Resume.objects.all().order_by('-uploaded_at')

    data = []
    for r in resumes:
        data.append({
            "id": r.id,
            "name": r.name,
            "email": r.email,
            "file": r.file.url,
            "uploaded_at": r.uploaded_at
        })

    return Response(data)


# ---------------- DELETE RESUME ----------------
@api_view(['DELETE'])
def delete_resume(request, id):
    try:
        resume = Resume.objects.get(id=id)
        resume.delete()
        return Response({"message": "Deleted successfully 🗑️"})
    except Resume.DoesNotExist:
        return Response({"error": "Resume not found"}, status=404)


# ---------------- AI ANALYSIS (FINAL 4B VERSION) ----------------
@api_view(['GET'])
def analyze_resume(request, id):
    try:
        resume = Resume.objects.get(id=id)
        file_path = resume.file.path

        text = ""
        with open(file_path, "rb") as file:
            reader = PyPDF2.PdfReader(file)
            for page in reader.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text

        text = text.lower()

        # ---------------- SKILLS DB ----------------
        skills_db = [
            "python","java","c++","javascript","typescript",
            "html","css","react","nextjs","redux","tailwind","bootstrap",
            "django","flask","fastapi","nodejs","express",
            "sql","mysql","postgresql","mongodb",
            "pandas","numpy","power bi","tableau","excel",
            "machine learning","deep learning","tensorflow","pytorch",
            "aws","azure","gcp","docker","kubernetes","jenkins",
            "linux","git","github",
            "selenium","pytest",
            "network security","penetration testing",
            "autocad","staad pro","construction",
            "solidworks","catia","cnc","ansys",
            "embedded systems","vlsi","pcb design",
            "power systems","control systems",
            "marketing","sales","business analysis",
            "finance","management","hr"
        ]

        skills = [s for s in skills_db if s in text]
        user_skills = set(skills)

        # ---------------- ROLE REQUIREMENTS ----------------
        role_requirements = {
            "Backend Developer": {"python","django","flask","fastapi","sql","postgresql"},
            "Frontend Developer": {"react","javascript","html","css","tailwind","bootstrap"},
            "Full Stack Developer": {"python","django","react","javascript","sql"},
            "Software Engineer": {"python","java","sql","git"},

            "Data Analyst": {"excel","sql","power bi","tableau","pandas"},
            "ML Engineer": {"python","machine learning","numpy","pandas","tensorflow"},
            "Data Scientist": {"python","machine learning","deep learning","pandas","numpy"},

            "DevOps Engineer": {"docker","kubernetes","aws","jenkins","linux"},
            "Cloud Engineer": {"aws","azure","gcp","docker"},
            "QA Engineer": {"selenium","pytest"},

            "Cyber Security Analyst": {"network security","penetration testing"},

            "Site Engineer": {"construction","autocad"},
            "Civil Engineer": {"autocad","staad pro"},

            "Mechanical Engineer": {"solidworks","catia","cnc"},
            "Electrical Engineer": {"power systems","control systems"},

            "Business Analyst": {"business analysis","excel"},
            "Marketing Executive": {"marketing","sales"},
            "HR Executive": {"hr","management"},
            "Finance Executive": {"finance","excel"}
        }

        # ---------------- SMART ATS SCORE (4B) ----------------
        skill_weights = {
            "python": 15,"django":12,"flask":10,
            "react":12,"javascript":10,
            "sql":10,"machine learning":15,
            "pandas":8,"numpy":8,
            "html":5,"css":5,
            "aws":12,"excel":5
        }

        core_boost_skills = {"python","java","react","sql"}

        required_skills = set()
        for r in role_requirements.values():
            required_skills.update(r)

        earned = 0
        total = 0

        for skill in required_skills:
            w = skill_weights.get(skill, 5)
            total += w
            if skill in user_skills:
                earned += w

        earned += len(user_skills.intersection(core_boost_skills)) * 5

        score = int((earned / total) * 100) if total > 0 else 0
        score = min(score, 100)

        # ---------------- SMART JOB MATCHING ----------------
        job_suggestions = []

        for role, req_skills in role_requirements.items():
            match_skills = user_skills.intersection(req_skills)

            if len(match_skills) == 0:
                continue

            match_percent = (len(match_skills) / len(req_skills)) * 100

            bonus = 0
            if "python" in match_skills or "java" in match_skills:
                bonus += 5
            if "sql" in match_skills:
                bonus += 3

            final_score = min(round(match_percent + bonus), 100)

            job_suggestions.append({
                "role": role,
                "match": final_score
            })

        job_suggestions = sorted(job_suggestions, key=lambda x: x["match"], reverse=True)

        # ---------------- MISSING SKILLS ----------------
        missing_skills = list(required_skills - user_skills)

        # ---------------- RESPONSE ----------------
        return Response({
            "name": resume.name,
            "email": resume.email,
            "skills_detected": skills,
            "missing_skills": missing_skills,
            "score": score,
            "job_suggestions": job_suggestions
        })

    except Resume.DoesNotExist:
        return Response({"error": "Resume not found"}, status=404)

    except Exception as e:
        return Response({"error": str(e)}, status=500)