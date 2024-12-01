import qrcode
from datetime import datetime

# Generate unique data using the current timestamp
unique_data = f"UniqueData-{datetime.now().isoformat()}"

# Create a QR Code object
qr = qrcode.QRCode(
    version=1,  # Controls the size of the QR Code
    error_correction=qrcode.constants.ERROR_CORRECT_H,
    box_size=10,
    border=4,
)

# Add data to the QR Code
qr.add_data(unique_data)
qr.make(fit=True)

# Generate the QR Code image
img = qr.make_image(fill_color="black", back_color="white")

# Save the QR Code image with unique timestamp in filename
file_name = f"unique_qr_{datetime.now().strftime('%Y%m%d%H%M%S')}.png"
img.save(file_name)

print(f"QR Code generated and saved as {file_name}.")
