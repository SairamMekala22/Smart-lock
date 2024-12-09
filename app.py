from flask import Flask, request
from deepface import DeepFace
import requests
import os

app = Flask(__name__)

ESP32_URL = "http://192.168.0.112/capture"  # Replace <ESP32-IP> with the ESP32's IP address
REFERENCE_IMAGE = "./ramCharan.jpg"  # Path to the reference image

@app.route('/compare_faces', methods=['GET'])
def compare_faces():
    try:
        # Fetch the image from ESP32
        response = requests.get(ESP32_URL)
        if response.status_code != 200:
            return "Error fetching image from ESP32", 500

        # Save the fetched image temporarily
        temp_image_path = "./testing.jpg"
        with open(temp_image_path, "wb") as f:
            f.write(response.content)

        # Perform face verification
        result = DeepFace.verify(
            img1_path=REFERENCE_IMAGE,
            img2_path=temp_image_path
        )

        # Return True/False based on comparison
        is_verified = result["verified"]
        return str(is_verified)

    except Exception as e:
        return f"Error: {str(e)}", 500

if __name__ == "__main__":
    app.run(debug=True)