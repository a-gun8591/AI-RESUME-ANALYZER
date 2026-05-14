import re

STOPWORDS = {
    'a','an','the','and','or','but','in','on','at','to','for','of','with',
    'by','from','is','are','was','were','be','been','being','have','has',
    'had','do','does','did','will','would','could','should','may','might',
    'we','you','he','she','it','they','i','me','him','her','us','them',
    'my','your','his','its','our','their','this','that','these','those',
    'not','no','so','as','if','than','when','where','while','also','just',
    'more','most','other','some','into','through','before','after','about',
    'all','any','each','very','must','own','same','only','new','good','well'
}

ACTION_VERBS = {
    'achieved','built','created','designed','developed','drove','engineered',
    'established','executed','generated','implemented','improved','increased',
    'launched','led','managed','optimized','reduced','streamlined','delivered',
    'spearheaded','automated','collaborated','coordinated','deployed','maintained',
    'mentored','migrated','modernized','negotiated','orchestrated','produced',
    'resolved','scaled','trained','transformed','wrote','analyzed','architected'
}

SECTION_HEADERS = [
    'experience', 'education', 'skills', 'projects',
    'summary', 'objective', 'certifications', 'achievements'
]

def extract_keywords(text):
    text = text.lower()
    words = re.findall(r'\b[a-z][a-z0-9+#.]*\b', text)
    return {w for w in words if w not in STOPWORDS and len(w) > 2}

def score_keywords(resume_text, jd_text):
    """50% weight — how well resume keywords match the JD"""
    resume_kw = extract_keywords(resume_text)
    jd_kw = extract_keywords(jd_text)
    if not jd_kw:
        return 0, [], []
    matched = jd_kw & resume_kw
    missing = jd_kw - resume_kw
    score = round((len(matched) / len(jd_kw)) * 100)
    return score, sorted(matched), sorted(missing)

def score_structure(resume_text):
    """20% weight — does the resume have proper sections?"""
    text_lower = resume_text.lower()
    found = sum(1 for s in SECTION_HEADERS if s in text_lower)
    return round((found / len(SECTION_HEADERS)) * 100)

def score_quantification(resume_text):
    """20% weight — are achievements backed by numbers?"""
    numbers = re.findall(r'\b\d+[%x]?\b', resume_text)
    # More numbers = better quantification, capped at a reasonable count
    score = min(len(numbers) * 10, 100)
    return score

def score_action_verbs(resume_text):
    """10% weight — does it use strong action verbs?"""
    words = set(resume_text.lower().split())
    found = words & ACTION_VERBS
    score = min(len(found) * 12, 100)
    return score

def analyze_resume(resume_text, jd_text):
    kw_score, matched, missing = score_keywords(resume_text, jd_text)
    struct_score = score_structure(resume_text)
    quant_score = score_quantification(resume_text)
    verb_score = score_action_verbs(resume_text)

    # Weighted final score
    final_score = round(
        (kw_score * 0.50) +
        (struct_score * 0.20) +
        (quant_score * 0.20) +
        (verb_score * 0.10)
    )

    suggestions = []

    # Keyword suggestions
    if kw_score < 40:
        suggestions.append("⚠️ Very low keyword match — your resume doesn't reflect this role. Consider tailoring it specifically for this JD.")
    elif kw_score < 65:
        suggestions.append("📝 Moderate keyword match. Mirror the exact phrasing from the job description where applicable.")
    else:
        suggestions.append("✅ Strong keyword alignment with this job description.")

    # Structure suggestions
    if struct_score < 50:
        suggestions.append("📋 Missing key resume sections. Add clear headers: Skills, Experience, Education, Projects.")
    elif struct_score < 80:
        suggestions.append("📋 Some sections are missing. Consider adding Certifications or a Summary section.")

    # Quantification suggestions
    if quant_score < 30:
        suggestions.append("📊 No quantified achievements found. Add numbers — e.g. 'Reduced load time by 40%' or 'Managed a team of 5'.")
    elif quant_score < 60:
        suggestions.append("📊 Add more measurable results. Numbers make your impact concrete and memorable to ATS systems.")

    # Action verb suggestions
    if verb_score < 30:
        suggestions.append("💬 Bullet points lack strong action verbs. Start each with words like: Built, Optimized, Led, Delivered, Reduced.")
    elif verb_score < 60:
        suggestions.append("💬 Good use of some action verbs. Try to start every bullet point with a strong verb.")

    # Missing keywords
    if missing:
        top_missing = sorted(missing)[:8]
        suggestions.append(f"❌ Top missing keywords from JD: {', '.join(top_missing)}")

    return {
        "score": final_score,
        "breakdown": {
            "keyword_match": kw_score,
            "resume_structure": struct_score,
            "quantified_achievements": quant_score,
            "action_verbs": verb_score
        },
        "matched_keywords": matched,
        "missing_keywords": missing,
        "suggestions": suggestions
    }