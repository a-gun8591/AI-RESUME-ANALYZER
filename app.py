from flask import Flask, request, jsonify
from flask_cors import CORS
import pdfplumber
import io
from analyzer import analyze_resume

app = Flask(__name__)
CORS(app)

@app.route('/analyze', methods=['POST'])
def analyze():
    if 'resume' not in request.files:
        return jsonify({"error": "No resume file uploaded"}), 400

    file = request.files['resume']
    jd_text = request.form.get('jd_text', '')

    if not jd_text.strip():
        return jsonify({"error": "Please paste a job description."}), 400

    resume_text = ""
    with pdfplumber.open(io.BytesIO(file.read())) as pdf:
        for page in pdf.pages:
            text = page.extract_text()
            if text:
                resume_text += text + "\n"

    if not resume_text.strip():
        return jsonify({"error": "Could not read PDF. Make sure it's not a scanned image."}), 400

    result = analyze_resume(resume_text, jd_text)
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)