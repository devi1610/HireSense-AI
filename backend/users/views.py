from django.contrib.auth.hashers import make_password, check_password
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import UserProfile, Resume
from .serializers import UserSerializer
import PyPDF2


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
    try:
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

    except Exception as e:
        return Response({"error": str(e)}, status=500)
    
# ---------------- DELETE RESUME ----------------
@api_view(['DELETE'])
def delete_resume(request, id):
    try:
        resume = Resume.objects.get(id=id)
        resume.delete()
        return Response({"message": "Deleted successfully 🗑️"})
    except Resume.DoesNotExist:
        return Response({"error": "Resume not found"}, status=404)


# ---------------- JOB LINK GENERATOR ----------------
def generate_job_links(role):
    query = role.replace(" ", "%20")

    return {
        "linkedin": f"https://www.linkedin.com/jobs/search/?keywords={query}",
        "naukri": f"https://www.naukri.com/jobs?q={query}",
        "unstop": f"https://unstop.com/jobs?search={query}"
    }


# ---------------- AI ANALYSIS ----------------
@api_view(['GET'])
def analyze_resume(request, id):
    try:
        resume = Resume.objects.get(id=id)
        file_path = resume.file.path

        text = ""

        # Extract PDF text
        with open(file_path, "rb") as file:
            reader = PyPDF2.PdfReader(file)

            for page in reader.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text

        text = text.lower()

        # Skills database
        skills_db = [
            "python", "django", "flask",
            "react", "javascript", "html", "css",
            "sql", "pandas", "numpy",
            "machine learning", "excel",
            "java", "c++", "aws"
        ]

        skills = []

        for skill in skills_db:
            if skill in text:
                skills.append(skill)

        # Score calculation
        score = min(100, len(skills) * 12)

        # Role mapping
        role_map = {
            "Backend Developer": ["python", "django", "flask", "sql"],
            "Frontend Developer": ["react", "javascript", "html", "css"],
            "Data Analyst": ["sql", "excel", "python", "pandas"],
            "ML Engineer": ["python", "numpy", "pandas", "machine learning"],
            "Full Stack Developer": ["python", "django", "react", "javascript"]
        }

        job_suggestions = []

        for role, keywords in role_map.items():
            if any(skill in keywords for skill in skills):
                job_suggestions.append(role)

        # Recommended jobs
        recommended_jobs = []

        for role in job_suggestions:
            recommended_jobs.append({
                "role": role,
                "company": "Live Job Search",
                "location": "India",
                "links": generate_job_links(role)
            })

        return Response({
            "name": resume.name,
            "email": resume.email,
            "skills_detected": skills,
            "score": score,
            "job_suggestions": job_suggestions,
            "recommended_jobs": recommended_jobs
        })

    except Resume.DoesNotExist:
        return Response({"error": "Resume not found"}, status=404)

    except Exception as e:
        return Response({"error": str(e)}, status=500)